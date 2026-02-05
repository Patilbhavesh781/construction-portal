import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { sendPasswordResetEmail } from "../services/mail.service.js";

/**
 * Register new user
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, "User already exists with this email");
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || "user",
    });

    const accessToken = generateAccessToken({ id: user._id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id, role: user.role });


    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    res.status(201).json(
      new ApiResponse(
        201,
        {
          user: user.toJSON(),
          token: accessToken,
          refreshToken,
        },
        "User registered successfully"
      )
    );

  } catch (error) {
    next(error);
  }
};

/**
 * Login user
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ApiError(401, "Invalid email or password");
    }

    const accessToken = generateAccessToken({ id: user._id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id, role: user.role });

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    res.status(200).json(
      new ApiResponse(
        200,
        {
          user: user.toJSON(),
          token: accessToken,
          refreshToken,
        },
        "Login successful"
      )
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Logout user
 */
export const logout = async (req, res, next) => {
  try {
    const userId = req.user?._id;

    if (userId) {
      await User.findByIdAndUpdate(userId, { refreshToken: null });
    }

    res
      .status(200)
      .json(new ApiResponse(200, null, "Logged out successfully"));
  } catch (error) {
    next(error);
  }
};

/**
 * Get current logged-in user's profile
 */
export const getProfile = async (req, res, next) => {
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
 * Update profile
 */
export const updateProfile = async (req, res, next) => {
  try {
    const updates = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    );

    res
      .status(200)
      .json(new ApiResponse(200, user, "Profile updated successfully"));
  } catch (error) {
    next(error);
  }
};

/**
 * Change password
 */
export const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select("+password");
    if (!user) throw new ApiError(404, "User not found");

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      throw new ApiError(401, "Current password is incorrect");
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res
      .status(200)
      .json(new ApiResponse(200, null, "Password updated successfully"));
  } catch (error) {
    next(error);
  }
};

/**
 * Forgot password (send reset email)
 */
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(404, "No user found with this email");
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    await sendPasswordResetEmail(user, resetToken);

    res
      .status(200)
      .json(new ApiResponse(200, null, "Password reset email sent"));
  } catch (error) {
    next(error);
  }
};

/**
 * Reset password using token
 */
export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },
    }).select("+password");

    if (!user) {
      throw new ApiError(400, "Invalid or expired reset token");
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res
      .status(200)
      .json(new ApiResponse(200, null, "Password reset successful"));
  } catch (error) {
    next(error);
  }
};
