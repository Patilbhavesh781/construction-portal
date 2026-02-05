import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Home,
  IndianRupee,
  Bed,
  Bath,
  Car,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import FadeIn from "../animations/FadeIn";
import Button from "../common/Button";

const PropertyCard = ({ property, className = "" }) => {
  const navigate = useNavigate();

  if (!property) return null;

  const {
    _id,
    title,
    purpose = "sale", // sale | rent
    status = "available", // available | sold | pending
    location,
    price,
    area,
    bedrooms,
    bathrooms,
    parkingSpots,
    images = [],
    description,
    type,
  } = property;

  const imageUrl =
    images?.[0]?.url ||
    images?.[0] ||
    "https://via.placeholder.com/400x250?text=Property+Image";

  const statusColor =
    status === "available"
      ? "bg-green-600"
      : status === "pending"
      ? "bg-yellow-500"
      : "bg-red-600";

  const statusLabel =
    status === "available"
      ? "Available"
      : status === "pending"
      ? "Pending"
      : "Sold";

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
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
            {purpose === "rent" ? "For Rent" : "For Sale"}
          </span>
          <span
            className={clsx(
              "absolute top-3 right-3 text-white text-xs font-semibold px-3 py-1 rounded-full shadow",
              statusColor
            )}
          >
            {statusLabel}
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
          <div className="grid grid-cols-3 gap-3 text-sm text-gray-600 mb-4">
            {bedrooms !== undefined && (
              <div className="flex items-center gap-1">
                <Bed className="w-4 h-4 text-gray-500" />
                <span>{bedrooms} Beds</span>
              </div>
            )}
            {bathrooms !== undefined && (
              <div className="flex items-center gap-1">
                <Bath className="w-4 h-4 text-gray-500" />
                <span>{bathrooms} Baths</span>
              </div>
            )}
            {parkingSpots !== undefined && (
              <div className="flex items-center gap-1">
                <Car className="w-4 h-4 text-gray-500" />
                <span>{parkingSpots} Parking</span>
              </div>
            )}
          </div>

          {/* Price & Area */}
          <div className="flex items-center justify-between text-gray-800 font-semibold mb-4">
            <div className="flex items-center gap-1">
              <IndianRupee className="w-4 h-4" />
              <span>{price?.toLocaleString()}</span>
            </div>
            {area?.size && (
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Home className="w-4 h-4" />
                <span>
                  {area.size} {area.unit || "sqft"}
                </span>
              </div>
            )}
          </div>

          {/* Action */}
          <div className="mt-auto">
            <Button
              fullWidth
              onClick={() => navigate(`/properties/${_id}`)}
              variant="secondary"
            >
              View Details
            </Button>
          </div>
        </div>
      </motion.div>
    </FadeIn>
  );
};

export default PropertyCard;
