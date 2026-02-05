import express from "express";
import {
  getAllServices,
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
router.get("/:id", getServiceById);

// Admin routes
router.post("/", protect, authorize("admin"), createService);
router.put("/:id", protect, authorize("admin"), updateService);
router.delete("/:id", protect, authorize("admin"), deleteService);

export default router;
