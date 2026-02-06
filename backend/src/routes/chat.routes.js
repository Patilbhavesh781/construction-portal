import express from "express";
import {
  getMessages,
  sendMessage,
  getThreads,
} from "../controllers/chat.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();

router.get("/messages", protect, getMessages);
router.post("/messages", protect, sendMessage);
router.get("/threads", protect, authorize("admin"), getThreads);

export default router;
