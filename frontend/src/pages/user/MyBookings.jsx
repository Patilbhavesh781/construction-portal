import React, { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import { io } from "socket.io-client";

import FadeIn from "../../components/animations/FadeIn";
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
        prev.some((b) => b._id === booking._id) ? prev : [booking, ...prev]
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
    <main className="bg-white w-full overflow-x-hidden">
      <section className="py-10 px-6 md:px-12 lg:px-16 border-b border-gray-100">
        <span className="text-xs uppercase tracking-[0.35em] text-red-600 font-semibold">
          My Bookings
        </span>
        <h1 className="text-3xl md:text-5xl font-light text-gray-900 mt-4 leading-tight">
          Service Requests
        </h1>
      </section>

      <section className="py-12 px-6 md:px-12 lg:px-16">
        <FadeIn>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-gray-700">
                <Filter className="w-5 h-5" />
                <span className="text-xs uppercase tracking-widest font-semibold">
                  Filter by Status
                </span>
              </div>
              {[
                "all",
                "pending",
                "confirmed",
                "completed",
                "cancelled",
              ].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-5 py-2 text-xs uppercase tracking-widest font-semibold border transition ${
                    filter === status
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-white text-gray-700 border-gray-200 hover:border-red-600"
                  }`}
                >
                  {status === "all"
                    ? "All"
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
            <Button to="/user/services" className="rounded-none uppercase tracking-widest text-xs">
              Book New Service
            </Button>
          </div>
        </FadeIn>
      </section>

      <section className="pb-20 px-6 md:px-12 lg:px-16">
        <FadeIn delay={0.1}>
          <div className="bg-white border border-gray-200 overflow-x-auto">
            {filteredBookings.length === 0 ? (
              <p className="py-10 text-center text-gray-600">
                No bookings found for this filter.
              </p>
            ) : (
              <table className="min-w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-600 uppercase tracking-widest text-xs">
                    <th className="py-3 px-6">Service</th>
                    <th className="py-3 px-6">Location</th>
                    <th className="py-3 px-6">Date</th>
                    <th className="py-3 px-6">Status</th>
                    <th className="py-3 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking._id} className="border-b border-gray-100 last:border-none">
                      <td className="py-4 px-6 font-medium text-gray-900">
                        {booking.service?.title || booking.bookingType}
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {booking.address?.city || booking.address?.fullAddress || "-"}
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

export default MyBookings;
