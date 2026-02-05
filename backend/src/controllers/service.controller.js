import Service from "../models/Service.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

/**
 * Create a new service (Admin only)
 */
export const createService = async (req, res, next) => {
  try {
    const createdBy = req.user?._id || req.user?.id;
    if (!createdBy) {
      throw new ApiError(401, "Not authorized");
    }

    const service = await Service.create({
      ...req.body,
      createdBy,
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
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
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
