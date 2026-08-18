import { create } from "zustand";

export type CursorVariant = "default" | "cta" | "science";

export interface UiStore {
  mobileNavOpen: boolean;
  cursorVariant: CursorVariant;
  activeSection: string;
  scrollLocked: boolean;
  setMobileNavOpen: (open: boolean) => void;
  setCursorVariant: (variant: CursorVariant) => void;
  setActiveSection: (section: string) => void;
  setScrollLocked: (locked: boolean) => void;
}

export const useUiStore = create<UiStore>((set) => ({
  mobileNavOpen: false,
  cursorVariant: "default",
  activeSection: "top",
  scrollLocked: false,
  setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen }),
  setCursorVariant: (cursorVariant) => set({ cursorVariant }),
  setActiveSection: (activeSection) => set({ activeSection }),
  setScrollLocked: (scrollLocked) => set({ scrollLocked }),
}));
