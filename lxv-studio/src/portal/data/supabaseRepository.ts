import type {
  ActivityEvent,
  ActivityKind,
  ConsultationAnswers,
  DashboardMetrics,
  FileAsset,
  Meeting,
  Note,
  NotificationItem,
  Project,
  ProjectStatus,
} from "../domain/types";
import { PROJECT_STATUSES } from "../domain/types";
import { stageConfig } from "../domain/pipeline";
import { getSupabase } from "./supabaseClient";
import type {
  PortalRepository,
  SubmitConsultationInput,
  SubmitConsultationResult,
  UploadFileInput,
} from "./repository";

const FILES_BUCKET = "project-files";

/* ---------- row mappers (snake_case DB → camelCase domain) ---------- */

interface ProjectRow {
  id: string;
  code: string;
  name: string;
  status: ProjectStatus;
  client_email: string;
  client_name: string;
  client_company: string | null;
  client_phone: string | null;
  consultation: ConsultationAnswers;
  created_at: string;
  updated_at: string;
}

function mapProject(r: ProjectRow): Project {
  return {
    id: r.id,
    code: r.code,
    name: r.name,
    status: r.status,
    clientId: r.client_email,
    clientName: r.client_name,
    clientEmail: r.client_email,
    clientCompany: r.client_company,
    clientPhone: r.client_phone,
    consultation: r.consultation,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

/**
 * Production backend on Supabase (Postgres + RLS + Storage + Auth).
 * Schema lives in `supabase/schema.sql`; consultation submissions go through
 * the `submit_consultation` RPC so anonymous visitors can create a lead
 * without any table-level insert grants.
 */
export class SupabaseRepository implements PortalRepository {
  async submitConsultation(input: SubmitConsultationInput): Promise<SubmitConsultationResult> {
    const supabase = getSupabase();
    const { data, error } = await supabase.rpc("submit_consultation", {
      p_name: input.name,
      p_email: input.email.trim().toLowerCase(),
      p_company: input.company || null,
      p_phone: input.phone || input.whatsapp || null,
      p_consultation: input.answers,
    });
    if (error) throw error;
    return { project: mapProject(data as ProjectRow) };
  }

  async getMyProjects(): Promise<Project[]> {
    // RLS limits rows to the signed-in client's email.
    return this.selectProjects();
  }

  async getAllProjects(): Promise<Project[]> {
    // Same query — RLS grants admins every row.
    return this.selectProjects();
  }

  private async selectProjects(): Promise<Project[]> {
    const { data, error } = await getSupabase()
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data as ProjectRow[]).map(mapProject);
  }

  async getProject(id: string): Promise<Project | null> {
    const { data, error } = await getSupabase()
      .from("projects")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    return data ? mapProject(data as ProjectRow) : null;
  }

  async updateProjectStatus(
    id: string,
    status: ProjectStatus,
    actorName: string,
  ): Promise<Project> {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("projects")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    const project = mapProject(data as ProjectRow);
    const stage = stageConfig(status);
    await this.record(id, "status_changed", `Status moved to ${stage.label}`, actorName);
    await supabase.from("notifications").insert({
      project_id: id,
      recipient_email: project.clientEmail,
      title: `Your project is now in ${stage.label}`,
      body: stage.description,
    });
    // Fire-and-forget email via edge function; dashboard notification already stored.
    void supabase.functions
      .invoke("notify-status-change", {
        body: {
          email: project.clientEmail,
          projectCode: project.code,
          projectName: project.name,
          status: stage.label,
          description: stage.description,
        },
      })
      .catch(() => undefined);
    return project;
  }

  async listFiles(projectId: string): Promise<FileAsset[]> {
    const { data, error } = await getSupabase()
      .from("files")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data as Array<Record<string, unknown>>).map((r) => ({
      id: r.id as string,
      projectId: r.project_id as string,
      name: r.name as string,
      category: r.category as FileAsset["category"],
      sizeBytes: r.size_bytes as number,
      contentType: r.content_type as string,
      uploadedBy: r.uploaded_by as FileAsset["uploadedBy"],
      path: r.path as string,
      url: null,
      createdAt: r.created_at as string,
    }));
  }

  async uploadFile(input: UploadFileInput): Promise<FileAsset> {
    const supabase = getSupabase();
    const path = `${input.projectId}/${crypto.randomUUID()}-${input.file.name}`;
    const { error: storageError } = await supabase.storage
      .from(FILES_BUCKET)
      .upload(path, input.file, { contentType: input.file.type || undefined });
    if (storageError) throw storageError;

    const { data, error } = await supabase
      .from("files")
      .insert({
        project_id: input.projectId,
        name: input.file.name,
        category: input.category,
        size_bytes: input.file.size,
        content_type: input.file.type || "application/octet-stream",
        uploaded_by: input.uploadedBy,
        path,
      })
      .select()
      .single();
    if (error) throw error;
    await this.record(
      input.projectId,
      "file_uploaded",
      `File "${input.file.name}" uploaded (${input.category})`,
      input.uploadedBy === "admin" ? "Luxavian" : "Client",
    );
    const r = data as Record<string, unknown>;
    return {
      id: r.id as string,
      projectId: input.projectId,
      name: input.file.name,
      category: input.category,
      sizeBytes: input.file.size,
      contentType: input.file.type || "application/octet-stream",
      uploadedBy: input.uploadedBy,
      path,
      url: null,
      createdAt: r.created_at as string,
    };
  }

  async getFileUrl(file: FileAsset): Promise<string | null> {
    const { data, error } = await getSupabase()
      .storage.from(FILES_BUCKET)
      .createSignedUrl(file.path, 60 * 10);
    if (error) return null;
    return data.signedUrl;
  }

  async listMeetings(projectId: string): Promise<Meeting[]> {
    const { data, error } = await getSupabase()
      .from("meetings")
      .select("*")
      .eq("project_id", projectId)
      .order("scheduled_at", { ascending: true });
    if (error) throw error;
    return (data as Array<Record<string, unknown>>).map((r) => ({
      id: r.id as string,
      projectId: r.project_id as string,
      title: r.title as string,
      scheduledAt: r.scheduled_at as string,
      medium: r.medium as string,
      link: (r.link as string | null) ?? null,
      createdAt: r.created_at as string,
    }));
  }

  async scheduleMeeting(
    meeting: Omit<Meeting, "id" | "createdAt">,
    actorName: string,
  ): Promise<Meeting> {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("meetings")
      .insert({
        project_id: meeting.projectId,
        title: meeting.title,
        scheduled_at: meeting.scheduledAt,
        medium: meeting.medium,
        link: meeting.link,
      })
      .select()
      .single();
    if (error) throw error;
    await this.record(
      meeting.projectId,
      "meeting_scheduled",
      `Meeting "${meeting.title}" scheduled`,
      actorName,
    );
    const project = await this.getProject(meeting.projectId);
    if (project) {
      await supabase.from("notifications").insert({
        project_id: project.id,
        recipient_email: project.clientEmail,
        title: "New meeting scheduled",
        body: `${meeting.title} — ${new Date(meeting.scheduledAt).toLocaleString()}`,
      });
    }
    const r = data as Record<string, unknown>;
    return { ...meeting, id: r.id as string, createdAt: r.created_at as string };
  }

  async listNotes(projectId: string, includeInternal: boolean): Promise<Note[]> {
    let query = getSupabase()
      .from("notes")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false });
    if (!includeInternal) query = query.eq("internal", false);
    const { data, error } = await query;
    if (error) throw error;
    return (data as Array<Record<string, unknown>>).map((r) => ({
      id: r.id as string,
      projectId: r.project_id as string,
      body: r.body as string,
      internal: r.internal as boolean,
      authorName: r.author_name as string,
      createdAt: r.created_at as string,
    }));
  }

  async addNote(note: Omit<Note, "id" | "createdAt">): Promise<Note> {
    const { data, error } = await getSupabase()
      .from("notes")
      .insert({
        project_id: note.projectId,
        body: note.body,
        internal: note.internal,
        author_name: note.authorName,
      })
      .select()
      .single();
    if (error) throw error;
    await this.record(
      note.projectId,
      "note_added",
      note.internal ? "Internal note added" : "Note shared with client",
      note.authorName,
    );
    const r = data as Record<string, unknown>;
    return { ...note, id: r.id as string, createdAt: r.created_at as string };
  }

  async listNotifications(recipientId: string): Promise<NotificationItem[]> {
    const { data, error } = await getSupabase()
      .from("notifications")
      .select("*")
      .eq("recipient_email", recipientId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data as Array<Record<string, unknown>>).map((r) => ({
      id: r.id as string,
      projectId: r.project_id as string,
      recipientId: r.recipient_email as string,
      title: r.title as string,
      body: r.body as string,
      read: r.read as boolean,
      createdAt: r.created_at as string,
    }));
  }

  async markNotificationsRead(recipientId: string): Promise<void> {
    const { error } = await getSupabase()
      .from("notifications")
      .update({ read: true })
      .eq("recipient_email", recipientId)
      .eq("read", false);
    if (error) throw error;
  }

  async listActivity(projectId: string): Promise<ActivityEvent[]> {
    const { data, error } = await getSupabase()
      .from("activity")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data as Array<Record<string, unknown>>).map((r) => ({
      id: r.id as string,
      projectId: r.project_id as string,
      kind: r.kind as ActivityKind,
      summary: r.summary as string,
      actorName: r.actor_name as string,
      createdAt: r.created_at as string,
    }));
  }

  async getMetrics(): Promise<DashboardMetrics> {
    const projects = await this.getAllProjects();
    const { count: meetingsCount } = await getSupabase()
      .from("meetings")
      .select("*", { count: "exact", head: true });
    const byStatus = Object.fromEntries(
      PROJECT_STATUSES.map((s) => [s, 0]),
    ) as Record<ProjectStatus, number>;
    for (const p of projects) byStatus[p.status] += 1;
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);
    return {
      totalLeads: projects.length,
      activeProjects: projects.filter(
        (p) => !["lead", "launch", "maintenance"].includes(p.status),
      ).length,
      launchedProjects: byStatus.launch + byStatus.maintenance,
      meetingsScheduled: meetingsCount ?? 0,
      newLeadsThisMonth: projects.filter((p) => new Date(p.createdAt) >= monthStart).length,
      byStatus,
    };
  }

  private async record(
    projectId: string,
    kind: ActivityKind,
    summary: string,
    actorName: string,
  ): Promise<void> {
    await getSupabase()
      .from("activity")
      .insert({ project_id: projectId, kind, summary, actor_name: actorName });
  }
}
