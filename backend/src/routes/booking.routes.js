import express from "express";
import {
  createBooking,
  getAllBookings,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
} from "../controllers/booking.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();

// User routes
router.post("/", protect, createBooking);
router.get("/my-bookings", protect, getUserBookings);
router.get("/:id", protect, getBookingById);

// Admin routes
router.get("/", protect, authorize("admin"), getAllBookings);
router.put("/:id/status", protect, authorize("admin"), updateBookingStatus);
router.delete("/:id", protect, authorize("admin"), deleteBooking);

export default router;
