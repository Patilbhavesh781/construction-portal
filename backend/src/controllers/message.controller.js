import Message from "../models/Message.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

/**
 * Send a message (Public / Authenticated)
 */
export const sendMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      throw new ApiError(400, "All fields are required");
    }

    const newMessage = await Message.create({
      name,
      email,
      subject,
      message,
      user: req.user?._id || null,
    });

    res
      .status(201)
      .json(new ApiResponse(201, newMessage, "Message sent successfully"));
  } catch (error) {
    next(error);
  }
};

/**
 * Get all messages (Admin only)
 */
export const getAllMessages = async (req, res, next) => {
  try {
    const messages = await Message.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res
      .status(200)
      .json(new ApiResponse(200, messages, "Messages fetched successfully"));
  } catch (error) {
    next(error);
  }
};

/**
 * Get logged-in user's messages
 */
export const getUserMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res
      .status(200)
      .json(new ApiResponse(200, messages, "User messages fetched successfully"));
  } catch (error) {
    next(error);
  }
};

/**
 * Mark message as read
 */
export const markMessageAsRead = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!message) throw new ApiError(404, "Message not found");

    res
      .status(200)
      .json(new ApiResponse(200, message, "Message marked as read"));
  } catch (error) {
    next(error);
  }
};

/**
 * Get message by ID (Admin only)
 */
export const getMessageById = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!message) throw new ApiError(404, "Message not found");

    res
      .status(200)
      .json(new ApiResponse(200, message, "Message fetched successfully"));
  } catch (error) {
    next(error);
  }
};

/**
 * Delete message (Admin only)
 */
export const deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) throw new ApiError(404, "Message not found");

    res
      .status(200)
      .json(new ApiResponse(200, null, "Message deleted successfully"));
  } catch (error) {
    next(error);
  }
};
