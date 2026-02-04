import React from "react";
import { Link, useNavigate } from "react-router-dom";

import FadeIn from "../../components/animations/FadeIn";
import SlideIn from "../../components/animations/SlideIn";
import RegisterForm from "../../components/forms/RegisterForm";
import Button from "../../components/common/Button";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <SlideIn direction="down">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
            Create an Account
          </h1>
        </SlideIn>

        <FadeIn delay={0.1}>
          <p className="text-center text-gray-600 mb-8">
            Join us to manage your construction projects, bookings, and services.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <RegisterForm />
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-6 text-center space-y-3">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-orange-600 hover:underline font-medium"
              >
                Login
              </Link>
            </p>
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

export default Register;
