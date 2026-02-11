import Project from "../models/Project.model.js";
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
        folder: "projects",
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
 * Create a new project (Admin only)
 */
export const createProject = async (req, res, next) => {
  try {
    const data = parseBody(req);
    const images = await uploadImages(req.files || []);

    const project = await Project.create({
      ...data,
      images,
      createdBy: req.user?._id || req.user?.id,
    });

    res
      .status(201)
      .json(new ApiResponse(201, project, "Project created successfully"));
  } catch (error) {
    next(error);
  }
};

/**
 * Get all projects (Public)
 */
export const getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ isActive: true }).sort({
      createdAt: -1,
    });

    res
      .status(200)
      .json(new ApiResponse(200, projects, "Projects fetched successfully"));
  } catch (error) {
    next(error);
  }
};

/**
 * Get project by ID (Public)
 */
export const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) throw new ApiError(404, "Project not found");

    res
      .status(200)
      .json(new ApiResponse(200, project, "Project fetched successfully"));
  } catch (error) {
    next(error);
  }
};

/**
 * Update project (Admin only)
 */
export const updateProject = async (req, res, next) => {
  try {
    const data = parseBody(req);
    const keepImages = Array.isArray(data.keepImages) ? data.keepImages : [];
    const uploads = await uploadImages(req.files || []);
    const images = [...keepImages, ...uploads];
    const updatePayload = images.length ? { ...data, images } : data;

    delete updatePayload.keepImages;

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updatePayload,
      { new: true, runValidators: true }
    );

    if (!project) throw new ApiError(404, "Project not found");

    res
      .status(200)
      .json(new ApiResponse(200, project, "Project updated successfully"));
  } catch (error) {
    next(error);
  }
};

/**
 * Delete project (Admin only)
 */
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) throw new ApiError(404, "Project not found");

    res
      .status(200)
      .json(new ApiResponse(200, null, "Project deleted successfully"));
  } catch (error) {
    next(error);
  }
};
