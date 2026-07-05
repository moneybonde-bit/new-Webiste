import React, { useEffect, useState } from "react";
import { ShieldCheck, Users } from "lucide-react";
import type { Profile, UserRole } from "../../domain/types";
import { getRepository, isDemoMode } from "../../data";
import { useAuth } from "../../auth/AuthContext";
import { AdminShell } from "../../components/AdminShell";
import { Avatar, Card, CardHeader, EmptyState, FullPageSpinner } from "../../components/ui";

const ROLE_LABELS: Record<UserRole, string> = {
  client: "Client",
  admin: "Admin",
  super_admin: "Super Admin",
};

/**
 * Super-admin-only team management: view every account and assign roles.
 * Role changes are enforced server-side (RLS + a DB trigger), the UI is
 * just a convenience on top.
 */
export function TeamPage() {
  const { user } = useAuth();
  const [team, setTeam] = useState<Profile[] | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reload = () => getRepository().listTeam().then(setTeam);

  useEffect(() => {
    void reload();
  }, []);

  if (!team) return <FullPageSpinner />;

  const changeRole = async (profile: Profile, role: UserRole) => {
    setSaving(profile.id);
    setError(null);
    try {
      await getRepository().setUserRole(profile.id, role);
      await reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not update the role.");
    } finally {
      setSaving(null);
    }
  };

  return (
    <AdminShell title="Team & roles">
      <Card className="max-w-3xl">
        <CardHeader title="Accounts" icon={ShieldCheck} />
        {error && (
          <p role="alert" className="border-b border-white/[0.06] px-5 py-3 text-sm text-red-400">
            {error}
          </p>
        )}
        {team.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No accounts yet"
            hint="Accounts appear after their first magic-link sign-in."
          />
        ) : (
          <ul className="divide-y divide-white/[0.06]">
            {team.map((p) => {
              const isSelf = p.id === user?.id;
              return (
                <li key={p.id} className="flex items-center justify-between gap-4 px-5 py-3.5">
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar name={p.fullName || p.email} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">
                        {p.fullName || p.email}
                        {isSelf && <span className="ml-2 text-xs text-gray-600">(you)</span>}
                      </p>
                      <p className="truncate text-xs text-gray-500">{p.email}</p>
                    </div>
                  </div>
                  <label className="sr-only" htmlFor={`role-${p.id}`}>
                    Role for {p.email}
                  </label>
                  <select
                    id={`role-${p.id}`}
                    value={p.role}
                    disabled={saving === p.id || isSelf}
                    onChange={(e) => void changeRole(p, e.target.value as UserRole)}
                    className="rounded-xl border border-white/10 bg-[#141318] px-3 py-1.5 text-sm text-white outline-none focus:border-neon-pink/60 disabled:opacity-50"
                  >
                    {(Object.keys(ROLE_LABELS) as UserRole[]).map((r) => (
                      <option key={r} value={r}>
                        {ROLE_LABELS[r]}
                      </option>
                    ))}
                  </select>
                </li>
              );
            })}
          </ul>
        )}
      </Card>
      <p className="mt-4 max-w-3xl text-xs text-gray-600">
        {isDemoMode
          ? "Demo mode: the first account to sign in at /admin/login became the super admin."
          : "You can't change your own role here — ask another super admin, or use SQL. Role changes are enforced by the database, not just this page."}
      </p>
    </AdminShell>
  );
}
