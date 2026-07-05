import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GripVertical } from "lucide-react";
import { cn } from "@/src/lib/utils";
import type { Project, ProjectStatus } from "../../domain/types";
import { PIPELINE_STAGES } from "../../domain/pipeline";
import { getRepository } from "../../data";
import { useAuth } from "../../auth/AuthContext";
import { AdminShell } from "../../components/AdminShell";
import { FullPageSpinner, formatDate } from "../../components/ui";

/**
 * Kanban pipeline: Lead → … → Maintenance with native HTML5 drag-and-drop.
 * Dropping a card on a column updates the project status (which also
 * notifies the client by email + dashboard notification).
 */
export function PipelinePage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const [overStage, setOverStage] = useState<ProjectStatus | null>(null);

  useEffect(() => {
    void getRepository().getAllProjects().then(setProjects);
  }, []);

  if (!projects) return <FullPageSpinner />;

  const moveTo = async (projectId: string, status: ProjectStatus) => {
    const project = projects.find((p) => p.id === projectId);
    if (!project || project.status === status) return;
    // Optimistic move; revert on failure.
    setProjects((list) =>
      list ? list.map((p) => (p.id === projectId ? { ...p, status } : p)) : list,
    );
    try {
      await getRepository().updateProjectStatus(projectId, status, user?.email ?? "Luxavian");
    } catch {
      setProjects((list) =>
        list ? list.map((p) => (p.id === projectId ? { ...p, status: project.status } : p)) : list,
      );
    }
  };

  return (
    <AdminShell title="Pipeline">
      <div className="-mx-5 overflow-x-auto px-5 pb-4 md:-mx-8 md:px-8">
        <div className="flex min-w-max gap-4">
          {PIPELINE_STAGES.map((stage) => {
            const cards = projects.filter((p) => p.status === stage.id);
            const isOver = overStage === stage.id;
            return (
              <section
                key={stage.id}
                aria-label={`${stage.label} column`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setOverStage(stage.id);
                }}
                onDragLeave={() => setOverStage((s) => (s === stage.id ? null : s))}
                onDrop={(e) => {
                  e.preventDefault();
                  setOverStage(null);
                  const id = e.dataTransfer.getData("text/project-id") || dragId;
                  if (id) void moveTo(id, stage.id);
                  setDragId(null);
                }}
                className={cn(
                  "flex w-64 shrink-0 flex-col rounded-2xl border bg-white/[0.015] transition-colors",
                  isOver ? "border-neon-pink/60 bg-neon-pink/[0.06]" : "border-white/[0.08]",
                )}
              >
                <header className="flex items-center justify-between px-4 py-3">
                  <span className="flex items-center gap-2 text-sm font-semibold text-white">
                    <span className={cn("h-2 w-2 rounded-full", stage.dot)} aria-hidden="true" />
                    {stage.label}
                  </span>
                  <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-xs text-gray-400">
                    {cards.length}
                  </span>
                </header>

                <div className="flex min-h-[120px] flex-1 flex-col gap-2 px-3 pb-3">
                  {cards.map((p) => (
                    <article
                      key={p.id}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/project-id", p.id);
                        e.dataTransfer.effectAllowed = "move";
                        setDragId(p.id);
                      }}
                      onDragEnd={() => {
                        setDragId(null);
                        setOverStage(null);
                      }}
                      className={cn(
                        "group cursor-grab rounded-xl border border-white/10 bg-[#141318] p-3 transition-opacity active:cursor-grabbing",
                        dragId === p.id && "opacity-40",
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/admin/projects/${p.id}`}
                          className="min-w-0 text-sm font-medium text-white hover:text-neon-pink"
                        >
                          {p.clientName}
                        </Link>
                        <GripVertical
                          className="h-4 w-4 shrink-0 text-gray-700 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="mt-0.5 truncate text-xs text-gray-500">{p.name}</p>
                      <p className="mt-2 flex items-center justify-between font-mono text-[10px] text-gray-600">
                        {p.code}
                        <span>{formatDate(p.createdAt)}</span>
                      </p>
                    </article>
                  ))}
                  {cards.length === 0 && (
                    <p className="rounded-xl border border-dashed border-white/[0.08] px-3 py-6 text-center text-xs text-gray-700">
                      Drop here
                    </p>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </AdminShell>
  );
}
