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
} from "lucide-react";

import FadeIn from "../../components/animations/FadeIn";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import Modal from "../../components/common/Modal";
import ProjectService from "../../services/project.service";

const emptyForm = {
  id: "",
  title: "",
  description: "",
  shortDescription: "",
  category: "",
  status: "planning",
  budget: "",
  completionPercentage: "0",
  startDate: "",
  endDate: "",
  locationAddress: "",
  locationCity: "",
  locationState: "",
  locationCountry: "",
  clientName: "",
  clientCompany: "",
  clientEmail: "",
  clientPhone: "",
  isActive: true,
};

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const [selectedProject, setSelectedProject] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [createError, setCreateError] = useState("");
  const [editError, setEditError] = useState("");

  const [createForm, setCreateForm] = useState({ ...emptyForm });
  const [editForm, setEditForm] = useState({ ...emptyForm });

  const [createImages, setCreateImages] = useState([]);
  const [editImages, setEditImages] = useState([]);
  const [editKeepImages, setEditKeepImages] = useState([]);

  const statuses = [
    "All",
    "Planning",
    "Ongoing",
    "Completed",
    "On Hold",
    "Cancelled",
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const data = await ProjectService.getAllProjects();
        setProjects(data || []);
        setFilteredProjects(data || []);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    let filtered = projects;

    if (statusFilter !== "all") {
      const normalizedStatus = statusFilter === "on hold" ? "on_hold" : statusFilter;
      filtered = filtered.filter(
        (project) =>
          (project.status || "").toLowerCase() === normalizedStatus.toLowerCase()
      );
    }

    if (search) {
      const lower = search.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title?.toLowerCase().includes(lower) ||
          project.client?.name?.toLowerCase().includes(lower) ||
          project.location?.city?.toLowerCase().includes(lower) ||
          project.location?.address?.toLowerCase().includes(lower)
      );
    }

    setFilteredProjects(filtered);
  }, [search, statusFilter, projects]);

  const formatDateInput = (value) => {
    if (!value) return "";
    return new Date(value).toISOString().slice(0, 10);
  };

  const buildPayload = (form, extra = {}) => ({
    title: form.title,
    description: form.description,
    shortDescription: form.shortDescription || undefined,
    category: form.category || undefined,
    status: form.status,
    budget: form.budget ? Number(form.budget) : undefined,
    completionPercentage: form.completionPercentage
      ? Number(form.completionPercentage)
      : 0,
    startDate: form.startDate || undefined,
    endDate: form.endDate || undefined,
    location: {
      address: form.locationAddress || undefined,
      city: form.locationCity || undefined,
      state: form.locationState || undefined,
      country: form.locationCountry || undefined,
    },
    client: {
      name: form.clientName || undefined,
      company: form.clientCompany || undefined,
      email: form.clientEmail || undefined,
      phone: form.clientPhone || undefined,
    },
    isActive: form.isActive,
    ...extra,
  });

  const openEditModal = (project) => {
    setEditError("");
    setEditImages([]);
    setEditKeepImages(project.images || []);
    setEditForm({
      id: project._id,
      title: project.title || "",
      description: project.description || "",
      shortDescription: project.shortDescription || "",
      category: project.category || "",
      status: project.status || "planning",
      budget: project.budget != null ? String(project.budget) : "",
      completionPercentage:
        project.completionPercentage != null
          ? String(project.completionPercentage)
          : "0",
      startDate: formatDateInput(project.startDate),
      endDate: formatDateInput(project.endDate),
      locationAddress: project.location?.address || "",
      locationCity: project.location?.city || "",
      locationState: project.location?.state || "",
      locationCountry: project.location?.country || "",
      clientName: project.client?.name || "",
      clientCompany: project.client?.company || "",
      clientEmail: project.client?.email || "",
      clientPhone: project.client?.phone || "",
      isActive: project.isActive ?? true,
    });
    setShowEditModal(true);
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

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setCreateError("");
    setCreateLoading(true);
    try {
      const payload = buildPayload(createForm);
      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));
      createImages.slice(0, 10).forEach((file) => formData.append("images", file));

      const created = await ProjectService.createProject(formData);
      setProjects((prev) => [created, ...prev]);
      setFilteredProjects((prev) => [created, ...prev]);
      setShowCreateModal(false);
      setCreateForm({ ...emptyForm });
      setCreateImages([]);
    } catch (error) {
      setCreateError(
        error?.response?.data?.message ||
          "Failed to create project. Please try again."
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
      const payload = buildPayload(editForm, { keepImages: editKeepImages });
      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));
      editImages
        .slice(0, Math.max(10 - editKeepImages.length, 0))
        .forEach((file) => formData.append("images", file));

      const updated = await ProjectService.updateProject(editForm.id, formData);
      setProjects((prev) =>
        prev.map((p) => (p._id === updated._id ? updated : p))
      );
      setFilteredProjects((prev) =>
        prev.map((p) => (p._id === updated._id ? updated : p))
      );
      setShowEditModal(false);
    } catch (error) {
      setEditError(
        error?.response?.data?.message ||
          "Failed to update project. Please try again."
      );
    } finally {
      setEditLoading(false);
    }
  };

  const handleDeleteClick = (project) => {
    setSelectedProject(project);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await ProjectService.deleteProject(selectedProject._id);
      setProjects((prev) =>
        prev.filter((project) => project._id !== selectedProject._id)
      );
      setFilteredProjects((prev) =>
        prev.filter((project) => project._id !== selectedProject._id)
      );
      setShowDeleteModal(false);
      setSelectedProject(null);
    } catch (error) {
      console.error("Failed to delete project", error);
    }
  };

  const updateStatus = async (project, newStatus) => {
    try {
      const updatedProject = await ProjectService.updateProject(project._id, {
        status: newStatus,
      });
      setProjects((prev) =>
        prev.map((p) => (p._id === project._id ? updatedProject : p))
      );
      setFilteredProjects((prev) =>
        prev.map((p) => (p._id === project._id ? updatedProject : p))
      );
    } catch (error) {
      console.error("Failed to update project status", error);
    }
  };

  const openDetailsModal = (project) => {
    setSelectedProject(project);
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
    <main className="bg-white w-full overflow-x-hidden">
      <section className="py-10 px-6 md:px-12 lg:px-16 border-b border-gray-100">
        <span className="text-xs uppercase tracking-[0.35em] text-red-600 font-semibold">
          Projects
        </span>
        <h1 className="text-3xl md:text-5xl font-light text-gray-900 mt-4 leading-tight">
          Manage Projects
        </h1>
        <p className="mt-4 text-gray-600">
          View, create, and manage all construction projects.
        </p>
        <div className="mt-6">
          <Button
            onClick={() => {
              setCreateError("");
              setCreateForm({ ...emptyForm });
              setCreateImages([]);
              setShowCreateModal(true);
            }}
            className="rounded-none uppercase tracking-widest text-xs"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Project
          </Button>
        </div>
      </section>

      <section className="py-12 px-6 md:px-12 lg:px-16">
        <FadeIn>
          <div className="bg-white border border-gray-200 p-5 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
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

      <section className="pb-20 px-6 md:px-12 lg:px-16">
        <FadeIn delay={0.1}>
          <div className="bg-white border border-gray-200 overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr className="border-b bg-gray-50 text-gray-600">
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Budget</th>
                  <th className="py-3 px-4">Start</th>
                  <th className="py-3 px-4">End</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-6 text-center text-gray-600">
                      No projects found.
                    </td>
                  </tr>
                ) : (
                  filteredProjects.map((project) => (
                    <tr
                      key={project._id}
                      className="border-b last:border-none hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-4 font-medium text-gray-800">
                        {project.title}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {project.client?.name || "-"}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {project.location?.city || project.location?.address || "-"}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            project.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : project.status === "ongoing"
                              ? "bg-blue-100 text-blue-700"
                              : project.status === "on_hold"
                              ? "bg-yellow-100 text-yellow-700"
                              : project.status === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {project.budget != null
                          ? `INR ${project.budget.toLocaleString()}`
                          : "-"}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {project.startDate
                          ? new Date(project.startDate).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {project.endDate
                          ? new Date(project.endDate).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openDetailsModal(project)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openEditModal(project)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>

                        {project.status === "ongoing" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => updateStatus(project, "on_hold")}
                          >
                            <PauseCircle className="w-4 h-4 text-yellow-600" />
                          </Button>
                        )}

                        {project.status === "on_hold" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => updateStatus(project, "ongoing")}
                          >
                            <Clock className="w-4 h-4 text-blue-600" />
                          </Button>
                        )}

                        {project.status !== "completed" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => updateStatus(project, "completed")}
                          >
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </Button>
                        )}

                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDeleteClick(project)}
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

      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Project Details"
      >
        {selectedProject && (
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <strong>Title:</strong> {selectedProject.title}
            </p>
            <p>
              <strong>Client:</strong> {selectedProject.client?.name || "-"}
            </p>
            <p>
              <strong>Location:</strong>{" "}
              {selectedProject.location?.city ||
                selectedProject.location?.address ||
                "-"}
            </p>
            <p>
              <strong>Status:</strong> {selectedProject.status}
            </p>
            <p>
              <strong>Budget:</strong>{" "}
              {selectedProject.budget != null
                ? `INR ${selectedProject.budget.toLocaleString()}`
                : "-"}
            </p>
            <p>
              <strong>Images:</strong> {selectedProject.images?.length || 0}
            </p>
            <p>
              <strong>Description:</strong> {selectedProject.description}
            </p>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Add Project"
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
            <input
              name="category"
              value={createForm.category}
              onChange={handleCreateChange}
              placeholder="Category (optional)"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <input
              name="budget"
              type="number"
              min="0"
              value={createForm.budget}
              onChange={handleCreateChange}
              placeholder="Budget (optional)"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <select
              name="status"
              value={createForm.status}
              onChange={handleCreateChange}
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="planning">Planning</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="on_hold">On Hold</option>
              <option value="cancelled">Cancelled</option>
            </select>
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
              name="locationAddress"
              value={createForm.locationAddress}
              onChange={handleCreateChange}
              placeholder="Address (optional)"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <input
              name="locationCity"
              value={createForm.locationCity}
              onChange={handleCreateChange}
              placeholder="City (optional)"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <input
              name="locationState"
              value={createForm.locationState}
              onChange={handleCreateChange}
              placeholder="State (optional)"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <input
              name="locationCountry"
              value={createForm.locationCountry}
              onChange={handleCreateChange}
              placeholder="Country (optional)"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Project Images (max 10)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) =>
                setCreateImages(Array.from(e.target.files || []).slice(0, 10))
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
                        setCreateImages((prev) => prev.filter((_, i) => i !== idx))
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
              onClick={() => setShowCreateModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit" loading={createLoading} disabled={createLoading}>
              Create Project
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Project"
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
            <input
              name="category"
              value={editForm.category}
              onChange={handleEditChange}
              placeholder="Category (optional)"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <input
              name="budget"
              type="number"
              min="0"
              value={editForm.budget}
              onChange={handleEditChange}
              placeholder="Budget (optional)"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <select
              name="status"
              value={editForm.status}
              onChange={handleEditChange}
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="planning">Planning</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="on_hold">On Hold</option>
              <option value="cancelled">Cancelled</option>
            </select>
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
              name="locationAddress"
              value={editForm.locationAddress}
              onChange={handleEditChange}
              placeholder="Address (optional)"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <input
              name="locationCity"
              value={editForm.locationCity}
              onChange={handleEditChange}
              placeholder="City (optional)"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <input
              name="locationState"
              value={editForm.locationState}
              onChange={handleEditChange}
              placeholder="State (optional)"
              className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <input
              name="locationCountry"
              value={editForm.locationCountry}
              onChange={handleEditChange}
              placeholder="Country (optional)"
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
                  <div key={img.public_id || img.url} className="relative">
                    <img
                      src={img.url || img}
                      alt="Project"
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setEditKeepImages((prev) =>
                          prev.filter(
                            (i) => (i.public_id || i.url) !== (img.public_id || img.url)
                          )
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
              Add/Replace Images (max 10 total)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                const limit = Math.max(10 - editKeepImages.length, 0);
                setEditImages(Array.from(e.target.files || []).slice(0, limit));
              }}
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
                        setEditImages((prev) => prev.filter((_, i) => i !== idx))
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
              Update Project
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Project"
      >
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete <span className="font-semibold">{selectedProject?.title}</span>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
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

export default ManageProjects;
