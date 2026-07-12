import React from "react";
import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { useTranslation } from "react-i18next";
import { TiltCard } from "../components/ui/TiltCard";
import { portfolioProjects } from "../data/portfolio";
import { useLocalized } from "../lib/localize";
import { SectionLabel } from "../components/ui/SectionLabel";

interface Stat {
  value: string;
  label: string;
}

/**
 * Selected work in an asymmetric editorial grid (the lead project runs
 * full-width) followed by a high-contrast results band.
 */
export function Portfolio() {
  const { t } = useTranslation();
  const localize = useLocalized();
  const stats = t("results.stats", { returnObjects: true }) as Stat[];

  return (
    <section id="portfolio" className="py-28 md:py-40 relative bg-dark/30" aria-labelledby="portfolio-heading">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-24">
          <div className="max-w-2xl">
            <SectionLabel index="04" className="mb-8">{t("portfolio.label")}</SectionLabel>
            <h2
              id="portfolio-heading"
              className="text-[clamp(2.4rem,6vw,5rem)] font-extrabold tracking-tighter leading-[1.02]"
            >
              {t("portfolio.title")}
            </h2>
          </div>
          <p className="text-gray-400 text-lg max-w-sm md:text-right md:pb-2">{t("portfolio.desc")}</p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {portfolioProjects.map((project, index) => {
            const isLead = index === 0;
            return (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
                className={`group flex flex-col ${isLead ? "md:col-span-2" : ""}`}
              >
                <TiltCard
                  className={`overflow-hidden glass-card relative shadow-lg shadow-black/50 border border-white/5 group-hover:border-neon-pink/30 mb-6 ${
                    isLead ? "aspect-[4/3] md:aspect-[21/9]" : "aspect-[4/3]"
                  }`}
                >
                  <img
                    src={project.image}
                    alt={localize(project.title)}
                    loading="lazy"
                    decoding="async"
                    width={isLead ? 1200 : 600}
                    height={isLead ? 515 : 450}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" aria-hidden="true" />
                  <span
                    aria-hidden="true"
                    className="absolute top-4 right-5 text-4xl md:text-5xl font-black tracking-tighter text-stroke opacity-70"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="absolute bottom-4 left-4 text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-soft-magenta">
                    {localize(project.category)}
                  </span>
                </TiltCard>

                <div className={`flex flex-col ${isLead ? "md:flex-row md:items-end md:justify-between md:gap-12" : ""}`}>
                  <div className="flex-1">
                    <h3
                      className={`font-bold tracking-tight text-white mb-2 group-hover:text-neon-pink transition-colors ${
                        isLead ? "text-2xl md:text-4xl" : "text-xl md:text-2xl"
                      }`}
                    >
                      {localize(project.title)}
                    </h3>
                    <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-5 max-w-xl">
                      {localize(project.description)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 mb-1">
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${t("portfolio.visit")} — ${localize(project.title)}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-white bg-white/5 border border-white/10 rounded-full px-4 py-2 hover:bg-neon-pink hover:border-neon-pink transition-colors"
                      >
                        <ExternalLink size={14} aria-hidden="true" />
                        {t("portfolio.visit")}
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${localize(project.title)} — GitHub repository`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 bg-white/5 border border-white/10 rounded-full px-4 py-2 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        <Github size={14} aria-hidden="true" />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>

        {/* Results band */}
        <dl className="mt-24 md:mt-32 grid grid-cols-2 lg:grid-cols-4 border-t border-white/10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex flex-col-reverse py-10 md:py-14 px-2 md:px-8 border-b lg:border-b-0 border-white/10 lg:border-r lg:last:border-r-0 lg:first:pl-0"
            >
              <dd className="text-sm text-gray-400 leading-snug">{stat.label}</dd>
              <dt className="text-[clamp(2.4rem,5vw,4.2rem)] font-black tracking-tighter leading-none text-gradient mb-3">
                {stat.value}
              </dt>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
