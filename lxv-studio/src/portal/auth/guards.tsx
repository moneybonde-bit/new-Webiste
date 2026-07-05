import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { FullPageSpinner } from "../components/ui";

/** Redirects anonymous visitors to the portal login, preserving the target. */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <FullPageSpinner />;
  if (!user) {
    return <Navigate to="/portal/login" state={{ from: location.pathname }} replace />;
  }
  return <>{children}</>;
}

/** Staff-only routes (admin or super_admin). Clients land back on their dashboard. */
export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();
  if (loading) return <FullPageSpinner />;
  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }
  if (!isAdmin) return <Navigate to="/portal" replace />;
  return <>{children}</>;
}

/** Super-admin-only routes (team management, destructive actions). */
export function RequireSuperAdmin({ children }: { children: React.ReactNode }) {
  const { user, loading, isSuperAdmin } = useAuth();
  const location = useLocation();
  if (loading) return <FullPageSpinner />;
  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }
  if (!isSuperAdmin) return <Navigate to="/admin" replace />;
  return <>{children}</>;
}
