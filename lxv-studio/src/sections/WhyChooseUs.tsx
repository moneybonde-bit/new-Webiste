import React from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { SectionLabel } from "../components/ui/SectionLabel";

const fadeIn = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

/**
 * Problem → Solution manifesto. Deliberately inverts the palette to an
 * ivory editorial spread for maximum contrast against the dark hero.
 */
export function WhyChooseUs() {
  const { t } = useTranslation();
  const reasons = t("why.reasons", { returnObjects: true }) as string[];

  return (
    <section
      id="why"
      className="relative overflow-hidden bg-ivory text-ink py-28 md:py-40"
      aria-labelledby="why-heading"
    >
      {/* Oversized ghost numeral anchoring the composition */}
      <span
        aria-hidden="true"
        className="text-stroke-ink pointer-events-none select-none absolute -top-10 right-[4%] text-[28vw] font-black leading-none tracking-tighter"
      >
        02
      </span>

      <div className="container mx-auto px-6 relative">
        {/* The problem — pushed left, oversized statement */}
        <motion.div {...fadeIn} className="max-w-3xl mb-24 md:mb-32">
          <SectionLabel index="02" variant="ink" className="mb-8">
            {t("why.problemLabel")}
          </SectionLabel>
          <h2
            id="why-heading"
            className="text-[clamp(2.2rem,5.5vw,4.5rem)] font-extrabold tracking-tighter leading-[1.02] mb-6"
          >
            {t("why.problemTitle")}
          </h2>
          <p className="text-lg text-ink/60 leading-relaxed max-w-xl">{t("why.problemDesc")}</p>
        </motion.div>

        {/* The answer — pushed right, serif accent */}
        <motion.div {...fadeIn} className="max-w-3xl ml-auto mb-24 md:mb-32 md:text-right">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-ink/50 mb-8">
            ✦ {t("why.solutionLabel")}
          </p>
          <p className="font-editorial text-[clamp(1.9rem,4.5vw,3.6rem)] leading-[1.12] text-ink">
            {t("why.solutionTitle")}
          </p>
          <p className="text-lg text-ink/60 leading-relaxed max-w-xl mt-6 md:ml-auto">
            {t("why.desc")}
          </p>
        </motion.div>

        {/* Numbered editorial index of reasons */}
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-16" aria-label={t("why.title")}>
          {reasons.map((reason, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (index % 2) * 0.08 }}
              className="group flex items-baseline gap-6 py-5 border-t border-ink/15"
            >
              <span
                aria-hidden="true"
                className="text-xs font-bold tracking-widest text-ink/35 tabular-nums group-hover:text-neon-pink transition-colors"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-lg md:text-xl font-semibold tracking-tight group-hover:translate-x-1.5 transition-transform duration-300">
                {reason}
              </span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
