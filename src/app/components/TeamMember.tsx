"use client";
import React from "react";
import * as FramerMotion from "framer-motion";
import Image from 'next/image';
import { getPublicAssetPath } from '../utils/getPublicAssetPath';
import { FaChartLine, FaCode, FaBrain } from 'react-icons/fa';
const motion = FramerMotion.motion;

/**
 * TeamMember component
 * Displays a team member's avatar, name, role, and description.
 * Uses Framer Motion for entry animation on mount.
 * Avatar is decorative if not meaningful for screen readers.
 *
 * @param avatar - URL or React node for the member's avatar
 * @param name - Name of the team member
 * @param role - Role/title of the team member
 * @param description - Short description or bio
 * @param className - Optional additional TailwindCSS classes
 * @param iconName - Icon name for expertise representation
 */
interface TeamMemberProps {
  avatar?: React.ReactNode | string;
  name: string;
  role: string;
  description: string;
  className?: string;
  iconName?: string;
}

// Icon mapping for team members
const getExpertiseIcon = (iconName?: string) => {
  switch (iconName) {
    case 'marketing':
      return <FaChartLine className="w-6 h-6 text-[#57f287]" />;
    case 'development':
      return <FaCode className="w-6 h-6 text-[#5865f2]" />;
    case 'ai':
      return <FaBrain className="w-6 h-6 text-[#eb459e]" />;
    default:
      return <FaCode className="w-6 h-6 text-[#5865f2]" />;
  }
};

// Get initials from name
const getInitials = (name: string) => {
  return name.split(' ').map(word => word[0]).join('').toUpperCase();
};

// Get color for initials based on iconName
const getInitialsColor = (iconName?: string) => {
  switch (iconName) {
    case 'marketing':
      return 'bg-[#57f287] text-black';
    case 'development':
      return 'bg-[#5865f2] text-white';
    case 'ai':
      return 'bg-[#eb459e] text-white';
    default:
      return 'bg-[#5865f2] text-white';
  }
};

const TeamMember: React.FC<TeamMemberProps> = ({ avatar, name, role, description, className = "", iconName }) => {
  return (
    <motion.div
      className={`bg-[#23272a] rounded-xl shadow-lg p-6 flex flex-col items-center text-center w-80 min-h-64 max-w-xs flex-1 ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {avatar && (typeof avatar === "string" ? (
        <Image src={getPublicAssetPath(avatar as string)} alt={name} width={80} height={80} className="mb-4 w-20 h-20 rounded-full object-cover border-4 border-[#5865f2]" />
      ) : (
        <div className="mb-4" aria-hidden="true">{avatar}</div>
      ))}
      {!avatar && iconName && (
        <div className="mb-4 flex items-center gap-3">
          {/* Expertise Icon */}
          <div className="w-16 h-16 rounded-full bg-[#232946] border-2 border-[#5865f2] flex items-center justify-center shadow-lg">
            {getExpertiseIcon(iconName)}
          </div>
          {/* Initials Circle */}
          <div className={`w-12 h-12 rounded-full ${getInitialsColor(iconName)} flex items-center justify-center shadow-lg font-bold text-lg`}>
            {getInitials(name)}
          </div>
        </div>
      )}
      <h3 className="text-lg font-semibold text-white mb-1">{name}</h3>
      <span className="text-[#5865f2] font-medium mb-2">{role}</span>
      <p className="text-gray-300 text-sm">{description}</p>
    </motion.div>
  );
};

export default TeamMember; 