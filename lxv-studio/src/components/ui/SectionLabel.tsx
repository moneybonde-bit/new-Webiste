import React from "react";
import { cn } from "@/src/lib/utils";

interface SectionLabelProps {
  /** Two-digit editorial index, e.g. "02" */
  index: string;
  children: React.ReactNode;
  /** Use the ink variant on light/ivory sections */
  variant?: "light" | "ink";
  className?: string;
}

/** Editorial eyebrow: "( 02 — What we do )" with a hairline rule. */
export function SectionLabel({ index, children, variant = "light", className }: SectionLabelProps) {
  const ink = variant === "ink";
  return (
    <p
      className={cn(
        "flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.35em]",
        ink ? "text-ink/60" : "text-gray-400",
        className,
      )}
    >
      <span className={ink ? "text-ink/40" : "text-neon-pink"}>({index})</span>
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={cn("h-px flex-1 max-w-24", ink ? "bg-ink/20" : "bg-white/15")}
      />
    </p>
  );
}
