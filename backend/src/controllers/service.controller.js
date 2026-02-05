import Service from "../models/Service.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

/**
 * Create a new service (Admin only)
 */
export const createService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);

    res
      .status(201)
      .json(new ApiResponse(201, "Service created successfully", service));
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
      .json(new ApiResponse(200, "Services fetched successfully", services));
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
      .json(new ApiResponse(200, "Service fetched successfully", service));
  } catch (error) {
    next(error);
  }
};

/**
 * Update service (Admin only)
 */
export const updateService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!service) throw new ApiError(404, "Service not found");

    res
      .status(200)
      .json(new ApiResponse(200, "Service updated successfully", service));
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
      .json(new ApiResponse(200, "Service deleted successfully"));
  } catch (error) {
    next(error);
  }
};
