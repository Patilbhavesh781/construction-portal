import React, { useEffect, useState } from "react";
import {
  Search,
  PlusCircle,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  PauseCircle,
  Home,
} from "lucide-react";

import FadeIn from "../../components/animations/FadeIn";
import SlideIn from "../../components/animations/SlideIn";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import Modal from "../../components/common/Modal";

const ManageProperties = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const statuses = ["All", "Available", "Sold", "Rented", "Under Review"];

  useEffect(() => {
    // TODO: Replace with real API call
    const fetchProperties = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1200));
        const mockProperties = [
          {
            id: 1,
            title: "3 BHK Apartment in Andheri",
            type: "Apartment",
            location: "Andheri West, Mumbai",
            price: "₹1.25 Cr",
            status: "available",
            owner: "Rahul Sharma",
            createdAt: "2026-01-05",
            description:
              "Spacious 3 BHK apartment with modern amenities and parking.",
            images: [],
            area: "1450 sq.ft",
            bedrooms: 3,
            bathrooms: 2,
          },
          {
            id: 2,
            title: "Commercial Office Space",
            type: "Commercial",
            location: "Connaught Place, Delhi",
            price: "₹3.8 Cr",
            status: "sold",
            owner: "Amit Verma",
            createdAt: "2025-12-15",
            description:
              "Prime office space suitable for IT companies and startups.",
            images: [],
            area: "3200 sq.ft",
            bedrooms: 0,
            bathrooms: 2,
          },
          {
            id: 3,
            title: "2 BHK Flat for Rent",
            type: "Apartment",
            location: "Baner, Pune",
            price: "₹25,000/month",
            status: "rented",
            owner: "Neha Singh",
            createdAt: "2026-01-18",
            description:
              "Well-maintained 2 BHK flat in a gated society.",
            images: [],
            area: "980 sq.ft",
            bedrooms: 2,
            bathrooms: 2,
          },
        ];

        setProperties(mockProperties);
        setFilteredProperties(mockProperties);
      } catch (error) {
        console.error("Failed to fetch properties", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    let filtered = properties;

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (property) =>
          property.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (search) {
      const lower = search.toLowerCase();
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(lower) ||
          property.location.toLowerCase().includes(lower) ||
          property.type.toLowerCase().includes(lower)
      );
    }

    setFilteredProperties(filtered);
  }, [search, statusFilter, properties]);

  const handleDeleteClick = (property) => {
    setSelectedProperty(property);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      // TODO: Replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      setProperties((prev) =>
        prev.filter(
          (property) => property.id !== selectedProperty.id
        )
      );
      setFilteredProperties((prev) =>
        prev.filter(
          (property) => property.id !== selectedProperty.id
        )
      );
      setShowDeleteModal(false);
      setSelectedProperty(null);
    } catch (error) {
      console.error("Failed to delete property", error);
    }
  };

  const updateStatus = async (property, newStatus) => {
    try {
      // TODO: Replace with real API call
      const updatedProperty = {
        ...property,
        status: newStatus,
      };
      setProperties((prev) =>
        prev.map((p) =>
          p.id === property.id ? updatedProperty : p
        )
      );
      setFilteredProperties((prev) =>
        prev.map((p) =>
          p.id === property.id ? updatedProperty : p
        )
      );
    } catch (error) {
      console.error("Failed to update property status", error);
    }
  };

  const openDetailsModal = (property) => {
    setSelectedProperty(property);
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
              Manage Properties
            </h1>
            <p className="text-gray-600">
              View, create, and manage all property listings.
            </p>
          </div>
          <Button to="/admin/manage-properties/create">
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Property
          </Button>
        </div>
      </SlideIn>

      {/* Filters */}
      <FadeIn>
        <div className="bg-white rounded-2xl shadow-md border p-5 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search properties..."
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

      {/* Properties Table */}
      <FadeIn delay={0.1}>
        <div className="bg-white rounded-2xl shadow-md border overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="border-b bg-gray-50 text-gray-600">
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Owner</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="py-6 text-center text-gray-600"
                  >
                    No properties found.
                  </td>
                </tr>
              ) : (
                filteredProperties.map((property) => (
                  <tr
                    key={property.id}
                    className="border-b last:border-none hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {property.title}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {property.type}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {property.location}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {property.price}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          property.status === "available"
                            ? "bg-green-100 text-green-700"
                            : property.status === "sold"
                            ? "bg-blue-100 text-blue-700"
                            : property.status === "rented"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {property.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {property.owner}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openDetailsModal(property)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>

                      {property.status !== "available" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            updateStatus(property, "available")
                          }
                        >
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </Button>
                      )}

                      {property.status === "available" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            updateStatus(property, "under review")
                          }
                        >
                          <PauseCircle className="w-4 h-4 text-yellow-600" />
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDeleteClick(property)}
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

      {/* Property Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Property Details"
      >
        {selectedProperty && (
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <strong>Title:</strong> {selectedProperty.title}
            </p>
            <p>
              <strong>Type:</strong> {selectedProperty.type}
            </p>
            <p>
              <strong>Location:</strong> {selectedProperty.location}
            </p>
            <p>
              <strong>Price:</strong> {selectedProperty.price}
            </p>
            <p>
              <strong>Status:</strong> {selectedProperty.status}
            </p>
            <p>
              <strong>Owner:</strong> {selectedProperty.owner}
            </p>
            <p>
              <strong>Area:</strong> {selectedProperty.area}
            </p>
            <p>
              <strong>Bedrooms:</strong> {selectedProperty.bedrooms}
            </p>
            <p>
              <strong>Bathrooms:</strong> {selectedProperty.bathrooms}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {selectedProperty.description}
            </p>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Property"
      >
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">
            {selectedProperty?.title}
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

export default ManageProperties;
