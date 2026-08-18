"use client";

import { useInViewport } from "@/hooks/use-in-viewport";
import { useIsMobile } from "@/hooks/use-mobile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useUiStore } from "@/stores/use-ui-store";
import { useVisualizationStore } from "@/stores/use-visualization-store";
import type { VisualizationNode } from "@/types/science";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useRef, useState } from "react";

interface MolecularVisualizationProps {
  nodes: VisualizationNode[];
  edges: Array<[string, string]>;
  className?: string;
  interactive?: boolean;
  palette?: "cyan" | "violet" | "emerald";
}

const PALETTES = {
  cyan: { node: "rgba(0,229,255,0.95)", glow: "rgba(0,229,255,0.18)", line: "rgba(0,229,255,0.28)" },
  violet: { node: "rgba(176,132,255,0.95)", glow: "rgba(176,132,255,0.18)", line: "rgba(176,132,255,0.28)" },
  emerald: { node: "rgba(52,211,153,0.95)", glow: "rgba(52,211,153,0.18)", line: "rgba(52,211,153,0.28)" },
};

type DrawnNode = VisualizationNode & { px: number; py: number };

export function MolecularVisualization({
  nodes,
  edges,
  className,
  interactive = true,
  palette = "cyan",
}: MolecularVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { ref: viewportRef, inView } = useInViewport<HTMLDivElement>("160px");
  const reducedMotion = useReducedMotion();
  const { isMobile } = useIsMobile();
  const setCursorVariant = useUiStore((s) => s.setCursorVariant);
  const setHoveredNodeId = useVisualizationStore((s) => s.setHoveredNodeId);
  const hoveredNodeId = useVisualizationStore((s) => s.hoveredNodeId);
  const hoveredNodeIdRef = useRef<string | null>(null);
  const nodesRef = useRef(nodes);
  const edgesRef = useRef(edges);
  const colorsRef = useRef(PALETTES[palette]);
  const drawnRef = useRef<DrawnNode[]>([]);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; node: VisualizationNode } | null>(
    null,
  );

  hoveredNodeIdRef.current = hoveredNodeId;
  nodesRef.current = nodes;
  edgesRef.current = edges;
  colorsRef.current = PALETTES[palette];

  const nodeMap = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !inView) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let running = true;
    let width = 0;
    let height = 0;
    const pointer = { x: 0.5, y: 0.5 };
    const extra = isMobile ? 10 : 22;
    const satellites = Array.from({ length: extra }, () => ({
      phase: Math.random() * Math.PI * 2,
      speed: 0.004 + Math.random() * 0.006,
      radius: 0.03 + Math.random() * 0.08,
      originX: Math.random(),
      originY: Math.random(),
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

    const draw = (time: number) => {
      if (!running) return;
      const colors = colorsRef.current;
      const currentNodes = nodesRef.current;
      const currentEdges = edgesRef.current;
      ctx.clearRect(0, 0, width, height);

      const t = reducedMotion ? 0 : time * 0.00035;
      const positions: DrawnNode[] = currentNodes.map((node) => {
        const driftX = Math.sin(t + node.x * 8) * 0.018;
        const driftY = Math.cos(t + node.y * 7) * 0.018;
        const pullX = interactive ? (pointer.x - 0.5) * 0.06 : 0;
        const pullY = interactive ? (pointer.y - 0.5) * 0.06 : 0;
        return {
          ...node,
          px: (node.x + driftX + pullX) * width,
          py: (node.y + driftY + pullY) * height,
        };
      });
      drawnRef.current = positions;
      const byId = new Map(positions.map((node) => [node.id, node]));

      currentEdges.forEach(([a, b]) => {
        const na = byId.get(a);
        const nb = byId.get(b);
        if (!na || !nb) return;
        ctx.beginPath();
        ctx.strokeStyle = colors.line;
        ctx.lineWidth = 1;
        ctx.moveTo(na.px, na.py);
        ctx.lineTo(nb.px, nb.py);
        ctx.stroke();
      });

      if (!reducedMotion) {
        satellites.forEach((s) => {
          s.phase += s.speed;
          const x = (s.originX + Math.cos(s.phase) * s.radius) * width;
          const y = (s.originY + Math.sin(s.phase * 0.9) * s.radius) * height;
          ctx.beginPath();
          ctx.fillStyle = colors.glow;
          ctx.arc(x, y, 1.4, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      positions.forEach((node) => {
        const active = hoveredNodeIdRef.current === node.id;
        ctx.beginPath();
        ctx.fillStyle = colors.glow;
        ctx.arc(node.px, node.py, active ? 26 : 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = colors.node;
        ctx.arc(node.px, node.py, active ? 5.5 : 3.4, 0, Math.PI * 2);
        ctx.fill();
      });

      frame = requestAnimationFrame(draw);
    };

    const onMove = (event: PointerEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width;
      pointer.y = (event.clientY - rect.top) / rect.height;
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const hit = drawnRef.current.find((node) => Math.hypot(node.px - x, node.py - y) < 22);

      if (hit) {
        setHoveredNodeId(hit.id);
        setCursorVariant("science");
        setTooltip({ x, y, node: hit });
      } else {
        setHoveredNodeId(null);
        setCursorVariant("default");
        setTooltip(null);
      }
    };

    const onLeave = () => {
      setHoveredNodeId(null);
      setCursorVariant("default");
      setTooltip(null);
    };

    resize();
    frame = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    if (interactive) {
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerleave", onLeave);
    }

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [inView, interactive, isMobile, reducedMotion, setCursorVariant, setHoveredNodeId]);

  const hovered = hoveredNodeId ? nodeMap.get(hoveredNodeId) : null;
  const tooltipX = Math.min(tooltip?.x ?? 0, 280);

  return (
    <div ref={viewportRef} className={cn("relative h-full w-full", className)}>
      <canvas
        ref={canvasRef}
        className={cn("h-full w-full", interactive ? "touch-none" : "pointer-events-none")}
        aria-label="Interactive molecular network"
        role="img"
      />
      {tooltip && hovered ? (
        <div
          className="pointer-events-none absolute z-10 max-w-[220px] rounded-2xl border border-white/10 bg-background/90 px-3 py-2 text-xs text-muted-foreground backdrop-blur"
          style={{ left: tooltipX + 16, top: Math.max(12, tooltip.y - 12) }}
        >
          <p className="mb-1 font-semibold text-foreground">{hovered.label}</p>
          {hovered.insight}
        </div>
      ) : null}
    </div>
  );
}
