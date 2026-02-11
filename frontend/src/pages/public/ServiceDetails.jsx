import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  PhoneCall,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import FadeIn from "../../components/animations/FadeIn";
import Loader from "../../components/common/Loader";

import ServiceService from "../../services/service.service";
import BookingService from "../../services/booking.service";
import { useAuth } from "../../hooks/useAuth";
import { SERVICE_CATEGORIES } from "../../utils/constants";

const ServiceDetails = ({
  servicesPathBase = "/services",
  showBooking = false,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [service, setService] = useState(null);
  const [relatedServices, setRelatedServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const serviceData = await ServiceService.getServiceById(id);
        setService(serviceData);
        setActiveImage(0);

        if (serviceData?.category) {
          const relatedRes = await ServiceService.getAllServices({
            category: serviceData.category,
            limit: 4,
          });
          const filtered = (relatedRes || []).filter(
            (s) => s._id !== serviceData._id
          );
          setRelatedServices(filtered.slice(0, 4));
        }
      } catch (err) {
        console.error("Failed to fetch service details:", err);
        setError("Unable to load service details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchServiceDetails();
  }, [id]);

  const handleBookService = async () => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: `/user/services/${service._id}` },
      });
      return;
    }

    setBookingLoading(true);
    try {
      await BookingService.createBooking({
        service: service._id,
        bookingType: "service",
        bookingDate: new Date().toISOString(),
      });
      navigate("/user/bookings");
    } catch (err) {
      console.error("Failed to book service:", err);
    } finally {
      setBookingLoading(false);
    }
  };

  const images = useMemo(() => {
    if (Array.isArray(service?.images) && service.images.length > 0) {
      return service.images.map((img) => img.url || img);
    }
    return [
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80",
    ];
  }, [service?.images]);

  const heroImage = images[activeImage] || images[0];
  const categoryLabel =
    SERVICE_CATEGORIES.find((cat) => cat.value === service?.category)?.label ||
    service?.category ||
    "Service";
  const displayPrice =
    service?.price != null ? `INR ${service.price.toLocaleString()}` : "Custom Quote";

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
          onClick={() => navigate(servicesPathBase)}
          className="text-sm uppercase tracking-widest font-semibold text-red-600 hover:underline"
        >
          Back to Services
        </button>
      </div>
    );
  }

  if (!service) {
    return null;
  }

  const prevImage = () => {
    setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
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
            {categoryLabel}
          </p>
          <h1 className="text-4xl md:text-6xl font-light text-gray-900 leading-tight">
            {service.title}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl">
            {service.shortDescription || service.description}
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
                  alt={service.title}
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
                      onClick={() => setActiveImage(idx)}
                      className={`overflow-hidden border-2 transition ${
                        activeImage === idx ? "border-red-600" : "border-transparent"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${service.title} ${idx + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </FadeIn>
            )}

            <FadeIn>
              <div>
                <h2 className="text-3xl font-light text-gray-900 mb-4">Service Overview</h2>
                <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                  {service.description}
                </p>
              </div>
            </FadeIn>

            {service.features?.length > 0 && (
              <FadeIn>
                <div>
                  <h2 className="text-3xl font-light text-gray-900 mb-6">What Is Included</h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-red-600 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            )}

            {service.process?.length > 0 && (
              <FadeIn>
                <div>
                  <h2 className="text-3xl font-light text-gray-900 mb-6">Our Process</h2>
                  <ol className="space-y-4">
                    {service.process.map((step, index) => (
                      <li key={index} className="flex gap-4">
                        <div className="w-8 h-8 flex items-center justify-center bg-red-600 text-white font-semibold">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {step.title || `Step ${index + 1}`}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {step.description || step}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </FadeIn>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <FadeIn>
                <div className="bg-gray-50 border border-gray-200 p-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-3">Pricing</h3>
                  <p className="text-3xl font-light text-gray-900 mb-2">{displayPrice}</p>
                  <p className="text-sm uppercase tracking-widest text-gray-500 mb-6">
                    {service.priceType
                      ? service.priceType.replace("_", " ")
                      : "pricing based on scope"}
                  </p>

                  <div className="space-y-3">
                    {showBooking && (
                      <button
                        onClick={handleBookService}
                        disabled={bookingLoading}
                        type="button"
                        title="Book This Service"
                        className="w-full px-6 py-3 text-xs uppercase tracking-widest font-semibold border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        <span className="inline-flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {bookingLoading ? "Booking..." : "Book This Service"}
                        </span>
                      </button>
                    )}
                    <button
                      className="w-full px-6 py-3 text-xs uppercase tracking-widest font-semibold border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition"
                      onClick={() => navigate(`/contact?service=${service._id}`)}
                      type="button"
                    >
                      <span className="inline-flex items-center gap-2">
                        <PhoneCall className="w-4 h-4" />
                        Request Callback
                      </span>
                    </button>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className="py-24 px-8 md:px-24 bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-4xl font-light text-gray-900">Related Services</h2>
              <button
                className="text-sm uppercase tracking-widest font-semibold text-red-600 hover:underline"
                onClick={() => navigate(servicesPathBase)}
              >
                View All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              {relatedServices.map((related) => {
                const imageUrl =
                  related.images?.[0]?.url ||
                  related.images?.[0] ||
                  "https://images.unsplash.com/photo-1581092921461-eab10380bee1?auto=format&fit=crop&q=100";
                const meta =
                  SERVICE_CATEGORIES.find((cat) => cat.value === related.category)
                    ?.label ||
                  related.category ||
                  "Service";

                return (
                  <div key={related._id} className="group">
                    <div className="relative overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={related.title}
                        className="w-full h-[420px] object-cover transform group-hover:scale-105 transition duration-700"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition" />
                    </div>

                    <div className="mt-8">
                      <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                        {meta}
                      </p>
                      <h3 className="text-2xl font-light text-gray-900">{related.title}</h3>
                      <p className="mt-2 text-gray-600 text-lg line-clamp-2">
                        {related.shortDescription || related.description}
                      </p>

                      <button
                        className="mt-6 text-sm uppercase tracking-widest font-semibold text-red-600 hover:underline"
                        onClick={() => navigate(`${servicesPathBase}/${related._id}`)}
                      >
                        View Service
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default ServiceDetails;
