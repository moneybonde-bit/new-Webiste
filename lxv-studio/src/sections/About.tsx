import React from "react";
import { motion } from "motion/react";
import { siteConfig } from "../config/site";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden flex items-center justify-center">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neon-pink/10 via-[#0A0A0A]/0 to-[#0A0A0A] -z-10" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center">
        <motion.div
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.02, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative w-64 h-64 md:w-80 md:h-80"
        >
          {/* Intense neon pink glow behind logo */}
          <div className="absolute inset-0 bg-neon-pink/40 blur-[80px] rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute inset-4 bg-neon-purple/30 blur-[60px] rounded-full" />

          <img
            src={siteConfig.logo}
            alt={`${siteConfig.legalName} logo`}
            width={512}
            height={512}
            loading="lazy"
            className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_25px_rgba(255,0,127,0.8)]"
          />
        </motion.div>
      </div>
    </section>
  );
}
