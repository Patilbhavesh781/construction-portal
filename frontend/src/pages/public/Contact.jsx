import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

import FadeIn from "../../components/animations/FadeIn";
import SlideIn from "../../components/animations/SlideIn";
import ScrollReveal from "../../components/animations/ScrollReveal";

import ContactForm from "../../components/forms/ContactForm";
import Button from "../../components/common/Button";

const Contact = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-orange-100 max-w-2xl mx-auto">
              Get in touch with our team for construction, renovation,
              interior design, or property services.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <SlideIn direction="left">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Let’s Talk
                </h2>
                <p className="text-gray-600 max-w-md">
                  Have a project in mind? We’d love to hear from you. Reach out
                  to us and our experts will guide you every step of the way.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-orange-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Office Address
                    </h4>
                    <p className="text-gray-600">
                      123 Construction Street, City Center, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-orange-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Phone</h4>
                    <p className="text-gray-600">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-orange-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Email</h4>
                    <p className="text-gray-600">support@yourcompany.com</p>
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <ScrollReveal>
                <div className="rounded-2xl overflow-hidden shadow-md border">
                  <iframe
                    title="Office Location"
                    src="https://www.google.com/maps?q=India&output=embed"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </ScrollReveal>
            </div>
          </SlideIn>

          {/* Contact Form */}
          <SlideIn direction="right">
            <div className="bg-gray-50 rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Send Us a Message
              </h3>
              <ContactForm />
            </div>
          </SlideIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-orange-100 mb-8 max-w-2xl mx-auto">
              Let our experts help you plan, design, and build your dream space.
            </p>
            <Button size="lg" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Get in Touch
            </Button>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default Contact;
