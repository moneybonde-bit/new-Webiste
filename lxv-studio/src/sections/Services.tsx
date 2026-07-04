import React from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { services } from "../data/services";
import { useLocalized } from "../lib/localize";

export function Services() {
  const { t } = useTranslation();
  const localize = useLocalized();

  return (
    <section id="services" className="py-24 relative" aria-labelledby="services-heading">
      <div className="glow-blob absolute top-0 right-1/4 w-96 h-96 bg-neon-pink/10 blur-[120px] -z-10" aria-hidden="true" />

      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 id="services-heading" className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">{t("services.title")}</h2>
          <p className="text-gray-400 text-lg">{t("services.desc")}</p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative p-8 glass-card hover:border-neon-pink/40 transition-colors duration-300 flex flex-col"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-neon-pink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true" />

                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-pink to-neon-purple p-[1px] mb-6 shrink-0" aria-hidden="true">
                  <div className="w-full h-full bg-[#111] rounded-xl flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
                    <Icon size={22} className="text-white" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neon-pink transition-colors">
                  {localize(service.title)}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {localize(service.description)}
                </p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
