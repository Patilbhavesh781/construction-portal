import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, PhoneCall, CheckCircle } from "lucide-react";

import FadeIn from "../../components/animations/FadeIn";
import SlideIn from "../../components/animations/SlideIn";
import ScrollReveal from "../../components/animations/ScrollReveal";

import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import ServiceCard from "../../components/cards/ServiceCard";

import ServiceService from "../../services/service.service";

const ServiceDetails = ({ servicesPathBase = "/services" }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [relatedServices, setRelatedServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const serviceData = await ServiceService.getServiceById(id);
        setService(serviceData);

        if (serviceData?.category) {
          const relatedRes = await ServiceService.getAllServices({
            category: serviceData.category,
            limit: 3,
          });
          const filtered = (relatedRes || []).filter(
            (s) => s._id !== serviceData._id
          );
          setRelatedServices(filtered);
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
        <Button onClick={() => navigate(servicesPathBase)}>
          Back to Services
        </Button>
      </div>
    );
  }

  if (!service) {
    return null;
  }

  return (
    <div className="w-full">
      {/* Header Section */}
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
              {service.title}
            </h1>
            <p className="text-orange-100 max-w-3xl">
              {service.shortDescription || service.description}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Content */}
          <div className="lg:col-span-2">
            <FadeIn direction="left">
              <div className="mb-8">
                <img
                  src={
                    service.images?.[0]?.url ||
                    "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80"
                  }
                  alt={service.title}
                  className="w-full h-[350px] object-cover rounded-3xl shadow-lg"
                />
              </div>
            </FadeIn>

            <FadeIn direction="left">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Service Overview
                </h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {service.description}
                </p>
              </div>
            </FadeIn>

            {/* Features / Inclusions */}
            {service.features?.length > 0 && (
              <FadeIn direction="left">
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    What’s Included
                  </h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-gray-700"
                      >
                        <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            )}

            {/* Process / Steps */}
            {service.process?.length > 0 && (
              <FadeIn direction="left">
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Our Process
                  </h2>
                  <ol className="space-y-4">
                    {service.process.map((step, index) => (
                      <li key={index} className="flex gap-4">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-600 text-white font-semibold">
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

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <SlideIn direction="right">
              <div className="sticky top-28 space-y-6">
                {/* Pricing Card */}
                <div className="bg-gray-50 rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Pricing
                  </h3>
                  <p className="text-3xl font-bold text-orange-600 mb-2">
                    {service.price != null
                      ? `₹${service.price.toLocaleString()}`
                      : "Custom Quote"}
                  </p>
                  <p className="text-sm text-gray-600 mb-6">
                    {service.priceType
                      ? `Pricing: ${service.priceType.replace("_", " ")}`
                      : "Pricing varies based on project scope"}
                  </p>

                  <div className="space-y-3">
                    <Button
                      className="w-full"
                      onClick={() => navigate(`/contact?service=${service._id}`)}
                      icon={<PhoneCall className="w-5 h-5" />}
                    >
                      Request Callback
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => navigate(`/user/bookings/new?service=${service._id}`)}
                      icon={<Calendar className="w-5 h-5" />}
                    >
                      Book This Service
                    </Button>
                  </div>
                </div>

                {/* Trust Card */}
                <div className="bg-white rounded-2xl shadow-md p-6 border">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Why Choose BuildPro?
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>✔ Certified professionals</li>
                    <li>✔ High-quality materials</li>
                    <li>✔ Transparent pricing</li>
                    <li>✔ On-time delivery</li>
                    <li>✔ Dedicated project manager</li>
                  </ul>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Related Services
                </h2>
                <Button
                  variant="outline"
                  onClick={() => navigate(servicesPathBase)}
                >
                  View All
                </Button>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedServices.map((service) => (
                <ScrollReveal key={service._id}>
                  <ServiceCard
                    service={service}
                    detailsPathBase={servicesPathBase}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ServiceDetails;
