import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { WhyBento } from "@/components/sections/WhyBento";
import { Services } from "@/components/sections/Services";
import { Trust } from "@/components/sections/Trust";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { Cta } from "@/components/sections/Cta";

export default function HomePage() {
  return (
    <>
      <a
        href="#konten-utama"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Lewati ke konten utama
      </a>
      <Navbar />
      <main id="konten-utama">
        <Hero />
        <WhyBento />
        <Services />
        <Trust />
        <Process />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
