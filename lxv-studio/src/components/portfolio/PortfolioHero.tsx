import React from "react";
import { motion } from "motion/react";
import { Breadcrumb, type Crumb } from "./Breadcrumb";

interface PortfolioHeroProps {
  crumbs: Crumb[];
  emoji: string;
  title: string;
  subtitle: string;
  headingId: string;
}

/** Category-page hero, matching the landing page's editorial system. */
export function PortfolioHero({ crumbs, emoji, title, subtitle, headingId }: PortfolioHeroProps) {
  return (
    <div className="relative overflow-hidden pt-36 md:pt-44 pb-16 md:pb-24">
      <div
        className="glow-blob hidden md:block absolute -top-24 right-[10%] w-[480px] h-[480px] bg-neon-purple/12 blur-[140px] -z-10"
        aria-hidden="true"
      />
      <div
        className="glow-blob hidden md:block absolute top-1/2 -left-32 w-[380px] h-[380px] bg-neon-pink/10 blur-[130px] -z-10"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <Breadcrumb crumbs={crumbs} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
          className="text-3xl mb-6"
        >
          {emoji}
        </motion.p>

        <motion.h1
          id={headingId}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(2.4rem,6.5vw,5.5rem)] font-extrabold tracking-tighter leading-[1.02] max-w-5xl mb-6"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg text-gray-400 leading-relaxed max-w-xl border-l-2 border-neon-pink/50 pl-4"
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
}
