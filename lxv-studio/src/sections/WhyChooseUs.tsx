import React from "react";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export function WhyChooseUs() {
  const { t } = useTranslation();

  const reasons = t("why.reasons", { returnObjects: true }) as string[];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-neon-purple/10 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2" />
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              {t("why.title")}
            </h2>
            <p className="text-gray-400 mb-8 text-lg leading-relaxed">
              {t("why.desc")}
            </p>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <div className="grid grid-cols-2 gap-4">
              {reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex items-center gap-3 p-4 glass-card"
                >
                  <CheckCircle2 className="w-5 h-5 text-neon-pink shrink-0" />
                  <span className="text-sm font-medium text-gray-200">{reason}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
