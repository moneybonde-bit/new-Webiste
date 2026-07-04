/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { lazy } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./sections/Hero";
import { WhyChooseUs } from "./sections/WhyChooseUs";
import { LazySection } from "./components/LazySection";

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

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-neon-pink/30 selection:text-white">
      <Navbar />

      <main id="main-content">
        <Hero />
        <WhyChooseUs />
        <LazySection><Services /></LazySection>
        <LazySection><Portfolio /></LazySection>
        <LazySection><Workflow /></LazySection>
        <LazySection><Pricing /></LazySection>
        <LazySection><FAQ /></LazySection>
        <LazySection><Contact /></LazySection>
      </main>

      <LazySection><Footer /></LazySection>
      <LazySection><FloatingWhatsApp /></LazySection>
    </div>
  );
}
