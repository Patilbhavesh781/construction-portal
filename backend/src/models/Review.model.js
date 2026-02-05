import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    targetType: {
      type: String,
      enum: ["service", "project", "property"],
      required: true,
      index: true,
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      index: true,
    },
    title: {
      type: String,
      trim: true,
      maxlength: 120,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    images: [
      {
        url: String,
        public_id: String,
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
      index: true,
    },
    isApproved: {
      type: Boolean,
      default: true,
      index: true,
    },
    adminNote: {
      type: String,
      trim: true,
    },
    helpfulCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

/* Prevent duplicate review by same user on same target */
reviewSchema.index({ user: 1, targetType: 1, targetId: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);
export default Review;
