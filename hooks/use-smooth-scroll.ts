"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { setLenisInstance, scrollToHash } from "@/lib/smooth-scroll";
import { useUiStore } from "@/stores/use-ui-store";
import Lenis from "lenis";
import { useEffect } from "react";

function bindHashLinks() {
  const onClick = (event: MouseEvent) => {
    const target = (event.target as HTMLElement | null)?.closest("a[href^='#']");
    if (!target) return;
    const href = target.getAttribute("href");
    if (!href || href === "#") return;
    event.preventDefault();

    const inSheet = Boolean(target.closest('[role="dialog"]'));
    useUiStore.getState().setMobileNavOpen(false);

    if (inSheet) {
      window.setTimeout(() => scrollToHash(href), 180);
      return;
    }

    scrollToHash(href);
  };

  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
}

export function useSmoothScroll() {
  const reducedMotion = useReducedMotion();
  const { isMobile, ready } = useIsMobile();

  useEffect(() => bindHashLinks(), []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.location.hash) return;
    const id = window.setTimeout(() => scrollToHash(window.location.hash), 80);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!ready) return;

    if (reducedMotion || isMobile) {
      setLenisInstance(null);
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });
    setLenisInstance(lenis);

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      setLenisInstance(null);
      lenis.destroy();
    };
  }, [isMobile, ready, reducedMotion]);
}
