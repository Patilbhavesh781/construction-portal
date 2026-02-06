import Service from "../models/Service.model.js";
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
        folder: "services",
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
 * Create a new service (Admin only)
 */
export const createService = async (req, res, next) => {
  try {
    const data = parseBody(req);
    const createdBy = req.user?._id || req.user?.id;
    if (!createdBy) {
      throw new ApiError(401, "Not authorized");
    }

    const service = await Service.create({
      ...data,
      createdBy,
      images: await uploadImages(req.files || []),
    });

    res
      .status(201)
      .json(new ApiResponse(201, service, "Service created successfully"));
  } catch (error) {
    next(error);
  }
};

/**
 * Get all services (Public)
 */
export const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find({ isActive: true }).sort({
      createdAt: -1,
    });

    res
      .status(200)
      .json(new ApiResponse(200, services, "Services fetched successfully"));
  } catch (error) {
    next(error);
  }
};

/**
 * Get all services (Admin only, includes inactive)
 */
export const getAllServicesAdmin = async (req, res, next) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });

    res
      .status(200)
      .json(new ApiResponse(200, services, "Services fetched successfully"));
  } catch (error) {
    next(error);
  }
};

/**
 * Get single service by ID (Public)
 */
export const getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) throw new ApiError(404, "Service not found");

    res
      .status(200)
      .json(new ApiResponse(200, service, "Service fetched successfully"));
  } catch (error) {
    next(error);
  }
};

/**
 * Update service (Admin only)
 */
export const updateService = async (req, res, next) => {
  try {
    const data = parseBody(req);
    const keepImages = Array.isArray(data.keepImages) ? data.keepImages : [];
    const uploads = await uploadImages(req.files || []);
    const images = [...keepImages, ...uploads];
    const updatePayload = images.length ? { ...data, images } : data;

    delete updatePayload.keepImages;

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      updatePayload,
      { new: true, runValidators: true }
    );

    if (!service) throw new ApiError(404, "Service not found");

    res
      .status(200)
      .json(new ApiResponse(200, service, "Service updated successfully"));
  } catch (error) {
    next(error);
  }
};

/**
 * Delete service (Admin only)
 */
export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) throw new ApiError(404, "Service not found");

    res
      .status(200)
      .json(new ApiResponse(200, null, "Service deleted successfully"));
  } catch (error) {
    next(error);
  }
};
