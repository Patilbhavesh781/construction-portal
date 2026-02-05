import express from "express";
import {
  getAllServices,
  getAllServicesAdmin,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "../controllers/service.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllServices);

// Admin routes
router.get("/admin/all", protect, authorize("admin"), getAllServicesAdmin);
router.post("/", protect, authorize("admin"), createService);
router.put("/:id", protect, authorize("admin"), updateService);
router.delete("/:id", protect, authorize("admin"), deleteService);

// Public route (single)
router.get("/:id", getServiceById);

export default router;
