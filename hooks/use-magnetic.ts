"use client";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useRef, type MouseEvent } from "react";

export function useMagnetic(strength = 0.22) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const reducedMotion = useReducedMotion();

  const onMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    ref.current.style.transition = "transform 80ms linear";
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transition = "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)";
    ref.current.style.transform = "translate(0px, 0px)";
  };

  return { ref, onMouseMove, onMouseLeave };
}
