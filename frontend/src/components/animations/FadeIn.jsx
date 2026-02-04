import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

const directionMap = {
  up: { y: 30 },
  down: { y: -30 },
  left: { x: 30 },
  right: { x: -30 },
  none: {},
};

const FadeIn = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  once = true,
  className = "",
}) => {
  const initialPosition = directionMap[direction] || directionMap.up;

  return (
    <motion.div
      initial={{ opacity: 0, ...initialPosition }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={clsx(className)}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
