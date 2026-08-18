"use client";

import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useMagnetic } from "@/hooks/use-magnetic";
import { useUiStore } from "@/stores/use-ui-store";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface MagneticButtonProps extends ButtonProps {
  href?: string;
  showArrow?: boolean;
}

export function MagneticButton({
  href,
  className,
  children,
  showArrow = true,
  onMouseEnter,
  onMouseLeave,
  ...props
}: MagneticButtonProps) {
  const { ref, onMouseMove, onMouseLeave: resetMagnetic } = useMagnetic(0.22);
  const setCursorVariant = useUiStore((s) => s.setCursorVariant);
  const motionClass = "will-change-transform";

  const content = (
    <>
      {children}
      {showArrow ? <ArrowUpRight className="h-4 w-4" aria-hidden /> : null}
    </>
  );

  if (href) {
    return (
      <Button asChild {...props}>
        <a
          href={href}
          ref={ref as React.RefObject<HTMLAnchorElement>}
          className={cn(motionClass, className)}
          onMouseMove={onMouseMove as React.MouseEventHandler<HTMLAnchorElement>}
          onMouseEnter={() => setCursorVariant("cta")}
          onMouseLeave={() => {
            resetMagnetic();
            setCursorVariant("default");
          }}
        >
          {content}
        </a>
      </Button>
    );
  }

  return (
    <Button
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={cn(motionClass, className)}
      onMouseMove={onMouseMove}
      onMouseEnter={(event) => {
        setCursorVariant("cta");
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        resetMagnetic();
        setCursorVariant("default");
        onMouseLeave?.(event);
      }}
      {...props}
    >
      {content}
    </Button>
  );
}
