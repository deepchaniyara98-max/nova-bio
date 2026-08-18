"use client";

import { cn } from "@/lib/utils";
import { scrollToHash } from "@/lib/smooth-scroll";
import { usePathname } from "next/navigation";

interface LogoProps {
  className?: string;
  inverted?: boolean;
}

export function Logo({ className, inverted = false }: LogoProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <a
      href={isHome ? "#top" : "/"}
      className={cn(
        "group inline-flex items-center gap-2.5 font-semibold tracking-tight",
        inverted ? "text-cream-foreground" : "text-foreground",
        className,
      )}
      aria-label="NOVA BIO home"
      onClick={(event) => {
        if (!isHome) return;
        event.preventDefault();
        scrollToHash("top");
      }}
    >
      <span
        className={cn(
          "relative flex h-8 w-8 items-center justify-center rounded-full border",
          inverted ? "border-cream-foreground/20" : "border-primary/40",
        )}
        aria-hidden
      >
        <span className="absolute inset-[5px] rounded-full border border-current opacity-50" />
        <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />
      </span>
      <span className="truncate text-xs uppercase tracking-[0.22em] sm:text-sm">Nova Bio</span>
    </a>
  );
}
