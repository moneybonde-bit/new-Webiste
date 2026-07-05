import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset,0_8px_24px_-8px_rgba(79,70,229,0.5)] hover:bg-accent-soft hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)_inset,0_12px_32px_-8px_rgba(99,102,241,0.6)]",
  secondary:
    "border border-line-strong bg-white/[0.03] text-zinc-100 hover:border-white/25 hover:bg-white/[0.06]",
  ghost: "text-muted hover:text-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

/**
 * Anchor-based button. Rendered on the server — hover/active motion is pure
 * CSS so no JavaScript ships for buttons.
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  external = false,
  ariaLabel,
}: ButtonLinkProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium",
    "transition-all duration-300 ease-premium active:scale-[0.98]",
    "hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
