import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

// Public Pages
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Services from "../pages/public/Services";
import ServiceDetails from "../pages/public/ServiceDetails";
import Projects from "../pages/public/Projects";
import Properties from "../pages/public/Properties";
import ProjectDetails from "../pages/public/ProjectDetails";
import PropertyDetails from "../pages/public/PropertyDetails";
import Contact from "../pages/public/Contact";
import NotFound from "../pages/public/NotFound";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyEmail from "../pages/auth/VerifyEmail";

// User Pages
import UserDashboard from "../pages/user/UserDashboard";
import MyBookings from "../pages/user/MyBookings";
import Profile from "../pages/user/Profile";
import Messages from "../pages/user/Messages";
import UserServices from "../pages/user/UserServices";
import UserServiceDetails from "../pages/user/UserServiceDetails";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageServices from "../pages/admin/ManageServices";
import ManageBookings from "../pages/admin/ManageBookings";
import ManageProjects from "../pages/admin/ManageProjects";
import ManageProperties from "../pages/admin/ManageProperties";
import Reports from "../pages/admin/Reports";
import ManageMessages from "../pages/admin/ManageMessages";
import ManageReviews from "../pages/admin/ManageReviews";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetails />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />

      {/* User Protected Routes */}
      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="bookings" element={<MyBookings />} />
        <Route path="profile" element={<Profile />} />
        <Route path="messages" element={<Messages />} />
        <Route path="services" element={<UserServices />} />
        <Route path="services/:id" element={<UserServiceDetails />} />
      </Route>

      {/* Admin Protected Routes */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="manage-users" element={<ManageUsers />} />
        <Route path="manage-services" element={<ManageServices />} />
        <Route path="manage-bookings" element={<ManageBookings />} />
        <Route path="manage-projects" element={<ManageProjects />} />
        <Route path="manage-properties" element={<ManageProperties />} />
        <Route path="reports" element={<Reports />} />
        <Route path="manage-messages" element={<ManageMessages />} />
        <Route path="manage-reviews" element={<ManageReviews />} />
      </Route>

      {/* Catch All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
