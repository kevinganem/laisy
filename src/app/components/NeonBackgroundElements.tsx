"use client";
import React, { useEffect, useState, useRef } from "react";

// List of neon colors for animated SVG shapes (Discord/gaming palette)
const colors = ["#5865f2", "#57f287", "#eb459e", "#fbbf24", "#fff"];

// List of SVG shape generators (rounded square, circle, triangle, cross, star)
const shapes = [
  (color: string, size: number) => (
    <rect width={size} height={size} fill={color} rx={size * 0.2} /> // rounded square
  ),
  (color: string, size: number) => (
    <circle r={size / 2} cx={size / 2} cy={size / 2} fill={color} /> // circle
  ),
  (color: string, size: number) => (
    <polygon points={`${size / 2},0 ${size},${size} 0,${size}`} fill={color} /> // triangle
  ),
  (color: string, size: number) => (
    <g>
      <rect width={size} height={size * 0.2} y={size * 0.4} fill={color} />
      <rect width={size * 0.2} height={size} x={size * 0.4} fill={color} />
    </g> // cross
  ),
  (color: string, size: number) => (
    <polygon
      points={
        `${size / 2},0 ` +
        `${size * 0.6},${size * 0.35} ` +
        `${size},${size * 0.4} ` +
        `${size * 0.7},${size * 0.65} ` +
        `${size * 0.8},${size} ` +
        `${size / 2},${size * 0.8} ` +
        `${size * 0.2},${size} ` +
        `${size * 0.3},${size * 0.65} ` +
        `0,${size * 0.4} ` +
        `${size * 0.4},${size * 0.35}`
      }
      fill={color}
      style={{ filter: `drop-shadow(0 0 6px ${color})` }}
    />
  ),
];

// Generate random float between min and max (utility)
const rand = (min: number, max: number) => Math.random() * (max - min) + min;

const STAR_COUNT = 40;

// Star interface: represents a single animated background element
interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  key: number; // used to force remount
  blur: number;
}

// Create a new random star (random position, color, size, animation)
function createStar(id: number): Star {
  return {
    id,
    x: rand(0, 100),
    y: rand(0, 100),
    size: rand(12, 32),
    color: colors[Math.floor(rand(0, colors.length))],
    duration: rand(3.5, 7),
    delay: rand(0, 4),
    key: Math.random(),
    blur: rand(2, 6),
  };
}

/**
 * NeonBackgroundElements component
 * Renders animated SVG shapes as a decorative background (Discord/gaming style).
 * Shapes are randomly generated and animated with fade-in/fade-out effects.
 * Shapes "respawn" at new positions after their animation completes.
 * Uses useEffect to handle animation and cleanup.
 * All shapes are aria-hidden for accessibility, as they are purely decorative.
 */
const NeonBackgroundElements: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const timeouts = useRef<NodeJS.Timeout[]>([]);

  // Initialize stars on mount (client-side only)
  useEffect(() => {
    setStars(Array.from({ length: STAR_COUNT }, (_, i) => createStar(i)));
    return () => {
      timeouts.current.forEach(clearTimeout);
    };
  }, []);

  // Handle respawn of stars after their animation ends (loop)
  useEffect(() => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
    stars.forEach((star, i) => {
      const total = (star.duration + star.delay) * 1000;
      const timeout = setTimeout(function respawn() {
        setStars(prev => {
          const updated = [...prev];
          updated[i] = createStar(star.id);
          return updated;
        });
      }, total);
      timeouts.current.push(timeout);
    });
    return () => {
      timeouts.current.forEach(clearTimeout);
    };
  }, [stars]);

  // Render nothing on SSR, only after mount (prevents hydration mismatch)
  if (stars.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <svg width="100%" height="100%" className="absolute inset-0 w-full h-full">
        {stars.map((star) => (
          <g
            key={star.key}
            style={{
              transform: `translate(${star.x}vw, ${star.y}vh)`,
              filter: `blur(${star.blur}px)`,
              opacity: 0,
              animation: `star-fade ${star.duration}s linear ${star.delay}s forwards`,
            }}
            aria-hidden="true"
          >
            <svg width={star.size} height={star.size}>
              {shapes[4](star.color, star.size)}
            </svg>
          </g>
        ))}
        <style>{`
          @keyframes star-fade {
            0% { opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { opacity: 0; }
          }
        `}</style>
      </svg>
    </div>
  );
};

export default NeonBackgroundElements; 