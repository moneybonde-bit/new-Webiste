import React from "react";
import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { useTranslation } from "react-i18next";
import { TiltCard } from "../components/ui/TiltCard";
import { portfolioProjects } from "../data/portfolio";
import { useLocalized } from "../lib/localize";

export function Portfolio() {
  const { t } = useTranslation();
  const localize = useLocalized();

  return (
    <section id="portfolio" className="py-24 relative bg-dark/30" aria-labelledby="portfolio-heading">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 id="portfolio-heading" className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">{t("portfolio.title")}</h2>
          <p className="text-gray-400 text-lg">{t("portfolio.desc")}</p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {portfolioProjects.map((project, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col"
            >
              <TiltCard className="overflow-hidden glass-card relative aspect-[4/3] shadow-lg shadow-black/50 border border-white/5 group-hover:border-neon-pink/30 mb-5">
                <img
                  src={project.image}
                  alt={localize(project.title)}
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" aria-hidden="true" />
                <span className="absolute bottom-3 left-3 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-neon-purple">
                  {localize(project.category)}
                </span>
              </TiltCard>

              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-neon-pink transition-colors">
                {localize(project.title)}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-1">
                {localize(project.description)}
              </p>

              <div className="flex items-center gap-3">
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
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
