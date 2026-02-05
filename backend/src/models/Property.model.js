import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
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
    type: {
      type: String,
      enum: ["apartment", "house", "villa", "commercial", "land", "office"],
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["available", "sold", "rented", "under_construction", "off_market"],
      default: "available",
      index: true,
    },
    purpose: {
      type: String,
      enum: ["sale", "rent"],
      required: true,
      index: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      index: true,
    },
    area: {
      size: {
        type: Number,
        min: 0,
      },
      unit: {
        type: String,
        enum: ["sqft", "sqm"],
        default: "sqft",
      },
    },
    bedrooms: {
      type: Number,
      min: 0,
    },
    bathrooms: {
      type: Number,
      min: 0,
    },
    floors: {
      type: Number,
      min: 0,
    },
    parkingSpots: {
      type: Number,
      min: 0,
    },
    yearBuilt: {
      type: Number,
      min: 1800,
    },
    amenities: [
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
      zipCode: String,
      latitude: Number,
      longitude: Number,
    },
    owner: {
      name: String,
      email: String,
      phone: String,
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    availabilityDate: {
      type: Date,
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
propertySchema.pre("save", function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
  next();
});

const Property = mongoose.model("Property", propertySchema);
export default Property;
