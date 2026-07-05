"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Stagger delay in seconds. */
  delay?: number;
  className?: string;
  /** Render as a different HTML element (defaults to div). */
  as?: "div" | "li";
}

const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

/**
 * Scroll-triggered fade + slide + blur reveal.
 *
 * Server-rendered children stay in the HTML (SEO-safe); only this thin
 * wrapper hydrates. When prefers-reduced-motion is set we keep the exact
 * same element tree (avoiding a hydration mismatch) and simply skip the
 * hidden initial state, so content is visible immediately.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const Component = as === "li" ? motion.li : motion.div;

  return (
    <Component
      className={className}
      variants={revealVariants}
      initial={shouldReduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.7, delay, ease: EASE_PREMIUM }
      }
    >
      {children}
    </Component>
  );
}
