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
import SlideIn from "../../components/animations/SlideIn";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import Modal from "../../components/common/Modal";
import ProjectService from "../../services/project.service";

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const statuses = ["All", "Planning", "Ongoing", "Completed", "On Hold", "Cancelled"];

  useEffect(() => {
    // TODO: Replace with real API call
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
      const normalizedStatus =
        statusFilter === "on hold" ? "on_hold" : statusFilter;
      filtered = filtered.filter(
        (project) =>
          project.status.toLowerCase() === normalizedStatus.toLowerCase()
      );
    }

    if (search) {
      const lower = search.toLowerCase();
        filtered = filtered.filter(
          (project) =>
            project.title.toLowerCase().includes(lower) ||
            project.client?.name?.toLowerCase().includes(lower) ||
            project.location?.city?.toLowerCase().includes(lower) ||
            project.location?.address?.toLowerCase().includes(lower)
        );
      }

    setFilteredProjects(filtered);
  }, [search, statusFilter, projects]);

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
      const updatedProject = await ProjectService.updateProject(
        project._id,
        { status: newStatus }
      );
      setProjects((prev) =>
        prev.map((p) =>
          p._id === project._id ? updatedProject : p
        )
      );
      setFilteredProjects((prev) =>
        prev.map((p) =>
          p._id === project._id ? updatedProject : p
        )
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
    <div className="space-y-8">
      {/* Header */}
      <SlideIn direction="down">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Manage Projects
            </h1>
            <p className="text-gray-600">
              View, create, and manage all construction projects.
            </p>
          </div>
          <Button to="/admin/manage-projects/create">
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Project
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

      {/* Projects Table */}
      <FadeIn delay={0.1}>
        <div className="bg-white rounded-2xl shadow-md border overflow-x-auto">
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
                  <td
                    colSpan="8"
                    className="py-6 text-center text-gray-600"
                  >
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
                      {project.location?.city ||
                        project.location?.address ||
                        "-"}
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
                        ? `â‚¹${project.budget.toLocaleString()}`
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
                      <Button size="sm" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>

                      {project.status === "ongoing" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            updateStatus(project, "on_hold")
                          }
                        >
                          <PauseCircle className="w-4 h-4 text-yellow-600" />
                        </Button>
                      )}

                      {project.status === "on_hold" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            updateStatus(project, "ongoing")
                          }
                        >
                          <Clock className="w-4 h-4 text-blue-600" />
                        </Button>
                      )}

                      {project.status !== "completed" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            updateStatus(project, "completed")
                          }
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

      {/* Project Details Modal */}
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
              <strong>Client:</strong>{" "}
              {selectedProject.client?.name || "-"}
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
                ? `â‚¹${selectedProject.budget.toLocaleString()}`
                : "-"}
            </p>
            <p>
              <strong>Start Date:</strong>{" "}
              {new Date(
                selectedProject.startDate
              ).toLocaleDateString()}
            </p>
            {selectedProject.endDate && (
              <p>
                <strong>End Date:</strong>{" "}
                {new Date(
                  selectedProject.endDate
                ).toLocaleDateString()}
              </p>
            )}
            <p>
              <strong>Description:</strong>{" "}
              {selectedProject.description}
            </p>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Project"
      >
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">
            {selectedProject?.title}
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

export default ManageProjects;

