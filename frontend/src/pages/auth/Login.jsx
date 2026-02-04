import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import FadeIn from "../../components/animations/FadeIn";
import SlideIn from "../../components/animations/SlideIn";
import LoginForm from "../../components/forms/LoginForm";
import Button from "../../components/common/Button";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <SlideIn direction="down">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
            Welcome Back
          </h1>
        </SlideIn>

        <FadeIn delay={0.1}>
          <p className="text-center text-gray-600 mb-8">
            Login to access your dashboard and manage your projects.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <LoginForm redirectTo={from} />
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-6 text-center space-y-3">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="text-orange-600 hover:underline font-medium"
              >
                Register
              </Link>
            </p>
            <Link
              to="/forgot-password"
              className="text-sm text-gray-500 hover:underline block"
            >
              Forgot your password?
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="mt-6">
            <Button
              variant="outline"
              fullWidth
              onClick={() => navigate("/")}
            >
              ← Back to Home
            </Button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default Login;
