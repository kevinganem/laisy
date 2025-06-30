"use client";
import React from "react";
import * as FramerMotion from "framer-motion";
const motion = FramerMotion.motion;

/**
 * ExpertiseBlock component
 * Displays a QA expertise area with an icon, title, and description.
 * Uses Framer Motion for entry animation on mount.
 * Icon is decorative and aria-hidden for accessibility.
 *
 * @param icon - React node for the expertise icon (decorative)
 * @param title - Title of the expertise area
 * @param description - Short description of the expertise
 * @param className - Optional additional TailwindCSS classes
 */
interface ExpertiseBlockProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const ExpertiseBlock: React.FC<ExpertiseBlockProps> = ({ icon, title, description, className = "" }) => {
  return (
    <motion.div
      className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg p-6 flex flex-col items-center text-center ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {icon && <div className="mb-4 text-4xl text-[#57f287]" aria-hidden="true">{icon}</div>}
      <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

export default ExpertiseBlock; 