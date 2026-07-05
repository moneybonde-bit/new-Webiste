import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { PIPELINE_STAGES, progressPercent, stageIndex } from "../domain/pipeline";
import type { ProjectStatus } from "../domain/types";

/**
 * Client-facing progress tracker: completed, current, and upcoming stages
 * plus an overall progress bar.
 */
export function StatusTimeline({ status }: { status: ProjectStatus }) {
  const current = stageIndex(status);
  const percent = progressPercent(status);

  return (
    <div>
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-gray-500">Overall progress</span>
          <span className="font-semibold text-white">{percent}%</span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Project progress"
          className="h-2 overflow-hidden rounded-full bg-white/[0.06]"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-neon-pink to-neon-purple transition-[width] duration-700"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <ol className="space-y-0">
        {PIPELINE_STAGES.map((stage, i) => {
          const state = i < current ? "done" : i === current ? "current" : "upcoming";
          const Icon = stage.icon;
          const isLast = i === PIPELINE_STAGES.length - 1;
          return (
            <li key={stage.id} className="relative flex gap-4 pb-1">
              {!isLast && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-[15px] top-8 h-[calc(100%-24px)] w-px",
                    state === "done" ? "bg-neon-pink/50" : "bg-white/10",
                  )}
                />
              )}
              <span
                className={cn(
                  "z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                  state === "done" && "border-neon-pink/60 bg-neon-pink/15 text-neon-pink",
                  state === "current" &&
                    "border-transparent bg-gradient-to-br from-neon-pink to-neon-purple text-white neon-glow",
                  state === "upcoming" && "border-white/10 bg-white/[0.03] text-gray-600",
                )}
              >
                {state === "done" ? (
                  <Check className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Icon className="h-4 w-4" aria-hidden="true" />
                )}
              </span>
              <div className="pb-5 pt-1">
                <p
                  className={cn(
                    "text-sm font-semibold",
                    state === "current"
                      ? "text-white"
                      : state === "done"
                        ? "text-gray-300"
                        : "text-gray-600",
                  )}
                >
                  {stage.label}
                  {state === "current" && (
                    <span className="ml-2 rounded-full bg-neon-pink/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-neon-pink">
                      Current
                    </span>
                  )}
                </p>
                <p className={cn("mt-0.5 text-xs", state === "upcoming" ? "text-gray-700" : "text-gray-500")}>
                  {stage.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
