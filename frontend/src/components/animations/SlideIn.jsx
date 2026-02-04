import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

const directionMap = {
  up: { y: 60 },
  down: { y: -60 },
  left: { x: 60 },
  right: { x: -60 },
};

const SlideIn = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
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

export default SlideIn;
