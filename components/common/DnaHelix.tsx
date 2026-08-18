"use client";

import { cn } from "@/lib/utils";

interface DnaHelixProps {
  className?: string;
  tone?: "cyan" | "violet" | "navy";
}

export function DnaHelix({ className, tone = "cyan" }: DnaHelixProps) {
  const stroke =
    tone === "violet" ? "stroke-violet" : tone === "navy" ? "stroke-cream-foreground/40" : "stroke-cyan";
  const fill =
    tone === "violet" ? "fill-violet" : tone === "navy" ? "fill-cream-foreground" : "fill-cyan";

  return (
    <svg viewBox="0 0 240 420" className={cn("h-full w-full", className)} aria-hidden>
      {Array.from({ length: 14 }).map((_, i) => {
        const y = 24 + i * 28;
        const phase = i * 0.46;
        const x1 = 120 + Math.sin(phase) * 70;
        const x2 = 120 + Math.sin(phase + Math.PI) * 70;
        return (
          <g key={i} className="origin-center motion-safe:animate-pulseGlow" style={{ animationDelay: `${i * 90}ms` }}>
            <line x1={x1} y1={y} x2={x2} y2={y} className={cn(stroke, "opacity-40")} strokeWidth="1.5" />
            <circle cx={x1} cy={y} r="5" className={cn(fill, i % 2 ? "opacity-90" : "opacity-50")} />
            <circle cx={x2} cy={y} r="5" className={cn(fill, i % 2 ? "opacity-50" : "opacity-90")} />
          </g>
        );
      })}
    </svg>
  );
}
