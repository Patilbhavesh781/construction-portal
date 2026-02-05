import React, { useEffect, useMemo, useState } from "react";
import {
  CalendarCheck,
  CheckCircle,
  XCircle,
  Hourglass,
} from "lucide-react";

import FadeIn from "../../components/animations/FadeIn";
import SlideIn from "../../components/animations/SlideIn";
import DashboardStats from "../../components/dashboard/DashboardStats";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import BookingService from "../../services/booking.service";

const UserDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const bookingsRes = await BookingService.getMyBookings();
        setBookings(bookingsRes || []);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = useMemo(() => {
    const total = bookings.length;
    const pending = bookings.filter((b) => b.status === "pending").length;
    const completed = bookings.filter((b) => b.status === "completed").length;
    const cancelled = bookings.filter((b) => b.status === "cancelled").length;

    return [
      {
        key: "total",
        label: "My Bookings",
        value: total,
        icon: <CalendarCheck className="w-6 h-6 text-green-600" />,
        bg: "bg-green-50",
      },
      {
        key: "pending",
        label: "Pending",
        value: pending,
        icon: <Hourglass className="w-6 h-6 text-yellow-600" />,
        bg: "bg-yellow-50",
      },
      {
        key: "completed",
        label: "Completed",
        value: completed,
        icon: <CheckCircle className="w-6 h-6 text-blue-600" />,
        bg: "bg-blue-50",
      },
      {
        key: "cancelled",
        label: "Cancelled",
        value: cancelled,
        icon: <XCircle className="w-6 h-6 text-red-600" />,
        bg: "bg-red-50",
      },
    ];
  }, [bookings]);

  const recentBookings = useMemo(() => {
    return [...bookings]
      .sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate))
      .slice(0, 5);
  }, [bookings]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <SlideIn direction="down">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome Back!
            </h1>
            <p className="text-gray-600">
              Here’s what’s happening with your projects and bookings.
            </p>
          </div>
          <div className="flex gap-3">
            <Button to="/user/services">Book a Service</Button>
            <Button variant="outline" to="/user/profile">
              View Profile
            </Button>
          </div>
        </div>
      </SlideIn>

      {/* Stats */}
      <FadeIn>
        <DashboardStats stats={stats} />
      </FadeIn>

      {/* Recent Bookings */}
      <FadeIn delay={0.2}>
        <div className="bg-white rounded-2xl shadow-md border p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Recent Bookings
          </h2>

          {recentBookings.length === 0 ? (
            <p className="text-gray-600">No bookings found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead>
                  <tr className="border-b text-gray-600">
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking._id} className="border-b last:border-none">
                      <td className="py-3 px-4 font-medium text-gray-800">
                        {booking.service?.title || booking.bookingType}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(booking.bookingDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            booking.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : booking.status === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : booking.status === "confirmed"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {booking.status?.charAt(0).toUpperCase() +
                            booking.status?.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          to={`/user/bookings`}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </FadeIn>
    </div>
  );
};

export default UserDashboard;
