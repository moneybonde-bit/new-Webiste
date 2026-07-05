import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  CalendarClock,
  FolderOpen,
  LifeBuoy,
  ListChecks,
  MessageSquare,
  Milestone,
  Sparkles,
  StickyNote,
  Video,
} from "lucide-react";
import { whatsappLink, siteConfig } from "@/src/config/site";
import { cn } from "@/src/lib/utils";
import type {
  ActivityEvent,
  FileAsset,
  FileCategory,
  Meeting,
  Note,
  Project,
} from "../domain/types";
import { stageConfig } from "../domain/pipeline";
import { briefRows } from "../lib/consultationLabels";
import { getRepository } from "../data";
import { useAuth } from "../auth/AuthContext";
import { PortalShell } from "../components/PortalShell";
import { StatusTimeline } from "../components/StatusTimeline";
import { FileUploadArea } from "../components/FileUploadArea";
import { FileList } from "../components/FileList";
import {
  Card,
  CardHeader,
  EmptyState,
  FullPageSpinner,
  StatusPill,
  formatDate,
  formatDateTime,
} from "../components/ui";

interface ProjectData {
  files: FileAsset[];
  meetings: Meeting[];
  notes: Note[];
  activity: ActivityEvent[];
}

/** The client's project workspace: status, timeline, files, meetings & notes. */
export function ClientDashboardPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [data, setData] = useState<ProjectData | null>(null);

  useEffect(() => {
    let cancelled = false;
    getRepository()
      .getMyProjects()
      .then((list) => {
        if (cancelled) return;
        setProjects(list);
        setActiveId((prev) => prev ?? list[0]?.id ?? null);
      })
      .catch(() => {
        if (!cancelled) setProjects([]);
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  const project = projects?.find((p) => p.id === activeId) ?? null;

  const loadData = useCallback(async (projectId: string) => {
    const repo = getRepository();
    const [files, meetings, notes, activity] = await Promise.all([
      repo.listFiles(projectId),
      repo.listMeetings(projectId),
      repo.listNotes(projectId, false),
      repo.listActivity(projectId),
    ]);
    setData({ files, meetings, notes, activity });
  }, []);

  const activeProjectId = project?.id ?? null;
  useEffect(() => {
    if (activeProjectId) void loadData(activeProjectId);
  }, [activeProjectId, loadData]);

  if (projects === null) return <FullPageSpinner />;

  if (projects.length === 0) {
    return (
      <PortalShell>
        <div className="mx-auto max-w-lg py-16 text-center">
          <Sparkles className="mx-auto h-8 w-8 text-neon-pink" aria-hidden="true" />
          <h1 className="mt-4 text-2xl font-bold text-white">No projects yet</h1>
          <p className="mt-2 text-sm text-gray-400">
            Start with a free consultation — we'll open your project workspace the moment you
            submit it.
          </p>
          <Link
            to="/consultation"
            className="mt-6 inline-flex h-11 items-center rounded-full bg-gradient-to-r from-neon-pink to-neon-purple px-6 text-sm font-medium text-white neon-glow"
          >
            Start a consultation
          </Link>
        </div>
      </PortalShell>
    );
  }

  const firstName = project?.clientName.split(" ")[0] ?? "there";
  const stage = project ? stageConfig(project.status) : null;
  const upcoming = data?.meetings.filter((m) => new Date(m.scheduledAt) >= new Date()) ?? [];

  const upload = async (file: File, category: FileCategory) => {
    if (!project) return;
    await getRepository().uploadFile({ projectId: project.id, file, category, uploadedBy: "client" });
    await loadData(project.id);
  };

  return (
    <PortalShell>
      {/* Welcome */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">Welcome back,</p>
          <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            {firstName} 👋
          </h1>
        </div>
        {projects.length > 1 && (
          <label className="flex items-center gap-2 text-sm text-gray-400">
            Project
            <select
              value={activeId ?? ""}
              onChange={(e) => {
                setData(null); // clear stale data while the next project loads
                setActiveId(e.target.value);
              }}
              className="rounded-xl border border-white/10 bg-[#141318] px-3 py-2 text-sm text-white outline-none focus:border-neon-pink/60"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.code} — {p.name}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      {project && stage && (
        <>
          {/* Project summary / current status */}
          <Card className="mb-6 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 p-6">
              <div>
                <p className="font-mono text-xs text-gray-500">{project.code}</p>
                <h2 className="mt-1 text-xl font-bold text-white">{project.name}</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Started {formatDate(project.createdAt)} · Last update{" "}
                  {formatDate(project.updatedAt)}
                </p>
              </div>
              <div className="text-right">
                <StatusPill status={project.status} />
                <p className={cn("mt-2 max-w-[240px] text-xs", "text-gray-500")}>
                  {stage.description}
                </p>
              </div>
            </div>
          </Card>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left column: timeline */}
            <div className="space-y-6">
              <Card>
                <CardHeader title="Project timeline" icon={Milestone} />
                <div className="p-5">
                  <StatusTimeline status={project.status} />
                </div>
              </Card>

              <Card>
                <CardHeader title="Your brief" icon={ListChecks} />
                <dl className="divide-y divide-white/[0.06] text-sm">
                  {briefRows(project.consultation).map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4 px-5 py-3">
                      <dt className="text-gray-500">{label}</dt>
                      <dd className="text-right font-medium text-white">{value ?? "—"}</dd>
                    </div>
                  ))}
                </dl>
              </Card>
            </div>

            {/* Middle column: files & upload */}
            <div className="space-y-6">
              <Card>
                <CardHeader title="Share your assets" icon={FolderOpen} />
                <div className="p-5">
                  <FileUploadArea onUpload={upload} />
                </div>
              </Card>

              <Card>
                <CardHeader title="Project files" icon={FolderOpen} />
                {data ? <FileList files={data.files} /> : <EmptyState title="Loading files…" />}
              </Card>
            </div>

            {/* Right column: meetings, notes, activity, support */}
            <div className="space-y-6">
              <Card>
                <CardHeader title="Meetings" icon={Video} />
                {data && data.meetings.length > 0 ? (
                  <ul className="divide-y divide-white/[0.06]">
                    {data.meetings.map((m) => {
                      const past = new Date(m.scheduledAt) < new Date();
                      return (
                        <li key={m.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                          <div>
                            <p className={cn("text-sm font-medium", past ? "text-gray-500" : "text-white")}>
                              {m.title}
                            </p>
                            <p className="text-xs text-gray-600">
                              {formatDateTime(m.scheduledAt)} · {m.medium}
                            </p>
                          </div>
                          {m.link && !past && (
                            <a
                              href={m.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-300 hover:border-white/25 hover:text-white"
                            >
                              Join
                            </a>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <EmptyState
                    icon={CalendarClock}
                    title={upcoming.length === 0 ? "No meetings scheduled" : "Loading…"}
                    hint="We'll schedule discovery and review calls here."
                  />
                )}
              </Card>

              <Card>
                <CardHeader title="Notes from Luxavian" icon={StickyNote} />
                {data && data.notes.length > 0 ? (
                  <ul className="divide-y divide-white/[0.06]">
                    {data.notes.map((n) => (
                      <li key={n.id} className="px-5 py-3.5">
                        <p className="text-sm text-gray-200">{n.body}</p>
                        <p className="mt-1 text-xs text-gray-600">
                          {n.authorName} · {formatDateTime(n.createdAt)}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <EmptyState
                    icon={MessageSquare}
                    title="No notes yet"
                    hint="Updates from our team will appear here."
                  />
                )}
              </Card>

              <Card>
                <CardHeader title="Activity" icon={Activity} />
                {data && data.activity.length > 0 ? (
                  <ul className="max-h-72 divide-y divide-white/[0.06] overflow-y-auto">
                    {data.activity.map((a) => (
                      <li key={a.id} className="px-5 py-3">
                        <p className="text-sm text-gray-300">{a.summary}</p>
                        <p className="mt-0.5 text-xs text-gray-600">
                          {a.actorName} · {formatDateTime(a.createdAt)}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <EmptyState icon={Activity} title="No activity yet" />
                )}
              </Card>

              <a
                href={whatsappLink(
                  `Hi Luxavian, I need help with my project ${project.code} (${project.name}).`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 text-sm font-medium text-gray-300 transition-colors hover:border-neon-pink/50 hover:text-white"
              >
                <LifeBuoy className="h-4 w-4 text-neon-pink" aria-hidden="true" />
                Contact support · {siteConfig.contact.email}
              </a>
            </div>
          </div>
        </>
      )}
    </PortalShell>
  );
}
