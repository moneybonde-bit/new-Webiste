import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { stageConfig } from "../domain/pipeline";
import type { ProjectStatus } from "../domain/types";

/* Shared building blocks for the portal & CRM — flat, Linear/Vercel-style. */

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("rounded-2xl border border-white/10 bg-white/[0.02]", className)}>
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  icon: Icon,
  action,
}: {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-5 py-4">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
        {Icon && <Icon className="h-4 w-4 text-neon-pink" aria-hidden="true" />}
        {title}
      </h3>
      {action}
    </div>
  );
}

export function StatusPill({ status, className }: { status: ProjectStatus; className?: string }) {
  const stage = stageConfig(status);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-white",
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", stage.dot)} aria-hidden="true" />
      {stage.label}
    </span>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  hint,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  hint?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
      {Icon && <Icon className="h-6 w-6 text-gray-600" aria-hidden="true" />}
      <p className="text-sm font-medium text-gray-400">{title}</p>
      {hint && <p className="text-xs text-gray-600">{hint}</p>}
    </div>
  );
}

export function Spinner({ className }: { className?: string }) {
  return (
    <Loader2 className={cn("h-5 w-5 animate-spin text-neon-pink", className)} aria-label="Loading" />
  );
}

export function FullPageSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Spinner className="h-7 w-7" />
    </div>
  );
}

export function StatCard({
  label,
  value,
  icon: Icon,
  hint,
}: {
  label: string;
  value: string | number;
  icon?: React.ComponentType<{ className?: string }>;
  hint?: string;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</p>
        {Icon && <Icon className="h-4 w-4 text-gray-600" aria-hidden="true" />}
      </div>
      <p className="mt-2 text-3xl font-bold tracking-tight text-white">{value}</p>
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </Card>
  );
}

export function Avatar({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-neon-pink/30 to-neon-purple/30 text-xs font-semibold text-white",
        className,
      )}
    >
      {initials || "?"}
    </span>
  );
}

export const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-gray-600 outline-none transition-colors focus:border-neon-pink/60 focus:ring-1 focus:ring-neon-pink/40";

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
