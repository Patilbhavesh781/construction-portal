import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import Loader from "../components/common/Loader";
import { useAuth } from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  if (user?.role !== "admin") {
    return (
      <Navigate
        to="/user/dashboard"
        replace
        state={{ unauthorized: true }}
      />
    );
  }

  return children;
};

export default AdminRoute;
