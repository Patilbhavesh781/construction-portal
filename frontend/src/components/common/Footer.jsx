import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Properties", path: "/properties" },
    { name: "Contact", path: "/contact" },
  ];

  const services = [
    "Bricks & Plaster Work",
    "Plumbing",
    "Waterproofing",
    "Gypsum Work",
    "Painting",
    "Electrical Work",
    "Fabrication",
    "Tile Work",
    "Door & Window Work",
    "Lock & Key Work",
    "Renovation Work",
    "Interior Design",
    "Architecture Planning & RCC",
    "Property Buying & Selling",
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2
              onClick={() => navigate("/")}
              className="text-2xl font-bold text-white cursor-pointer"
            >
              Build<span className="text-orange-500">Pro</span>
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your trusted partner for complete home construction, renovation,
              interior design, and property solutions — built with quality,
              safety, and satisfaction.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="p-2 rounded-full bg-gray-800 hover:bg-orange-600 transition"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="p-2 rounded-full bg-gray-800 hover:bg-orange-600 transition"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="p-2 rounded-full bg-gray-800 hover:bg-orange-600 transition"
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="p-2 rounded-full bg-gray-800 hover:bg-orange-600 transition"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `text-sm transition ${
                        isActive
                          ? "text-orange-500"
                          : "text-gray-400 hover:text-orange-500"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              {services.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate("/services")}
                    className="text-sm text-gray-400 hover:text-orange-500 transition text-left"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 mt-0.5" />
                <span className="text-gray-400">
                  123 Construction Avenue, City Center, Your City, Country
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-500" />
                <a
                  href="tel:+1234567890"
                  className="text-gray-400 hover:text-orange-500 transition"
                >
                  +1 234 567 890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500" />
                <a
                  href="mailto:info@buildpro.com"
                  className="text-gray-400 hover:text-orange-500 transition"
                >
                  info@buildpro.com
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} BuildPro. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <button
              onClick={() => navigate("/privacy-policy")}
              className="hover:text-orange-500 transition"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigate("/terms-conditions")}
              className="hover:text-orange-500 transition"
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
