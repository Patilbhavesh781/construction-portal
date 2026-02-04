import React, { useEffect, useState } from "react";
import {
  Search,
  PlusCircle,
  Edit,
  Trash2,
  Eye,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

import FadeIn from "../../components/animations/FadeIn";
import SlideIn from "../../components/animations/SlideIn";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import Modal from "../../components/common/Modal";

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const categories = [
    "All",
    "Bricks & Plaster",
    "Plumbing",
    "Waterproofing",
    "Gypsum Work",
    "Painting",
    "Electrical",
    "Fabrication",
    "Tile Work",
    "Doors & Windows",
    "Lock & Key",
    "Renovation",
    "Interior Design",
    "Architecture & RCC",
    "Property Buying/Selling",
  ];

  useEffect(() => {
    // TODO: Replace with real API call
    const fetchServices = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1200));
        const mockServices = [
          {
            id: 1,
            title: "Bricks & Plaster Work",
            category: "Bricks & Plaster",
            description: "High-quality brick masonry and plastering services.",
            price: "₹500/sqft",
            status: "active",
            createdAt: "2025-12-15",
          },
          {
            id: 2,
            title: "Plumbing Services",
            category: "Plumbing",
            description:
              "Complete plumbing solutions for residential and commercial.",
            price: "₹300/sqft",
            status: "inactive",
            createdAt: "2025-11-20",
          },
          {
            id: 3,
            title: "Interior Design",
            category: "Interior Design",
            description:
              "Modern and luxurious interior design services for homes.",
            price: "₹800/sqft",
            status: "active",
            createdAt: "2026-01-10",
          },
        ];

        setServices(mockServices);
        setFilteredServices(mockServices);
      } catch (error) {
        console.error("Failed to fetch services", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    let filtered = services;

    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (service) =>
          service.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    if (search) {
      const lower = search.toLowerCase();
      filtered = filtered.filter(
        (service) =>
          service.title.toLowerCase().includes(lower) ||
          service.description.toLowerCase().includes(lower) ||
          service.category.toLowerCase().includes(lower)
      );
    }

    setFilteredServices(filtered);
  }, [search, categoryFilter, services]);

  const handleDeleteClick = (service) => {
    setSelectedService(service);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      // TODO: Replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      setServices((prev) =>
        prev.filter((service) => service.id !== selectedService.id)
      );
      setFilteredServices((prev) =>
        prev.filter((service) => service.id !== selectedService.id)
      );
      setShowDeleteModal(false);
      setSelectedService(null);
    } catch (error) {
      console.error("Failed to delete service", error);
    }
  };

  const toggleStatus = async (service) => {
    try {
      // TODO: Replace with real API call
      const updatedService = {
        ...service,
        status: service.status === "active" ? "inactive" : "active",
      };
      setServices((prev) =>
        prev.map((s) => (s.id === service.id ? updatedService : s))
      );
      setFilteredServices((prev) =>
        prev.map((s) => (s.id === service.id ? updatedService : s))
      );
    } catch (error) {
      console.error("Failed to update service status", error);
    }
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
              Manage Services
            </h1>
            <p className="text-gray-600">
              Create, edit, and manage all construction services.
            </p>
          </div>
          <Button to="/admin/manage-services/create">
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Service
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
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div className="w-full md:w-auto">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full md:w-64 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat.toLowerCase()}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </FadeIn>

      {/* Services Table */}
      <FadeIn delay={0.1}>
        <div className="bg-white rounded-2xl shadow-md border overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="border-b bg-gray-50 text-gray-600">
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Created</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="py-6 text-center text-gray-600"
                  >
                    No services found.
                  </td>
                </tr>
              ) : (
                filteredServices.map((service) => (
                  <tr
                    key={service.id}
                    className="border-b last:border-none hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {service.title}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {service.category}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {service.price}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          service.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {service.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(service.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleStatus(service)}
                      >
                        {service.status === "active" ? (
                          <ToggleRight className="w-4 h-4 text-green-600" />
                        ) : (
                          <ToggleLeft className="w-4 h-4 text-gray-500" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDeleteClick(service)}
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

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Service"
      >
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">
            {selectedService?.title}
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

export default ManageServices;
