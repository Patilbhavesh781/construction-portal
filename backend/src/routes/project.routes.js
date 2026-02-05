import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllProjects);
router.get("/:id", getProjectById);

// Admin routes
router.post(
  "/",
  protect,
  authorize("admin"),
  upload.array("images", 10),
  createProject
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  upload.array("images", 10),
  updateProject
);

router.delete("/:id", protect, authorize("admin"), deleteProject);

export default router;
