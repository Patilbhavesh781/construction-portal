import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  User,
  MessageSquare,
  LogOut,
  Wrench,
} from "lucide-react";
import clsx from "clsx";
import { useAuthStore } from "../../store/authStore";
import Button from "../common/Button";

const UserSidebar = ({ isOpen = true, onClose }) => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/user/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "My Bookings",
      path: "/user/bookings",
      icon: <CalendarCheck className="w-5 h-5" />,
    },
    {
      name: "My Profile",
      path: "/user/profile",
      icon: <User className="w-5 h-5" />,
    },
    {
      name: "Messages",
      path: "/user/messages",
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      name: "Services",
      path: "/services",
      icon: <Wrench className="w-5 h-5" />,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-0 left-0 h-full z-50 w-64 bg-white border-r shadow-sm flex flex-col transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:static lg:shadow-none"
        )}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/user/dashboard")}
          >
            <span className="text-xl font-bold text-orange-600">
              Build<span className="text-gray-800">Pro</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-orange-100 text-orange-700"
                    : "text-gray-700 hover:bg-gray-100"
                )
              }
              onClick={onClose}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-4 py-4 border-t">
          <Button
            variant="danger"
            fullWidth
            onClick={handleLogout}
            icon={<LogOut className="w-4 h-4" />}
          >
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
};

export default UserSidebar;
