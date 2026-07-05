/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";

const ConsultationPage = lazy(() =>
  import("./pages/ConsultationPage").then((m) => ({ default: m.ConsultationPage })),
);

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-neon-pink/30 selection:text-white">
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/consultation" element={<ConsultationPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
