import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Base dark card with soft elevation, subtle border, and a CSS-only hover
 * lift. Interactive glow variants build on top of this.
 */
export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-line bg-surface p-7 card-highlight",
        "transition-all duration-300 ease-premium",
        "hover:-translate-y-1 hover:border-line-strong hover:bg-surface-raised",
        "motion-reduce:transform-none motion-reduce:transition-none",
        className
      )}
    >
      {children}
    </div>
  );
}

/** Icon chip used at the top of feature/service cards. */
export function CardIcon({ children }: { children: React.ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white/[0.04] text-accent-soft transition-colors duration-300 group-hover:border-accent/40 group-hover:text-white"
    >
      {children}
    </div>
  );
}
