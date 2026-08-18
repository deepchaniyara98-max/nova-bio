"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useUiStore } from "@/stores/use-ui-store";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export function CustomCursor() {
  const { isMobile, ready } = useIsMobile();
  const reducedMotion = useReducedMotion();
  const variant = useUiStore((s) => s.cursorVariant);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ready || isMobile || reducedMotion) return;

    document.documentElement.classList.add("has-custom-cursor");
    const onMove = (event: MouseEvent) => {
      if (!cursorRef.current) return;
      cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
    };
  }, [isMobile, ready, reducedMotion]);

  if (!ready || isMobile || reducedMotion) return null;

  const expanded = variant !== "default";

  return (
    <div
      ref={cursorRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden mix-blend-screen md:block"
      style={{ width: 14, height: 14 }}
    >
      <span
        className={cn(
          "block h-full w-full rounded-full border border-primary/80 transition-transform duration-200",
          variant === "science" ? "scale-[3.4] bg-violet/10" : expanded ? "scale-[3.6] bg-primary/15" : "scale-100 bg-primary/20",
        )}
      />
    </div>
  );
}
