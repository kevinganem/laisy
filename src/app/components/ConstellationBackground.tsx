"use client";
import React, { useRef, useEffect } from "react";

const DESKTOP_POINTS = 150;
const MOBILE_POINTS = 75;
const LINE_DIST = 120;
const CURSOR_RADIUS = 220;
const TWINKLE_SPEED = 1.5;
const RESPAWN_MIN = 3;
const RESPAWN_MAX = 8;

type Point = {
  x: number;
  y: number;
  twinklePhase: number;
  twinkleSpeed: number;
  opacity: number;
  respawnAt: number;
};

function randomPos(w: number, h: number): { x: number; y: number } {
  return { x: Math.random() * w, y: Math.random() * h };
}

function isMobile() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}

export default function ConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const points = useRef<Point[]>([]);
  const mouse = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const pointCount = useRef<number>(DESKTOP_POINTS);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = window.innerWidth;
    let height = window.innerHeight;
    pointCount.current = isMobile() ? MOBILE_POINTS : DESKTOP_POINTS;
    canvas.width = width;
    canvas.height = height;

    // Initialize fixed points with twinkle phase, speed, and respawn timer
    const now = performance.now();
    points.current = Array.from({ length: pointCount.current }, () => {
      const pos = randomPos(width, height);
      return {
        x: pos.x,
        y: pos.y,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: TWINKLE_SPEED * (0.7 + Math.random() * 0.6),
        opacity: 1,
        respawnAt: now + 1000 * (RESPAWN_MIN + Math.random() * (RESPAWN_MAX - RESPAWN_MIN)),
      };
    });

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      const now = performance.now();
      // Update points: twinkle animation and respawn
      points.current.forEach((p) => {
        p.opacity = 0.12 + 0.18 * Math.abs(Math.sin((now / 1000) * p.twinkleSpeed + p.twinklePhase));
        if (now > p.respawnAt) {
          const pos = randomPos(width, height);
          p.x = pos.x;
          p.y = pos.y;
          p.twinklePhase = Math.random() * Math.PI * 2;
          p.twinkleSpeed = TWINKLE_SPEED * (0.7 + Math.random() * 0.6);
          p.respawnAt = now + 1000 * (RESPAWN_MIN + Math.random() * (RESPAWN_MAX - RESPAWN_MIN));
        }
      });
      // Find points close to the cursor
      const activePoints = points.current.filter(p => Math.hypot(p.x - mouse.current.x, p.y - mouse.current.y) < CURSOR_RADIUS);
      // Connect active points together if close enough
      for (let i = 0; i < activePoints.length; i++) {
        for (let j = i + 1; j < activePoints.length; j++) {
          const a = activePoints[i], b = activePoints[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LINE_DIST) {
            if (!ctx) continue;
            ctx.strokeStyle = `rgba(255,255,255,${0.32 * Math.min(a.opacity, b.opacity)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      // Draw all points
      points.current.forEach(p => {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    draw();

    // Mouse move: update cursor position
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Mouse leave: hide lines by moving cursor offscreen
    const onMouseLeave = () => {
      mouse.current.x = -1000;
      mouse.current.y = -1000;
    };
    window.addEventListener("mouseleave", onMouseLeave);

    // Handle window resize: update canvas and points
    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      pointCount.current = isMobile() ? MOBILE_POINTS : DESKTOP_POINTS;
      canvas.width = width;
      canvas.height = height;
      const now = performance.now();
      points.current = Array.from({ length: pointCount.current }, () => {
        const pos = randomPos(width, height);
        return {
          x: pos.x,
          y: pos.y,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: TWINKLE_SPEED * (0.7 + Math.random() * 0.6),
          opacity: 1,
          respawnAt: now + 1000 * (RESPAWN_MIN + Math.random() * (RESPAWN_MAX - RESPAWN_MIN)),
        };
      });
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10"
      style={{ background: "none" }}
      aria-hidden="true"
    />
  );
} 