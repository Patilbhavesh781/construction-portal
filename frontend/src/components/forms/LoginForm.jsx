import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import Button from "../common/Button";
import Loader from "../common/Loader";
import useAuthStore from "../../store/authStore";

const LoginForm = ({ redirectTo }) => {
  const navigate = useNavigate();
  const { login: loginUser } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setApiError("");
    setLoading(true);

    try {
      const response = await loginUser(data.email, data.password);
      if (response.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate(redirectTo || "/user/dashboard");
      }
    } catch (error) {
      setApiError(
        error?.response?.data?.message ||
          "Invalid email or password. Please try again."
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
            placeholder="••••••••"
            className={`w-full border-b border-gray-300 bg-transparent py-3 pr-10 outline-none focus:border-gray-900 transition ${
              errors.password ? "border-red-500" : ""
            }`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
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

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => navigate("/forgot-password")}
          className="text-sm  hover:text-red-600"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        className="mt-8 w-full px-12 py-4 border border-gray-900 uppercase tracking-widest hover:bg-gray-900 hover:text-white transition"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/register")}
          className=" font-medium hover:text-red-600"
        >
          Create account
        </button>
      </p>

      {loading && <Loader size="sm" className="mt-2" />}
    </form>
  );
};

export default LoginForm;
