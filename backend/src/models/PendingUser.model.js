import mongoose from "mongoose";

const pendingUserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true, unique: true },
    password: { type: String, required: true }, // hashed
    role: { type: String, enum: ["user", "admin"], default: "user" },
    verificationCodeHash: { type: String, required: true },
    verificationExpires: { type: Date, required: true },
  },
  { timestamps: true }
);

const PendingUser = mongoose.model("PendingUser", pendingUserSchema);
export default PendingUser;
