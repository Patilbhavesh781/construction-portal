import Property from "../models/Property.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

/**
 * Create a new property (Admin only)
 */
export const createProperty = async (req, res, next) => {
  try {
    const property = await Property.create(req.body);

    res
      .status(201)
      .json(new ApiResponse(201, "Property created successfully", property));
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
      .json(new ApiResponse(200, "Properties fetched successfully", properties));
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
      .json(new ApiResponse(200, "Property fetched successfully", property));
  } catch (error) {
    next(error);
  }
};

/**
 * Update property (Admin only)
 */
export const updateProperty = async (req, res, next) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!property) throw new ApiError(404, "Property not found");

    res
      .status(200)
      .json(new ApiResponse(200, "Property updated successfully", property));
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
      .json(new ApiResponse(200, "Property deleted successfully"));
  } catch (error) {
    next(error);
  }
};
