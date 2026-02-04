import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import clsx from "clsx";

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-10 h-10",
  xl: "w-14 h-14",
};

const Loader = ({
  size = "md",
  fullScreen = false,
  text = "",
  className = "",
}) => {
  const spinnerSize = sizeMap[size] || sizeMap.md;

  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center gap-3",
        fullScreen && "fixed inset-0 bg-white/70 backdrop-blur-sm z-50",
        className
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      >
        <Loader2 className={clsx(spinnerSize, "text-orange-600")} />
      </motion.div>
      {text && (
        <p className="text-sm text-gray-600 font-medium">{text}</p>
      )}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
