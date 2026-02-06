import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import PendingUser from "../models/PendingUser.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { sendPasswordResetEmail, sendEmailVerificationEmail } from "../services/mail.service.js";
import crypto from "crypto";

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

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = String(
      Math.floor(100000 + Math.random() * 900000)
    );
    const verificationCodeHash = crypto
      .createHash("sha256")
      .update(verificationCode)
      .digest("hex");
    const verificationExpires = Date.now() + 24 * 60 * 60 * 1000;

    await PendingUser.findOneAndUpdate(
      { email },
      {
        name,
        email,
        password: hashedPassword,
        role: role || "user",
        verificationCodeHash,
        verificationExpires,
      },
      { upsert: true, new: true }
    );

    await sendEmailVerificationEmail({ name, email }, verificationCode);

    res.status(201).json(
      new ApiResponse(
        201,
        {
          email,
        },
        "OTP sent to your email. Please verify to complete registration."
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
    if (!user.isVerified) {
      throw new ApiError(403, "Please verify your email before logging in");
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
 * Verify email using token
 */
export const verifyEmail = async (req, res, next) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      throw new ApiError(400, "Email and code are required");
    }

    const codeHash = crypto
      .createHash("sha256")
      .update(code)
      .digest("hex");

    const pending = await PendingUser.findOne({
      email,
      verificationCodeHash: codeHash,
      verificationExpires: { $gt: Date.now() },
    });

    if (!pending) {
      throw new ApiError(400, "Invalid or expired verification code");
    }

    const user = new User({
      name: pending.name,
      email: pending.email,
      password: pending.password,
      role: pending.role,
      isVerified: true,
    });
    user.$locals = { skipHash: true, allowVerified: true };
    await user.save();

    await PendingUser.deleteOne({ email });

    res
      .status(200)
      .json(new ApiResponse(200, null, "Email verified successfully"));
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

    const resetCode = String(
      Math.floor(100000 + Math.random() * 900000)
    );
    const resetCodeHash = crypto
      .createHash("sha256")
      .update(resetCode)
      .digest("hex");

    user.passwordResetCodeHash = resetCodeHash;
    user.passwordResetCodeExpires = Date.now() + 10 * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    await sendPasswordResetEmail(user, resetCode);

    res
      .status(200)
      .json(new ApiResponse(200, null, "Reset code sent to your email"));
  } catch (error) {
    next(error);
  }
};

/**
 * Verify reset code and issue reset token
 */
export const verifyResetCode = async (req, res, next) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      throw new ApiError(400, "Email and code are required");
    }

    const user = await User.findOne({ email }).select(
      "+passwordResetCodeHash +passwordResetCodeExpires"
    );
    if (!user) {
      throw new ApiError(404, "No user found with this email");
    }

    const codeHash = crypto
      .createHash("sha256")
      .update(code)
      .digest("hex");

    if (
      !user.passwordResetCodeHash ||
      user.passwordResetCodeHash !== codeHash ||
      !user.passwordResetCodeExpires ||
      user.passwordResetCodeExpires < Date.now()
    ) {
      throw new ApiError(400, "Invalid or expired reset code");
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    user.passwordResetCodeHash = undefined;
    user.passwordResetCodeExpires = undefined;
    await user.save({ validateBeforeSave: false });

    res
      .status(200)
      .json(new ApiResponse(200, { resetToken }, "Reset code verified"));
  } catch (error) {
    next(error);
  }
};

/**
 * Reset password using token
 */
export const resetPassword = async (req, res, next) => {
  try {
    const token = req.params.token || req.body.token;
    const { newPassword } = req.body;

    if (!token) {
      throw new ApiError(400, "Reset token is required");
    }

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
