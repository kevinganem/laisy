"use client";
import React from "react";
import * as FramerMotion from "framer-motion";
import Image from 'next/image';
import { getPublicAssetPath } from '../utils/getPublicAssetPath';
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
 */
interface TeamMemberProps {
  avatar?: React.ReactNode | string;
  name: string;
  role: string;
  description: string;
  className?: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ avatar, name, role, description, className = "" }) => {
  return (
    <motion.div
      className={`bg-[#23272a] rounded-xl shadow-lg p-6 flex flex-col items-center text-center w-80 min-h-80 max-w-xs flex-1 ${className}`}
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
      <h3 className="text-lg font-semibold text-white mb-1">{name}</h3>
      <span className="text-[#5865f2] font-medium mb-2">{role}</span>
      <p className="text-gray-300 text-sm">{description}</p>
    </motion.div>
  );
};

export default TeamMember; 