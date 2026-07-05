import React from "react";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Logo } from "@/src/components/ui/Logo";
import { useAuth } from "../auth/AuthContext";
import { NotificationBell } from "./NotificationBell";
import { Avatar } from "./ui";
import { isDemoMode } from "../data";

/** Layout for the client-facing portal: top bar with notifications + sign-out. */
export function PortalShell({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[400px] bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(255,0,127,0.12),transparent_70%)]" />

      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Link to="/" aria-label="Luxavian — back to website">
              <Logo />
            </Link>
            <span className="hidden rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:inline">
              Client Portal
            </span>
          </div>
          <div className="flex items-center gap-3">
            <NotificationBell />
            {user && (
              <div className="flex items-center gap-2">
                <Avatar name={user.email} />
                <span className="hidden max-w-[180px] truncate text-sm text-gray-400 md:inline">
                  {user.email}
                </span>
              </div>
            )}
            <button
              type="button"
              onClick={() => void signOut()}
              aria-label="Sign out"
              className="rounded-full border border-white/10 p-2 text-gray-400 transition-colors hover:border-white/25 hover:text-white"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
        {isDemoMode && (
          <p className="border-t border-amber-500/20 bg-amber-500/10 px-6 py-1.5 text-center text-xs text-amber-300">
            Demo mode — data is stored in this browser. Connect Supabase to go live.
          </p>
        )}
      </header>

      <main className="container mx-auto px-6 py-8 md:py-10">{children}</main>
    </div>
  );
}
