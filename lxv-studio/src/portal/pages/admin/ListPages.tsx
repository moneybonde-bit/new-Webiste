import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Users } from "lucide-react";
import type { Project } from "../../domain/types";
import { getRepository } from "../../data";
import { AdminShell } from "../../components/AdminShell";
import {
  Avatar,
  Card,
  EmptyState,
  FullPageSpinner,
  StatusPill,
  formatDate,
  inputClass,
} from "../../components/ui";

/** Statuses considered "still a lead" vs. an engaged client project. */
const LEAD_STATUSES = new Set(["lead", "qualified", "meeting", "proposal", "negotiation"]);

function useProjects(): Project[] | null {
  const [projects, setProjects] = useState<Project[] | null>(null);
  useEffect(() => {
    void getRepository().getAllProjects().then(setProjects);
  }, []);
  return projects;
}

function ProjectTable({ projects, emptyTitle }: { projects: Project[]; emptyTitle: string }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter((p) =>
      [p.clientName, p.clientEmail, p.clientCompany ?? "", p.name, p.code]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [projects, query]);

  return (
    <>
      <div className="relative mb-4 max-w-sm">
        <Search
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, email, company, code…"
          aria-label="Search projects"
          className={`${inputClass} pl-10`}
        />
      </div>

      <Card className="overflow-x-auto">
        {filtered.length === 0 ? (
          <EmptyState icon={Users} title={emptyTitle} />
        ) : (
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] text-xs uppercase tracking-wide text-gray-600">
                <th className="px-5 py-3 font-medium">Client</th>
                <th className="px-5 py-3 font-medium">Project</th>
                <th className="px-5 py-3 font-medium">Budget</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filtered.map((p) => (
                <tr key={p.id} className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-5 py-3.5">
                    <Link to={`/admin/projects/${p.id}`} className="flex items-center gap-3">
                      <Avatar name={p.clientName} />
                      <span className="min-w-0">
                        <span className="block truncate font-medium text-white">{p.clientName}</span>
                        <span className="block truncate text-xs text-gray-500">{p.clientEmail}</span>
                      </span>
                    </Link>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="block text-white">{p.name}</span>
                    <span className="font-mono text-xs text-gray-600">{p.code}</span>
                  </td>
                  <td className="px-5 py-3.5 capitalize text-gray-400">
                    {p.consultation.budget ?? "—"}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusPill status={p.status} />
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">{formatDate(p.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </>
  );
}

/** Leads: consultations that haven't converted into an active engagement yet. */
export function LeadsPage() {
  const projects = useProjects();
  if (!projects) return <FullPageSpinner />;
  return (
    <AdminShell title="Leads">
      <ProjectTable
        projects={projects.filter((p) => LEAD_STATUSES.has(p.status))}
        emptyTitle="No open leads"
      />
    </AdminShell>
  );
}

/** Clients: everyone with a project in delivery or beyond. */
export function ClientsPage() {
  const projects = useProjects();
  if (!projects) return <FullPageSpinner />;
  return (
    <AdminShell title="Clients">
      <ProjectTable
        projects={projects.filter((p) => !LEAD_STATUSES.has(p.status))}
        emptyTitle="No active clients yet"
      />
    </AdminShell>
  );
}

/** All projects regardless of stage. */
export function ProjectsPage() {
  const projects = useProjects();
  if (!projects) return <FullPageSpinner />;
  return (
    <AdminShell title="Projects">
      <ProjectTable projects={projects} emptyTitle="No projects yet" />
    </AdminShell>
  );
}
