import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface SurfaceProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
}

const paddings = {
  none: "",
  sm: "p-4 md:p-5",
  md: "p-6 md:p-8",
  lg: "p-8 md:p-12",
};

export function Surface({ className, padding = "md", ...props }: SurfaceProps) {
  return (
    <div
      className={cn(
        "rounded-4xl border border-white/10 bg-white/[0.03] backdrop-blur-sm",
        paddings[padding],
        className,
      )}
      {...props}
    />
  );
}
