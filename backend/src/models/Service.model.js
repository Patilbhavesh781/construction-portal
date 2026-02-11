import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
      minlength: 3,
      maxlength: 100,
      index: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, "Service description is required"],
      trim: true,
      minlength: 10,
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "construction",
        "renovation",
        "interior",
        "architecture",
        "real-estate",
        "consultation",
        "other",
      ],
      default: "other",
      index: true,
    },
    price: {
      type: Number,
      min: 0,
    },
    priceType: {
      type: String,
      enum: ["fixed", "hourly", "per_sqft", "custom"],
      default: "fixed",
    },
    duration: {
      type: String, // e.g. "2 weeks", "3 days"
      trim: true,
    },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
    features: [
      {
        type: String,
        trim: true,
      },
    ],
    inclusions: [
      {
        type: String,
        trim: true,
      },
    ],
    exclusions: [
      {
        type: String,
        trim: true,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
      min: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },
  },
  { timestamps: true }
);

/* 🔗 Generate slug before save */
serviceSchema.pre("save", function (next) {
  if (!this.isModified("title")) return next();
  this.slug = this.title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
  next();
});

const Service = mongoose.model("Service", serviceSchema);
export default Service;
