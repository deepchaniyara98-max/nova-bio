"use client";

import { useInViewport } from "@/hooks/use-in-viewport";
import { useIsMobile } from "@/hooks/use-mobile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface ParticleFieldProps {
  className?: string;
  density?: number;
  color?: string;
}

export function ParticleField({
  className,
  density = 48,
  color = "rgba(0, 229, 255, 0.55)",
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { ref, inView } = useInViewport<HTMLDivElement>("140px");
  const reducedMotion = useReducedMotion();
  const { isMobile } = useIsMobile();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion || !inView) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const count = isMobile ? Math.floor(density / 2.4) : density;
    let frame = 0;
    let running = true;
    let width = 0;
    let height = 0;

    const particles = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.00028,
      vy: (Math.random() - 0.5) * 0.00028,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(p.x * width, p.y * height, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      frame = requestAnimationFrame(tick);
    };

    resize();
    frame = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [color, density, inView, isMobile, reducedMotion]);

  return (
    <div ref={ref} className={cn("pointer-events-none absolute inset-0", className)}>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
