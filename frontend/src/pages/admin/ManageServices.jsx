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
import ServiceService from "../../services/service.service";

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");
  const [createForm, setCreateForm] = useState({
    title: "",
    shortDescription: "",
    description: "",
    category: "construction",
    price: "",
    priceType: "fixed",
    duration: "",
    isActive: true,
    isFeatured: false,
    features: "",
    inclusions: "",
    exclusions: "",
  });
  const [editForm, setEditForm] = useState({
    id: "",
    title: "",
    shortDescription: "",
    description: "",
    category: "construction",
    price: "",
    priceType: "fixed",
    duration: "",
    isActive: true,
    isFeatured: false,
    features: "",
    inclusions: "",
    exclusions: "",
  });

  const categories = [
    { label: "All", value: "all" },
    { label: "Construction", value: "construction" },
    { label: "Renovation", value: "renovation" },
    { label: "Interior", value: "interior" },
    { label: "Architecture", value: "architecture" },
    { label: "Real Estate", value: "real-estate" },
    { label: "Consultation", value: "consultation" },
    { label: "Other", value: "other" },
  ];

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const data = await ServiceService.getAdminServices();
        setServices(data || []);
        setFilteredServices(data || []);
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
          service.category?.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    if (search) {
      const lower = search.toLowerCase();
      filtered = filtered.filter(
        (service) =>
          service.title.toLowerCase().includes(lower) ||
          service.description.toLowerCase().includes(lower) ||
          service.category?.toLowerCase().includes(lower)
      );
    }

    setFilteredServices(filtered);
  }, [search, categoryFilter, services]);

  const handleDeleteClick = (service) => {
    setSelectedService(service);
    setShowDeleteModal(true);
  };

  const openDetailsModal = (service) => {
    setSelectedService(service);
    setShowDetailsModal(true);
  };

  const openEditModal = (service) => {
    setEditError("");
    setEditForm({
      id: service._id,
      title: service.title || "",
      shortDescription: service.shortDescription || "",
      description: service.description || "",
      category: service.category || "construction",
      price: service.price != null ? String(service.price) : "",
      priceType: service.priceType || "fixed",
      duration: service.duration || "",
      isActive: service.isActive ?? true,
      isFeatured: service.isFeatured ?? false,
      features: service.features?.join(", ") || "",
      inclusions: service.inclusions?.join(", ") || "",
      exclusions: service.exclusions?.join(", ") || "",
    });
    setShowEditModal(true);
  };

  const resetCreateForm = () => {
    setCreateForm({
      title: "",
      shortDescription: "",
      description: "",
      category: "construction",
      price: "",
      priceType: "fixed",
      duration: "",
      isActive: true,
      isFeatured: false,
      features: "",
      inclusions: "",
      exclusions: "",
    });
    setCreateError("");
  };

  const handleCreateChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCreateForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toList = (value) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setCreateError("");
    setCreateLoading(true);
    try {
      const payload = {
        title: createForm.title,
        shortDescription: createForm.shortDescription || undefined,
        description: createForm.description,
        category: createForm.category,
        price: Number(createForm.price),
        priceType: createForm.priceType,
        duration: createForm.duration || undefined,
        isActive: createForm.isActive,
        isFeatured: createForm.isFeatured,
        features: toList(createForm.features),
        inclusions: toList(createForm.inclusions),
        exclusions: toList(createForm.exclusions),
      };

      const created = await ServiceService.createService(payload);
      setServices((prev) => [created, ...prev]);
      setFilteredServices((prev) => [created, ...prev]);
      setShowCreateModal(false);
      resetCreateForm();
    } catch (error) {
      setCreateError(
        error?.response?.data?.message ||
          "Failed to create service. Please try again."
      );
    } finally {
      setCreateLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditError("");
    setEditLoading(true);
    try {
      const payload = {
        title: editForm.title,
        shortDescription: editForm.shortDescription || undefined,
        description: editForm.description,
        category: editForm.category,
        price: Number(editForm.price),
        priceType: editForm.priceType,
        duration: editForm.duration || undefined,
        isActive: editForm.isActive,
        isFeatured: editForm.isFeatured,
        features: toList(editForm.features),
        inclusions: toList(editForm.inclusions),
        exclusions: toList(editForm.exclusions),
      };

      const updated = await ServiceService.updateService(
        editForm.id,
        payload
      );
      setServices((prev) =>
        prev.map((s) => (s._id === updated._id ? updated : s))
      );
      setFilteredServices((prev) =>
        prev.map((s) => (s._id === updated._id ? updated : s))
      );
      setShowEditModal(false);
    } catch (error) {
      setEditError(
        error?.response?.data?.message ||
          "Failed to update service. Please try again."
      );
    } finally {
      setEditLoading(false);
    }
  };

  const confirmDelete = async () => {
    try {
      await ServiceService.deleteService(selectedService._id);
      setServices((prev) =>
        prev.filter((service) => service._id !== selectedService._id)
      );
      setFilteredServices((prev) =>
        prev.filter((service) => service._id !== selectedService._id)
      );
      setShowDeleteModal(false);
      setSelectedService(null);
    } catch (error) {
      console.error("Failed to delete service", error);
    }
  };

  const toggleStatus = async (service) => {
    try {
      const updatedService = await ServiceService.updateService(
        service._id,
        { isActive: !service.isActive }
      );
      setServices((prev) =>
        prev.map((s) => (s._id === service._id ? updatedService : s))
      );
      setFilteredServices((prev) =>
        prev.map((s) => (s._id === service._id ? updatedService : s))
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
          <Button onClick={() => setShowCreateModal(true)}>
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
                <option key={cat.value} value={cat.value}>
                  {cat.label}
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
                    key={service._id}
                    className="border-b last:border-none hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {service.title}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {service.category}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {service.price != null
                        ? `INR ${service.price.toLocaleString()}`
                        : "-"}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          service.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {service.isActive ? "active" : "inactive"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {service.createdAt
                        ? new Date(service.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openDetailsModal(service)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openEditModal(service)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleStatus(service)}
                      >
                        {service.isActive ? (
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

      {/* Service Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Service Details"
      >
        {selectedService && (
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <strong>Title:</strong> {selectedService.title}
            </p>
            <p>
              <strong>Category:</strong> {selectedService.category}
            </p>
            <p>
              <strong>Price:</strong>{" "}
              {selectedService.price != null
                ? `INR ${selectedService.price.toLocaleString()}`
                : "-"}{" "}
              ({selectedService.priceType || "fixed"})
            </p>
            <p>
              <strong>Duration:</strong>{" "}
              {selectedService.duration || "-"}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {selectedService.isActive ? "Active" : "Inactive"}
            </p>
            <p>
              <strong>Featured:</strong>{" "}
              {selectedService.isFeatured ? "Yes" : "No"}
            </p>
            <p>
              <strong>Short Description:</strong>{" "}
              {selectedService.shortDescription || "-"}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {selectedService.description}
            </p>
            {selectedService.features?.length > 0 && (
              <div>
                <strong>Features:</strong>
                <p>{selectedService.features.join(", ")}</p>
              </div>
            )}
            {selectedService.inclusions?.length > 0 && (
              <div>
                <strong>Inclusions:</strong>
                <p>{selectedService.inclusions.join(", ")}</p>
              </div>
            )}
            {selectedService.exclusions?.length > 0 && (
              <div>
                <strong>Exclusions:</strong>
                <p>{selectedService.exclusions.join(", ")}</p>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Create Service Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          resetCreateForm();
        }}
        title="Add Service"
      >
        <form className="space-y-4" onSubmit={handleCreateSubmit}>
          {createError && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg">
              {createError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="title"
              value={createForm.title}
              onChange={handleCreateChange}
              placeholder="Title"
              required
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <select
              name="category"
              value={createForm.category}
              onChange={handleCreateChange}
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              {categories
                .filter((cat) => cat.value !== "all")
                .map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
            </select>
            <input
              name="price"
              type="number"
              min="0"
              value={createForm.price}
              onChange={handleCreateChange}
              placeholder="Price"
              required
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <select
              name="priceType"
              value={createForm.priceType}
              onChange={handleCreateChange}
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="fixed">Fixed</option>
              <option value="hourly">Hourly</option>
              <option value="per_sqft">Per Sqft</option>
              <option value="custom">Custom</option>
            </select>
            <input
              name="duration"
              value={createForm.duration}
              onChange={handleCreateChange}
              placeholder="Duration (optional)"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <textarea
            name="shortDescription"
            value={createForm.shortDescription}
            onChange={handleCreateChange}
            placeholder="Short description (optional)"
            className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
          <textarea
            name="description"
            value={createForm.description}
            onChange={handleCreateChange}
            placeholder="Description"
            required
            rows="4"
            className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="features"
              value={createForm.features}
              onChange={handleCreateChange}
              placeholder="Features (comma separated)"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <input
              name="inclusions"
              value={createForm.inclusions}
              onChange={handleCreateChange}
              placeholder="Inclusions (comma separated)"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <input
              name="exclusions"
              value={createForm.exclusions}
              onChange={handleCreateChange}
              placeholder="Exclusions (comma separated)"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                name="isActive"
                checked={createForm.isActive}
                onChange={handleCreateChange}
                className="h-4 w-4"
              />
              Active
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                name="isFeatured"
                checked={createForm.isFeatured}
                onChange={handleCreateChange}
                className="h-4 w-4"
              />
              Featured
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowCreateModal(false);
                resetCreateForm();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" loading={createLoading} disabled={createLoading}>
              Create Service
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Service Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Service"
      >
        <form className="space-y-4" onSubmit={handleEditSubmit}>
          {editError && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg">
              {editError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="title"
              value={editForm.title}
              onChange={handleEditChange}
              placeholder="Title"
              required
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <select
              name="category"
              value={editForm.category}
              onChange={handleEditChange}
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              {categories
                .filter((cat) => cat.value !== "all")
                .map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
            </select>
            <input
              name="price"
              type="number"
              min="0"
              value={editForm.price}
              onChange={handleEditChange}
              placeholder="Price"
              required
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <select
              name="priceType"
              value={editForm.priceType}
              onChange={handleEditChange}
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="fixed">Fixed</option>
              <option value="hourly">Hourly</option>
              <option value="per_sqft">Per Sqft</option>
              <option value="custom">Custom</option>
            </select>
            <input
              name="duration"
              value={editForm.duration}
              onChange={handleEditChange}
              placeholder="Duration (optional)"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <textarea
            name="shortDescription"
            value={editForm.shortDescription}
            onChange={handleEditChange}
            placeholder="Short description (optional)"
            className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
          <textarea
            name="description"
            value={editForm.description}
            onChange={handleEditChange}
            placeholder="Description"
            required
            rows="4"
            className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="features"
              value={editForm.features}
              onChange={handleEditChange}
              placeholder="Features (comma separated)"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <input
              name="inclusions"
              value={editForm.inclusions}
              onChange={handleEditChange}
              placeholder="Inclusions (comma separated)"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <input
              name="exclusions"
              value={editForm.exclusions}
              onChange={handleEditChange}
              placeholder="Exclusions (comma separated)"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                name="isActive"
                checked={editForm.isActive}
                onChange={handleEditChange}
                className="h-4 w-4"
              />
              Active
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                name="isFeatured"
                checked={editForm.isFeatured}
                onChange={handleEditChange}
                className="h-4 w-4"
              />
              Featured
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit" loading={editLoading} disabled={editLoading}>
              Update Service
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageServices;




