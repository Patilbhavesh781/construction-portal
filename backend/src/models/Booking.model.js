import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      index: true,
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      index: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      index: true,
    },
    bookingType: {
      type: String,
      enum: ["service", "property", "project", "consultation"],
      required: true,
      index: true,
    },
    bookingDate: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: String, // e.g. "10:00 AM - 12:00 PM"
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled", "rejected"],
      default: "pending",
      index: true,
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded", "failed"],
      default: "unpaid",
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "upi", "bank_transfer", "online"],
    },
    amount: {
      type: Number,
      min: 0,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    address: {
      fullAddress: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
      latitude: Number,
      longitude: Number,
    },
    contactDetails: {
      name: String,
      phone: String,
      email: String,
    },
    cancellationReason: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    cancelledAt: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
    attachments: [
      {
        url: String,
        public_id: String,
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

/* 🔗 Validation: Ensure at least one reference exists */
bookingSchema.pre("validate", function (next) {
  if (!this.service && !this.property && !this.project) {
    return next(
      new Error("Booking must be linked to a service, property, or project.")
    );
  }
  next();
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
