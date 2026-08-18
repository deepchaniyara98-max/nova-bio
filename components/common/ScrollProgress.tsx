"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useEffect, useState } from "react";

export function ScrollProgress() {
  const reducedMotion = useReducedMotion();
  const { isMobile, ready } = useIsMobile();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!ready || reducedMotion || isMobile) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] bg-white/5">
      <div
        className="h-full origin-left bg-primary"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
