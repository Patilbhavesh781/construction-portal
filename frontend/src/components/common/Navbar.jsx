import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItemClass = ({ isActive }) =>
    `transition-colors ${
      isActive ? "text-red-600" : "text-gray-700 hover:text-red-600"
    }`;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200">
      <nav className="w-full px-4 sm:px-6 xl:px-20 py-5 flex items-center justify-between">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-2">
          <button
            className="inline-flex items-center md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <Link
            to="/"
            aria-label="JSW Homes"
            className="mb-[3px] text-2xl font-semibold tracking-wide text-gray-900"
          >
            JSW<span className="font-light">Homes</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase font-medium">
          <li>
            <NavLink to="/" className={navItemClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={navItemClass}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" className={navItemClass}>
              Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/projects" className={navItemClass}>
              Projects
            </NavLink>
          </li>
          <li className="relative group">
            <button
              type="button"
              className="flex items-center gap-1 text-gray-700 hover:text-red-600 transition-colors"
            >
              MORE <ChevronDown size={16} />
            </button>
            <div className="absolute top-5 left-0 bg-white border border-gray-200 shadow-lg rounded-md py-2 w-44 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
              <NavLink
                to="/properties"
                className="block px-4 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-gray-50"
              >
                Properties
              </NavLink>
              <NavLink
                to="/contact"
                className="block px-4 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-gray-50"
              >
                Contact
              </NavLink>
            </div>
          </li>
        </ul>

        {/* Login Button */}
        <div className="flex items-center">
          <NavLink
            to="/login"
            className="px-6 py-2 border border-gray-900 text-gray-900 uppercase tracking-widest text-xs hover:bg-gray-900 hover:text-white transition-all"
          >
            Login
          </NavLink>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <ul className="flex flex-col gap-4 px-6 py-6 text-sm tracking-widest uppercase font-medium">
            <li>
              <NavLink to="/" className={navItemClass} onClick={() => setMobileOpen(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navItemClass} onClick={() => setMobileOpen(false)}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" className={navItemClass} onClick={() => setMobileOpen(false)}>
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/projects" className={navItemClass} onClick={() => setMobileOpen(false)}>
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink to="/properties" className={navItemClass} onClick={() => setMobileOpen(false)}>
                Properties
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={navItemClass} onClick={() => setMobileOpen(false)}>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
