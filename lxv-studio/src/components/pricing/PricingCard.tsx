import React, { useRef } from "react";
import { motion } from "motion/react";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/src/lib/utils";

export interface PricingPackage {
  name: string;
  badge: string;
  price: string;
  desc?: string;
  target: string[];
  features: string[];
  cta: string;
}

type CardState = "idle" | "selected" | "dimmed";

interface PricingCardProps {
  pkg: PricingPackage;
  index: number;
  state: CardState;
  helperText: string;
  onSelect: (index: number) => void;
}

/**
 * A single pricing card for Compare Mode.
 *
 * - Idle: subtle lift + cursor-following border glow on hover.
 * - Selected: scales up, accent glow, becomes the visual focus.
 * - Dimmed: shrinks, fades, and blurs so the selection stands out.
 *
 * The cursor glow is driven by a CSS variable mutated directly on the DOM
 * node (no React re-render per mousemove), keeping interaction cheap.
 */
export function PricingCard({ pkg, index, state, helperText, onSelect }: PricingCardProps) {
  const glowRef = useRef<HTMLDivElement>(null);
  const isPopular = pkg.badge.includes("⭐");
  const isSelected = state === "selected";
  const isDimmed = state === "dimmed";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = glowRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      layout
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`${pkg.name} — ${pkg.price}`}
      onClick={() => onSelect(index)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(index);
        }
      }}
      onMouseMove={handleMouseMove}
      animate={{
        scale: isSelected ? 1.04 : isDimmed ? 0.97 : 1,
        opacity: isDimmed ? 0.6 : 1,
        filter: isDimmed ? "blur(2px)" : "blur(0px)",
      }}
      whileHover={state === "idle" ? { y: -6 } : undefined}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className={cn(
        "group relative flex cursor-pointer flex-col rounded-[24px] border p-8 outline-none",
        "transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-neon-pink",
        isSelected
          ? "border-transparent bg-[#121016]"
          : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]",
      )}
    >
      {/* Accent gradient border for popular / selected */}
      {(isPopular || isSelected) && (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-[-1px] -z-10 rounded-[24px] bg-gradient-to-b from-neon-pink to-neon-purple",
            isSelected ? "opacity-90" : "opacity-40",
          )}
        />
      )}

      {/* Cursor-following glow (idle hover only) */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[24px] opacity-0 transition-opacity duration-300",
          state === "idle" && "group-hover:opacity-100",
        )}
        style={{
          background:
            "radial-gradient(220px circle at var(--mx, 50%) var(--my, 0%), rgba(255,0,127,0.18), transparent 60%)",
        }}
      />

      {pkg.badge && (
        <div
          className={cn(
            "absolute -top-3.5 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold",
            isPopular
              ? "bg-gradient-to-r from-neon-pink to-neon-purple text-white shadow-[0_0_20px_rgba(255,0,127,0.4)]"
              : "border border-white/10 bg-[#1c1c1c] text-gray-300",
          )}
        >
          {pkg.badge}
        </div>
      )}

      <div className="relative z-10 mb-6 mt-2">
        <h3 className="mb-3 text-xl font-bold text-white">{pkg.name}</h3>
        <motion.div
          animate={{ scale: isSelected ? 1.06 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="origin-left bg-gradient-to-br from-white to-gray-400 bg-clip-text text-3xl font-black text-transparent"
        >
          {pkg.price}
        </motion.div>
      </div>

      {pkg.desc && (
        <p className="relative z-10 mb-6 min-h-[72px] whitespace-pre-line text-sm leading-relaxed text-gray-400">
          {pkg.desc}
        </p>
      )}

      <div className="relative z-10 mb-6 flex-1">
        <ul className="space-y-3">
          {pkg.features.slice(0, 6).map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
              <Check
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0",
                  isPopular || isSelected ? "text-neon-pink" : "text-gray-500",
                )}
                aria-hidden="true"
              />
              <span className="leading-tight">{feature}</span>
            </li>
          ))}
          {pkg.features.length > 6 && (
            <li className="pl-7 text-xs text-gray-500">
              +{pkg.features.length - 6} more
            </li>
          )}
        </ul>
      </div>

      {/* Helper text — fades in on hover when nothing is selected */}
      <div
        aria-hidden="true"
        className={cn(
          "relative z-10 mt-auto flex items-center justify-center gap-1.5 pt-2 text-xs font-medium text-neon-pink",
          "transition-all duration-300",
          isSelected
            ? "opacity-0"
            : "opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-1",
        )}
      >
        <Sparkles className="h-3.5 w-3.5" />
        {helperText}
      </div>
    </motion.div>
  );
}
