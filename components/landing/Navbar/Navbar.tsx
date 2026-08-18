"use client";

import { Logo } from "@/components/base/Logo";
import { MagneticButton } from "@/components/base/MagneticButton";
import { NavLink } from "@/components/common/NavLink";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { NAV_LINKS } from "@/lib/site";
import { getLenisInstance, getScrollY } from "@/lib/smooth-scroll";
import { useUiStore } from "@/stores/use-ui-store";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const mobileNavOpen = useUiStore((s) => s.mobileNavOpen);
  const setMobileNavOpen = useUiStore((s) => s.setMobileNavOpen);
  const activeSection = useUiStore((s) => s.activeSection);
  useScrollSpy();

  useEffect(() => {
    const onScroll = () => setScrolled(getScrollY() > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("novabio:lenis", onScroll);

    const lenis = getLenisInstance();
    lenis?.on("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("novabio:lenis", onScroll);
      lenis?.off("scroll", onScroll);
    };
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 md:px-6 md:pt-5">
      <nav
        className={cn(
          "pointer-events-auto mx-auto flex max-w-[1400px] items-center justify-between gap-2 rounded-full border px-3 py-2 pl-3 transition-colors sm:pl-4 md:px-4",
          scrolled
            ? "border-white/10 bg-background/80 backdrop-blur-xl"
            : "border-white/5 bg-background/30 backdrop-blur-md",
        )}
        aria-label="Primary"
      >
        <Logo className="min-w-0" />
        <ul className="hidden min-w-0 items-center lg:flex">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace("#", "");
            return (
              <li key={link.href}>
                <NavLink href={link.href} active={activeSection === id}>
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
        <div className="flex shrink-0 items-center gap-2">
          <MagneticButton href="#contact" size="sm" className="hidden xl:inline-flex">
            Start a conversation
          </MagneticButton>
          <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <SheetTrigger asChild>
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 lg:hidden"
                aria-label="Open navigation"
              >
                <Menu className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex h-dvh w-[min(100%,20rem)] flex-col bg-navy pb-[max(1.5rem,env(safe-area-inset-bottom))]"
            >
              <SheetTitle>NOVA BIO</SheetTitle>
              <SheetDescription>Engineering the future of life.</SheetDescription>
              <ul className="mt-10 flex-1 space-y-2 overflow-y-auto">
                {NAV_LINKS.map((link) => {
                  const id = link.href.replace("#", "");
                  const active = activeSection === id;
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className={cn(
                          "block rounded-2xl px-3 py-3 text-2xl font-medium transition-colors",
                          active ? "bg-white/5 text-primary" : "text-foreground",
                        )}
                        aria-current={active ? "true" : undefined}
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <MagneticButton href="#contact" className="mt-4 w-full justify-center">
                Start a conversation
              </MagneticButton>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
