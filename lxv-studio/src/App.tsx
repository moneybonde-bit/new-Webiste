/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { WhyChooseUs } from "./sections/WhyChooseUs";
import { TargetClients } from "./sections/TargetClients";
import { Portfolio } from "./sections/Portfolio";
import { Workflow } from "./sections/Workflow";
import { Pricing } from "./sections/Pricing";
import { FAQ } from "./sections/FAQ";
import { Contact } from "./sections/Contact";
import { Footer } from "./components/Footer";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-neon-pink/30 selection:text-white">
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <WhyChooseUs />
        <TargetClients />
        <Portfolio />
        <Workflow />
        <Pricing />
        <FAQ />
        <Contact />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

