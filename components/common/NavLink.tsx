"use client";

import { cn } from "@/lib/utils";
import type { MouseEvent, ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  active?: boolean;
  onClick?: () => void;
}

export function NavLink({ href, children, className, active, onClick }: NavLinkProps) {
  const handleClick = (_event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.();
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(
        "group relative rounded-full px-2.5 py-2 text-[13px] transition-colors xl:px-3.5 xl:text-sm",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
        className,
      )}
      aria-current={active ? "true" : undefined}
    >
      {children}
      <span
        className={cn(
          "absolute inset-x-3 -bottom-0.5 h-px origin-left bg-primary transition-transform duration-300",
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
        )}
      />
    </a>
  );
}
