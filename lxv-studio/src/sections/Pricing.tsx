import React from "react";
import { motion } from "motion/react";
import { Check, Info, MessageCircle, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/Button";

interface PricingPackage {
  name: string;
  badge: string;
  price: string;
  desc?: string;
  target: string[];
  features: string[];
  cta: string;
}

export function Pricing() {
  const { t } = useTranslation();
  
  const packages = t("pricing.packages", { returnObjects: true }) as PricingPackage[];
  const faqKeys = ["1", "2", "3", "4"];

  return (
    <section id="pricing" className="py-24 relative bg-dark/30 border-y border-white/5">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-pink/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4 tracking-tight"
          >
            {t("pricing.title")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            {t("pricing.desc")}
          </motion.p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`relative flex flex-col p-8 rounded-[24px] border ${pkg.badge.includes('Populer') ? 'border-transparent' : 'border-white/10 glass-card'} transition-all duration-300 group`}
            >
              {/* Highlight Card Special Background & Border */}
              {pkg.badge.includes('Populer') && (
                <>
                  <div className="absolute inset-0 rounded-[24px] bg-[#111] z-0" />
                  <div className="absolute inset-[-1px] rounded-[24px] bg-gradient-to-b from-neon-pink to-neon-purple opacity-50 z-[-1]" />
                  <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-neon-pink/10 to-transparent z-0 pointer-events-none" />
                </>
              )}

              {/* Card Glow Effect on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 ${pkg.badge.includes('Populer') ? 'from-neon-pink/20' : ''}`} />
              
              {pkg.badge && (
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap z-10 ${pkg.badge.includes('Populer') ? 'bg-gradient-to-r from-neon-pink to-neon-purple text-white shadow-[0_0_20px_rgba(255,0,127,0.4)]' : 'bg-[#222] border border-white/10 text-gray-300'}`}>
                  {pkg.badge}
                </div>
              )}

              <div className="mb-8 relative z-10 mt-2">
                <h3 className="text-xl font-bold text-white mb-3">{pkg.name}</h3>
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">
                  {pkg.price}
                </div>
              </div>

              {pkg.desc && (
                <div className="mb-8 text-sm text-gray-400 leading-relaxed whitespace-pre-line relative z-10 min-h-[80px]">
                  {pkg.desc}
                </div>
              )}

              <div className="flex-1 mb-8 relative z-10">
                <ul className="space-y-4">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <Check className={`w-5 h-5 shrink-0 mt-0.5 ${pkg.badge.includes('Populer') ? 'text-neon-pink' : 'text-gray-500'}`} />
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto relative z-10 pt-4">
                <Button 
                  variant={pkg.badge.includes('Populer') ? "primary" : "outline"} 
                  className={`w-full py-6 rounded-xl ${pkg.badge.includes('Populer') ? 'shadow-[0_0_30px_rgba(255,0,127,0.3)] hover:shadow-[0_0_40px_rgba(255,0,127,0.5)]' : 'hover:bg-white/5'}`}
                >
                  {pkg.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm text-gray-500 inline-flex items-center gap-2">
            <Info className="w-4 h-4" />
            {t("pricing.note")}
          </p>
        </motion.div>

      </div>
    </section>
  );
}

