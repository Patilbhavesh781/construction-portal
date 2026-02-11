import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItemClass = ({ isActive }) =>
    `relative transition-colors duration-300 ${
      isActive
        ? "text-red-500"
        : "text-gray-300 hover:text-white"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav className="w-full px-6 xl:px-24 py-6 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-semibold tracking-wider text-white"
        >
          JSW<span className="font-light text-red-500">Homes</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10 text-xs tracking-[0.3em] uppercase font-medium">

          {["/", "/about", "/services", "/projects"].map((path, i) => (
            <li key={i}>
              <NavLink to={path} className={navItemClass}>
                {({ isActive }) => (
                  <span className="relative group">
                    {path === "/" ? "Home" : path.replace("/", "")}
                    <span
                      className={`absolute left-0 -bottom-2 h-[1px] bg-red-500 transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </span>
                )}
              </NavLink>
            </li>
          ))}

          {/* Dropdown */}
          <li className="relative group">
            <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors">
              MORE <ChevronDown size={14} />
            </button>

            <div className="absolute top-8 left-0 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl py-4 w-44 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl">
              <NavLink
                to="/properties"
                className="block px-6 py-2 text-xs tracking-widest text-gray-300 hover:text-red-500 transition"
              >
                Properties
              </NavLink>
              <NavLink
                to="/contact"
                className="block px-6 py-2 text-xs tracking-widest text-gray-300 hover:text-red-500 transition"
              >
                Contact
              </NavLink>
            </div>
          </li>
        </ul>

        {/* CTA Button */}
        <NavLink
          to="/login"
          className="hidden md:inline-block px-8 py-3 text-xs tracking-[0.3em] uppercase
                     border border-red-500 text-red-500
                     hover:bg-red-500 hover:text-white
                     transition-all duration-500 rounded-full"
        >
          Login
        </NavLink>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Animation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100vh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="md:hidden bg-black text-white flex flex-col items-center justify-center gap-10 text-lg uppercase tracking-widest"
          >
            {["Home", "About", "Services", "Projects", "Properties", "Contact"].map(
              (item, i) => (
                <NavLink
                  key={i}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className="hover:text-red-500 transition-colors"
                >
                  {item}
                </NavLink>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
