import express from "express";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../controllers/property.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllProperties);
router.get("/:id", getPropertyById);

// Admin routes
router.post(
  "/",
  protect,
  authorize("admin"),
  upload.array("images", 10),
  createProperty
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  upload.array("images", 10),
  updateProperty
);

router.delete("/:id", protect, authorize("admin"), deleteProperty);

export default router;
