import React from "react";
import { NavLink } from "react-router-dom";
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
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0f1a] text-slate-400">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* ================= TOP ================= */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              Build<span className="text-orange-500">Pro</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed">
              Trusted construction services delivering quality homes with
              transparency and precision.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {["Home", "About", "Services", "Projects", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <NavLink
                      to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                      className="hover:text-orange-500 transition"
                    >
                      {item}
                    </NavLink>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase mb-4">
              Services
            </h4>
            <ul className="space-y-2 text-sm">
              <li>Residential Construction</li>
              <li>Interior Design</li>
              <li>Renovation</li>
              <li>Turnkey Projects</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase mb-4">
              Contact
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-orange-500" />
                Nashik, Maharashtra
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-orange-500" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-orange-500" />
                info@buildpro.com
              </li>
            </ul>
          </div>

        </div>

        {/* ================= BOTTOM ================= */}
        <div className="border-t border-white/10 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">

          {/* SOCIAL */}
          <div className="flex gap-4">
            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-orange-500 hover:text-white transition"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

          {/* COPYRIGHT */}
          <p className="text-xs text-slate-500 text-center md:text-right">
            © {year} BuildPro Construction. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
