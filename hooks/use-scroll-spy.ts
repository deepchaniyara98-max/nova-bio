"use client";

import { NAV_LINKS } from "@/lib/site";
import { getLenisInstance, getScrollY } from "@/lib/smooth-scroll";
import { useUiStore } from "@/stores/use-ui-store";
import { useEffect } from "react";

const SPY_OFFSET = 128;

function sectionIds() {
  return ["top", ...NAV_LINKS.map((link) => link.href.replace("#", ""))];
}

export function getActiveSectionFromScroll() {
  if (typeof window === "undefined") return "top";

  const ids = sectionIds();
  const y = getScrollY();
  const viewport = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;

  if (y < 48) return "top";
  if (y + viewport >= docHeight - 64) return ids[ids.length - 1] ?? "contact";

  let current = "top";
  ids.forEach((id) => {
    const element = document.getElementById(id);
    if (!element) return;
    if (element.getBoundingClientRect().top - SPY_OFFSET <= 0) {
      current = id;
    }
  });

  return current;
}

export function useScrollSpy() {
  const setActiveSection = useUiStore((s) => s.setActiveSection);

  useEffect(() => {
    let frame = 0;
    let lenis = getLenisInstance();

    const sync = () => {
      if (useUiStore.getState().scrollLocked) return;
      const next = getActiveSectionFromScroll();
      if (useUiStore.getState().activeSection !== next) {
        setActiveSection(next);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(sync);
    };

    const bindLenis = () => {
      lenis?.off("scroll", onScroll);
      lenis = getLenisInstance();
      lenis?.on("scroll", onScroll);
      sync();
    };

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("novabio:lenis", bindLenis);
    bindLenis();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("novabio:lenis", bindLenis);
      lenis?.off("scroll", onScroll);
    };
  }, [setActiveSection]);
}
