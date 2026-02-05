import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Calendar, Clock, CheckCircle } from "lucide-react";

import Button from "../common/Button";
import Loader from "../common/Loader";
import BookingService from "../../services/booking.service";

const BookingForm = ({ serviceId, serviceName }) => {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      address: "",
      preferredDate: "",
      preferredTime: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    setApiError("");
    setSuccess(false);
    setLoading(true);

    try {
      const payload = {
        bookingType: "service",
        service: serviceId,
        bookingDate: data.preferredDate,
        timeSlot: data.preferredTime,
        notes: data.message,
        contactDetails: {
          name: data.fullName,
          phone: data.phone,
          email: data.email,
        },
        address: {
          fullAddress: data.address,
        },
      };

      await BookingService.createBooking(payload);
      setSuccess(true);
      reset();
    } catch (error) {
      setApiError(
        error?.response?.data?.message ||
          "Failed to create booking. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full bg-white rounded-2xl shadow-lg p-8 space-y-6"
    >
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Book {serviceName || "a Service"}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Fill out the form and we’ll contact you shortly
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="flex items-center gap-2 bg-green-50 text-green-700 text-sm px-4 py-2 rounded-lg">
          <CheckCircle className="w-4 h-4" />
          <span>Your booking request has been submitted successfully!</span>
        </div>
      )}

      {/* API Error */}
      {apiError && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg">
          {apiError}
        </div>
      )}

      {/* Full Name */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          placeholder="Your full name"
          className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 ${
            errors.fullName
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-orange-300"
          }`}
          {...register("fullName", {
            required: "Full name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          })}
        />
        {errors.fullName && (
          <p className="text-xs text-red-500">
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          placeholder="+91 98765 43210"
          className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 ${
            errors.phone
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-orange-300"
          }`}
          {...register("phone", {
            required: "Phone number is required",
            minLength: {
              value: 10,
              message: "Enter a valid phone number",
            },
          })}
        />
        {errors.phone && (
          <p className="text-xs text-red-500">{errors.phone.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 ${
            errors.email
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-orange-300"
          }`}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Enter a valid email address",
            },
          })}
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Address */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Project Address
        </label>
        <input
          type="text"
          placeholder="Enter project address"
          className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 ${
            errors.address
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-orange-300"
          }`}
          {...register("address", {
            required: "Address is required",
            minLength: {
              value: 5,
              message: "Address must be at least 5 characters",
            },
          })}
        />
        {errors.address && (
          <p className="text-xs text-red-500">{errors.address.message}</p>
        )}
      </div>

      {/* Preferred Date */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Preferred Date
        </label>
        <div className="relative">
          <input
            type="date"
            className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 pr-10 ${
              errors.preferredDate
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-orange-300"
            }`}
            {...register("preferredDate", {
              required: "Preferred date is required",
            })}
          />
          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
        {errors.preferredDate && (
          <p className="text-xs text-red-500">
            {errors.preferredDate.message}
          </p>
        )}
      </div>

      {/* Preferred Time */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Preferred Time
        </label>
        <div className="relative">
          <input
            type="time"
            className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 pr-10 ${
              errors.preferredTime
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-orange-300"
            }`}
            {...register("preferredTime", {
              required: "Preferred time is required",
            })}
          />
          <Clock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
        {errors.preferredTime && (
          <p className="text-xs text-red-500">
            {errors.preferredTime.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Additional Details
        </label>
        <textarea
          rows="4"
          placeholder="Describe your project requirements..."
          className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 resize-none ${
            errors.message
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-orange-300"
          }`}
          {...register("message", {
            minLength: {
              value: 10,
              message: "Message must be at least 10 characters",
            },
          })}
        />
        {errors.message && (
          <p className="text-xs text-red-500">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        fullWidth
        loading={loading}
        disabled={loading}
      >
        Submit Booking
      </Button>

      {loading && <Loader size="sm" className="mt-2" />}
    </form>
  );
};

export default BookingForm;
