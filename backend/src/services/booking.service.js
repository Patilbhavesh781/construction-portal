import Booking from "../models/Booking.model.js";
import ApiError from "../utils/ApiError.js";

/**
 * Create a new booking
 */
export const createBooking = async (bookingData) => {
  const booking = await Booking.create(bookingData);
  return booking;
};

/**
 * Get all bookings (Admin)
 */
export const getAllBookings = async () => {
  const bookings = await Booking.find()
    .populate("user", "name email")
    .populate("service", "title price")
    .populate("property", "title price");
  return bookings;
};

/**
 * Get bookings for a specific user
 */
export const getBookingsByUser = async (userId) => {
  const bookings = await Booking.find({ user: userId })
    .populate("service", "title price")
    .populate("property", "title price");
  return bookings;
};

/**
 * Get booking by ID
 */
export const getBookingById = async (bookingId) => {
  const booking = await Booking.findById(bookingId)
    .populate("user", "name email")
    .populate("service", "title price")
    .populate("property", "title price");

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  return booking;
};

/**
 * Update booking status or details (Admin/User)
 */
export const updateBooking = async (bookingId, updateData) => {
  const booking = await Booking.findByIdAndUpdate(bookingId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  return booking;
};

/**
 * Delete booking (Admin)
 */
export const deleteBooking = async (bookingId) => {
  const booking = await Booking.findByIdAndDelete(bookingId);
  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }
  return true;
};
