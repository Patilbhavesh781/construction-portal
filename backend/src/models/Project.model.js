import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
      index: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: 300,
    },
    category: {
      type: String,
      trim: true,
      index: true,
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    images: [
      {
        url: String,
        public_id: String,
      },
    ],
    videos: [
      {
        url: String,
        public_id: String,
      },
    ],
    location: {
      address: String,
      city: String,
      state: String,
      country: String,
      latitude: Number,
      longitude: Number,
    },
    client: {
      name: String,
      company: String,
      email: String,
      phone: String,
    },
    budget: {
      type: Number,
      min: 0,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["planning", "ongoing", "completed", "on_hold", "cancelled"],
      default: "planning",
      index: true,
    },
    completionPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

/* 🔗 Auto-generate slug */
projectSchema.pre("save", function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
  next();
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
