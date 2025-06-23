"use client";
import { motion } from "framer-motion";
import React from "react";

/**
 * FloatingCardImage component
 * Renders a decorative floating image with animation for visual enhancement.
 * Uses Framer Motion for smooth floating effect.
 * The image is aria-hidden for accessibility as it is purely decorative.
 *
 * @param src - Image source URL
 * @param alt - Image alt text (not used, aria-hidden)
 * @param idx - Index for animation timing
 * @param style - Optional additional styles
 */
interface FloatingCardImageProps {
  src: string;
  alt: string;
  idx: number;
  style?: React.CSSProperties;
}

const FloatingCardImage = ({ src, alt, idx, style }: FloatingCardImageProps) => (
  <motion.img
    src={src}
    alt={alt}
    aria-hidden="true"
    className="absolute left-1/2 -translate-x-1/2 -top-16 md:-top-20 w-32 md:w-40 lg:w-48 select-none pointer-events-none drop-shadow-neon z-10"
    style={style}
    initial={{ y: -10, rotate: idx === 0 ? -8 : 8, opacity: 0.85 }}
    animate={{ y: [ -10, 8, -10 ], rotate: [idx === 0 ? -8 : 8, 0, idx === 0 ? -8 : 8], opacity: 0.85 }}
    transition={{ duration: 7 + idx, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
    draggable={false}
  />
);

export default FloatingCardImage; 