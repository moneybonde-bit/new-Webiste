import React, { useId, useState } from "react";
import { motion } from "motion/react";
import { ExternalLink, ChevronDown } from "lucide-react";
import { TiltCard } from "../ui/TiltCard";
import type { PortfolioItem } from "../../data/portfolio";
import { useLocalized } from "../../lib/localize";
import { cn } from "@/src/lib/utils";

interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
  /** Label of the primary button ("Preview" / "Live Demo"). */
  primaryLabel: string;
  /** When set, adds a Detail toggle that expands the description instead of showing it inline. */
  detailLabel?: string;
}

/** Reusable portfolio card: thumbnail with hover zoom, meta, tech chips, actions. */
export function PortfolioCard({ item, index, primaryLabel, detailLabel }: PortfolioCardProps) {
  const localize = useLocalized();
  const [detailOpen, setDetailOpen] = useState(false);
  const detailId = useId();

  const collapsibleDetail = Boolean(detailLabel);

  return (
    <motion.li
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08 }}
      className="group flex flex-col"
    >
      <TiltCard className="overflow-hidden glass-card relative aspect-[4/3] shadow-lg shadow-black/50 border border-white/5 group-hover:border-neon-pink/30 mb-5">
        <img
          src={item.thumbnail}
          alt={localize(item.title)}
          loading="lazy"
          decoding="async"
          width={600}
          height={450}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" aria-hidden="true" />
        <span
          aria-hidden="true"
          className="absolute top-4 right-5 text-4xl font-black tracking-tighter text-stroke opacity-70"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="absolute bottom-4 left-4 text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-soft-magenta">
          {localize(item.subtitle)}
          {item.year ? ` · ${item.year}` : ""}
        </span>
      </TiltCard>

      <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-2 group-hover:text-neon-pink transition-colors">
        {localize(item.title)}
      </h3>

      {collapsibleDetail ? (
        <div
          id={detailId}
          className={cn(
            "grid transition-[grid-template-rows] duration-300 ease-out",
            detailOpen ? "grid-rows-[1fr] mb-4" : "grid-rows-[0fr]",
          )}
        >
          <p className="overflow-hidden text-sm text-gray-400 leading-relaxed">
            {localize(item.description)}
          </p>
        </div>
      ) : (
        <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-1">
          {localize(item.description)}
        </p>
      )}

      {item.technologies && item.technologies.length > 0 && (
        <ul className="flex flex-wrap gap-2 mb-5" aria-label="Tech stack">
          {item.technologies.map((tech) => (
            <li
              key={tech}
              className="text-[10px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400"
            >
              {tech}
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center gap-3 mt-auto">
        {item.liveUrl && (
          <a
            href={item.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${primaryLabel} — ${localize(item.title)}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-white bg-white/5 border border-white/10 rounded-full px-4 py-2 hover:bg-neon-pink hover:border-neon-pink transition-colors"
          >
            <ExternalLink size={14} aria-hidden="true" />
            {primaryLabel}
          </a>
        )}
        {collapsibleDetail && (
          <button
            type="button"
            onClick={() => setDetailOpen((v) => !v)}
            aria-expanded={detailOpen}
            aria-controls={detailId}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 bg-white/5 border border-white/10 rounded-full px-4 py-2 hover:bg-white/10 hover:text-white transition-colors"
          >
            <ChevronDown
              size={14}
              aria-hidden="true"
              className={cn("transition-transform duration-300", detailOpen && "rotate-180")}
            />
            {detailLabel}
          </button>
        )}
      </div>
    </motion.li>
  );
}
