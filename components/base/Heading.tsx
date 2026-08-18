import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

const headingVariants = cva("text-balance font-semibold tracking-tightest", {
  variants: {
    size: {
      display: "text-[clamp(2.6rem,8vw,6.75rem)] leading-[0.9]",
      xl: "text-[clamp(2.1rem,5vw,4.5rem)] leading-[0.95]",
      lg: "text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.05]",
      md: "text-2xl md:text-3xl leading-tight",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

export interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4";
}

export function Heading({ as = "h2", size, className, ...props }: HeadingProps) {
  const Comp = as;
  return <Comp className={cn(headingVariants({ size }), className)} {...props} />;
}
