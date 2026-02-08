import express from "express";
import {
  createReview,
  getReviewsByService,
  getReviewsByProject,
  getReviewsByProperty,
  getAllReviewsAdmin,
  updateReviewStatus,
  deleteReview,
} from "../controllers/review.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();

// Public routes
router.get("/service/:serviceId", getReviewsByService);
router.get("/project/:projectId", getReviewsByProject);
router.get("/property/:propertyId", getReviewsByProperty);

// Authenticated user
router.post("/", protect, createReview);

// Admin only
router.get("/", protect, authorize("admin"), getAllReviewsAdmin);
router.patch("/:id/status", protect, authorize("admin"), updateReviewStatus);
router.delete("/:id", protect, authorize("admin"), deleteReview);

export default router;
