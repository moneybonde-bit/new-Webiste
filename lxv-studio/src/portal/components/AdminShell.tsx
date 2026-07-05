import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Gauge,
  KanbanSquare,
  Users,
  Briefcase,
  FolderKanban,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { LogoIcon } from "@/src/components/ui/Logo";
import { useAuth } from "../auth/AuthContext";
import { isDemoMode } from "../data";

const NAV = [
  { to: "/admin", label: "Overview", icon: Gauge, end: true },
  { to: "/admin/pipeline", label: "Pipeline", icon: KanbanSquare, end: false },
  { to: "/admin/leads", label: "Leads", icon: Users, end: false },
  { to: "/admin/clients", label: "Clients", icon: Briefcase, end: false },
  { to: "/admin/projects", label: "Projects", icon: FolderKanban, end: false },
];

/** Admin CRM layout: fixed sidebar on desktop, slide-over on mobile. */
export function AdminShell({ title, children }: { title: string; children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = (
    <nav className="flex flex-1 flex-col gap-1 px-3" aria-label="Admin">
      {NAV.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={() => setMobileOpen(false)}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-white/[0.07] text-white"
                : "text-gray-500 hover:bg-white/[0.04] hover:text-white",
            )
          }
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
          {label}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-white/[0.06] bg-[#0d0c10] py-5 lg:flex">
        <Link to="/" className="mb-6 flex items-center gap-2.5 px-5" aria-label="Luxavian — back to website">
          <span className="h-8 w-8">
            <LogoIcon />
          </span>
          <span className="text-sm font-bold text-white">
            Luxavian <span className="font-normal text-gray-500">CRM</span>
          </span>
        </Link>
        {nav}
        <div className="border-t border-white/[0.06] px-5 pt-4">
          <p className="mb-2 truncate text-xs text-gray-500">{user?.email}</p>
          <button
            type="button"
            onClick={() => void signOut()}
            className="flex items-center gap-2 text-xs text-gray-500 transition-colors hover:text-white"
          >
            <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile slide-over */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-64 flex-col border-r border-white/10 bg-[#0d0c10] py-5">
            <div className="mb-6 flex items-center justify-between px-5">
              <span className="text-sm font-bold text-white">Luxavian CRM</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="text-gray-400"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            {nav}
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col lg:pl-60">
        <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-background/80 backdrop-blur-md">
          <div className="flex items-center gap-3 px-5 py-4 md:px-8">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="rounded-lg border border-white/10 p-2 text-gray-400 lg:hidden"
            >
              <Menu className="h-4 w-4" aria-hidden="true" />
            </button>
            <h1 className="text-lg font-bold tracking-tight text-white">{title}</h1>
          </div>
          {isDemoMode && (
            <p className="border-t border-amber-500/20 bg-amber-500/10 px-5 py-1.5 text-xs text-amber-300">
              Demo mode — data lives in this browser only. Connect Supabase to go live.
            </p>
          )}
        </header>
        <main className="flex-1 px-5 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
