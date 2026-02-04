import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import Button from "../common/Button";
import Loader from "../common/Loader";
import registerUser from "../../services/auth.service";
import useAuthStore from "../../store/authStore";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState("");
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

      setAuth(response.user, response.token);

      if (response.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6"
    >
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
        <p className="text-sm text-gray-500 mt-1">
          Join us to start your construction journey
        </p>
      </div>

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
          placeholder="John Doe"
          className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 ${
            errors.name
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-orange-300"
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

      {/* Password */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 pr-10 ${
              errors.password
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-orange-300"
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
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
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

      {/* Confirm Password */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 pr-10 ${
              errors.confirmPassword
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-orange-300"
            }`}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword((prev) => !prev)
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
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

      {/* Submit */}
      <Button
        type="submit"
        fullWidth
        loading={loading}
        disabled={loading}
      >
        Create Account
      </Button>

      {/* Login */}
      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="text-orange-600 font-medium hover:underline"
        >
          Login here
        </button>
      </p>

      {loading && <Loader size="sm" className="mt-2" />}
    </form>
  );
};

export default RegisterForm;
