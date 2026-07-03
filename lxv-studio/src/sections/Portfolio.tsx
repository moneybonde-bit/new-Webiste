import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, X, Monitor, Code } from "lucide-react";
import { useTranslation } from "react-i18next";
import { TiltCard } from "../components/ui/TiltCard";
import { MagneticButton } from "../components/ui/MagneticButton";
import { DummyWebsite } from "../components/ui/DummyWebsite";

export function Portfolio() {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const projects = [
    {
      title: t("portfolio.p1.title"),
      category: t("portfolio.p1.cat"),
      image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800",
      desc: "Detailed view of the first project showcasing modern design and functionality.",
      type: "business"
    },
    {
      title: t("portfolio.p2.title"),
      category: t("portfolio.p2.cat"),
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      desc: "An in-depth look at this internal administration dashboard tailored for high efficiency.",
      type: "dashboard"
    },
    {
      title: t("portfolio.p3.title"),
      category: t("portfolio.p3.cat"),
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
      desc: "Exploring the AI integration that drives this platform forward, providing seamless automation.",
      type: "organization"
    },
  ];

  return (
    <section id="portfolio" className="py-24 relative bg-dark/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">{t("portfolio.title")}</h2>
            <p className="text-gray-400 text-lg">{t("portfolio.desc")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15, type: "spring", stiffness: 100 }}
              className="group block"
            >
              <TiltCard 
                layoutId={`card-${index}`}
                onClick={() => setSelectedId(index)}
                className="overflow-hidden glass-card mb-4 relative aspect-[4/3] shadow-lg shadow-black/50 border border-white/5 group-hover:border-neon-pink/30"
              >
                <motion.img 
                  layoutId={`image-${index}`}
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                   <MagneticButton>
                     <motion.div 
                       className="w-14 h-14 rounded-full bg-neon-pink/90 backdrop-blur-md flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,0,127,0.5)]"
                     >
                       <ExternalLink size={24} />
                     </motion.div>
                   </MagneticButton>
                </div>
              </TiltCard>
              <motion.h3 layoutId={`title-${index}`} className="text-xl font-semibold text-white mb-1 group-hover:text-neon-pink transition-colors">{project.title}</motion.h3>
              <motion.p layoutId={`cat-${index}`} className="text-sm text-neon-purple font-medium tracking-wide uppercase text-xs">{project.category}</motion.p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Shared Layout Transition Modal - Huge for Embed */}
      <AnimatePresence>
        {selectedId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 pointer-events-auto bg-black/90 backdrop-blur-lg"
          >
            <motion.div 
              layoutId={`card-${selectedId}`}
              className="bg-[#0a0a0a] w-full max-w-[95vw] h-full max-h-[90vh] rounded-2xl overflow-hidden relative shadow-2xl flex flex-col border border-white/10"
            >
              {/* Header Bar */}
              <div className="h-16 shrink-0 border-b border-white/10 flex items-center justify-between px-6 bg-white/5">
                <div className="flex items-center gap-4">
                  <motion.h3 layoutId={`title-${selectedId}`} className="text-lg font-bold text-white truncate max-w-xs md:max-w-md">
                    {projects[selectedId].title}
                  </motion.h3>
                  <motion.span layoutId={`cat-${selectedId}`} className="hidden md:inline-block text-xs font-medium px-2 py-1 bg-neon-purple/20 text-neon-purple rounded-md">
                    {projects[selectedId].category}
                  </motion.span>
                </div>
                
                <button 
                  className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-gray-400 hover:text-white hover:bg-neon-pink/80 transition-colors"
                  onClick={() => setSelectedId(null)}
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Content Area - Dummy Embed Area */}
              <div className="flex-1 w-full bg-black relative overflow-hidden flex flex-col">
                
                {/* Simulated Browser Bar */}
                <div className="h-8 bg-[#1a1a1a] flex items-center px-4 gap-2 border-b border-white/5">
                   <div className="flex gap-1.5">
                     <div className="w-3 h-3 rounded-full bg-red-500/50" />
                     <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                     <div className="w-3 h-3 rounded-full bg-green-500/50" />
                   </div>
                   <div className="mx-auto w-1/2 max-w-sm h-5 bg-white/5 rounded-md flex items-center justify-center text-[10px] text-gray-500 font-mono border border-white/5">
                     example.com
                   </div>
                </div>

                <div className="flex-1 w-full overflow-hidden relative">
                  <DummyWebsite variant={projects[selectedId].type as any} />
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
