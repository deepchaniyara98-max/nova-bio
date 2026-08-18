import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva("text-pretty", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg md:text-xl",
      lead: "text-base md:text-lg lg:text-xl leading-relaxed",
    },
    tone: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      cream: "text-cream-foreground/70",
      inverse: "text-cream-foreground",
    },
  },
  defaultVariants: {
    size: "base",
    tone: "default",
  },
});

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div";
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ className, size, tone, as = "p", ...props }, ref) => {
    const Comp = as;
    return (
      <Comp
        ref={ref as React.Ref<HTMLParagraphElement>}
        className={cn(textVariants({ size, tone }), className)}
        {...props}
      />
    );
  },
);
Text.displayName = "Text";
