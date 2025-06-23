"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

/**
 * AnimatedSection component
 * Generic wrapper for animating the appearance of sections or blocks.
 * Uses Framer Motion for fade/slide-in effects. Can be reused anywhere in the app for consistent animation.
 *
 * @param children - The content to animate
 * @param delay - Optional delay for the animation (in seconds)
 * @param className - Optional additional TailwindCSS classes
 */
interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const variants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom, duration: 0.6, ease: "easeOut" },
  }),
};

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.section
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={delay}
      variants={variants}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection; 