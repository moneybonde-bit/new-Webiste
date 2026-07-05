import React from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface StepProgressProps {
  steps: string[];
  current: number;
}

/** Slim progress bar + labelled dots for the consultation flow. */
export function StepProgress({ steps, current }: StepProgressProps) {
  const pct = (current / (steps.length - 1)) * 100;

  return (
    <div className="w-full">
      <div className="relative h-1 w-full rounded-full bg-white/10">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-neon-pink to-neon-purple"
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
        />
      </div>

      <ol className="mt-4 hidden justify-between gap-2 md:flex">
        {steps.map((label, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <li key={label} className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-semibold transition-colors",
                  done
                    ? "border-transparent bg-gradient-to-br from-neon-pink to-neon-purple text-white"
                    : active
                      ? "border-neon-pink text-neon-pink"
                      : "border-white/15 text-gray-500",
                )}
              >
                {done ? <Check className="h-3 w-3" aria-hidden="true" /> : i + 1}
              </span>
              <span
                className={cn(
                  "truncate text-[11px]",
                  active ? "text-white" : "text-gray-500",
                )}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
