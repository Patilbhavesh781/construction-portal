import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, CheckCircle } from "lucide-react";

import FadeIn from "../../components/animations/FadeIn";
import SlideIn from "../../components/animations/SlideIn";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

import ProjectService from "../../services/project.service";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await ProjectService.getProjectById(id);
        setProject(data);
      } catch (err) {
        console.error("Failed to fetch project:", err);
        setError("Unable to load project details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id]);

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
        <Button onClick={() => navigate("/projects")}>
          Back to Projects
        </Button>
      </div>
    );
  }

  if (!project) return null;

  const coverImage =
    project.images?.[0]?.url ||
    "https://via.placeholder.com/1200x600?text=Project+Image";

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-orange-100 hover:text-white mb-6 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {project.title}
            </h1>
            <p className="text-orange-100 max-w-3xl">
              {project.shortDescription || project.description}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left */}
          <div className="lg:col-span-2 space-y-8">
            <FadeIn direction="left">
              <img
                src={coverImage}
                alt={project.title}
                className="w-full h-[350px] object-cover rounded-3xl shadow-lg"
              />
            </FadeIn>

            <FadeIn direction="left">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Project Overview
                </h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Right */}
          <div className="lg:col-span-1">
            <SlideIn direction="right">
              <div className="sticky top-28 space-y-6">
                <div className="bg-gray-50 rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Project Info
                  </h3>

                  {(project.location?.city || project.location?.address) && (
                    <div className="flex items-center gap-2 text-gray-700 mb-3">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>
                        {project.location?.city ||
                          project.location?.address}
                      </span>
                    </div>
                  )}

                  {project.startDate && (
                    <div className="flex items-center gap-2 text-gray-700 mb-3">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>
                        Start:{" "}
                        {new Date(project.startDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  {project.endDate && (
                    <div className="flex items-center gap-2 text-gray-700 mb-3">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>
                        End:{" "}
                        {new Date(project.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  {project.status && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="capitalize">{project.status}</span>
                    </div>
                  )}
                </div>

                <Button
                  className="w-full"
                  onClick={() => navigate("/contact")}
                >
                  Start a Similar Project
                </Button>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetails;
