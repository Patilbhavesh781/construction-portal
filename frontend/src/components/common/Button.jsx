import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import clsx from "clsx";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed";

const variantStyles = {
  primary:
    "bg-orange-600 text-white hover:bg-orange-700 focus:ring-orange-500 shadow-md",
  secondary:
    "bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-700 shadow-md",
  outline:
    "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-400",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-md",
  ghost:
    "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

const MotionLink = motion(Link);

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  className = "",
  to,
  ...props
}) => {
  const classes = clsx(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && "w-full",
    className,
    (disabled || loading) && "pointer-events-none"
  );

  if (to) {
    return (
      <MotionLink
        whileTap={{ scale: 0.97 }}
        to={to}
        onClick={onClick}
        aria-disabled={disabled || loading}
        className={classes}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={classes}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </motion.button>
  );
};

export default Button;
