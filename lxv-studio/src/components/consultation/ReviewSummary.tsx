import React from "react";
import { motion } from "motion/react";
import { CalendarClock, Rocket } from "lucide-react";
import type { Option } from "@/src/data/consultation";
import type { Localized } from "@/src/lib/localize";
import { cn } from "@/src/lib/utils";
import { Button } from "../ui/Button";

export interface SummaryRow {
  label: string;
  value: string;
}

interface ReviewSummaryProps {
  rows: SummaryRow[];
  meetingOptions: Option[];
  meeting: string | null;
  onMeeting: (id: string) => void;
  resolve: (value: Localized) => string;
  labels: {
    meetingTitle: string;
    submit: string;
    submitting: string;
    hint: string;
  };
  submitting: boolean;
  error: string | null;
  onSubmit: () => void;
}

/** Final review: summarized answers, meeting preference, and workspace creation. */
export function ReviewSummary({
  rows,
  meetingOptions,
  meeting,
  onMeeting,
  resolve,
  labels,
  submitting,
  error,
  onSubmit,
}: ReviewSummaryProps) {
  return (
    <div className="space-y-8">
      <dl className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start justify-between gap-6 px-5 py-3.5">
            <dt className="text-sm text-gray-500">{row.label}</dt>
            <dd className="max-w-[60%] text-right text-sm font-medium text-white">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div>
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
          <CalendarClock className="h-4 w-4 text-neon-pink" aria-hidden="true" />
          {labels.meetingTitle}
        </h4>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {meetingOptions.map((option) => {
            const isSelected = meeting === option.id;
            const Icon = option.icon;
            return (
              <motion.button
                key={option.id}
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => onMeeting(option.id)}
                aria-pressed={isSelected}
                className={cn(
                  "relative flex flex-col items-center gap-2 overflow-hidden rounded-xl border p-3 text-center outline-none transition-colors focus-visible:ring-2 focus-visible:ring-neon-pink",
                  isSelected
                    ? "border-transparent bg-[#151019]"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20",
                )}
              >
                {isSelected && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-[-1px] -z-10 rounded-xl bg-gradient-to-br from-neon-pink to-neon-purple opacity-80"
                  />
                )}
                {Icon && (
                  <Icon
                    className={cn("h-5 w-5", isSelected ? "text-neon-pink" : "text-gray-400")}
                    aria-hidden="true"
                  />
                )}
                <span className="text-xs font-medium text-white">{resolve(option.label)}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-white/10 pt-6">
        {error && (
          <p role="alert" className="mb-3 text-center text-sm text-red-400">
            {error}
          </p>
        )}
        <Button className="w-full gap-2" size="lg" onClick={onSubmit} disabled={submitting}>
          <Rocket className="h-4 w-4" aria-hidden="true" />
          {submitting ? labels.submitting : labels.submit}
        </Button>
        <p className="mt-3 text-center text-xs text-gray-500">{labels.hint}</p>
      </div>
    </div>
  );
}
