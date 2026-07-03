import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";
import { Target, Lightbulb, PenTool, Code2, TestTube2, Rocket, Settings } from "lucide-react";
import { TextReveal } from "../components/ui/TextReveal";

export function Workflow() {
  const { t } = useTranslation();
  const steps = t("workflow.steps", { returnObjects: true }) as { title: string; desc: string }[];
  
  const icons = [Target, Lightbulb, PenTool, Code2, TestTube2, Rocket, Settings];

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const totalSteps = steps.length;
    // Calculate the active step based on scroll progress (0 to 1)
    let current = Math.floor(latest * totalSteps);
    if (current >= totalSteps) current = totalSteps - 1;
    if (current < 0) current = 0;
    setActiveStep(current);
  });

  const ActiveIcon = icons[activeStep % icons.length];

  return (
    <section className="py-24 relative bg-dark/20 border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto flex flex-col items-center">
          <TextReveal text={t("workflow.title")} className="text-3xl md:text-5xl font-bold mb-4 tracking-tight" />
          <p className="text-gray-400">{t("workflow.desc")}</p>
        </div>

        <div className="flex flex-col md:flex-row relative items-start gap-12" ref={containerRef}>
          {/* Left Side: Scrolling text content */}
          <div className="w-full md:w-1/2 flex flex-col pt-[10vh] pb-[30vh]">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`py-[20vh] transition-opacity duration-500 ${index === activeStep ? 'opacity-100' : 'opacity-30'}`}
              >
                <div className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-neon-pink to-neon-purple opacity-30 mb-4">
                  0{index + 1}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-lg text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Right Side: Sticky Visual Container */}
          <div className="w-full md:w-1/2 sticky top-[20vh] h-[60vh] hidden md:flex items-center justify-center">
            <div className="w-full max-w-md aspect-square rounded-3xl glass-card border border-white/10 relative overflow-hidden flex items-center justify-center shadow-2xl">
              {/* Animated Background Blob */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/10 to-neon-purple/10" />
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute w-full h-full bg-neon-purple/20 blur-[100px] rounded-full mix-blend-screen"
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
                  className="relative z-10 flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-neon-pink to-neon-purple p-[1px] mb-6 shadow-[0_0_40px_-10px_#ff007f]">
                    <div className="w-full h-full bg-[#111] rounded-2xl flex items-center justify-center">
                      <ActiveIcon size={40} className="text-white" />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{steps[activeStep].title}</h4>
                  <p className="text-sm text-gray-400">Step 0{activeStep + 1} of {steps.length}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
