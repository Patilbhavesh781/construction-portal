import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Home,
  IndianRupee,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import FadeIn from "../../components/animations/FadeIn";
import Loader from "../../components/common/Loader";

import PropertyService from "../../services/property.service";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await PropertyService.getPropertyById(id);
        setProperty(data);
        setActiveIndex(0);
      } catch (err) {
        console.error("Failed to fetch property:", err);
        setError("Unable to load property details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProperty();
  }, [id]);

  const images = useMemo(() => {
    if (Array.isArray(property?.images) && property.images.length > 0) {
      return property.images.map((img) => img.url || img);
    }
    return [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=100",
    ];
  }, [property?.images]);

  const heroImage = images[activeIndex] || images[0];
  const propertyLocation =
    [
      property?.location?.city,
      property?.location?.state,
      property?.location?.country,
      !property?.location?.city &&
      !property?.location?.state &&
      !property?.location?.country
        ? property?.location?.address
        : null,
    ]
      .filter(Boolean)
      .join(", ") || "";

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

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
          onClick={() => navigate("/properties")}
          className="text-sm uppercase tracking-widest font-semibold text-red-600 hover:underline"
        >
          Back to Properties
        </button>
      </div>
    );
  }

  if (!property) return null;

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
            {property.purpose || "Property"}
          </p>
          <h1 className="text-4xl md:text-6xl font-light text-gray-900 leading-tight">
            {property.title}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl">
            {property.shortDescription || property.description}
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
                  alt={property.title}
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
                        alt={`${property.title} ${idx + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </FadeIn>
            )}

            <FadeIn>
              <div>
                <h2 className="text-3xl font-light text-gray-900 mb-4">Property Overview</h2>
                <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <FadeIn>
                <div className="bg-gray-50 border border-gray-200 p-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Property Info</h3>

                  {propertyLocation && (
                    <div className="flex items-center gap-2 text-gray-700 mb-3">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{propertyLocation}</span>
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
              </FadeIn>

              <button
                className="w-full px-6 py-3 text-xs uppercase tracking-widest font-semibold border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition"
                onClick={() => navigate("/contact")}
              >
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PropertyDetails;
