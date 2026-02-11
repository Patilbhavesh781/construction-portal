import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  User,
  MessageSquare,
  LogOut,
  Wrench,
  X,
} from "lucide-react";
import clsx from "clsx";
import useAuthStore from "../../store/authStore";
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
      path: "/user/services",
      icon: <Wrench className="w-5 h-5" />,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={clsx(
          "fixed top-0 left-0 h-full z-50 w-72 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:static lg:sticky lg:top-0"
        )}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/user/dashboard")}
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-red-600 font-semibold">
                Construction
              </p>
              <span className="text-xl font-light text-gray-900">
                Build<span className="font-semibold">Pro</span>
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-5 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-none text-sm font-medium transition-colors border",
                  isActive
                    ? "bg-red-600 text-white border-red-600"
                    : "text-gray-700 border-transparent hover:border-gray-300"
                )
              }
              onClick={onClose}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-gray-200">
          <Button
            variant="danger"
            fullWidth
            className="rounded-none uppercase tracking-widest text-xs py-3"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
};

export default UserSidebar;
