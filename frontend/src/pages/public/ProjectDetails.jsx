import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import FadeIn from "../../components/animations/FadeIn";
import Loader from "../../components/common/Loader";

import ProjectService from "../../services/project.service";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await ProjectService.getProjectById(id);
        setProject(data);
        setActiveIndex(0);
      } catch (err) {
        console.error("Failed to fetch project:", err);
        setError("Unable to load project details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id]);

  const images = useMemo(() => {
    if (Array.isArray(project?.images) && project.images.length > 0) {
      return project.images.map((img) => img.url || img);
    }
    return [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=100",
    ];
  }, [project?.images]);

  const heroImage = images[activeIndex] || images[0];
  const projectLocation =
    [
      project?.location?.city,
      project?.location?.state,
      project?.location?.country,
      !project?.location?.city &&
      !project?.location?.state &&
      !project?.location?.country
        ? project?.location?.address
        : null,
    ]
      .filter(Boolean)
      .join(", ") || "";

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => navigate("/projects")}
          className="text-sm uppercase tracking-widest font-semibold text-red-600 hover:underline"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  if (!project) return null;

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <main className="bg-white w-full overflow-x-hidden">
      <section className="py-12 px-8 md:px-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm uppercase tracking-widest font-semibold text-red-600 hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
            {project.category || "Construction Project"}
          </p>
          <h1 className="text-4xl md:text-6xl font-light text-gray-900 leading-tight">
            {project.title}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl">
            {project.shortDescription || project.description}
          </p>
        </div>
      </section>

      <section className="py-24 px-8 md:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <FadeIn>
              <div className="relative overflow-hidden">
                <img
                  src={heroImage}
                  alt={project.title}
                  className="w-full h-[420px] object-cover"
                />
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white text-gray-700 p-2 rounded-full"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white text-gray-700 p-2 rounded-full"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </FadeIn>

            {images.length > 1 && (
              <FadeIn>
                <div className="grid grid-cols-5 gap-3">
                  {images.slice(0, 5).map((img, idx) => (
                    <button
                      key={`${img}-${idx}`}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={`overflow-hidden border-2 transition ${
                        activeIndex === idx ? "border-red-600" : "border-transparent"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${project.title} ${idx + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </FadeIn>
            )}

            <FadeIn>
              <div>
                <h2 className="text-3xl font-light text-gray-900 mb-4">Project Overview</h2>
                <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <FadeIn>
                <div className="bg-gray-50 border border-gray-200 p-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Project Info</h3>

                  {projectLocation && (
                    <div className="flex items-center gap-2 text-gray-700 mb-3">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{projectLocation}</span>
                    </div>
                  )}

                  {project.startDate && (
                    <div className="flex items-center gap-2 text-gray-700 mb-3">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>Start: {new Date(project.startDate).toLocaleDateString()}</span>
                    </div>
                  )}

                  {project.endDate && (
                    <div className="flex items-center gap-2 text-gray-700 mb-3">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>End: {new Date(project.endDate).toLocaleDateString()}</span>
                    </div>
                  )}

                  {project.status && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="capitalize">{project.status.replace("_", " ")}</span>
                    </div>
                  )}
                </div>
              </FadeIn>

              <button
                className="w-full px-6 py-3 text-xs uppercase tracking-widest font-semibold border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition"
                onClick={() => navigate("/contact")}
              >
                Start a Similar Project
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProjectDetails;
