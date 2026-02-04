import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

import FadeIn from "../../components/animations/FadeIn";
import SlideIn from "../../components/animations/SlideIn";
import Button from "../../components/common/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-lg text-center">
        <SlideIn direction="up">
          <div className="flex justify-center mb-6">
            <AlertTriangle className="w-16 h-16 text-orange-600" />
          </div>
        </SlideIn>

        <FadeIn>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            The page you’re looking for doesn’t exist or has been moved. Please
            check the URL or return to the homepage.
          </p>

          <Button size="lg" onClick={() => navigate("/")}>
            Go Back Home
          </Button>
        </FadeIn>
      </div>
    </div>
  );
};

export default NotFound;
