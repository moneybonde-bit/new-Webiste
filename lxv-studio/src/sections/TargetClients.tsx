import React from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { clientSegments } from "../data/targetClients";
import { useLocalized } from "../lib/localize";

export function TargetClients() {
  const { t } = useTranslation();
  const localize = useLocalized();

  return (
    <section className="py-24 relative border-y border-white/5">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-neon-pink/10 rounded-full blur-[100px] -z-10 -translate-x-1/2 -translate-y-1/2" />
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">{t("clients.title")}</h2>
          <p className="text-gray-400 text-lg">{t("clients.desc")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientSegments.map((segment, i) => {
            const Icon = segment.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-8 glass-card group hover:border-neon-purple/50 transition-colors duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-neon-purple/10 border border-neon-purple/30 flex items-center justify-center text-neon-purple group-hover:scale-110 transition-transform">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{localize(segment.title)}</h3>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {segment.items.map((item, j) => (
                    <li
                      key={j}
                      className="text-xs font-medium text-gray-300 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 group-hover:border-white/20 transition-colors"
                    >
                      {localize(item)}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
