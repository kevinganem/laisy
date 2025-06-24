"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from 'next/image';
import { getPublicAssetPath } from '../utils/getPublicAssetPath';

// List of decorative background images with their positions and styles
const images = [
  { src: getPublicAssetPath("/cyber_bug.png"), alt: "Cyber bug", width: 100, style: { top: "8%", left: "6%", rotate: -8 } },
  { src: getPublicAssetPath("/gameboy.png"), alt: "Gameboy", width: 140, style: { bottom: "10%", left: "12%", rotate: 6 } },
  { src: getPublicAssetPath("/glasses.png"), alt: "Glasses", width: 120, style: { top: "18%", right: "10%", rotate: 12 } },
  { src: getPublicAssetPath("/logo_2.png"), alt: "Logo 2", width: 84, style: { bottom: "16%", right: "8%", rotate: -10 } },
  { src: getPublicAssetPath("/logo_3.png"), alt: "Logo 3", width: 84, style: { top: "50%", left: "50%", rotate: 0, translate: "-50%, -50%" } },
];

// Animation variants for floating effect
const floatVariants = {
  animate: (i: number) => ({
    y: [0, -16, 0, 14, 0],
    x: [0, i % 2 === 0 ? 18 : -18, 0, i % 2 === 0 ? -12 : 12, 0],
    rotate: [images[i].style.rotate || 0, (images[i].style.rotate || 0) + 8, (images[i].style.rotate || 0), (images[i].style.rotate || 0) - 6, (images[i].style.rotate || 0)],
    transition: {
      duration: 13 + i * 2,
      repeat: Infinity,
      repeatType: "loop" as const,
      ease: "easeInOut" as const,
      delay: i * 0.7,
    },
  }),
};

/**
 * BackgroundImages component
 * Renders animated, decorative images in the background for visual enhancement.
 * Uses Framer Motion for smooth floating animation.
 * All images are aria-hidden for accessibility, as they are purely decorative.
 */
const BackgroundImages: React.FC = () => (
  <div className="pointer-events-none fixed inset-0 w-full h-full -z-10 select-none">
    {images.map((img, i) => (
      <motion.div
        key={img.src}
        className="absolute opacity-60 md:opacity-70 lg:opacity-80 drop-shadow-neon"
        style={{
          ...img.style,
          position: "absolute",
          width: img.width,
          minWidth: 40,
          maxWidth: 140,
          pointerEvents: "none",
          transform: img.style.translate ? `translate(${img.style.translate})` : undefined,
          filter: "blur(2px) brightness(1.15) opacity(0.65)",
          mixBlendMode: "lighten",
        }}
        custom={i}
        variants={floatVariants}
        initial={false}
        animate="animate"
      >
        <Image
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.width}
          draggable={false}
          aria-hidden="true"
          style={{ width: "100%", height: "auto" }}
        />
      </motion.div>
    ))}
  </div>
);

export default BackgroundImages; 