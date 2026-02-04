import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  CalendarCheck,
  FolderKanban,
  Building2,
  IndianRupee,
  Star,
} from "lucide-react";
import clsx from "clsx";
import FadeIn from "../animations/FadeIn";

const defaultStats = [
  {
    key: "users",
    label: "Total Users",
    value: 0,
    icon: <Users className="w-6 h-6 text-blue-600" />,
    bg: "bg-blue-50",
  },
  {
    key: "bookings",
    label: "Total Bookings",
    value: 0,
    icon: <CalendarCheck className="w-6 h-6 text-green-600" />,
    bg: "bg-green-50",
  },
  {
    key: "projects",
    label: "Projects",
    value: 0,
    icon: <FolderKanban className="w-6 h-6 text-purple-600" />,
    bg: "bg-purple-50",
  },
  {
    key: "properties",
    label: "Properties",
    value: 0,
    icon: <Building2 className="w-6 h-6 text-orange-600" />,
    bg: "bg-orange-50",
  },
  {
    key: "revenue",
    label: "Revenue",
    value: 0,
    icon: <IndianRupee className="w-6 h-6 text-yellow-600" />,
    bg: "bg-yellow-50",
    isCurrency: true,
  },
  {
    key: "rating",
    label: "Avg. Rating",
    value: 0,
    icon: <Star className="w-6 h-6 text-pink-600" />,
    bg: "bg-pink-50",
  },
];

const DashboardStats = ({ stats = [], className = "" }) => {
  const mergedStats =
    stats.length > 0
      ? stats.map((item, index) => ({
          ...defaultStats[index],
          ...item,
        }))
      : defaultStats;

  return (
    <div
      className={clsx(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
        className
      )}
    >
      {mergedStats.map((stat, index) => (
        <FadeIn key={stat.key || index} direction="up" delay={index * 0.1}>
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 250 }}
            className={clsx(
              "p-6 rounded-2xl border shadow-sm bg-white flex items-center gap-4",
              stat.bg
            )}
          >
            <div
              className={clsx(
                "flex items-center justify-center w-12 h-12 rounded-xl",
                stat.bg
              )}
            >
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">
                {stat.isCurrency
                  ? `₹${Number(stat.value || 0).toLocaleString()}`
                  : Number(stat.value || 0).toLocaleString()}
              </p>
            </div>
          </motion.div>
        </FadeIn>
      ))}
    </div>
  );
};

export default DashboardStats;
