import "./config/env.js";

import app from "./app.js";
import connectDB from "./config/db.js";
import logger from "./utils/logger.js";

const PORT = process.env.PORT || 5000;

/* ------------------------ Start Server ------------------------ */
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

/* ------------------------ Handle Unhandled Errors ------------------------ */
process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Rejection:", err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", err);
  process.exit(1);
});
