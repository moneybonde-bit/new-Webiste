import React from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import type { Option } from "@/src/data/consultation";
import type { Localized } from "@/src/lib/localize";
import { cn } from "@/src/lib/utils";

interface OptionGridProps {
  options: Option[];
  value: string[];
  onToggle: (id: string) => void;
  resolve: (value: Localized) => string;
  multiple?: boolean;
  columns?: 2 | 3;
}

/**
 * Accessible grid of selectable option cards used across the consultation
 * steps. Works for both single- and multi-select (via `multiple`).
 * Each card is a real <button> so keyboard and screen-reader support come
 * for free; multi-select cards expose `aria-pressed`.
 */
export function OptionGrid({
  options,
  value,
  onToggle,
  resolve,
  multiple = false,
  columns = 3,
}: OptionGridProps) {
  return (
    <div
      role={multiple ? "group" : "radiogroup"}
      className={cn(
        "grid gap-3",
        columns === 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3",
      )}
    >
      {options.map((option) => {
        const isSelected = value.includes(option.id);
        const Icon = option.icon;
        return (
          <motion.button
            key={option.id}
            type="button"
            role={multiple ? undefined : "radio"}
            aria-checked={multiple ? undefined : isSelected}
            aria-pressed={multiple ? isSelected : undefined}
            onClick={() => onToggle(option.id)}
            whileTap={{ scale: 0.97 }}
            className={cn(
              "group relative flex flex-col items-start gap-3 overflow-hidden rounded-2xl border p-4 text-left outline-none transition-colors duration-200",
              "focus-visible:ring-2 focus-visible:ring-neon-pink",
              isSelected
                ? "border-transparent bg-[#151019]"
                : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]",
            )}
          >
            {isSelected && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-[-1px] -z-10 rounded-2xl bg-gradient-to-br from-neon-pink to-neon-purple opacity-80"
              />
            )}

            <div className="flex w-full items-center justify-between">
              {Icon ? (
                <span
                  className={cn(
                    "inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
                    isSelected
                      ? "bg-neon-pink/20 text-neon-pink"
                      : "bg-white/[0.05] text-gray-400 group-hover:text-white",
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
              ) : (
                <span />
              )}
              <span
                className={cn(
                  "flex h-5 w-5 items-center justify-center rounded-full border transition-all",
                  isSelected
                    ? "border-neon-pink bg-neon-pink text-white"
                    : "border-white/20 text-transparent",
                )}
              >
                <Check className="h-3 w-3" aria-hidden="true" />
              </span>
            </div>

            <div>
              <div className="text-sm font-semibold text-white">{resolve(option.label)}</div>
              {option.hint && (
                <div className="mt-0.5 text-xs text-gray-400">{resolve(option.hint)}</div>
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
