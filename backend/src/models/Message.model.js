import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    name: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 150,
    },
    subject: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },
    isReplied: {
      type: Boolean,
      default: false,
      index: true,
    },
    reply: {
      type: String,
      trim: true,
    },
    repliedAt: {
      type: Date,
    },
    repliedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    source: {
      type: String,
      enum: ["contact_form", "dashboard", "system"],
      default: "contact_form",
      index: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
