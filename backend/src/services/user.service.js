import User from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";

/**
 * Get all users (Admin)
 */
export const getAllUsers = async () => {
  const users = await User.find().select("-password -refreshToken");
  return users;
};

/**
 * Get user by ID
 */
export const getUserById = async (userId) => {
  const user = await User.findById(userId).select("-password -refreshToken");
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return user;
};

/**
 * Update user profile
 */
export const updateUser = async (userId, updateData) => {
  const user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  }).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

/**
 * Delete user (Admin)
 */
export const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return true;
};
