import type {
  ActivityEvent,
  ConsultationAnswers,
  DashboardMetrics,
  FileAsset,
  FileCategory,
  Meeting,
  Note,
  NotificationItem,
  Profile,
  Project,
  ProjectStatus,
  UserRole,
} from "../domain/types";

export interface SubmitConsultationInput {
  name: string;
  email: string;
  company: string;
  phone: string;
  whatsapp: string;
  answers: ConsultationAnswers;
}

export interface SubmitConsultationResult {
  project: Project;
}

export interface UploadFileInput {
  projectId: string;
  file: File;
  category: FileCategory;
  uploadedBy: "client" | "admin";
}

/**
 * Single data-access boundary for the portal and CRM.
 *
 * Implementations: `SupabaseRepository` (production) and `DemoRepository`
 * (zero-config localStorage mode). New modules extend this interface —
 * pages never talk to Supabase directly.
 */
export interface PortalRepository {
  // Consultation → project
  submitConsultation(input: SubmitConsultationInput): Promise<SubmitConsultationResult>;

  // Projects
  getMyProjects(): Promise<Project[]>;
  getAllProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | null>;
  updateProjectStatus(id: string, status: ProjectStatus, actorName: string): Promise<Project>;
  /** Super-admin only (enforced by RLS). */
  deleteProject(id: string): Promise<void>;

  // Team & roles (super-admin only, enforced by RLS + DB trigger)
  listTeam(): Promise<Profile[]>;
  setUserRole(userId: string, role: UserRole): Promise<void>;

  // Files
  listFiles(projectId: string): Promise<FileAsset[]>;
  uploadFile(input: UploadFileInput): Promise<FileAsset>;
  getFileUrl(file: FileAsset): Promise<string | null>;

  // Meetings
  listMeetings(projectId: string): Promise<Meeting[]>;
  scheduleMeeting(
    meeting: Omit<Meeting, "id" | "createdAt">,
    actorName: string,
  ): Promise<Meeting>;

  // Notes (internal = admin-only)
  listNotes(projectId: string, includeInternal: boolean): Promise<Note[]>;
  addNote(note: Omit<Note, "id" | "createdAt">): Promise<Note>;

  // Notifications (client dashboard bell)
  listNotifications(recipientId: string): Promise<NotificationItem[]>;
  markNotificationsRead(recipientId: string): Promise<void>;

  // Activity feed
  listActivity(projectId: string): Promise<ActivityEvent[]>;

  // Admin analytics
  getMetrics(): Promise<DashboardMetrics>;
}
