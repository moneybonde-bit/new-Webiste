import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, CalendarClock, Rocket, TrendingUp, Users } from "lucide-react";
import type { DashboardMetrics, Project } from "../../domain/types";
import { PIPELINE_STAGES } from "../../domain/pipeline";
import { getRepository } from "../../data";
import { AdminShell } from "../../components/AdminShell";
import {
  Card,
  CardHeader,
  EmptyState,
  FullPageSpinner,
  StatCard,
  StatusPill,
  formatDate,
} from "../../components/ui";

/** CRM overview: headline metrics, pipeline distribution, latest leads. */
export function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [recent, setRecent] = useState<Project[]>([]);

  useEffect(() => {
    const repo = getRepository();
    void Promise.all([repo.getMetrics(), repo.getAllProjects()]).then(([m, projects]) => {
      setMetrics(m);
      setRecent(projects.slice(0, 6));
    });
  }, []);

  if (!metrics) return <FullPageSpinner />;

  const maxCount = Math.max(1, ...Object.values(metrics.byStatus));

  return (
    <AdminShell title="Overview">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total leads" value={metrics.totalLeads} icon={Users} />
        <StatCard
          label="New this month"
          value={metrics.newLeadsThisMonth}
          icon={TrendingUp}
          hint="Consultations received"
        />
        <StatCard label="Active projects" value={metrics.activeProjects} icon={Briefcase} />
        <StatCard label="Launched" value={metrics.launchedProjects} icon={Rocket} />
        <StatCard label="Meetings" value={metrics.meetingsScheduled} icon={CalendarClock} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Pipeline distribution" />
          <div className="space-y-3 p-5">
            {PIPELINE_STAGES.map((stage) => {
              const count = metrics.byStatus[stage.id];
              return (
                <div key={stage.id} className="flex items-center gap-3">
                  <span className="w-24 shrink-0 text-xs text-gray-500">{stage.label}</span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/[0.05]">
                    <div
                      className={`h-full rounded-full ${stage.dot}`}
                      style={{ width: `${(count / maxCount) * 100}%` }}
                    />
                  </div>
                  <span className="w-6 text-right text-xs font-semibold text-white">{count}</span>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Latest leads"
            action={
              <Link to="/admin/leads" className="text-xs text-gray-500 hover:text-white">
                View all
              </Link>
            }
          />
          {recent.length === 0 ? (
            <EmptyState icon={Users} title="No leads yet" hint="New consultations land here." />
          ) : (
            <ul className="divide-y divide-white/[0.06]">
              {recent.map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/admin/projects/${p.id}`}
                    className="flex items-center justify-between gap-3 px-5 py-3.5 transition-colors hover:bg-white/[0.03]"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">
                        {p.clientName}
                        <span className="ml-2 font-mono text-xs text-gray-600">{p.code}</span>
                      </p>
                      <p className="truncate text-xs text-gray-500">
                        {p.name} · {formatDate(p.createdAt)}
                      </p>
                    </div>
                    <StatusPill status={p.status} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </AdminShell>
  );
}
