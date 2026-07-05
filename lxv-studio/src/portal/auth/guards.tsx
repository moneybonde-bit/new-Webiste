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

/** Admin-only routes. Non-admin users land back on their own dashboard. */
export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <FullPageSpinner />;
  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }
  if (user.role !== "admin") return <Navigate to="/portal" replace />;
  return <>{children}</>;
}
