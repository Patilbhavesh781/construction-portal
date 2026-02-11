import React, { useEffect, useMemo, useState } from "react";
import {
  CalendarCheck,
  CheckCircle,
  XCircle,
  Hourglass,
} from "lucide-react";

import FadeIn from "../../components/animations/FadeIn";
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
    <main className="bg-white w-full overflow-x-hidden">
      <section className="py-10 px-6 md:px-12 lg:px-16 border-b border-gray-100">
        <span className="text-xs uppercase tracking-[0.35em] text-red-600 font-semibold">
          Dashboard
        </span>
        <h1 className="text-3xl md:text-5xl font-light text-gray-900 mt-4 leading-tight">
          Welcome Back
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl">
          Review your latest service activity, monitor statuses, and manage your
          requests from one place.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            to="/user/services"
            className="rounded-none uppercase tracking-widest text-xs"
          >
            Book a Service
          </Button>
          <Button
            variant="outline"
            to="/user/profile"
            className="rounded-none uppercase tracking-widest text-xs"
          >
            View Profile
          </Button>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 lg:px-16 border-t border-gray-100">
        <FadeIn>
          <DashboardStats stats={stats} />
        </FadeIn>
      </section>

      <section className="pb-20 px-6 md:px-12 lg:px-16">
        <FadeIn delay={0.1}>
          <div className="bg-white border border-gray-200 overflow-x-auto">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-2xl font-light text-gray-900">Recent Bookings</h2>
            </div>

            {recentBookings.length === 0 ? (
              <p className="px-6 py-10 text-gray-600">No bookings found.</p>
            ) : (
              <table className="min-w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-600 uppercase tracking-widest text-xs">
                    <th className="py-3 px-6">Service</th>
                    <th className="py-3 px-6">Date</th>
                    <th className="py-3 px-6">Status</th>
                    <th className="py-3 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking._id} className="border-b border-gray-100 last:border-none">
                      <td className="py-4 px-6 font-medium text-gray-900">
                        {booking.service?.title || booking.bookingType}
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {new Date(booking.bookingDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 text-xs font-medium uppercase tracking-wider ${
                            booking.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : booking.status === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : booking.status === "confirmed"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          to="/user/bookings"
                          className="rounded-none uppercase tracking-widest text-xs"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </FadeIn>
      </section>
    </main>
  );
};

export default UserDashboard;
