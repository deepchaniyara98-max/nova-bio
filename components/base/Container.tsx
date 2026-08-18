import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  width?: "default" | "narrow" | "wide";
}

const widths = {
  narrow: "max-w-4xl",
  default: "max-w-6xl",
  wide: "max-w-[1400px]",
};

export function Container({ className, width = "default", ...props }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-5 sm:px-6 lg:px-8", widths[width], className)}
      {...props}
    />
  );
}
