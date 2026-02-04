import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import clsx from "clsx";
import FadeIn from "../animations/FadeIn";

const TestimonialCard = ({ testimonial, className = "" }) => {
  if (!testimonial) return null;

  const {
    name,
    role,
    location,
    rating = 5,
    message,
    avatar,
  } = testimonial;

  const avatarUrl =
    avatar || "https://via.placeholder.com/80?text=User";

  return (
    <FadeIn direction="up" className={clsx("h-full", className)}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="group h-full bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 p-6 flex flex-col"
      >
        {/* Quote Icon */}
        <div className="mb-4">
          <Quote className="w-8 h-8 text-orange-600 opacity-80" />
        </div>

        {/* Message */}
        <p className="text-sm text-gray-700 leading-relaxed mb-6 line-clamp-4">
          “{message}”
        </p>

        {/* User Info */}
        <div className="mt-auto flex items-center gap-4">
          <img
            src={avatarUrl}
            alt={name}
            className="w-12 h-12 rounded-full object-cover border"
          />
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-gray-800">{name}</h4>
            <p className="text-xs text-gray-500">
              {role}
              {location ? `, ${location}` : ""}
            </p>
            <div className="flex items-center gap-1 mt-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={clsx(
                    "w-4 h-4",
                    index < rating
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </FadeIn>
  );
};

export default TestimonialCard;
