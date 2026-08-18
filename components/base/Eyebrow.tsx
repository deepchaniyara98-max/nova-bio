import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  variant?: "default" | "muted" | "cream" | "violet" | "emerald";
  className?: string;
}

export function Eyebrow({ children, variant = "default", className }: EyebrowProps) {
  return (
    <Badge variant={variant} className={cn("mb-5", className)}>
      {children}
    </Badge>
  );
}
