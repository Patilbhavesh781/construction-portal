import Booking from "../models/Booking.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

/**
 * Create a new booking (User)
 */
export const createBooking = async (req, res, next) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      user: req.user._id,
    });

    res
      .status(201)
      .json(new ApiResponse(201, "Booking created successfully", booking));
  } catch (error) {
    next(error);
  }
};

/**
 * Get all bookings (Admin)
 */
export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("service", "title")
      .sort({ createdAt: -1 });

    res
      .status(200)
      .json(new ApiResponse(200, "Bookings fetched successfully", bookings));
  } catch (error) {
    next(error);
  }
};

/**
 * Get logged-in user's bookings
 */
export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("service", "title")
      .sort({ createdAt: -1 });

    res
      .status(200)
      .json(new ApiResponse(200, "My bookings fetched successfully", bookings));
  } catch (error) {
    next(error);
  }
};

/**
 * Get booking by ID (Admin or Owner)
 */
export const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("user", "name email")
      .populate("service", "title");

    if (!booking) throw new ApiError(404, "Booking not found");

    if (
      req.user.role !== "admin" &&
      booking.user._id.toString() !== req.user._id.toString()
    ) {
      throw new ApiError(403, "Not authorized to view this booking");
    }

    res
      .status(200)
      .json(new ApiResponse(200, "Booking fetched successfully", booking));
  } catch (error) {
    next(error);
  }
};

/**
 * Update booking status (Admin)
 */
export const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!booking) throw new ApiError(404, "Booking not found");

    res
      .status(200)
      .json(new ApiResponse(200, "Booking status updated successfully", booking));
  } catch (error) {
    next(error);
  }
};

/**
 * Cancel booking (User)
 */
export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) throw new ApiError(404, "Booking not found");

    if (booking.user.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "Not authorized to cancel this booking");
    }

    booking.status = "cancelled";
    await booking.save();

    res
      .status(200)
      .json(new ApiResponse(200, "Booking cancelled successfully", booking));
  } catch (error) {
    next(error);
  }
};
