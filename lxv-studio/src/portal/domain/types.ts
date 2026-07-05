/**
 * Portal domain model.
 *
 * These are the core entities shared by the client portal and the admin CRM.
 * They are persistence-agnostic: the data layer (see `../data`) maps them to
 * Supabase rows or to the local demo store. Future modules (Invoices,
 * Contracts, Payments, Tickets, Knowledge Base) add new entities here and new
 * methods on the repository without touching existing code.
 */

/** Pipeline stages, in order. Doubles as the project status. */
export const PROJECT_STATUSES = [
  "lead",
  "qualified",
  "meeting",
  "proposal",
  "negotiation",
  "development",
  "revision",
  "launch",
  "maintenance",
] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export type UserRole = "client" | "admin";

export interface Profile {
  id: string;
  email: string;
  fullName: string;
  company: string | null;
  phone: string | null;
  role: UserRole;
  createdAt: string;
}

/** Everything captured by the multi-step consultation form. */
export interface ConsultationAnswers {
  packageId: string | null;
  businessType: string | null;
  goals: string[];
  timeline: string | null;
  budget: string | null;
  meeting: string | null;
  message: string;
}

export interface Project {
  id: string;
  /** Human-readable unique code, e.g. LX-2026-000001. */
  code: string;
  name: string;
  status: ProjectStatus;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientCompany: string | null;
  clientPhone: string | null;
  consultation: ConsultationAnswers;
  createdAt: string;
  updatedAt: string;
}

export interface FileAsset {
  id: string;
  projectId: string;
  name: string;
  category: FileCategory;
  sizeBytes: number;
  contentType: string;
  uploadedBy: "client" | "admin";
  /** Storage path (Supabase) or object URL (demo). */
  path: string;
  url: string | null;
  createdAt: string;
}

export const FILE_CATEGORIES = [
  "logo",
  "images",
  "documents",
  "brand-guidelines",
  "other",
] as const;

export type FileCategory = (typeof FILE_CATEGORIES)[number];

export interface Meeting {
  id: string;
  projectId: string;
  title: string;
  scheduledAt: string;
  medium: string; // gmeet | zoom | phone | offline
  link: string | null;
  createdAt: string;
}

export interface Note {
  id: string;
  projectId: string;
  body: string;
  /** Internal notes are only visible in the admin CRM. */
  internal: boolean;
  authorName: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  projectId: string;
  recipientId: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

export type ActivityKind =
  | "project_created"
  | "status_changed"
  | "file_uploaded"
  | "note_added"
  | "meeting_scheduled";

export interface ActivityEvent {
  id: string;
  projectId: string;
  kind: ActivityKind;
  summary: string;
  actorName: string;
  createdAt: string;
}

export interface DashboardMetrics {
  totalLeads: number;
  activeProjects: number;
  launchedProjects: number;
  meetingsScheduled: number;
  newLeadsThisMonth: number;
  byStatus: Record<ProjectStatus, number>;
}
