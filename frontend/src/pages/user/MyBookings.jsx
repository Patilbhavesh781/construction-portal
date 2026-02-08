import React, { useEffect, useState } from "react";
import { Filter, CalendarCheck } from "lucide-react";
import { io } from "socket.io-client";

import FadeIn from "../../components/animations/FadeIn";
import SlideIn from "../../components/animations/SlideIn";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import BookingService from "../../services/booking.service";
import { useAuth } from "../../hooks/useAuth";

const MyBookings = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const bookingsRes = await BookingService.getMyBookings();
        setBookings(bookingsRes || []);
      } catch (error) {
        console.error("Failed to load bookings", error);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchBookings();
    }
  }, [authLoading]);

  useEffect(() => {
    if (!user?._id) return;
    const apiBase =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
    const socketUrl = apiBase.replace(/\/api\/?$/, "");
    const socket = io(socketUrl, { withCredentials: true });

    socket.on("connect", () => {
      socket.emit("join", { room: `user:${user._id}` });
    });

    socket.on("booking:created", (booking) => {
      if (!booking) return;
      if (String(booking.user) !== String(user._id)) return;
      setBookings((prev) =>
        prev.some((b) => b._id === booking._id)
          ? prev
          : [booking, ...prev]
      );
    });

    socket.on("booking:updated", (booking) => {
      if (!booking) return;
      if (String(booking.user) !== String(user._id)) return;
      setBookings((prev) =>
        prev.map((b) => (b._id === booking._id ? booking : b))
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [user?._id]);

  const filteredBookings =
    filter === "all"
      ? bookings
      : bookings.filter((b) => b.status?.toLowerCase() === filter);

  if (loading || authLoading) {
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
              My Bookings
            </h1>
            <p className="text-gray-600">
              View and manage all your service bookings.
            </p>
          </div>
          <Button to="/user/services">Book New Service</Button>
        </div>
      </SlideIn>

      {/* Filter */}
      <FadeIn>
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2 text-gray-600">
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filter:</span>
          </div>
          {["all", "pending", "confirmed", "completed", "cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                filter === status
                  ? "bg-orange-600 text-white border-orange-600"
                  : "bg-white text-gray-600 hover:bg-gray-100 border-gray-300"
              }`}
            >
              {status === "all"
                ? "All"
                : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Bookings Table */}
      <FadeIn delay={0.1}>
        <div className="bg-white rounded-2xl shadow-md border p-6">
          {filteredBookings.length === 0 ? (
            <p className="text-gray-600 text-center">
              No bookings found for this filter.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead>
                  <tr className="border-b text-gray-600">
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking._id} className="border-b last:border-none">
                      <td className="py-3 px-4 font-medium text-gray-800">
                        {booking.service?.title || booking.bookingType}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {booking.address?.city ||
                          booking.address?.fullAddress ||
                          "-"}
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
                      <td className="py-3 px-4 text-right space-x-2">
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

export default MyBookings;
