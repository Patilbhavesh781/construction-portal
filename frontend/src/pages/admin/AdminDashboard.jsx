import React, { useEffect, useState } from "react";
import {
  Users,
  CalendarCheck,
  FolderKanban,
  Building2,
  IndianRupee,
  MessageSquare,
} from "lucide-react";

import FadeIn from "../../components/animations/FadeIn";
import SlideIn from "../../components/animations/SlideIn";
import DashboardStats from "../../components/dashboard/DashboardStats";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import UserService from "../../services/user.service";
import BookingService from "../../services/booking.service";
import ProjectService from "../../services/project.service";
import PropertyService from "../../services/property.service";
import MessageService from "../../services/message.service";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    const fetchAdminDashboardData = async () => {
      setLoading(true);
      try {
        const [
          users,
          bookings,
          projects,
          properties,
          messages,
        ] = await Promise.all([
          UserService.getAllUsers(),
          BookingService.getAllBookings(),
          ProjectService.getAllProjects(),
          PropertyService.getAllProperties(),
          MessageService.getAllMessages(),
        ]);

        const nonAdminUsers = (users || []).filter(
          (u) => u.role !== "admin"
        );
        const unreadMessages = (messages || []).filter((m) => !m.isRead);

        setStats([
          {
            key: "users",
            label: "Total Users",
            value: nonAdminUsers.length,
            icon: <Users className="w-6 h-6 text-blue-600" />,
            bg: "bg-blue-50",
          },
          {
            key: "bookings",
            label: "Total Bookings",
            value: bookings?.length || 0,
            icon: <CalendarCheck className="w-6 h-6 text-green-600" />,
            bg: "bg-green-50",
          },
          {
            key: "projects",
            label: "Active Projects",
            value: (projects || []).filter(
              (p) => p.status === "ongoing"
            ).length,
            icon: <FolderKanban className="w-6 h-6 text-purple-600" />,
            bg: "bg-purple-50",
          },
          {
            key: "properties",
            label: "Properties Listed",
            value: properties?.length || 0,
            icon: <Building2 className="w-6 h-6 text-orange-600" />,
            bg: "bg-orange-50",
          },
          {
            key: "revenue",
            label: "Total Revenue",
            value: 0,
            icon: <IndianRupee className="w-6 h-6 text-yellow-600" />,
            bg: "bg-yellow-50",
            isCurrency: true,
          },
          {
            key: "messages",
            label: "New Messages",
            value: unreadMessages.length,
            icon: <MessageSquare className="w-6 h-6 text-pink-600" />,
            bg: "bg-pink-50",
          },
        ]);

        const recentBookingsData = [...(bookings || [])]
          .sort(
            (a, b) =>
              new Date(b.bookingDate || b.createdAt) -
              new Date(a.bookingDate || a.createdAt)
          )
          .slice(0, 5);

        const recentUsersData = [...nonAdminUsers]
          .sort(
            (a, b) =>
              new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
          )
          .slice(0, 5);

        setRecentBookings(recentBookingsData);
        setRecentUsers(recentUsersData);
      } catch (error) {
        console.error("Failed to load admin dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminDashboardData();
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
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Monitor platform performance and manage system data.
            </p>
          </div>
          <div className="flex gap-3">
            <Button to="/admin/manage-users">Manage Users</Button>
            <Button variant="outline" to="/admin/manage-services">
              Manage Services
            </Button>
          </div>
        </div>
      </SlideIn>

      {/* Stats */}
      <FadeIn>
        <DashboardStats stats={stats} />
      </FadeIn>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <FadeIn delay={0.1}>
          <div className="bg-white rounded-2xl shadow-md border p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Recent Bookings
            </h2>

            {recentBookings.length === 0 ? (
              <p className="text-gray-600">No recent bookings.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                  <thead>
                    <tr className="border-b text-gray-600">
                      <th className="py-3 px-4">User</th>
                      <th className="py-3 px-4">Service</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((booking) => (
                      <tr
                        key={booking._id}
                        className="border-b last:border-none"
                      >
                        <td className="py-3 px-4 font-medium text-gray-800">
                          {booking.user?.name || "-"}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {booking.service?.title || booking.bookingType}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {booking.bookingDate
                            ? new Date(
                                booking.bookingDate
                              ).toLocaleDateString()
                            : "-"}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              booking.status === "completed"
                                ? "bg-green-100 text-green-700"
                                : booking.status === "confirmed"
                                ? "bg-blue-100 text-blue-700"
                                : booking.status === "cancelled"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </FadeIn>

        {/* Recent Users */}
        <FadeIn delay={0.2}>
          <div className="bg-white rounded-2xl shadow-md border p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              New Users
            </h2>

            {recentUsers.length === 0 ? (
              <p className="text-gray-600">No new users.</p>
            ) : (
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center justify-between border-b last:border-none pb-3"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      to={`/admin/manage-users`}
                    >
                      View
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default AdminDashboard;
