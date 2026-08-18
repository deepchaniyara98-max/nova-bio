"use client";

import { cn } from "@/lib/utils";

interface CapabilityIllustrationProps {
  type: "helix" | "network" | "molecule" | "chart" | "cell";
  className?: string;
}

export function CapabilityIllustration({ type, className }: CapabilityIllustrationProps) {
  return (
    <svg viewBox="0 0 320 220" className={cn("h-full w-full", className)} aria-hidden>
      {type === "helix" ? <HelixMark /> : null}
      {type === "network" ? <NetworkMark /> : null}
      {type === "molecule" ? <MoleculeMark /> : null}
      {type === "chart" ? <ChartMark /> : null}
      {type === "cell" ? <CellMark /> : null}
    </svg>
  );
}

function HelixMark() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M90 30c40 30 40 50 0 80s-40 50 0 80 40 50 0 80" className="text-cyan" />
      <path d="M230 30c-40 30-40 50 0 80s40 50 0 80-40 50 0 80" className="text-violet" />
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={i} x1={90 + (i % 2) * 20} y1={42 + i * 22} x2={230 - (i % 2) * 20} y2={42 + i * 22} className="text-cyan/40" />
      ))}
    </g>
  );
}

function NetworkMark() {
  const pts = [
    [60, 110],
    [120, 48],
    [190, 70],
    [250, 40],
    [270, 130],
    [200, 170],
    [120, 160],
    [80, 180],
  ];
  return (
    <g>
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" className="fill-cyan" />
      ))}
      <path
        d="M60 110L120 48L190 70L250 40L270 130L200 170L120 160L80 180L60 110L190 70L120 160"
        className="stroke-cyan/40"
        fill="none"
      />
    </g>
  );
}

function MoleculeMark() {
  return (
    <g className="stroke-emerald fill-emerald" strokeWidth="1.5">
      <circle cx="160" cy="110" r="16" className="fill-emerald/20" />
      <circle cx="160" cy="110" r="6" />
      <circle cx="92" cy="70" r="6" />
      <circle cx="230" cy="64" r="6" />
      <circle cx="84" cy="160" r="6" />
      <circle cx="236" cy="162" r="6" />
      <line x1="160" y1="110" x2="92" y2="70" className="stroke-emerald/50" />
      <line x1="160" y1="110" x2="230" y2="64" className="stroke-emerald/50" />
      <line x1="160" y1="110" x2="84" y2="160" className="stroke-emerald/50" />
      <line x1="160" y1="110" x2="236" y2="162" className="stroke-emerald/50" />
    </g>
  );
}

function ChartMark() {
  return (
    <g className="stroke-cyan" fill="none" strokeWidth="1.6">
      <path d="M40 180H290M40 180V30" className="stroke-white/20" />
      <path d="M56 150c24-8 36-50 70-58s48 22 78 10 42-48 80-52" />
      <circle cx="204" cy="102" r="4" className="fill-cyan" />
    </g>
  );
}

function CellMark() {
  return (
    <g className="stroke-violet fill-none" strokeWidth="1.4">
      <ellipse cx="160" cy="110" rx="90" ry="70" className="stroke-violet/50" />
      <ellipse cx="160" cy="110" rx="34" ry="28" className="fill-violet/10" />
      <circle cx="160" cy="110" r="8" className="fill-violet" />
      <circle cx="108" cy="86" r="6" className="fill-cyan/70" />
      <circle cx="214" cy="128" r="5" className="fill-emerald/70" />
    </g>
  );
}
