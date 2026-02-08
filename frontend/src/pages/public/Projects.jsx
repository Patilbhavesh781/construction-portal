import React, { useEffect, useMemo, useState } from "react";
import { Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

import FadeIn from "../../components/animations/FadeIn";
import ScrollReveal from "../../components/animations/ScrollReveal";

import ProjectCard from "../../components/cards/ProjectCard";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

import ProjectService from "../../services/project.service";

const Projects = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await ProjectService.getAllProjects();
        setProjects(res || []);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title?.toLowerCase().includes(search.toLowerCase()) ||
        project.location?.city
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        project.location?.address
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesType =
        type === "all" || project.category === type;

      const matchesStatus =
        status === "all" || project.status === status;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [projects, search, type, status]);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Projects
            </h1>
            <p className="text-lg text-orange-100 max-w-2xl mx-auto">
              Explore our completed and ongoing construction, renovation,
              and interior projects.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filters */}
      <section className="py-10 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by project name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          {/* Type Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setType("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                type === "all"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setType("construction")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                type === "construction"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Construction
            </button>
            <button
              onClick={() => setType("renovation")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                type === "renovation"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Renovation
            </button>
            <button
              onClick={() => setType("interior")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                type === "interior"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Interior
            </button>
            <button
              onClick={() => setType("architecture")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                type === "architecture"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Architecture
            </button>
          </div>

          {/* Status Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setStatus("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                status === "all"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Status
            </button>
            <button
              onClick={() => setStatus("completed")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                status === "completed"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setStatus("ongoing")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                status === "ongoing"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Ongoing
            </button>
            <button
              onClick={() => setStatus("planning")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                status === "planning"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Planning
            </button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader size="lg" />
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 mb-4">
                No projects found matching your criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearch("");
                  setType("all");
                  setStatus("all");
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ScrollReveal key={project._id}>
                  <ProjectCard project={project} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Have a Project in Mind?
            </h2>
            <p className="text-lg text-orange-100 mb-8 max-w-2xl mx-auto">
              Let us bring your vision to life with our expert construction
              and design services.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button
                size="lg"
                onClick={() => navigate("/contact")}
              >
                Start Your Project
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate("/services")}
              >
                Explore Services
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default Projects;
