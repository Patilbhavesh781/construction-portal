import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import Loader from "../common/Loader";
import useAuthStore from "../../store/authStore";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register: registerUser, logout } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    setApiError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      /**
       * Expected response shape:
       * {
       *   user: { id, name, email, role },
       *   token: "jwt-token"
       * }
       */
      const response = await registerUser(payload);
      if (response?.token && response?.user?.isVerified === true) {
        if (response.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
        return;
      }

      if (response?.token) {
        await logout();
      }

      setSuccessMessage(
        response?.message ||
          "Registration successful. Please check your email to verify your account."
      );
      navigate(`/verify-email?email=${encodeURIComponent(data.email)}`);
    } catch (error) {
      setApiError(
        error?.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      {apiError && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg">
          {apiError}
        </div>
      )}
      {successMessage && (
        <div className="bg-green-50 text-green-700 text-sm px-4 py-2 rounded-lg">
          {successMessage}
        </div>
      )}

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          placeholder="John Doe"
          className={`w-full border-b border-gray-300 bg-transparent py-3 outline-none focus:border-gray-900 transition ${
            errors.name ? "border-red-500" : ""
          }`}
          {...register("name", {
            required: "Full name is required",
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

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          className={`w-full border-b border-gray-300 bg-transparent py-3 outline-none focus:border-gray-900 transition ${
            errors.email ? "border-red-500" : ""
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

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
            className={`w-full border-b border-gray-300 bg-transparent py-3 pr-10 outline-none focus:border-gray-900 transition ${
              errors.password ? "border-red-500" : ""
            }`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              validate: (value) =>
                /[A-Z]/.test(value) ||
                "Password must contain at least one uppercase letter",
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
            className={`w-full border-b border-gray-300 bg-transparent py-3 pr-10 outline-none focus:border-gray-900 transition ${
              errors.confirmPassword ? "border-red-500" : ""
            }`}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-xs text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="mt-8 w-full px-12 py-4 border border-gray-900 uppercase tracking-widest hover:bg-gray-900 hover:text-white transition"
        disabled={loading}
      >
        {loading ? "Creating account..." : "Create account"}
      </button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className=" font-medium hover:text-red-600"
        >
          Login here
        </button>
      </p>

      {loading && <Loader size="sm" className="mt-2" />}
    </form>
  );
};

export default RegisterForm;
