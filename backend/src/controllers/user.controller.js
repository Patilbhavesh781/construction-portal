import User from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

/**
 * Get all users (Admin only)
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } }).sort({
      createdAt: -1,
    });

    res
      .status(200)
      .json(new ApiResponse(200, users, "Users fetched successfully"));
  } catch (error) {
    next(error);
  }
};

/**
 * Get single user by ID (Admin only)
 */
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw new ApiError(404, "User not found");

    res
      .status(200)
      .json(new ApiResponse(200, user, "User fetched successfully"));
  } catch (error) {
    next(error);
  }
};

/**
 * Update user (Admin only)
 */
export const updateUser = async (req, res, next) => {
  try {
    const updates = req.body;

    const existingUser = await User.findById(req.params.id);
    if (!existingUser) throw new ApiError(404, "User not found");
    if (existingUser.role === "admin") {
      throw new ApiError(403, "Admin user cannot be modified");
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!user) throw new ApiError(404, "User not found");

    res
      .status(200)
      .json(new ApiResponse(200, user, "User updated successfully"));
  } catch (error) {
    next(error);
  }
};

/**
 * Delete user (Admin only)
 */
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw new ApiError(404, "User not found");
    if (user.role === "admin") {
      throw new ApiError(403, "Admin user cannot be deleted");
    }

    await user.deleteOne();

    res
      .status(200)
      .json(new ApiResponse(200, null, "User deleted successfully"));
  } catch (error) {
    next(error);
  }
};

/**
 * Get logged-in user's profile
 */
export const getMyProfile = async (req, res, next) => {
  try {
    const user = req.user;

    res
      .status(200)
      .json(new ApiResponse(200, user, "Profile fetched successfully"));
  } catch (error) {
    next(error);
  }
};

/**
 * Update logged-in user's profile
 */
export const updateMyProfile = async (req, res, next) => {
  try {
    const updates = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    );

    if (!user) throw new ApiError(404, "User not found");

    res
      .status(200)
      .json(new ApiResponse(200, user, "Profile updated successfully"));
  } catch (error) {
    next(error);
  }
};
