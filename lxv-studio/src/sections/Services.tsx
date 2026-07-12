import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-scroll";
import { services } from "../data/services";
import { useLocalized } from "../lib/localize";
import { SectionLabel } from "../components/ui/SectionLabel";

/**
 * Feature showcase as an editorial index: full-bleed hairline rows with an
 * oversized numeral, hover-reveal arrow, and asymmetric title/description axis.
 */
export function Services() {
  const { t } = useTranslation();
  const localize = useLocalized();

  return (
    <section id="services" className="py-28 md:py-40 relative" aria-labelledby="services-heading">
      <div className="glow-blob hidden md:block absolute top-1/3 -right-32 w-[420px] h-[420px] bg-neon-purple/10 blur-[130px] -z-10" aria-hidden="true" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-24">
          <div className="max-w-2xl">
            <SectionLabel index="03" className="mb-8">{t("services.title")}</SectionLabel>
            <h2
              id="services-heading"
              className="text-[clamp(2.4rem,6vw,5rem)] font-extrabold tracking-tighter leading-[1.02]"
            >
              {t("services.title")}
            </h2>
          </div>
          <p className="text-gray-400 text-lg max-w-sm md:text-right md:pb-2">{t("services.desc")}</p>
        </div>

        <ul className="border-t border-white/10">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
              >
                <Link
                  to="pricing"
                  smooth={true}
                  duration={500}
                  offset={-80}
                  href="#pricing"
                  className="group relative grid grid-cols-[auto_1fr_auto] md:grid-cols-[80px_1fr_1fr_56px] items-center gap-x-6 md:gap-x-10 py-7 md:py-9 border-b border-white/10 cursor-pointer overflow-hidden"
                >
                  {/* Hover wash sweeping up from the baseline */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-r from-neon-pink/10 via-neon-purple/10 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
                  />

                  <span
                    aria-hidden="true"
                    className="relative text-sm font-black tracking-widest text-gray-600 tabular-nums group-hover:text-neon-pink transition-colors"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="relative flex items-center gap-4 min-w-0">
                    <Icon
                      size={20}
                      className="hidden sm:block shrink-0 text-gray-500 group-hover:text-neon-pink transition-colors"
                      aria-hidden="true"
                    />
                    <span className="text-xl md:text-3xl font-bold tracking-tight text-white group-hover:translate-x-2 transition-transform duration-300 truncate">
                      {localize(service.title)}
                    </span>
                  </span>

                  <span className="relative hidden md:block text-sm text-gray-400 leading-relaxed max-w-md">
                    {localize(service.description)}
                  </span>

                  <span
                    aria-hidden="true"
                    className="relative w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/15 flex items-center justify-center text-gray-400 group-hover:bg-neon-pink group-hover:border-neon-pink group-hover:text-white group-hover:rotate-45 transition-all duration-300"
                  >
                    <ArrowUpRight size={18} />
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
