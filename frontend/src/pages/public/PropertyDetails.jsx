import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Home, IndianRupee } from "lucide-react";

import FadeIn from "../../components/animations/FadeIn";
import SlideIn from "../../components/animations/SlideIn";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

import PropertyService from "../../services/property.service";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await PropertyService.getPropertyById(id);
        setProperty(data);
      } catch (err) {
        console.error("Failed to fetch property:", err);
        setError("Unable to load property details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProperty();
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
        <Button onClick={() => navigate("/properties")}>
          Back to Properties
        </Button>
      </div>
    );
  }

  if (!property) return null;

  const coverImage =
    property.images?.[0]?.url ||
    "https://via.placeholder.com/1200x600?text=Property+Image";

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
              {property.title}
            </h1>
            <p className="text-orange-100 max-w-3xl">
              {property.shortDescription || property.description}
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
                alt={property.title}
                className="w-full h-[350px] object-cover rounded-3xl shadow-lg"
              />
            </FadeIn>

            <FadeIn direction="left">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Property Overview
                </h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {property.description}
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
                    Property Info
                  </h3>

                  {(property.location?.city || property.location?.address) && (
                    <div className="flex items-center gap-2 text-gray-700 mb-3">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>
                        {property.location?.city ||
                          property.location?.address}
                      </span>
                    </div>
                  )}

                  {property.price != null && (
                    <div className="flex items-center gap-2 text-gray-700 mb-3">
                      <IndianRupee className="w-4 h-4 text-gray-500" />
                      <span>{property.price.toLocaleString()}</span>
                    </div>
                  )}

                  {property.area?.size && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <Home className="w-4 h-4 text-gray-500" />
                      <span>
                        {property.area.size} {property.area.unit || "sqft"}
                      </span>
                    </div>
                  )}
                </div>

                <Button
                  className="w-full"
                  onClick={() => navigate("/contact")}
                >
                  Enquire Now
                </Button>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyDetails;
