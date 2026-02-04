import React, { useEffect, useState } from "react";
import {
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  Eye,
} from "lucide-react";

import FadeIn from "../../components/animations/FadeIn";
import SlideIn from "../../components/animations/SlideIn";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import Modal from "../../components/common/Modal";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const statuses = ["All", "Pending", "Approved", "Completed", "Cancelled"];

  useEffect(() => {
    // TODO: Replace with real API call
    const fetchBookings = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1200));
        const mockBookings = [
          {
            id: 1,
            user: "Rahul Sharma",
            service: "Interior Design",
            date: "2026-02-01",
            time: "10:30 AM",
            status: "pending",
            address: "Mumbai, Maharashtra",
            phone: "+91 9876543210",
            createdAt: "2026-01-25",
            notes: "Need modern kitchen design.",
          },
          {
            id: 2,
            user: "Neha Singh",
            service: "Plumbing",
            date: "2026-01-30",
            time: "2:00 PM",
            status: "approved",
            address: "Delhi, India",
            phone: "+91 9123456780",
            createdAt: "2026-01-20",
            notes: "Fix leaking pipes in bathroom.",
          },
          {
            id: 3,
            user: "Amit Verma",
            service: "Painting",
            date: "2026-01-28",
            time: "11:00 AM",
            status: "completed",
            address: "Pune, Maharashtra",
            phone: "+91 9988776655",
            createdAt: "2026-01-15",
            notes: "Full house repainting.",
          },
        ];

        setBookings(mockBookings);
        setFilteredBookings(mockBookings);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    let filtered = bookings;

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (booking) =>
          booking.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (search) {
      const lower = search.toLowerCase();
      filtered = filtered.filter(
        (booking) =>
          booking.user.toLowerCase().includes(lower) ||
          booking.service.toLowerCase().includes(lower) ||
          booking.address.toLowerCase().includes(lower)
      );
    }

    setFilteredBookings(filtered);
  }, [search, statusFilter, bookings]);

  const handleDeleteClick = (booking) => {
    setSelectedBooking(booking);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      // TODO: Replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      setBookings((prev) =>
        prev.filter((booking) => booking.id !== selectedBooking.id)
      );
      setFilteredBookings((prev) =>
        prev.filter((booking) => booking.id !== selectedBooking.id)
      );
      setShowDeleteModal(false);
      setSelectedBooking(null);
    } catch (error) {
      console.error("Failed to delete booking", error);
    }
  };

  const updateStatus = async (booking, newStatus) => {
    try {
      // TODO: Replace with real API call
      const updatedBooking = { ...booking, status: newStatus };
      setBookings((prev) =>
        prev.map((b) => (b.id === booking.id ? updatedBooking : b))
      );
      setFilteredBookings((prev) =>
        prev.map((b) => (b.id === booking.id ? updatedBooking : b))
      );
    } catch (error) {
      console.error("Failed to update booking status", error);
    }
  };

  const openDetailsModal = (booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <SlideIn direction="down">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Manage Bookings
            </h1>
            <p className="text-gray-600">
              View and manage all service bookings.
            </p>
          </div>
        </div>
      </SlideIn>

      {/* Filters */}
      <FadeIn>
        <div className="bg-white rounded-2xl shadow-md border p-5 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div className="w-full md:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full md:w-64 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              {statuses.map((status) => (
                <option key={status} value={status.toLowerCase()}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </FadeIn>

      {/* Bookings Table */}
      <FadeIn delay={0.1}>
        <div className="bg-white rounded-2xl shadow-md border overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="border-b bg-gray-50 text-gray-600">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Created</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="py-6 text-center text-gray-600"
                  >
                    No bookings found.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b last:border-none hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {booking.user}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {booking.service}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(booking.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {booking.time}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : booking.status === "completed"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openDetailsModal(booking)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>

                      {booking.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              updateStatus(booking, "approved")
                            }
                          >
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              updateStatus(booking, "cancelled")
                            }
                          >
                            <XCircle className="w-4 h-4 text-red-600" />
                          </Button>
                        </>
                      )}

                      {booking.status === "approved" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            updateStatus(booking, "completed")
                          }
                        >
                          <Clock className="w-4 h-4 text-blue-600" />
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDeleteClick(booking)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </FadeIn>

      {/* Booking Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Booking Details"
      >
        {selectedBooking && (
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <strong>User:</strong> {selectedBooking.user}
            </p>
            <p>
              <strong>Service:</strong> {selectedBooking.service}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedBooking.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Time:</strong> {selectedBooking.time}
            </p>
            <p>
              <strong>Status:</strong> {selectedBooking.status}
            </p>
            <p>
              <strong>Phone:</strong> {selectedBooking.phone}
            </p>
            <p>
              <strong>Address:</strong> {selectedBooking.address}
            </p>
            <p>
              <strong>Notes:</strong> {selectedBooking.notes}
            </p>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Booking"
      >
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete this booking for{" "}
          <span className="font-semibold">
            {selectedBooking?.user}
          </span>
          ? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ManageBookings;
