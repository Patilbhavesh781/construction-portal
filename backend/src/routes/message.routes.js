import express from "express";
import {
  sendMessage,
  getAllMessages,
  getUserMessages,
  markMessageAsRead,
  deleteMessage,
} from "../controllers/message.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();

// Authenticated user
router.post("/", protect, sendMessage);
router.get("/my", protect, getUserMessages);
router.patch("/:id/read", protect, markMessageAsRead);

// Admin only
router.get("/", protect, authorize("admin"), getAllMessages);
router.delete("/:id", protect, authorize("admin"), deleteMessage);

export default router;
