import express from "express";
import {
  createBooking,
  getAllBookings,
  getMyBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking,
} from "../controllers/booking.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();

// User routes
router.post("/", protect, createBooking);
router.get("/my-bookings", protect, getMyBookings);
router.get("/:id", protect, getBookingById);

// Admin routes
router.get("/", protect, authorize("admin"), getAllBookings);
router.put("/:id/status", protect, authorize("admin"), updateBookingStatus);
router.delete("/:id", protect, authorize("admin"), cancelBooking);

export default router;
