import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import useAuthStore from "../../store/authStore";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const toggleProfile = () => setProfileOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Properties", path: "/properties" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span className="text-xl font-bold text-orange-600">
              Build<span className="text-gray-800">Pro</span>
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative text-sm font-medium transition-colors ${
                    isActive
                      ? "text-orange-600"
                      : "text-gray-700 hover:text-orange-600"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-0 -bottom-1 w-full h-0.5 bg-orange-600 rounded-full"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="px-5 py-2 rounded-full bg-orange-600 text-white text-sm font-semibold hover:bg-orange-700 transition shadow"
                >
                  Get Started
                </button>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={toggleProfile}
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                >
                  <User className="w-5 h-5 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">
                    {user?.name || "Account"}
                  </span>
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border overflow-hidden"
                    >
                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          navigate(
                            user?.role === "admin"
                              ? "/admin/dashboard"
                              : "/user/dashboard"
                          );
                        }}
                        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </button>
                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          navigate("/profile");
                        }}
                        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobile}
              className="p-2 rounded-lg hover:bg-gray-100 transition"
            >
              {mobileOpen ? (
                <X className="w-6 h-6 text-gray-800" />
              ) : (
                <Menu className="w-6 h-6 text-gray-800" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white shadow-lg border-t overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `text-base font-medium ${
                      isActive
                        ? "text-orange-600"
                        : "text-gray-700 hover:text-orange-600"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <div className="border-t pt-4 flex flex-col gap-3">
                {!isAuthenticated ? (
                  <>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        navigate("/login");
                      }}
                      className="w-full py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        navigate("/register");
                      }}
                      className="w-full py-2 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700 transition"
                    >
                      Get Started
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        navigate(
                          user?.role === "admin"
                            ? "/admin/dashboard"
                            : "/user/dashboard"
                        );
                      }}
                      className="w-full flex items-center gap-2 py-2 text-gray-700 hover:text-orange-600 transition"
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        navigate("/profile");
                      }}
                      className="w-full flex items-center gap-2 py-2 text-gray-700 hover:text-orange-600 transition"
                    >
                      <User className="w-5 h-5" />
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 py-2 text-red-600 hover:text-red-700 transition"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
