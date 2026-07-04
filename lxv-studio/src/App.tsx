/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { lazy, Suspense } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./sections/Hero";
import { WhyChooseUs } from "./sections/WhyChooseUs";

const Services = lazy(() =>
  import("./sections/Services").then((m) => ({ default: m.Services })),
);
const Portfolio = lazy(() =>
  import("./sections/Portfolio").then((m) => ({ default: m.Portfolio })),
);
const Workflow = lazy(() =>
  import("./sections/Workflow").then((m) => ({ default: m.Workflow })),
);
const Pricing = lazy(() =>
  import("./sections/Pricing").then((m) => ({ default: m.Pricing })),
);
const FAQ = lazy(() =>
  import("./sections/FAQ").then((m) => ({ default: m.FAQ })),
);
const Contact = lazy(() =>
  import("./sections/Contact").then((m) => ({ default: m.Contact })),
);
const Footer = lazy(() =>
  import("./components/Footer").then((m) => ({ default: m.Footer })),
);
const FloatingWhatsApp = lazy(() =>
  import("./components/FloatingWhatsApp").then((m) => ({
    default: m.FloatingWhatsApp,
  })),
);

const SectionFallback = () => <div className="min-h-[40vh]" aria-hidden="true" />;

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-neon-pink/30 selection:text-white">
      <Navbar />

      <main id="main-content">
        <Hero />
        <WhyChooseUs />
        <Suspense fallback={<SectionFallback />}>
          <Services />
          <Portfolio />
          <Workflow />
          <Pricing />
          <FAQ />
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
        <FloatingWhatsApp />
      </Suspense>
    </div>
  );
}
