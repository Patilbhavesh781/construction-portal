import Review from "../models/Review.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

/**
 * Create a new review (Authenticated users)
 */
export const createReview = async (req, res, next) => {
  try {
    const review = await Review.create({
      ...req.body,
      user: req.user._id,
    });

    res
      .status(201)
      .json(new ApiResponse(201, "Review created successfully", review));
  } catch (error) {
    next(error);
  }
};

/**
 * Get all reviews (Public)
 */
export const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ isApproved: true })
      .populate("user", "name avatar")
      .sort({ createdAt: -1 });

    res
      .status(200)
      .json(new ApiResponse(200, "Reviews fetched successfully", reviews));
  } catch (error) {
    next(error);
  }
};

/**
 * Generic entity review fetcher
 */
export const getReviewsByEntity = async (req, res, next) => {
  try {
    const { type, id } = req.params;

    const reviews = await Review.find({
      entityType: type,
      entityId: id,
      isApproved: true,
    })
      .populate("user", "name avatar")
      .sort({ createdAt: -1 });

    res
      .status(200)
      .json(new ApiResponse(200, "Entity reviews fetched successfully", reviews));
  } catch (error) {
    next(error);
  }
};

/**
 * Wrapper routes for specific entities
 */
export const getReviewsByService = (req, res, next) => {
  req.params.type = "service";
  req.params.id = req.params.serviceId;
  return getReviewsByEntity(req, res, next);
};

export const getReviewsByProject = (req, res, next) => {
  req.params.type = "project";
  req.params.id = req.params.projectId;
  return getReviewsByEntity(req, res, next);
};

export const getReviewsByProperty = (req, res, next) => {
  req.params.type = "property";
  req.params.id = req.params.propertyId;
  return getReviewsByEntity(req, res, next);
};

/**
 * Approve or reject review (Admin only)
 */
export const updateReviewStatus = async (req, res, next) => {
  try {
    const { isApproved } = req.body;

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { isApproved },
      { new: true }
    );

    if (!review) throw new ApiError(404, "Review not found");

    res
      .status(200)
      .json(new ApiResponse(200, "Review status updated successfully", review));
  } catch (error) {
    next(error);
  }
};

/**
 * Delete review (Admin only)
 */
export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) throw new ApiError(404, "Review not found");

    res
      .status(200)
      .json(new ApiResponse(200, "Review deleted successfully"));
  } catch (error) {
    next(error);
  }
};
