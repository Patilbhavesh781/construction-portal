import React from "react";
import { Users, Target, ShieldCheck, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

import FadeIn from "../../components/animations/FadeIn";
import SlideIn from "../../components/animations/SlideIn";
import ScrollReveal from "../../components/animations/ScrollReveal";

import Button from "../../components/common/Button";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-600 to-orange-500 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <FadeIn direction="left">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                About <span className="text-yellow-300">BuildPro</span>
              </h1>
              <p className="text-lg text-orange-100 mb-8">
                We are a full-service construction and real estate company
                delivering high-quality residential and commercial solutions
                across India.
              </p>
              <Button
                size="lg"
                onClick={() => navigate("/contact")}
              >
                Get in Touch
              </Button>
            </div>
          </FadeIn>

          <SlideIn direction="right">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=900&q=80"
                alt="Construction Team"
                className="rounded-3xl shadow-2xl"
              />
            </div>
          </SlideIn>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <FadeIn direction="left">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Who We Are
              </h2>
              <p className="text-gray-600 mb-4">
                BuildPro is a trusted name in the construction and real estate
                industry, offering end-to-end solutions including architectural
                planning, RCC work, interiors, renovations, waterproofing,
                plumbing, electrical, and property buying & selling services.
              </p>
              <p className="text-gray-600 mb-6">
                Our team consists of experienced engineers, architects,
                designers, and skilled workers who are committed to delivering
                projects on time, within budget, and with uncompromising
                quality.
              </p>
              <Button
                variant="outline"
                onClick={() => navigate("/services")}
              >
                Explore Our Services
              </Button>
            </div>
          </FadeIn>

          <SlideIn direction="right">
            <div>
              <img
                src="https://images.unsplash.com/photo-1600585154154-71a1c1f1a5a8?auto=format&fit=crop&w=900&q=80"
                alt="Modern House"
                className="rounded-3xl shadow-xl"
              />
            </div>
          </SlideIn>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Our Mission & Vision
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Driving excellence in construction through innovation,
                integrity, and customer satisfaction.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <ScrollReveal>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center gap-4 mb-4">
                  <Target className="w-8 h-8 text-orange-600" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    Our Mission
                  </h3>
                </div>
                <p className="text-gray-600">
                  To provide reliable, high-quality, and affordable
                  construction and property solutions while building long-term
                  relationships with our clients based on trust and
                  transparency.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center gap-4 mb-4">
                  <Award className="w-8 h-8 text-orange-600" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    Our Vision
                  </h3>
                </div>
                <p className="text-gray-600">
                  To become a leading construction and real estate service
                  provider, known for innovation, quality craftsmanship, and
                  customer-first approach.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Why Choose BuildPro?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We go beyond construction — we deliver peace of mind.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <ScrollReveal>
              <div className="bg-gray-50 rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
                <ShieldCheck className="w-10 h-10 text-orange-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Trusted Quality
                </h3>
                <p className="text-gray-600 text-sm">
                  We follow strict quality standards and use premium materials
                  in every project.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-gray-50 rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
                <Users className="w-10 h-10 text-orange-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Expert Team
                </h3>
                <p className="text-gray-600 text-sm">
                  Our professionals bring years of experience in construction,
                  design, and project management.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-gray-50 rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
                <Award className="w-10 h-10 text-orange-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  On-Time Delivery
                </h3>
                <p className="text-gray-600 text-sm">
                  We respect your time and ensure timely completion without
                  compromising quality.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-gray-50 rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
                <Target className="w-10 h-10 text-orange-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Customer First
                </h3>
                <p className="text-gray-600 text-sm">
                  Your satisfaction is our top priority — we build with your
                  vision in mind.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let’s Build Something Amazing Together
            </h2>
            <p className="text-lg text-orange-100 mb-8 max-w-2xl mx-auto">
              Whether you’re planning a new home, renovation, or property
              investment — BuildPro is here to help.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button
                size="lg"
                onClick={() => navigate("/contact")}
              >
                Contact Us
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate("/services")}
              >
                View Services
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default About;
