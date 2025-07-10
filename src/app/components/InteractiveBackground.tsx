"use client";
import React, { useEffect, useRef } from "react";

const shapes = [
  { type: "circle", color: "#8B5CF6", size: 180, style: { left: "8vw", top: "18vh" } },
  { type: "circle", color: "#57f287", size: 120, style: { right: "12vw", top: "30vh" } },
  { type: "polygon", color: "#eb459e", size: 140, style: { left: "50vw", bottom: "8vh" } },
  { type: "circle", color: "#3B82F6", size: 90, style: { right: "20vw", bottom: "18vh" } },
];

function isMobile() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}

export default function InteractiveBackground() {
  const refs = useRef<(SVGSVGElement | null)[]>([]);

  useEffect(() => {
    if (isMobile()) return;
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const factor = 30 + i * 18;
        el.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 select-none">
      {/* Pastel SVG circles and polygon */}
      {shapes.map((shape, i) => (
        <svg
          key={i}
          ref={el => { refs.current[i] = el; }}
          width={shape.size}
          height={shape.size}
          className="absolute bg-shape"
          style={{ opacity: 0.13, filter: "blur(1.5px)", ...shape.style }}
          aria-hidden="true"
        >
          {shape.type === "circle" ? (
            <circle cx={shape.size / 2} cy={shape.size / 2} r={shape.size / 2} fill={shape.color} />
          ) : (
            <polygon points={`${shape.size / 2},0 ${shape.size},${shape.size} 0,${shape.size}`} fill={shape.color} />
          )}
        </svg>
      ))}
    </div>
  );
} 