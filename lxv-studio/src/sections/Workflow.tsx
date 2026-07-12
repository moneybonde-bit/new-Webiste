import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { MessagesSquare, PenTool, Code2, SearchCheck, Rocket } from "lucide-react";
import { SectionLabel } from "../components/ui/SectionLabel";

const stepIcons = [MessagesSquare, PenTool, Code2, SearchCheck, Rocket];

/**
 * Interactive process: a selectable step index on the left drives a
 * cinematic detail panel with an oversized ghost numeral on the right.
 */
export function Workflow() {
  const { t } = useTranslation();
  const steps = t("workflow.steps", { returnObjects: true }) as { title: string; desc: string }[];
  const [active, setActive] = useState(0);

  const ActiveIcon = stepIcons[active % stepIcons.length];

  return (
    <section id="workflow" className="py-28 md:py-40 relative border-y border-white/5 overflow-hidden" aria-labelledby="workflow-heading">
      <div className="glow-blob hidden md:block absolute bottom-0 left-1/3 w-[420px] h-[420px] bg-neon-pink/8 blur-[140px] -z-10" aria-hidden="true" />

      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-16 md:mb-24">
          <SectionLabel index="05" className="mb-8">{t("workflow.title")}</SectionLabel>
          <h2
            id="workflow-heading"
            className="text-[clamp(2.4rem,6vw,5rem)] font-extrabold tracking-tighter leading-[1.02] mb-6"
          >
            {t("workflow.title")}
          </h2>
          <p className="text-gray-400 text-lg">{t("workflow.desc")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-20 items-start">
          {/* Step index */}
          <ol aria-label={t("workflow.title")}>
            {steps.map((step, index) => {
              const isActive = index === active;
              return (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    aria-current={isActive ? "step" : undefined}
                    className={`group w-full flex items-center gap-6 py-5 md:py-6 border-t border-white/10 last:border-b text-left transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neon-pink ${
                      isActive ? "text-white" : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`text-xs font-black tracking-widest tabular-nums transition-colors ${
                        isActive ? "text-neon-pink" : "text-gray-600"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-xl md:text-2xl font-bold tracking-tight transition-transform duration-300 ${
                        isActive ? "translate-x-2" : "group-hover:translate-x-1"
                      }`}
                    >
                      {step.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`ml-auto h-px transition-all duration-500 bg-gradient-to-r from-neon-pink to-neon-purple ${
                        isActive ? "w-12 md:w-20 opacity-100" : "w-0 opacity-0"
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Detail panel */}
          <div className="relative min-h-[320px] md:min-h-[380px] glass-card p-8 md:p-14 flex flex-col justify-end overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10"
              >
                <span
                  aria-hidden="true"
                  className="text-stroke pointer-events-none select-none absolute -top-24 md:-top-40 -right-2 text-[9rem] md:text-[15rem] font-black leading-none tracking-tighter"
                >
                  {String(active + 1).padStart(2, "0")}
                </span>

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neon-pink to-neon-purple p-[1px] mb-8" aria-hidden="true">
                  <div className="w-full h-full bg-[#111] rounded-2xl flex items-center justify-center">
                    <ActiveIcon size={24} className="text-white" />
                  </div>
                </div>

                <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-white mb-4">
                  {steps[active].title}
                </h3>
                <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-md">
                  {steps[active].desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Progress rail */}
            <div className="relative z-10 mt-10 h-px bg-white/10" aria-hidden="true">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-pink to-neon-purple"
                animate={{ width: `${((active + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
