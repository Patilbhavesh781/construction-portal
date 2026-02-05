import dotenv from "dotenv";
dotenv.config();

import connectDB from "../src/config/db.js";
import User from "../src/models/User.model.js";

const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

const validateEnv = () => {
  if (!ADMIN_EMAIL) {
    throw new Error("ADMIN_EMAIL is required in backend/.env");
  }
  if (!ADMIN_PASSWORD) {
    throw new Error("ADMIN_PASSWORD is required in backend/.env");
  }
};

const createOrUpdateAdmin = async () => {
  validateEnv();
  await connectDB();

  const existingUser = await User.findOne({ email: ADMIN_EMAIL });

  if (!existingUser) {
    const user = await User.create({
      name: ADMIN_NAME || "Admin User",
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: "admin",
      isVerified: true,
    });

    console.log("Admin created:", user.email);
    return;
  }

  existingUser.role = "admin";
  existingUser.isVerified = true;

  if (ADMIN_NAME) existingUser.name = ADMIN_NAME;
  if (ADMIN_PASSWORD) existingUser.password = ADMIN_PASSWORD;

  await existingUser.save();
  console.log("Admin updated:", existingUser.email);
};

createOrUpdateAdmin()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Failed to create/update admin:", err.message);
    process.exit(1);
  });
