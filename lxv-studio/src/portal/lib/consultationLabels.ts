import {
  budgets,
  businessTypes,
  packageOptions,
  projectGoals,
  timelines,
  type Option,
} from "@/src/data/consultation";
import type { ConsultationAnswers } from "../domain/types";

function label(list: Option[], id: string | null): string | null {
  if (!id) return null;
  const found = list.find((o) => o.id === id);
  // The portal UI is English-first; fall back to the raw id for unknown values.
  return found ? found.label.en : id;
}

/** Human-readable summary rows for a stored consultation brief. */
export function briefRows(c: ConsultationAnswers): Array<[string, string | null]> {
  return [
    ["Package", label(packageOptions, c.packageId)],
    ["Business type", label(businessTypes, c.businessType)],
    ["Goals", c.goals.map((g) => label(projectGoals, g)).filter(Boolean).join(", ") || null],
    ["Timeline", label(timelines, c.timeline)],
    ["Budget", label(budgets, c.budget)],
  ];
}
