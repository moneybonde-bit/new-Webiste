import React from "react";
import { motion } from "motion/react";
import { Building2, GraduationCap, HeartHandshake, Users, Landmark, Briefcase, Store, Activity, BookOpen, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

export function TargetClients() {
  const { t } = useTranslation();
  const clients = t("clients.items", { returnObjects: true }) as string[];
  
  const icons = [
    <Store />, <Briefcase />, <BookOpen />, <GraduationCap />, 
    <HeartHandshake />, <Users />, <Activity />, <Landmark />, 
    <Globe />, <Building2 />
  ];

  return (
    <section className="py-24 relative border-y border-white/5">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-neon-pink/10 rounded-full blur-[100px] -z-10 -translate-x-1/2 -translate-y-1/2" />
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">{t("clients.title")}</h2>
          <p className="text-gray-400 text-lg">{t("clients.desc")}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {clients.map((client, i) => (
             <motion.div key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col items-center justify-center text-center gap-3 p-6 glass-card group hover:border-neon-purple/50 transition-colors h-full"
            >
              <div className="text-neon-purple opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
                {icons[i % icons.length]}
              </div>
              <span className="text-sm font-medium text-gray-300">{client}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
