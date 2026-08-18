import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  tone?: "dark" | "cream" | "navy";
}

const tones = {
  dark: "bg-background text-foreground",
  navy: "bg-navy text-foreground",
  cream: "bg-cream text-cream-foreground",
};

export function Section({ className, tone = "dark", id, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative overflow-hidden py-16 sm:py-20 md:py-28 lg:py-32", tones[tone], className)}
      {...props}
    />
  );
}
