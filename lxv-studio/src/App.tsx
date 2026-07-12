/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AuthProvider } from "./portal/auth/AuthContext";
import { RequireAdmin, RequireAuth, RequireSuperAdmin } from "./portal/auth/guards";

const ConsultationPage = lazy(() =>
  import("./pages/ConsultationPage").then((m) => ({ default: m.ConsultationPage })),
);
const PortfolioCategoryPage = lazy(() =>
  import("./pages/PortfolioCategoryPage").then((m) => ({
    default: m.PortfolioCategoryPage,
  })),
);

// Portal & CRM are lazy so the marketing site's initial payload stays small.
const LoginPage = lazy(() =>
  import("./portal/pages/LoginPage").then((m) => ({ default: m.LoginPage })),
);
const ClientDashboardPage = lazy(() =>
  import("./portal/pages/ClientDashboardPage").then((m) => ({ default: m.ClientDashboardPage })),
);
const AdminDashboardPage = lazy(() =>
  import("./portal/pages/admin/AdminDashboardPage").then((m) => ({
    default: m.AdminDashboardPage,
  })),
);
const PipelinePage = lazy(() =>
  import("./portal/pages/admin/PipelinePage").then((m) => ({ default: m.PipelinePage })),
);
const LeadsPage = lazy(() =>
  import("./portal/pages/admin/ListPages").then((m) => ({ default: m.LeadsPage })),
);
const ClientsPage = lazy(() =>
  import("./portal/pages/admin/ListPages").then((m) => ({ default: m.ClientsPage })),
);
const ProjectsPage = lazy(() =>
  import("./portal/pages/admin/ListPages").then((m) => ({ default: m.ProjectsPage })),
);
const ProjectDetailPage = lazy(() =>
  import("./portal/pages/admin/ProjectDetailPage").then((m) => ({
    default: m.ProjectDetailPage,
  })),
);
const TeamPage = lazy(() =>
  import("./portal/pages/admin/TeamPage").then((m) => ({ default: m.TeamPage })),
);

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-neon-pink/30 selection:text-white">
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/portfolio/:category" element={<PortfolioCategoryPage />} />
              <Route path="/consultation" element={<ConsultationPage />} />

              {/* Client portal */}
              <Route path="/portal/login" element={<LoginPage />} />
              <Route
                path="/portal"
                element={
                  <RequireAuth>
                    <ClientDashboardPage />
                  </RequireAuth>
                }
              />

              {/* Admin CRM */}
              <Route path="/admin/login" element={<LoginPage admin />} />
              <Route
                path="/admin"
                element={
                  <RequireAdmin>
                    <AdminDashboardPage />
                  </RequireAdmin>
                }
              />
              <Route
                path="/admin/pipeline"
                element={
                  <RequireAdmin>
                    <PipelinePage />
                  </RequireAdmin>
                }
              />
              <Route
                path="/admin/leads"
                element={
                  <RequireAdmin>
                    <LeadsPage />
                  </RequireAdmin>
                }
              />
              <Route
                path="/admin/clients"
                element={
                  <RequireAdmin>
                    <ClientsPage />
                  </RequireAdmin>
                }
              />
              <Route
                path="/admin/projects"
                element={
                  <RequireAdmin>
                    <ProjectsPage />
                  </RequireAdmin>
                }
              />
              <Route
                path="/admin/projects/:id"
                element={
                  <RequireAdmin>
                    <ProjectDetailPage />
                  </RequireAdmin>
                }
              />
              <Route
                path="/admin/team"
                element={
                  <RequireSuperAdmin>
                    <TeamPage />
                  </RequireSuperAdmin>
                }
              />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}
