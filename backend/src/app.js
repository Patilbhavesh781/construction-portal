import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import projectRoutes from "./routes/project.routes.js";
import propertyRoutes from "./routes/property.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import messageRoutes from "./routes/message.routes.js";
import chatRoutes from "./routes/chat.routes.js";

import errorHandler from "./middlewares/error.middleware.js";

const app = express();

/* ------------------------ Global Middlewares ------------------------ */
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

/* ------------------------ Health Check ------------------------ */
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "API is running 🚀" });
});

/* ------------------------ API Routes ------------------------ */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/chat", chatRoutes);

/* ------------------------ 404 Handler ------------------------ */
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* ------------------------ Global Error Handler ------------------------ */
app.use(errorHandler);

export default app;
