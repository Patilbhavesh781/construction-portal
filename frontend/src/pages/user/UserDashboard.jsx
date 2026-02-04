import React, { useEffect, useState } from "react";
import { CalendarCheck, ClipboardList, MessageSquare, User } from "lucide-react";

import FadeIn from "../../components/animations/FadeIn";
import SlideIn from "../../components/animations/SlideIn";
import DashboardStats from "../../components/dashboard/DashboardStats";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

const UserDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    // TODO: Replace with real API calls
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1200));

        setStats([
          {
            key: "bookings",
            label: "My Bookings",
            value: 5,
            icon: <CalendarCheck className="w-6 h-6 text-green-600" />,
            bg: "bg-green-50",
          },
          {
            key: "projects",
            label: "My Projects",
            value: 2,
            icon: <ClipboardList className="w-6 h-6 text-blue-600" />,
            bg: "bg-blue-50",
          },
          {
            key: "messages",
            label: "Messages",
            value: 3,
            icon: <MessageSquare className="w-6 h-6 text-purple-600" />,
            bg: "bg-purple-50",
          },
          {
            key: "profile",
            label: "Profile Completion",
            value: 80,
            icon: <User className="w-6 h-6 text-orange-600" />,
            bg: "bg-orange-50",
          },
        ]);

        setRecentBookings([
          {
            id: 1,
            service: "Interior Design",
            date: "2026-02-01",
            status: "Pending",
          },
          {
            id: 2,
            service: "Renovation Work",
            date: "2026-01-20",
            status: "Completed",
          },
          {
            id: 3,
            service: "Plumbing Service",
            date: "2026-01-10",
            status: "In Progress",
          },
        ]);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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
            <Button to="/services">Book a Service</Button>
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
                    <tr key={booking.id} className="border-b last:border-none">
                      <td className="py-3 px-4 font-medium text-gray-800">
                        {booking.service}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(booking.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            booking.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : booking.status === "In Progress"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {booking.status}
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
