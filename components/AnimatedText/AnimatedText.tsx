"use client";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
  delay?: number;
}

export function AnimatedText({ text, className, as = "p", delay = 0 }: AnimatedTextProps) {
  const reducedMotion = useReducedMotion();
  const words = text.split(" ");
  const Comp = motion[as];

  if (reducedMotion) {
    const Tag = as;
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Comp className={cn(className)} aria-label={text}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden align-bottom px-[0.12em] py-[0.1em] -mx-[0.08em] -my-[0.06em]"
        >
          <motion.span
            className="inline-block pb-[0.08em]"
            initial={{ y: "115%", opacity: 0, filter: "blur(8px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            transition={{
              duration: 0.8,
              delay: delay + index * 0.045,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}
