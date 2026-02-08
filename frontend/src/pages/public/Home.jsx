import React, { useEffect, useState } from "react";
import { ArrowRight, PhoneCall } from "lucide-react";
import { useNavigate } from "react-router-dom";

import FadeIn from "../../components/animations/FadeIn";
import SlideIn from "../../components/animations/SlideIn";
import ScrollReveal from "../../components/animations/ScrollReveal";

import ServiceCard from "../../components/cards/ServiceCard";
import ProjectCard from "../../components/cards/ProjectCard";
import PropertyCard from "../../components/cards/PropertyCard";
import TestimonialCard from "../../components/cards/TestimonialCard";

import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

import ServiceService from "../../services/service.service";
import ProjectService from "../../services/project.service";
import PropertyService from "../../services/property.service";

const Home = () => {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      try {
        const [servicesRes, projectsRes, propertiesRes] = await Promise.all([
          ServiceService.getAllServices({ limit: 6 }),
          ProjectService.getAllProjects(),
          PropertyService.getAllProperties(),
        ]);

        setServices(servicesRes || []);
        setProjects((projectsRes || []).slice(0, 6));
        setProperties((propertiesRes || []).slice(0, 6));
      } catch (error) {
        console.error("Failed to load home data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Home Owner",
      location: "Mumbai",
      rating: 5,
      message:
        "BuildPro transformed my house beautifully. The team was professional, punctual, and delivered exactly what they promised.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Priya Patel",
      role: "Interior Client",
      location: "Ahmedabad",
      rating: 5,
      message:
        "Amazing interior design work! The quality and attention to detail were outstanding. Highly recommended.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Amit Verma",
      role: "Property Investor",
      location: "Delhi",
      rating: 4,
      message:
        "Great experience buying property through BuildPro. Transparent process and excellent support throughout.",
      avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-600 to-orange-500 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <FadeIn direction="left">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Complete Construction Solutions by{" "}
                <span className="text-yellow-300">BuildPro</span>
              </h1>
              <p className="text-lg text-orange-100 mb-8">
                Bricks and plaster, plumbing, waterproofing, gypsum, painting,
                electrical, fabrication, tile, door and window, lock and key,
                plus renovation, interior design, architecture and RCC, and
                property services.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/services")}
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Explore Services
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate("/contact")}
                  icon={<PhoneCall className="w-5 h-5" />}
                >
                  Contact Us
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Renovation",
                  "Interior Design",
                  "Architecture & RCC",
                  "Property Buy/Sell",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          <SlideIn direction="right">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
                alt="Home Construction"
                className="rounded-3xl shadow-2xl"
              />
            </div>
          </SlideIn>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Construction Work Types
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                All core construction works plus renovation, interior design,
                architecture and RCC, and property services in one place.
              </p>
            </div>
          </FadeIn>

          {loading ? (
            <div className="flex justify-center py-10">
              <Loader size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Button variant="outline" onClick={() => navigate("/services")}>
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Recent Projects
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Built and renovated spaces across residential and commercial
                categories, delivered on time and on budget.
              </p>
            </div>
          </FadeIn>

          {loading ? (
            <div className="flex justify-center py-10">
              <Loader size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Button variant="outline" onClick={() => navigate("/projects")}>
              View All Projects
            </Button>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Buy, Sell, or Rent Properties
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Verified listings and transparent support for property buying,
                selling, and renting.
              </p>
            </div>
          </FadeIn>

          {loading ? (
            <div className="flex justify-center py-10">
              <Loader size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Button variant="outline" onClick={() => navigate("/properties")}>
              View All Properties
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                What Our Clients Say
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Hear from homeowners, investors, and business owners who
                trusted BuildPro with their projects.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-orange-100 mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and turn your vision
              into reality.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button size="lg" onClick={() => navigate("/contact")}>
                Get Free Consultation
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate("/services")}
              >
                Browse Services
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
