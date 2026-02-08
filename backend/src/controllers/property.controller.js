import Property from "../models/Property.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import cloudinary from "../config/cloudinary.js";
import util from "util";

const parseBody = (req) => {
  if (req.body?.data) {
    try {
      return JSON.parse(req.body.data);
    } catch (err) {
      throw new ApiError(400, "Invalid JSON payload");
    }
  }
  return req.body;
};

const uploadImages = async (files = []) => {
  if (!files.length) return [];

  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    throw new ApiError(500, "Cloudinary config missing in .env");
  }

  const uploads = files.map(async (file) => {
    try {
      if (!file?.buffer || !file?.mimetype) {
        throw new ApiError(400, "Invalid image upload payload");
      }
      const dataUri = `data:${file.mimetype};base64,${file.buffer.toString(
        "base64"
      )}`;
      const result = await cloudinary.uploader.upload(dataUri, {
        folder: "properties",
        resource_type: "image",
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET || "ml_default",
      });
      return { url: result.secure_url, public_id: result.public_id };
    } catch (err) {
      const detail =
        err?.message ||
        err?.error?.message ||
        err?.response?.body?.message ||
        util.inspect(err, { depth: 2 });
      throw new ApiError(500, `Cloudinary upload failed: ${detail}`);
    }
  });

  return Promise.all(uploads);
};

/**
 * Create a new property (Admin only)
 */
export const createProperty = async (req, res, next) => {
  try {
    const data = parseBody(req);
    const images = await uploadImages(req.files || []);

    const property = await Property.create({
      ...data,
      images,
      createdBy: req.user?._id,
    });

    res
      .status(201)
      .json(new ApiResponse(201, property, "Property created successfully"));
  } catch (error) {
    next(error);
  }
};

/**
 * Get all properties (Public)
 */
export const getAllProperties = async (req, res, next) => {
  try {
    const properties = await Property.find({ isActive: true }).sort({
      createdAt: -1,
    });

    res
      .status(200)
      .json(new ApiResponse(200, properties, "Properties fetched successfully"));
  } catch (error) {
    next(error);
  }
};

/**
 * Get property by ID (Public)
 */
export const getPropertyById = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) throw new ApiError(404, "Property not found");

    res
      .status(200)
      .json(new ApiResponse(200, property, "Property fetched successfully"));
  } catch (error) {
    next(error);
  }
};

/**
 * Update property (Admin only)
 */
export const updateProperty = async (req, res, next) => {
  try {
    const data = parseBody(req);
    const keepImages = Array.isArray(data.keepImages) ? data.keepImages : [];
    const uploads = await uploadImages(req.files || []);
    const images = [...keepImages, ...uploads];
    const updatePayload = images.length ? { ...data, images } : data;

    delete updatePayload.keepImages;

    const property = await Property.findByIdAndUpdate(
      req.params.id,
      updatePayload,
      { new: true, runValidators: true }
    );

    if (!property) throw new ApiError(404, "Property not found");

    res
      .status(200)
      .json(new ApiResponse(200, property, "Property updated successfully"));
  } catch (error) {
    next(error);
  }
};

/**
 * Delete property (Admin only)
 */
export const deleteProperty = async (req, res, next) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) throw new ApiError(404, "Property not found");

    res
      .status(200)
      .json(new ApiResponse(200, null, "Property deleted successfully"));
  } catch (error) {
    next(error);
  }
};
