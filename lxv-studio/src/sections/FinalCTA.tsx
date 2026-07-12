import React from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-scroll";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "../components/ui/Button";
import { whatsappLink } from "../config/site";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
});

/** Full-bleed closing statement with oversized type and a single, focused CTA. */
export function FinalCTA() {
  const { t } = useTranslation();

  return (
    <section className="relative py-32 md:py-48 overflow-hidden" aria-labelledby="final-cta-heading">
      {/* Cinematic backdrop */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="glow-blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] bg-neon-purple/10 blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0A0A0A_85%)]" />
      </div>

      <div className="container mx-auto px-6 flex flex-col items-center text-center">
        <motion.p
          {...fadeUp(0)}
          className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gray-400 mb-10"
        >
          <span className="text-neon-pink">(✦)</span>&nbsp;&nbsp;{t("finalCta.label")}
        </motion.p>

        <h2 id="final-cta-heading" className="mb-10">
          <motion.span
            {...fadeUp(0.1)}
            className="block text-[clamp(3rem,9.5vw,8.5rem)] font-extrabold tracking-tighter leading-[0.98] text-white"
          >
            {t("finalCta.line1")}
          </motion.span>
          <motion.span
            {...fadeUp(0.22)}
            className="block text-[clamp(3rem,9.5vw,8.5rem)] leading-[1.05] font-editorial text-gradient"
          >
            {t("finalCta.line2")}
          </motion.span>
        </h2>

        <motion.p {...fadeUp(0.3)} className="text-lg text-gray-400 max-w-md leading-relaxed mb-12">
          {t("finalCta.desc")}
        </motion.p>

        <motion.div {...fadeUp(0.38)} className="flex flex-col sm:flex-row items-center gap-4">
          <Link to="contact" smooth={true} duration={500} offset={-80}>
            <Button size="lg" className="w-full sm:w-auto gap-2">
              {t("finalCta.button")} <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Button>
          </Link>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-14 px-8 text-base font-medium text-gray-300 rounded-full border border-white/15 hover:bg-white/10 hover:text-white transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-neon-pink" aria-hidden="true" />
            {t("finalCta.whatsapp")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
