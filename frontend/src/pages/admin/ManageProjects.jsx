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

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const statuses = ["All", "Ongoing", "Completed", "Paused", "Planned"];

  useEffect(() => {
    // TODO: Replace with real API call
    const fetchProjects = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1200));
        const mockProjects = [
          {
            id: 1,
            title: "Luxury Villa Construction",
            client: "Rahul Sharma",
            location: "Mumbai, Maharashtra",
            status: "ongoing",
            budget: "₹1.2 Cr",
            startDate: "2025-10-01",
            endDate: null,
            createdAt: "2025-09-20",
            description:
              "Construction of a 5-bedroom luxury villa with modern amenities.",
            images: [],
          },
          {
            id: 2,
            title: "Office Renovation",
            client: "Amit Verma",
            location: "Delhi, India",
            status: "completed",
            budget: "₹45 Lakh",
            startDate: "2025-06-15",
            endDate: "2025-09-30",
            createdAt: "2025-06-01",
            description:
              "Complete renovation of a corporate office space.",
            images: [],
          },
          {
            id: 3,
            title: "Residential Apartment Project",
            client: "Neha Singh",
            location: "Pune, Maharashtra",
            status: "planned",
            budget: "₹80 Lakh",
            startDate: "2026-03-01",
            endDate: null,
            createdAt: "2026-01-10",
            description:
              "Upcoming apartment construction project with 20 units.",
            images: [],
          },
        ];

        setProjects(mockProjects);
        setFilteredProjects(mockProjects);
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
      filtered = filtered.filter(
        (project) =>
          project.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (search) {
      const lower = search.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(lower) ||
          project.client.toLowerCase().includes(lower) ||
          project.location.toLowerCase().includes(lower)
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
      // TODO: Replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      setProjects((prev) =>
        prev.filter((project) => project.id !== selectedProject.id)
      );
      setFilteredProjects((prev) =>
        prev.filter((project) => project.id !== selectedProject.id)
      );
      setShowDeleteModal(false);
      setSelectedProject(null);
    } catch (error) {
      console.error("Failed to delete project", error);
    }
  };

  const updateStatus = async (project, newStatus) => {
    try {
      // TODO: Replace with real API call
      const updatedProject = { ...project, status: newStatus };
      setProjects((prev) =>
        prev.map((p) =>
          p.id === project.id ? updatedProject : p
        )
      );
      setFilteredProjects((prev) =>
        prev.map((p) =>
          p.id === project.id ? updatedProject : p
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
                    key={project.id}
                    className="border-b last:border-none hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {project.title}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {project.client}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {project.location}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          project.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : project.status === "ongoing"
                            ? "bg-blue-100 text-blue-700"
                            : project.status === "paused"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {project.budget}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(project.startDate).toLocaleDateString()}
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
                            updateStatus(project, "paused")
                          }
                        >
                          <PauseCircle className="w-4 h-4 text-yellow-600" />
                        </Button>
                      )}

                      {project.status === "paused" && (
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
              <strong>Client:</strong> {selectedProject.client}
            </p>
            <p>
              <strong>Location:</strong> {selectedProject.location}
            </p>
            <p>
              <strong>Status:</strong> {selectedProject.status}
            </p>
            <p>
              <strong>Budget:</strong> {selectedProject.budget}
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
