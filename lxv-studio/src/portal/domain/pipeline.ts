import type { LucideIcon } from "lucide-react";
import {
  Sparkles,
  BadgeCheck,
  Video,
  FileText,
  Handshake,
  Code2,
  PenLine,
  Rocket,
  Wrench,
} from "lucide-react";
import { PROJECT_STATUSES, type ProjectStatus } from "./types";

export interface StageConfig {
  id: ProjectStatus;
  label: string;
  description: string;
  icon: LucideIcon;
  /** Tailwind text color class for accents. */
  accent: string;
  /** Tailwind background class used for dots/pills. */
  dot: string;
}

export const PIPELINE_STAGES: StageConfig[] = [
  {
    id: "lead",
    label: "Lead",
    description: "Consultation received — we're reviewing your brief.",
    icon: Sparkles,
    accent: "text-gray-300",
    dot: "bg-gray-400",
  },
  {
    id: "qualified",
    label: "Qualified",
    description: "Your project is a fit and has been prioritized.",
    icon: BadgeCheck,
    accent: "text-sky-400",
    dot: "bg-sky-400",
  },
  {
    id: "meeting",
    label: "Meeting",
    description: "Discovery call to align on scope and goals.",
    icon: Video,
    accent: "text-cyan-400",
    dot: "bg-cyan-400",
  },
  {
    id: "proposal",
    label: "Proposal",
    description: "A tailored proposal is being prepared for you.",
    icon: FileText,
    accent: "text-violet-400",
    dot: "bg-violet-400",
  },
  {
    id: "negotiation",
    label: "Negotiation",
    description: "Finalizing scope, timeline, and investment.",
    icon: Handshake,
    accent: "text-fuchsia-400",
    dot: "bg-fuchsia-400",
  },
  {
    id: "development",
    label: "Development",
    description: "Design and build in progress.",
    icon: Code2,
    accent: "text-neon-pink",
    dot: "bg-neon-pink",
  },
  {
    id: "revision",
    label: "Revision",
    description: "Refinements based on your feedback.",
    icon: PenLine,
    accent: "text-amber-400",
    dot: "bg-amber-400",
  },
  {
    id: "launch",
    label: "Launch",
    description: "Going live — final checks and deployment.",
    icon: Rocket,
    accent: "text-emerald-400",
    dot: "bg-emerald-400",
  },
  {
    id: "maintenance",
    label: "Maintenance",
    description: "Ongoing care, updates, and support.",
    icon: Wrench,
    accent: "text-teal-400",
    dot: "bg-teal-400",
  },
];

export function stageConfig(status: ProjectStatus): StageConfig {
  return PIPELINE_STAGES.find((s) => s.id === status) ?? PIPELINE_STAGES[0];
}

export function stageIndex(status: ProjectStatus): number {
  return PROJECT_STATUSES.indexOf(status);
}

/** 0–100 progress used by the client-facing tracker. */
export function progressPercent(status: ProjectStatus): number {
  return Math.round((stageIndex(status) / (PROJECT_STATUSES.length - 1)) * 100);
}
