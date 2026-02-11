import React, { useEffect, useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  ClipboardList,
  Home,
  Download,
} from "lucide-react";

import FadeIn from "../../components/animations/FadeIn";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("monthly");
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        // TODO: Replace with real API call
        await new Promise((resolve) => setTimeout(resolve, 1200));

        const mockStats = {
          totalUsers: 1240,
          totalBookings: 845,
          totalServices: 9,
          totalProperties: 213,
          totalRevenue: "₹8.45 Cr",
          monthlyGrowth: "+12.6%",
          topServices: [
            { name: "Interior Design", bookings: 185 },
            { name: "Renovation Work", bookings: 162 },
            { name: "Plumbing", bookings: 121 },
            { name: "Painting", bookings: 97 },
          ],
          recentBookings: [
            {
              id: 1,
              user: "Rahul Sharma",
              service: "Interior Design",
              amount: "₹1,25,000",
              date: "2026-01-25",
              status: "Completed",
            },
            {
              id: 2,
              user: "Neha Singh",
              service: "Renovation Work",
              amount: "₹2,10,000",
              date: "2026-01-22",
              status: "In Progress",
            },
            {
              id: 3,
              user: "Amit Verma",
              service: "Painting",
              amount: "₹38,000",
              date: "2026-01-20",
              status: "Completed",
            },
          ],
        };

        setStats(mockStats);
      } catch (error) {
        console.error("Failed to load reports", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [dateRange]);

  if (loading || !stats) {
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
          Reports
        </span>
        <h1 className="text-3xl md:text-5xl font-light text-gray-900 mt-4 leading-tight">
          Business Reports
        </h1>
        <p className="mt-4 text-gray-600">
          Business insights and performance analytics.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border rounded-none focus:ring-2 focus:ring-orange-500 focus:outline-none"
          >
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
            <option value="yearly">This Year</option>
          </select>
          <Button variant="outline" className="rounded-none uppercase tracking-widest text-xs">
            <Download className="w-5 h-5 mr-2" />
            Export Report
          </Button>
        </div>
      </section>

      {/* Summary Stats */}
      <section className="py-12 px-6 md:px-12 lg:px-16">
      <FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-white rounded-2xl shadow-md border p-5 flex items-center gap-4">
            <Users className="w-10 h-10 text-orange-500" />
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.totalUsers}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md border p-5 flex items-center gap-4">
            <ClipboardList className="w-10 h-10 text-orange-500" />
            <div>
              <p className="text-sm text-gray-500">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.totalBookings}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md border p-5 flex items-center gap-4">
            <BarChart3 className="w-10 h-10 text-orange-500" />
            <div>
              <p className="text-sm text-gray-500">Total Services</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.totalServices}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md border p-5 flex items-center gap-4">
            <Home className="w-10 h-10 text-orange-500" />
            <div>
              <p className="text-sm text-gray-500">Total Properties</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.totalProperties}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md border p-5 flex items-center gap-4">
            <TrendingUp className="w-10 h-10 text-orange-500" />
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.totalRevenue}
              </p>
              <p className="text-xs text-green-600">
                Growth {stats.monthlyGrowth}
              </p>
            </div>
          </div>
        </div>
      </FadeIn>
      </section>

      {/* Top Services & Recent Bookings */}
      <section className="px-6 md:px-12 lg:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Services */}
        <FadeIn>
          <div className="bg-white rounded-2xl shadow-md border p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Top Services
            </h2>
            <div className="space-y-4">
              {stats.topServices.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between"
                >
                  <span className="text-gray-700">{service.name}</span>
                  <span className="font-semibold text-gray-800">
                    {service.bookings} bookings
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Recent Bookings */}
        <FadeIn delay={0.1}>
          <div className="bg-white rounded-2xl shadow-md border p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Recent Bookings
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b text-gray-600">
                    <th className="py-2 px-3 text-left">User</th>
                    <th className="py-2 px-3 text-left">Service</th>
                    <th className="py-2 px-3 text-left">Amount</th>
                    <th className="py-2 px-3 text-left">Date</th>
                    <th className="py-2 px-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-b last:border-none hover:bg-gray-50"
                    >
                      <td className="py-2 px-3 text-gray-700">
                        {booking.user}
                      </td>
                      <td className="py-2 px-3 text-gray-700">
                        {booking.service}
                      </td>
                      <td className="py-2 px-3 text-gray-700">
                        {booking.amount}
                      </td>
                      <td className="py-2 px-3 text-gray-700">
                        {booking.date}
                      </td>
                      <td className="py-2 px-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status === "Completed"
                              ? "bg-green-100 text-green-700"
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
          </div>
        </FadeIn>
      </div>
      </section>

      {/* Charts Section Placeholder */}
      <section className="pt-8 pb-20 px-6 md:px-12 lg:px-16">
      <FadeIn delay={0.2}>
        <div className="bg-white border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Revenue & Bookings Trends
          </h2>
          <div className="h-64 flex items-center justify-center text-gray-500 border-2 border-dashed rounded-xl">
            Charts will be rendered here (Chart.js / Recharts integration ready)
          </div>
        </div>
      </FadeIn>
      </section>
    </main>
  );
};

export default Reports;
