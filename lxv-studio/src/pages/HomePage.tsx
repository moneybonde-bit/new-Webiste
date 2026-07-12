import React, { lazy, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Hero } from "../sections/Hero";
import { WhyChooseUs } from "../sections/WhyChooseUs";
import { LazySection } from "../components/LazySection";

const Services = lazy(() =>
  import("../sections/Services").then((m) => ({ default: m.Services })),
);
const Portfolio = lazy(() =>
  import("../sections/Portfolio").then((m) => ({ default: m.Portfolio })),
);
const Workflow = lazy(() =>
  import("../sections/Workflow").then((m) => ({ default: m.Workflow })),
);
const Pricing = lazy(() =>
  import("../sections/Pricing").then((m) => ({ default: m.Pricing })),
);
const FAQ = lazy(() =>
  import("../sections/FAQ").then((m) => ({ default: m.FAQ })),
);
const FinalCTA = lazy(() =>
  import("../sections/FinalCTA").then((m) => ({ default: m.FinalCTA })),
);
const Contact = lazy(() =>
  import("../sections/Contact").then((m) => ({ default: m.Contact })),
);
const Footer = lazy(() =>
  import("../components/Footer").then((m) => ({ default: m.Footer })),
);
const FloatingWhatsApp = lazy(() =>
  import("../components/FloatingWhatsApp").then((m) => ({
    default: m.FloatingWhatsApp,
  })),
);

/** The single-page marketing landing (scroll sections). */
export function HomePage() {
  const { hash } = useLocation();

  // Support /#section links from other routes. Sections mount lazily as the
  // viewport approaches them, so scroll down in steps until the target exists.
  useEffect(() => {
    const target = hash.slice(1);
    if (!target) return;
    let attempts = 0;
    const timer = window.setInterval(() => {
      const el = document.getElementById(target);
      if (el) {
        window.clearInterval(timer);
        el.scrollIntoView({ behavior: "smooth" });
      } else if (++attempts > 25) {
        window.clearInterval(timer);
      } else {
        window.scrollBy(0, window.innerHeight);
      }
    }, 150);
    return () => window.clearInterval(timer);
  }, [hash]);

  return (
    <>
      <Navbar />

      <main id="main-content">
        <Hero />
        <WhyChooseUs />
        <LazySection><Services /></LazySection>
        <LazySection><Portfolio /></LazySection>
        <LazySection><Workflow /></LazySection>
        <LazySection><Pricing /></LazySection>
        <LazySection><FAQ /></LazySection>
        <LazySection><FinalCTA /></LazySection>
        <LazySection><Contact /></LazySection>
      </main>

      <LazySection><Footer /></LazySection>
      <LazySection><FloatingWhatsApp /></LazySection>
    </>
  );
}
