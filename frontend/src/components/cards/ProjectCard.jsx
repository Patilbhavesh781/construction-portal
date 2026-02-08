import React from "react";
import { motion } from "framer-motion";
import { MapPin, CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import FadeIn from "../animations/FadeIn";
import Button from "../common/Button";

const ProjectCard = ({ project, className = "" }) => {
  const navigate = useNavigate();

  if (!project) return null;

  const {
    _id,
    title,
    category,
    location,
    description,
    images = [],
    status = "completed",
    endDate,
  } = project;

  const imageUrl =
    images?.[0]?.url ||
    images?.[0] ||
    "https://via.placeholder.com/400x250?text=Project+Image";

  const isCompleted = status === "completed";

  return (
    <FadeIn direction="up" className={clsx("h-full", className)}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="group h-full bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden border border-gray-100"
      >
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {category && (
            <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
              {category}
            </span>
          )}
          <span
            className={clsx(
              "absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full shadow",
              isCompleted
                ? "bg-green-600 text-white"
                : "bg-yellow-500 text-white"
            )}
          >
            {isCompleted ? "Completed" : "Ongoing"}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col h-full">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
            {title}
          </h3>

          {(location?.city || location?.address) && (
            <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>{location?.city || location?.address}</span>
            </div>
          )}

          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {description}
          </p>

          {/* Meta Info */}
          <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
            {isCompleted ? (
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Completed</span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-yellow-500" />
                <span>In Progress</span>
              </div>
            )}
            {endDate && isCompleted && (
              <span className="text-xs text-gray-500">
                {new Date(endDate).toLocaleDateString()}
              </span>
            )}
          </div>

          {/* Action */}
          <div className="mt-auto">
            <Button
              fullWidth
              onClick={() => navigate(`/projects/${_id}`)}
              variant="secondary"
            >
              View Project
            </Button>
          </div>
        </div>
      </motion.div>
    </FadeIn>
  );
};

export default ProjectCard;
