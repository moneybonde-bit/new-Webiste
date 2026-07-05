import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Activity,
  ArrowLeft,
  CalendarPlus,
  FolderOpen,
  Lock,
  Mail,
  Phone,
  StickyNote,
  Video,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import type {
  ActivityEvent,
  FileAsset,
  FileCategory,
  Meeting,
  Note,
  Project,
  ProjectStatus,
} from "../../domain/types";
import { PROJECT_STATUSES } from "../../domain/types";
import { PIPELINE_STAGES, stageConfig } from "../../domain/pipeline";
import { briefRows } from "../../lib/consultationLabels";
import { getRepository } from "../../data";
import { useAuth } from "../../auth/AuthContext";
import { AdminShell } from "../../components/AdminShell";
import { FileUploadArea } from "../../components/FileUploadArea";
import { FileList } from "../../components/FileList";
import {
  Card,
  CardHeader,
  EmptyState,
  FullPageSpinner,
  StatusPill,
  formatDateTime,
  inputClass,
} from "../../components/ui";

/** Full CRM record for one project: status, notes, files, meetings, activity. */
export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const actor = user?.email ?? "Luxavian";

  const [project, setProject] = useState<Project | null | undefined>(undefined);
  const [files, setFiles] = useState<FileAsset[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [activity, setActivity] = useState<ActivityEvent[]>([]);

  const [noteBody, setNoteBody] = useState("");
  const [noteInternal, setNoteInternal] = useState(true);
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingAt, setMeetingAt] = useState("");
  const [meetingMedium, setMeetingMedium] = useState("gmeet");
  const [meetingLink, setMeetingLink] = useState("");
  const [savingStatus, setSavingStatus] = useState(false);

  const reload = useCallback(async () => {
    if (!id) return;
    const repo = getRepository();
    const [p, f, m, n, a] = await Promise.all([
      repo.getProject(id),
      repo.listFiles(id),
      repo.listMeetings(id),
      repo.listNotes(id, true),
      repo.listActivity(id),
    ]);
    setProject(p);
    setFiles(f);
    setMeetings(m);
    setNotes(n);
    setActivity(a);
  }, [id]);

  useEffect(() => {
    void reload();
  }, [reload]);

  if (project === undefined) return <FullPageSpinner />;

  if (project === null) {
    return (
      <AdminShell title="Project not found">
        <Link to="/admin/projects" className="text-sm text-gray-400 hover:text-white">
          ← Back to projects
        </Link>
      </AdminShell>
    );
  }

  const changeStatus = async (status: ProjectStatus) => {
    setSavingStatus(true);
    try {
      const updated = await getRepository().updateProjectStatus(project.id, status, actor);
      setProject(updated);
      await reload();
    } finally {
      setSavingStatus(false);
    }
  };

  const submitNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteBody.trim()) return;
    await getRepository().addNote({
      projectId: project.id,
      body: noteBody.trim(),
      internal: noteInternal,
      authorName: actor,
    });
    setNoteBody("");
    await reload();
  };

  const submitMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingTitle.trim() || !meetingAt) return;
    await getRepository().scheduleMeeting(
      {
        projectId: project.id,
        title: meetingTitle.trim(),
        scheduledAt: new Date(meetingAt).toISOString(),
        medium: meetingMedium,
        link: meetingLink.trim() || null,
      },
      actor,
    );
    setMeetingTitle("");
    setMeetingAt("");
    setMeetingLink("");
    await reload();
  };

  const upload = async (file: File, category: FileCategory) => {
    await getRepository().uploadFile({ projectId: project.id, file, category, uploadedBy: "admin" });
    await reload();
  };

  return (
    <AdminShell title={project.name}>
      <Link
        to="/admin/projects"
        className="mb-4 inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        All projects
      </Link>

      {/* Header card: client + status control */}
      <Card className="mb-6">
        <div className="flex flex-wrap items-start justify-between gap-5 p-6">
          <div>
            <p className="font-mono text-xs text-gray-500">{project.code}</p>
            <h2 className="mt-1 text-xl font-bold text-white">{project.clientName}</h2>
            <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-400">
              <span className="inline-flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                {project.clientEmail}
              </span>
              {project.clientPhone && (
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  {project.clientPhone}
                </span>
              )}
              {project.clientCompany && <span>{project.clientCompany}</span>}
            </div>
          </div>

          <div className="min-w-[220px]">
            <label htmlFor="status-select" className="mb-1.5 block text-xs font-medium text-gray-500">
              Status <span className="text-gray-700">(client is notified on change)</span>
            </label>
            <div className="flex items-center gap-2">
              <select
                id="status-select"
                value={project.status}
                disabled={savingStatus}
                onChange={(e) => void changeStatus(e.target.value as ProjectStatus)}
                className="w-full rounded-xl border border-white/10 bg-[#141318] px-3 py-2 text-sm text-white outline-none focus:border-neon-pink/60 disabled:opacity-60"
              >
                {PROJECT_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {stageConfig(s).label}
                  </option>
                ))}
              </select>
              <StatusPill status={project.status} />
            </div>
            {/* Stage stepper */}
            <div className="mt-3 flex gap-1" aria-hidden="true">
              {PIPELINE_STAGES.map((s, i) => (
                <span
                  key={s.id}
                  className={cn(
                    "h-1 flex-1 rounded-full",
                    i <= PROJECT_STATUSES.indexOf(project.status) ? s.dot : "bg-white/[0.06]",
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Consultation brief */}
        <dl className="grid grid-cols-2 gap-x-6 border-t border-white/[0.06] px-6 py-4 text-sm sm:grid-cols-5">
          {briefRows(project.consultation).map(([label, value]) => (
            <div key={label} className="py-1">
              <dt className="text-xs text-gray-600">{label}</dt>
              <dd className="mt-0.5 text-gray-300">{value ?? "—"}</dd>
            </div>
          ))}
        </dl>
        {project.consultation.message && (
          <p className="border-t border-white/[0.06] px-6 py-4 text-sm text-gray-400">
            “{project.consultation.message}”
          </p>
        )}
      </Card>

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Notes */}
        <Card className="xl:col-span-1">
          <CardHeader title="Notes" icon={StickyNote} />
          <form onSubmit={(e) => void submitNote(e)} className="border-b border-white/[0.06] p-5">
            <textarea
              value={noteBody}
              onChange={(e) => setNoteBody(e.target.value)}
              rows={3}
              placeholder="Write a note…"
              aria-label="New note"
              className={`${inputClass} resize-none`}
            />
            <div className="mt-3 flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-gray-400">
                <input
                  type="checkbox"
                  checked={noteInternal}
                  onChange={(e) => setNoteInternal(e.target.checked)}
                  className="h-3.5 w-3.5 accent-[#ff007f]"
                />
                Internal only
              </label>
              <button
                type="submit"
                disabled={!noteBody.trim()}
                className="rounded-full bg-gradient-to-r from-neon-pink to-neon-purple px-4 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
              >
                Add note
              </button>
            </div>
          </form>
          {notes.length === 0 ? (
            <EmptyState icon={StickyNote} title="No notes yet" />
          ) : (
            <ul className="max-h-96 divide-y divide-white/[0.06] overflow-y-auto">
              {notes.map((n) => (
                <li key={n.id} className="px-5 py-3.5">
                  <p className="text-sm text-gray-200">{n.body}</p>
                  <p className="mt-1 flex items-center gap-2 text-xs text-gray-600">
                    {n.internal && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-300">
                        <Lock className="h-2.5 w-2.5" aria-hidden="true" />
                        Internal
                      </span>
                    )}
                    {n.authorName} · {formatDateTime(n.createdAt)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* Files */}
        <div className="space-y-6 xl:col-span-1">
          <Card>
            <CardHeader title="Upload files" icon={FolderOpen} />
            <div className="p-5">
              <FileUploadArea onUpload={upload} />
            </div>
          </Card>
          <Card>
            <CardHeader title="Files" icon={FolderOpen} />
            <FileList files={files} />
          </Card>
        </div>

        {/* Meetings + activity */}
        <div className="space-y-6 xl:col-span-1">
          <Card>
            <CardHeader title="Schedule a meeting" icon={CalendarPlus} />
            <form onSubmit={(e) => void submitMeeting(e)} className="space-y-3 p-5">
              <input
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
                placeholder="Meeting title (e.g. Discovery call)"
                aria-label="Meeting title"
                className={inputClass}
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="datetime-local"
                  value={meetingAt}
                  onChange={(e) => setMeetingAt(e.target.value)}
                  aria-label="Meeting date and time"
                  className={inputClass}
                />
                <select
                  value={meetingMedium}
                  onChange={(e) => setMeetingMedium(e.target.value)}
                  aria-label="Meeting medium"
                  className="w-full rounded-xl border border-white/10 bg-[#141318] px-3 py-2 text-sm text-white outline-none focus:border-neon-pink/60"
                >
                  <option value="gmeet">Google Meet</option>
                  <option value="zoom">Zoom</option>
                  <option value="phone">Phone</option>
                  <option value="offline">In person</option>
                </select>
              </div>
              <input
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
                placeholder="Meeting link (optional)"
                aria-label="Meeting link"
                className={inputClass}
              />
              <button
                type="submit"
                disabled={!meetingTitle.trim() || !meetingAt}
                className="w-full rounded-full bg-gradient-to-r from-neon-pink to-neon-purple px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                Schedule & notify client
              </button>
            </form>
            {meetings.length > 0 && (
              <ul className="divide-y divide-white/[0.06] border-t border-white/[0.06]">
                {meetings.map((m) => (
                  <li key={m.id} className="flex items-center gap-3 px-5 py-3">
                    <Video className="h-4 w-4 shrink-0 text-gray-600" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="truncate text-sm text-white">{m.title}</p>
                      <p className="text-xs text-gray-600">
                        {formatDateTime(m.scheduledAt)} · {m.medium}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card>
            <CardHeader title="Activity" icon={Activity} />
            {activity.length === 0 ? (
              <EmptyState icon={Activity} title="No activity yet" />
            ) : (
              <ul className="max-h-80 divide-y divide-white/[0.06] overflow-y-auto">
                {activity.map((a) => (
                  <li key={a.id} className="px-5 py-3">
                    <p className="text-sm text-gray-300">{a.summary}</p>
                    <p className="mt-0.5 text-xs text-gray-600">
                      {a.actorName} · {formatDateTime(a.createdAt)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}
