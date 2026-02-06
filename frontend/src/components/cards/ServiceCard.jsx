import React from "react";
import { motion } from "framer-motion";
import { Star, Clock, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import FadeIn from "../animations/FadeIn";
import Button from "../common/Button";

const ServiceCard = ({
  service,
  className = "",
  detailsPathBase = "/services",
}) => {
  const navigate = useNavigate();

  if (!service) return null;

  const {
    _id,
    title,
    category,
    description,
    images = [],
    price,
    priceMin,
    priceMax,
    priceType,
    duration,
    rating = 0,
  } = service;

  const imageUrl =
    images?.[0]?.url ||
    images?.[0] ||
    "https://via.placeholder.com/400x250?text=Service+Image";

  const displayMin = priceMin ?? price;
  const displayMax = priceMax ?? price;

  return (
    <FadeIn direction="up" className={clsx(className)}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="group bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden border border-gray-100"
      >
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {category && (
            <span className="absolute top-3 left-3 bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
              {category}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
            {title}
          </h3>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {description}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-medium">{rating.toFixed(1)}</span>
            </div>
            {duration && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>{duration}</span>
              </div>
            )}
          </div>

          {/* Price */}
          {(price != null || priceMin || priceMax) && (
            <div className="flex items-center gap-1 text-gray-800 font-semibold mb-4">
              <IndianRupee className="w-4 h-4" />
              <span>
                {displayMin?.toLocaleString() || "0"} –{" "}
                {displayMax?.toLocaleString() || "On Request"}
              </span>
            </div>
          )}

          {/* Action */}
          <div className="mt-4">
            <Button
              fullWidth
              onClick={() => navigate(`${detailsPathBase}/${_id}`)}
              variant="primary"
            >
              View Details
            </Button>
          </div>
        </div>
      </motion.div>
    </FadeIn>
  );
};

export default ServiceCard;

