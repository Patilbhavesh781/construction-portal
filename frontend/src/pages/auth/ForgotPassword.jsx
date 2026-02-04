import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";

import FadeIn from "../../components/animations/FadeIn";
import SlideIn from "../../components/animations/SlideIn";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      // TODO: Replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <SlideIn direction="down">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
            Forgot Password
          </h1>
        </SlideIn>

        <FadeIn delay={0.1}>
          <p className="text-center text-gray-600 mb-8">
            Enter your registered email address and we’ll send you a password
            reset link.
          </p>
        </FadeIn>

        {success ? (
          <FadeIn>
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 text-center mb-6">
              Password reset link sent! Please check your email.
            </div>
            <Button fullWidth onClick={() => navigate("/login")}>
              Go to Login
            </Button>
          </FadeIn>
        ) : (
          <FadeIn delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              <Button type="submit" fullWidth disabled={loading}>
                {loading ? <Loader size="sm" /> : "Send Reset Link"}
              </Button>
            </form>
          </FadeIn>
        )}

        <FadeIn delay={0.3}>
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm text-orange-600 hover:underline"
            >
              ← Back to Login
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default ForgotPassword;
