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
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import Modal from "../../components/common/Modal";
import PropertyService from "../../services/property.service";

const ManageProperties = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState("");
  const [createForm, setCreateForm] = useState({
    title: "",
    description: "",
    shortDescription: "",
    type: "apartment",
    purpose: "sale",
    price: "",
    areaSize: "",
    areaUnit: "sqft",
    bedrooms: "",
    bathrooms: "",
    parkingSpots: "",
    status: "available",
    locationAddress: "",
    locationCity: "",
    locationState: "",
    locationCountry: "",
    locationZip: "",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
  });
  const [createImages, setCreateImages] = useState([]);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");
  const [editForm, setEditForm] = useState({
    id: "",
    title: "",
    description: "",
    shortDescription: "",
    type: "apartment",
    purpose: "sale",
    price: "",
    areaSize: "",
    areaUnit: "sqft",
    bedrooms: "",
    bathrooms: "",
    parkingSpots: "",
    status: "available",
    locationAddress: "",
    locationCity: "",
    locationState: "",
    locationCountry: "",
    locationZip: "",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
  });
  const [editImages, setEditImages] = useState([]);
  const [editKeepImages, setEditKeepImages] = useState([]);

  const statuses = [
    "All",
    "Available",
    "Sold",
    "Rented",
    "Under Construction",
    "Off Market",
  ];

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const data = await PropertyService.getAllProperties();

        setProperties(data || []);
        setFilteredProperties(data || []);
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
      const normalizedStatus =
        statusFilter === "under construction"
          ? "under_construction"
          : statusFilter === "off market"
          ? "off_market"
          : statusFilter;
      filtered = filtered.filter(
        (property) =>
          property.status.toLowerCase() === normalizedStatus.toLowerCase()
      );
    }

    if (search) {
      const lower = search.toLowerCase();
        filtered = filtered.filter(
          (property) =>
            property.title.toLowerCase().includes(lower) ||
            property.location?.city?.toLowerCase().includes(lower) ||
            property.location?.address?.toLowerCase().includes(lower) ||
            property.type?.toLowerCase().includes(lower)
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
      await PropertyService.deleteProperty(selectedProperty._id);
      setProperties((prev) =>
        prev.filter(
          (property) => property._id !== selectedProperty._id
        )
      );
      setFilteredProperties((prev) =>
        prev.filter(
          (property) => property._id !== selectedProperty._id
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
      const updatedProperty = await PropertyService.updateProperty(
        property._id,
        { status: newStatus }
      );
      setProperties((prev) =>
        prev.map((p) =>
          p._id === property._id ? updatedProperty : p
        )
      );
      setFilteredProperties((prev) =>
        prev.map((p) =>
          p._id === property._id ? updatedProperty : p
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

  const openEditModal = (property) => {
    setEditError("");
    setEditImages([]);
    setEditKeepImages(property.images || []);
    setEditForm({
      id: property._id,
      title: property.title || "",
      description: property.description || "",
      shortDescription: property.shortDescription || "",
      type: property.type || "apartment",
      purpose: property.purpose || "sale",
      price: property.price != null ? String(property.price) : "",
      areaSize: property.area?.size != null ? String(property.area.size) : "",
      areaUnit: property.area?.unit || "sqft",
      bedrooms:
        property.bedrooms != null ? String(property.bedrooms) : "",
      bathrooms:
        property.bathrooms != null ? String(property.bathrooms) : "",
      parkingSpots:
        property.parkingSpots != null ? String(property.parkingSpots) : "",
      status: property.status || "available",
      locationAddress: property.location?.address || "",
      locationCity: property.location?.city || "",
      locationState: property.location?.state || "",
      locationCountry: property.location?.country || "",
      locationZip: property.location?.zipCode || "",
      ownerName: property.owner?.name || "",
      ownerEmail: property.owner?.email || "",
      ownerPhone: property.owner?.phone || "",
    });
    setShowEditModal(true);
  };

  const resetCreateForm = () => {
    setCreateForm({
      title: "",
      description: "",
      shortDescription: "",
      type: "apartment",
      purpose: "sale",
      price: "",
      areaSize: "",
      areaUnit: "sqft",
      bedrooms: "",
      bathrooms: "",
      parkingSpots: "",
      status: "available",
      locationAddress: "",
      locationCity: "",
      locationState: "",
      locationCountry: "",
      locationZip: "",
      ownerName: "",
      ownerEmail: "",
      ownerPhone: "",
    });
    setCreateImages([]);
    setCreateError("");
  };

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setCreateForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setCreateError("");
    setCreateLoading(true);

    try {
      const payload = {
        title: createForm.title,
        description: createForm.description,
        shortDescription: createForm.shortDescription || undefined,
        type: createForm.type,
        purpose: createForm.purpose,
        price: Number(createForm.price),
        status: createForm.status,
        area: createForm.areaSize
          ? {
              size: Number(createForm.areaSize),
              unit: createForm.areaUnit,
            }
          : undefined,
        bedrooms: createForm.bedrooms
          ? Number(createForm.bedrooms)
          : undefined,
        bathrooms: createForm.bathrooms
          ? Number(createForm.bathrooms)
          : undefined,
        parkingSpots: createForm.parkingSpots
          ? Number(createForm.parkingSpots)
          : undefined,
        location: {
          address: createForm.locationAddress || undefined,
          city: createForm.locationCity || undefined,
          state: createForm.locationState || undefined,
          country: createForm.locationCountry || undefined,
          zipCode: createForm.locationZip || undefined,
        },
        owner: {
          name: createForm.ownerName || undefined,
          email: createForm.ownerEmail || undefined,
          phone: createForm.ownerPhone || undefined,
        },
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));
      createImages.slice(0, 6).forEach((file) => formData.append("images", file));

      const created = await PropertyService.createProperty(formData);
      setProperties((prev) => [created, ...prev]);
      setFilteredProperties((prev) => [created, ...prev]);
      setShowCreateModal(false);
      resetCreateForm();
    } catch (error) {
      setCreateError(
        error?.response?.data?.message ||
          "Failed to create property. Please try again."
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
        description: editForm.description,
        shortDescription: editForm.shortDescription || undefined,
        type: editForm.type,
        purpose: editForm.purpose,
        price: Number(editForm.price),
        status: editForm.status,
        area: editForm.areaSize
          ? {
              size: Number(editForm.areaSize),
              unit: editForm.areaUnit,
            }
          : undefined,
        bedrooms: editForm.bedrooms
          ? Number(editForm.bedrooms)
          : undefined,
        bathrooms: editForm.bathrooms
          ? Number(editForm.bathrooms)
          : undefined,
        parkingSpots: editForm.parkingSpots
          ? Number(editForm.parkingSpots)
          : undefined,
        location: {
          address: editForm.locationAddress || undefined,
          city: editForm.locationCity || undefined,
          state: editForm.locationState || undefined,
          country: editForm.locationCountry || undefined,
          zipCode: editForm.locationZip || undefined,
        },
        owner: {
          name: editForm.ownerName || undefined,
          email: editForm.ownerEmail || undefined,
          phone: editForm.ownerPhone || undefined,
        },
        keepImages: editKeepImages,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));
      editImages.slice(0, 6).forEach((file) => formData.append("images", file));

      const updated = await PropertyService.updateProperty(
        editForm.id,
        formData
      );

      setProperties((prev) =>
        prev.map((p) => (p._id === updated._id ? updated : p))
      );
      setFilteredProperties((prev) =>
        prev.map((p) => (p._id === updated._id ? updated : p))
      );
      setShowEditModal(false);
    } catch (error) {
      setEditError(
        error?.response?.data?.message ||
          "Failed to update property. Please try again."
      );
    } finally {
      setEditLoading(false);
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
    <main className="bg-white w-full overflow-x-hidden">
      <section className="py-10 px-6 md:px-12 lg:px-16 border-b border-gray-100">
        <span className="text-xs uppercase tracking-[0.35em] text-red-600 font-semibold">
          Properties
        </span>
        <h1 className="text-3xl md:text-5xl font-light text-gray-900 mt-4 leading-tight">
          Manage Properties
        </h1>
        <p className="mt-4 text-gray-600">
          View, create, and manage all property listings.
        </p>
        <div className="mt-6">
          <Button onClick={() => setShowCreateModal(true)} className="rounded-none uppercase tracking-widest text-xs">
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Property
          </Button>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 px-6 md:px-12 lg:px-16">
      <FadeIn>
        <div className="bg-white border border-gray-200 p-5 flex flex-col md:flex-row gap-4 items-center justify-between">
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
      </section>

      {/* Properties Table */}
      <section className="pb-20 px-6 md:px-12 lg:px-16">
      <FadeIn delay={0.1}>
        <div className="bg-white border border-gray-200 overflow-x-auto">
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
                    key={property._id}
                    className="border-b last:border-none hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {property.title}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {property.type}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {property.location?.city ||
                        property.location?.address ||
                        "-"}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {property.price != null
                        ? `INR ${property.price.toLocaleString()}`
                        : "-"}
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
                            : property.status === "under_construction"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {property.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {property.owner?.name || "-"}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openDetailsModal(property)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openEditModal(property)}
                      >
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
                            updateStatus(property, "under_construction")
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
      </section>

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
              <strong>Location:</strong>{" "}
              {selectedProperty.location?.city ||
                selectedProperty.location?.address ||
                "-"}
            </p>
            <p>
              <strong>Price:</strong>{" "}
              {selectedProperty.price != null
                ? `INR ${selectedProperty.price.toLocaleString()}`
                : "-"}
            </p>
            <p>
              <strong>Status:</strong> {selectedProperty.status}
            </p>
            <p>
              <strong>Owner:</strong> {selectedProperty.owner?.name || "-"}
            </p>
            <p>
              <strong>Area:</strong>{" "}
              {selectedProperty.area?.size
                ? `${selectedProperty.area.size} ${
                    selectedProperty.area.unit || "sqft"
                  }`
                : "-"}
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

      {/* Create Property Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          resetCreateForm();
        }}
        title="Add Property"
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
              name="type"
              value={createForm.type}
              onChange={handleCreateChange}
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="villa">Villa</option>
              <option value="commercial">Commercial</option>
              <option value="land">Land</option>
              <option value="office">Office</option>
            </select>
            <select
              name="purpose"
              value={createForm.purpose}
              onChange={handleCreateChange}
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="sale">Sale</option>
              <option value="rent">Rent</option>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              name="areaSize"
              type="number"
              min="0"
              value={createForm.areaSize}
              onChange={handleCreateChange}
              placeholder="Area size"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <select
              name="areaUnit"
              value={createForm.areaUnit}
              onChange={handleCreateChange}
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="sqft">sqft</option>
              <option value="sqm">sqm</option>
            </select>
            <input
              name="bedrooms"
              type="number"
              min="0"
              value={createForm.bedrooms}
              onChange={handleCreateChange}
              placeholder="Bedrooms"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <input
              name="bathrooms"
              type="number"
              min="0"
              value={createForm.bathrooms}
              onChange={handleCreateChange}
              placeholder="Bathrooms"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <input
              name="parkingSpots"
              type="number"
              min="0"
              value={createForm.parkingSpots}
              onChange={handleCreateChange}
              placeholder="Parking spots"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <select
              name="status"
              value={createForm.status}
              onChange={handleCreateChange}
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="available">Available</option>
              <option value="sold">Sold</option>
              <option value="rented">Rented</option>
              <option value="under_construction">Under Construction</option>
              <option value="off_market">Off Market</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="locationAddress"
              value={createForm.locationAddress}
              onChange={handleCreateChange}
              placeholder="Address"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <input
              name="locationCity"
              value={createForm.locationCity}
              onChange={handleCreateChange}
              placeholder="City"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <input
              name="locationState"
              value={createForm.locationState}
              onChange={handleCreateChange}
              placeholder="State"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <input
              name="locationCountry"
              value={createForm.locationCountry}
              onChange={handleCreateChange}
              placeholder="Country"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <input
              name="locationZip"
              value={createForm.locationZip}
              onChange={handleCreateChange}
              placeholder="Zip code"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              name="ownerName"
              value={createForm.ownerName}
              onChange={handleCreateChange}
              placeholder="Owner name"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <input
              name="ownerEmail"
              type="email"
              value={createForm.ownerEmail}
              onChange={handleCreateChange}
              placeholder="Owner email"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <input
              name="ownerPhone"
              value={createForm.ownerPhone}
              onChange={handleCreateChange}
              placeholder="Owner phone"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Property Images (max 6)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) =>
                setCreateImages(Array.from(e.target.files || []).slice(0, 6))
              }
              className="w-full mt-2"
            />
            {createImages.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-3">
                {createImages.map((file, idx) => (
                  <div key={`${file.name}-${idx}`} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setCreateImages((prev) =>
                          prev.filter((_, i) => i !== idx)
                        )
                      }
                      className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
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
              Create Property
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Property Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Property"
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
              name="type"
              value={editForm.type}
              onChange={handleEditChange}
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="villa">Villa</option>
              <option value="commercial">Commercial</option>
              <option value="land">Land</option>
              <option value="office">Office</option>
            </select>
            <select
              name="purpose"
              value={editForm.purpose}
              onChange={handleEditChange}
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="sale">Sale</option>
              <option value="rent">Rent</option>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              name="areaSize"
              type="number"
              min="0"
              value={editForm.areaSize}
              onChange={handleEditChange}
              placeholder="Area size"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <select
              name="areaUnit"
              value={editForm.areaUnit}
              onChange={handleEditChange}
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="sqft">sqft</option>
              <option value="sqm">sqm</option>
            </select>
            <input
              name="bedrooms"
              type="number"
              min="0"
              value={editForm.bedrooms}
              onChange={handleEditChange}
              placeholder="Bedrooms"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <input
              name="bathrooms"
              type="number"
              min="0"
              value={editForm.bathrooms}
              onChange={handleEditChange}
              placeholder="Bathrooms"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <input
              name="parkingSpots"
              type="number"
              min="0"
              value={editForm.parkingSpots}
              onChange={handleEditChange}
              placeholder="Parking spots"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <select
              name="status"
              value={editForm.status}
              onChange={handleEditChange}
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="available">Available</option>
              <option value="sold">Sold</option>
              <option value="rented">Rented</option>
              <option value="under_construction">Under Construction</option>
              <option value="off_market">Off Market</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="locationAddress"
              value={editForm.locationAddress}
              onChange={handleEditChange}
              placeholder="Address"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <input
              name="locationCity"
              value={editForm.locationCity}
              onChange={handleEditChange}
              placeholder="City"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <input
              name="locationState"
              value={editForm.locationState}
              onChange={handleEditChange}
              placeholder="State"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <input
              name="locationCountry"
              value={editForm.locationCountry}
              onChange={handleEditChange}
              placeholder="Country"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <input
              name="locationZip"
              value={editForm.locationZip}
              onChange={handleEditChange}
              placeholder="Zip code"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              name="ownerName"
              value={editForm.ownerName}
              onChange={handleEditChange}
              placeholder="Owner name"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <input
              name="ownerEmail"
              type="email"
              value={editForm.ownerEmail}
              onChange={handleEditChange}
              placeholder="Owner email"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <input
              name="ownerPhone"
              value={editForm.ownerPhone}
              onChange={handleEditChange}
              placeholder="Owner phone"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Existing Images
            </label>
            {editKeepImages.length === 0 ? (
              <p className="text-sm text-gray-500">No existing images.</p>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {editKeepImages.map((img) => (
                  <div key={img.public_id} className="relative">
                    <img
                      src={img.url}
                      alt="Property"
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setEditKeepImages((prev) =>
                          prev.filter((i) => i.public_id !== img.public_id)
                        )
                      }
                      className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Add/Replace Images (max 6 total)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) =>
                setEditImages(
                  Array.from(e.target.files || []).slice(
                    0,
                    Math.max(6 - editKeepImages.length, 0)
                  )
                )
              }
              className="w-full mt-2"
            />
            {editImages.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-3">
                {editImages.map((file, idx) => (
                  <div key={`${file.name}-${idx}`} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setEditImages((prev) =>
                          prev.filter((_, i) => i !== idx)
                        )
                      }
                      className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
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
              Update Property
            </Button>
          </div>
        </form>
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
    </main>
  );
};

export default ManageProperties;


