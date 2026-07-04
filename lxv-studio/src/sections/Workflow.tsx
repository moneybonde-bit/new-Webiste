import React from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { MessagesSquare, PenTool, Code2, SearchCheck, Rocket } from "lucide-react";
import { TextReveal } from "../components/ui/TextReveal";

const stepIcons = [MessagesSquare, PenTool, Code2, SearchCheck, Rocket];

export function Workflow() {
  const { t } = useTranslation();
  const steps = t("workflow.steps", { returnObjects: true }) as { title: string; desc: string }[];

  return (
    <section className="py-24 relative bg-dark/20 border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto flex flex-col items-center">
          <TextReveal text={t("workflow.title")} className="text-3xl md:text-5xl font-bold mb-4 tracking-tight" />
          <p className="text-gray-400">{t("workflow.desc")}</p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative">
          {/* Connector line (desktop) */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-neon-pink/40 via-neon-purple/40 to-neon-pink/40"
          />

          {steps.map((step, index) => {
            const Icon = stepIcons[index % stepIcons.length];
            return (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative flex flex-col items-center text-center p-6 glass-card hover:border-neon-pink/40 transition-colors duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neon-pink to-neon-purple p-[1px] mb-5 relative z-10 group-hover:shadow-[0_0_25px_-5px_#ff007f] transition-shadow">
                  <div className="w-full h-full bg-[#111] rounded-2xl flex items-center justify-center">
                    <Icon size={24} className="text-white" aria-hidden="true" />
                  </div>
                </div>

                <span className="text-xs font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-purple mb-2">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
