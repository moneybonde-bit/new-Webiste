import type {
  ActivityEvent,
  ActivityKind,
  DashboardMetrics,
  FileAsset,
  Meeting,
  Note,
  NotificationItem,
  Profile,
  Project,
  ProjectStatus,
  UserRole,
} from "../domain/types";
import { PROJECT_STATUSES } from "../domain/types";
import { stageConfig } from "../domain/pipeline";
import type {
  PortalRepository,
  SubmitConsultationInput,
  SubmitConsultationResult,
  UploadFileInput,
} from "./repository";

/**
 * Zero-config demo backend.
 *
 * Persists everything to localStorage so the portal and CRM are fully
 * usable without a Supabase project (useful for local dev and previews).
 * Uploaded file *contents* are kept in memory only — metadata persists.
 */

const KEY = "lxv.portal.demo.v1";
export const DEMO_SESSION_KEY = "lxv.portal.demo.session";
const DEMO_ROLES_KEY = "lxv.portal.demo.roles";

interface DemoDb {
  projects: Project[];
  files: FileAsset[];
  meetings: Meeting[];
  notes: Note[];
  notifications: NotificationItem[];
  activity: ActivityEvent[];
  seq: number;
}

const emptyDb = (): DemoDb => ({
  projects: [],
  files: [],
  meetings: [],
  notes: [],
  notifications: [],
  activity: [],
  seq: 0,
});

function load(): DemoDb {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...emptyDb(), ...(JSON.parse(raw) as DemoDb) } : emptyDb();
  } catch {
    return emptyDb();
  }
}

function save(db: DemoDb): void {
  localStorage.setItem(KEY, JSON.stringify(db));
}

function uid(): string {
  return crypto.randomUUID();
}

function now(): string {
  return new Date().toISOString();
}

/** In-memory blob URLs for files uploaded during this browsing session. */
const blobUrls = new Map<string, string>();

export function demoSessionEmail(): string | null {
  return localStorage.getItem(DEMO_SESSION_KEY);
}

function loadRoles(): Record<string, UserRole> {
  try {
    return JSON.parse(localStorage.getItem(DEMO_ROLES_KEY) ?? "{}") as Record<string, UserRole>;
  } catch {
    return {};
  }
}

function saveRoles(roles: Record<string, UserRole>): void {
  localStorage.setItem(DEMO_ROLES_KEY, JSON.stringify(roles));
}

export function demoRoleFor(email: string): UserRole {
  return loadRoles()[email] ?? "client";
}

/** The first account to sign in at /admin/login becomes the demo super admin. */
export function demoGrantInitialAdmin(email: string): void {
  const roles = loadRoles();
  const hasAdmin = Object.values(roles).some((r) => r !== "client");
  if (!hasAdmin) {
    roles[email] = "super_admin";
    saveRoles(roles);
  }
}

export class DemoRepository implements PortalRepository {
  async submitConsultation(input: SubmitConsultationInput): Promise<SubmitConsultationResult> {
    const db = load();
    db.seq += 1;
    const code = `LX-${new Date().getFullYear()}-${String(db.seq).padStart(6, "0")}`;
    const clientId = input.email.trim().toLowerCase();
    const project: Project = {
      id: uid(),
      code,
      name: input.company.trim() || `${input.name.split(" ")[0]}'s Project`,
      status: "lead",
      clientId,
      clientName: input.name,
      clientEmail: clientId,
      clientCompany: input.company || null,
      clientPhone: input.phone || input.whatsapp || null,
      consultation: input.answers,
      createdAt: now(),
      updatedAt: now(),
    };
    db.projects.unshift(project);
    db.activity.unshift({
      id: uid(),
      projectId: project.id,
      kind: "project_created",
      summary: `Project ${code} created from consultation`,
      actorName: input.name,
      createdAt: now(),
    });
    save(db);
    // Demo "magic link": sign the client straight in.
    localStorage.setItem(DEMO_SESSION_KEY, clientId);
    return { project };
  }

  async getMyProjects(): Promise<Project[]> {
    const email = demoSessionEmail();
    if (!email) return [];
    return load().projects.filter((p) => p.clientId === email);
  }

  async getAllProjects(): Promise<Project[]> {
    return load().projects;
  }

  async getProject(id: string): Promise<Project | null> {
    return load().projects.find((p) => p.id === id) ?? null;
  }

  async updateProjectStatus(
    id: string,
    status: ProjectStatus,
    actorName: string,
  ): Promise<Project> {
    const db = load();
    const project = db.projects.find((p) => p.id === id);
    if (!project) throw new Error("Project not found");
    project.status = status;
    project.updatedAt = now();
    const stage = stageConfig(status);
    this.record(db, project.id, "status_changed", `Status moved to ${stage.label}`, actorName);
    db.notifications.unshift({
      id: uid(),
      projectId: project.id,
      recipientId: project.clientId,
      title: `Your project is now in ${stage.label}`,
      body: stage.description,
      read: false,
      createdAt: now(),
    });
    save(db);
    return project;
  }

  async deleteProject(id: string): Promise<void> {
    const db = load();
    db.projects = db.projects.filter((p) => p.id !== id);
    db.files = db.files.filter((f) => f.projectId !== id);
    db.meetings = db.meetings.filter((m) => m.projectId !== id);
    db.notes = db.notes.filter((n) => n.projectId !== id);
    db.notifications = db.notifications.filter((n) => n.projectId !== id);
    db.activity = db.activity.filter((a) => a.projectId !== id);
    save(db);
  }

  async listTeam(): Promise<Profile[]> {
    const roles = loadRoles();
    const emails = new Set<string>([
      ...Object.keys(roles),
      ...load().projects.map((p) => p.clientEmail),
    ]);
    const session = demoSessionEmail();
    if (session) emails.add(session);
    return Array.from(emails).map((email) => ({
      id: email,
      email,
      fullName: "",
      company: null,
      phone: null,
      role: roles[email] ?? "client",
      createdAt: new Date().toISOString(),
    }));
  }

  async setUserRole(userId: string, role: UserRole): Promise<void> {
    const roles = loadRoles();
    roles[userId] = role;
    saveRoles(roles);
  }

  async listFiles(projectId: string): Promise<FileAsset[]> {
    return load().files.filter((f) => f.projectId === projectId);
  }

  async uploadFile(input: UploadFileInput): Promise<FileAsset> {
    const db = load();
    const asset: FileAsset = {
      id: uid(),
      projectId: input.projectId,
      name: input.file.name,
      category: input.category,
      sizeBytes: input.file.size,
      contentType: input.file.type || "application/octet-stream",
      uploadedBy: input.uploadedBy,
      path: `demo/${input.projectId}/${input.file.name}`,
      url: null,
      createdAt: now(),
    };
    blobUrls.set(asset.id, URL.createObjectURL(input.file));
    db.files.unshift(asset);
    this.record(
      db,
      input.projectId,
      "file_uploaded",
      `File "${input.file.name}" uploaded (${input.category})`,
      input.uploadedBy === "admin" ? "Luxavian" : "Client",
    );
    save(db);
    return asset;
  }

  async getFileUrl(file: FileAsset): Promise<string | null> {
    return blobUrls.get(file.id) ?? null;
  }

  async listMeetings(projectId: string): Promise<Meeting[]> {
    return load()
      .meetings.filter((m) => m.projectId === projectId)
      .sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt));
  }

  async scheduleMeeting(
    meeting: Omit<Meeting, "id" | "createdAt">,
    actorName: string,
  ): Promise<Meeting> {
    const db = load();
    const created: Meeting = { ...meeting, id: uid(), createdAt: now() };
    db.meetings.push(created);
    this.record(db, meeting.projectId, "meeting_scheduled", `Meeting "${meeting.title}" scheduled`, actorName);
    const project = db.projects.find((p) => p.id === meeting.projectId);
    if (project) {
      db.notifications.unshift({
        id: uid(),
        projectId: project.id,
        recipientId: project.clientId,
        title: "New meeting scheduled",
        body: `${meeting.title} — ${new Date(meeting.scheduledAt).toLocaleString()}`,
        read: false,
        createdAt: now(),
      });
    }
    save(db);
    return created;
  }

  async listNotes(projectId: string, includeInternal: boolean): Promise<Note[]> {
    return load().notes.filter(
      (n) => n.projectId === projectId && (includeInternal || !n.internal),
    );
  }

  async addNote(note: Omit<Note, "id" | "createdAt">): Promise<Note> {
    const db = load();
    const created: Note = { ...note, id: uid(), createdAt: now() };
    db.notes.unshift(created);
    this.record(
      db,
      note.projectId,
      "note_added",
      note.internal ? "Internal note added" : "Note shared with client",
      note.authorName,
    );
    save(db);
    return created;
  }

  async listNotifications(recipientId: string): Promise<NotificationItem[]> {
    return load().notifications.filter((n) => n.recipientId === recipientId);
  }

  async markNotificationsRead(recipientId: string): Promise<void> {
    const db = load();
    for (const n of db.notifications) {
      if (n.recipientId === recipientId) n.read = true;
    }
    save(db);
  }

  async listActivity(projectId: string): Promise<ActivityEvent[]> {
    return load().activity.filter((a) => a.projectId === projectId);
  }

  async getMetrics(): Promise<DashboardMetrics> {
    const db = load();
    const byStatus = Object.fromEntries(
      PROJECT_STATUSES.map((s) => [s, 0]),
    ) as Record<ProjectStatus, number>;
    for (const p of db.projects) byStatus[p.status] += 1;
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);
    return {
      totalLeads: db.projects.length,
      activeProjects: db.projects.filter(
        (p) => !["lead", "launch", "maintenance"].includes(p.status),
      ).length,
      launchedProjects: byStatus.launch + byStatus.maintenance,
      meetingsScheduled: db.meetings.length,
      newLeadsThisMonth: db.projects.filter(
        (p) => new Date(p.createdAt) >= monthStart,
      ).length,
      byStatus,
    };
  }

  private record(
    db: DemoDb,
    projectId: string,
    kind: ActivityKind,
    summary: string,
    actorName: string,
  ): void {
    db.activity.unshift({ id: uid(), projectId, kind, summary, actorName, createdAt: now() });
  }
}
