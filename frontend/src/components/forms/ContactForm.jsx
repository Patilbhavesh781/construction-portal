import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Send, CheckCircle } from "lucide-react";

import Button from "../common/Button";
import Loader from "../common/Loader";
import sendContactMessage from "../../services/user.service";

const ContactForm = () => {
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
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    setApiError("");
    setSuccess(false);
    setLoading(true);

    try {
      await sendContactMessage(data);
      setSuccess(true);
      reset();
    } catch (error) {
      setApiError(
        error?.response?.data?.message ||
          "Failed to send message. Please try again."
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
        <h2 className="text-2xl font-bold text-gray-800">Get in Touch</h2>
        <p className="text-sm text-gray-500 mt-1">
          We’d love to hear about your project
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="flex items-center gap-2 bg-green-50 text-green-700 text-sm px-4 py-2 rounded-lg">
          <CheckCircle className="w-4 h-4" />
          <span>Your message has been sent successfully!</span>
        </div>
      )}

      {/* API Error */}
      {apiError && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg">
          {apiError}
        </div>
      )}

      {/* Name */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          placeholder="Your name"
          className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 ${
            errors.name
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-orange-300"
          }`}
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          })}
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
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

      {/* Subject */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Subject</label>
        <input
          type="text"
          placeholder="Project inquiry / Support / Feedback"
          className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 ${
            errors.subject
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-orange-300"
          }`}
          {...register("subject", {
            required: "Subject is required",
            minLength: {
              value: 3,
              message: "Subject must be at least 3 characters",
            },
          })}
        />
        {errors.subject && (
          <p className="text-xs text-red-500">{errors.subject.message}</p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Message</label>
        <textarea
          rows="5"
          placeholder="Tell us about your project..."
          className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 resize-none ${
            errors.message
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-orange-300"
          }`}
          {...register("message", {
            required: "Message is required",
            minLength: {
              value: 10,
              message: "Message must be at least 10 characters",
            },
          })}
        />
        {errors.message && (
          <p className="text-xs text-red-500">{errors.message.message}</p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        fullWidth
        loading={loading}
        disabled={loading}
        icon={<Send className="w-4 h-4" />}
      >
        Send Message
      </Button>

      {loading && <Loader size="sm" className="mt-2" />}
    </form>
  );
};

export default ContactForm;
