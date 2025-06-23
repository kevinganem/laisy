"use client";
import React from "react";
import * as FramerMotion from "framer-motion";
const motion = FramerMotion.motion;

/**
 * ServiceCard component
 * Displays a QA service with an icon, title, and description.
 * Uses Framer Motion for entry animation on mount.
 * Icon is decorative and aria-hidden for accessibility.
 *
 * @param icon - React node for the service icon (decorative)
 * @param title - Title of the service
 * @param description - Short description of the service
 * @param className - Optional additional TailwindCSS classes
 */
interface ServiceCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, className = "" }) => {
  return (
    <motion.div
      className={`bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl shadow-xl p-8 flex flex-col items-center text-center min-h-[380px] ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {icon && (
        <div className="mb-6 flex items-center justify-center" aria-hidden="true">
          <span className="text-4xl text-[#5865f2]">{icon}</span>
        </div>
      )}
      <h2 className="text-2xl font-bold text-white mb-3 leading-tight">{title}</h2>
      <p className="text-gray-100 text-base leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default ServiceCard; 