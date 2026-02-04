import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const ScrollReveal = ({
  children,
  once = true,
  className = "",
  itemClassName = "",
  stagger = 0.12,
  delay = 0.05,
}) => {
  return (
    <motion.div
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      className={clsx(className)}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className={clsx(itemClassName)}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ScrollReveal;
