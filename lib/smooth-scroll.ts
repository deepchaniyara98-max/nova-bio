import type Lenis from "lenis";
import { useUiStore } from "@/stores/use-ui-store";

export const NAV_OFFSET = 112;

let lenis: Lenis | null = null;

export function setLenisInstance(instance: Lenis | null) {
  lenis = instance;
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("novabio:lenis"));
  }
}

export function getLenisInstance() {
  return lenis;
}

export function getScrollY() {
  return lenis?.scroll ?? (typeof window === "undefined" ? 0 : window.scrollY);
}

export function scrollToHash(hash: string) {
  const id = hash.replace("#", "") || "top";
  const target = document.getElementById(id);
  const { setActiveSection, setScrollLocked } = useUiStore.getState();

  setActiveSection(id);
  setScrollLocked(true);

  if (typeof window !== "undefined") {
    const next = id === "top" ? window.location.pathname + window.location.search : `#${id}`;
    window.history.replaceState(null, "", next);
  }

  const unlock = () => {
    window.setTimeout(() => {
      setScrollLocked(false);
      setActiveSection(id);
    }, 80);
  };

  if (!target) {
    setScrollLocked(false);
    return;
  }

  if (lenis) {
    lenis.scrollTo(target, {
      offset: 0,
      duration: 1.05,
      force: true,
      onComplete: unlock,
    });
    return;
  }

  const top =
    id === "top" ? 0 : target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: "auto" });
  window.setTimeout(unlock, 50);
}
