import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "../components/ui/Button";
import { Link } from "react-scroll";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Hero() {
  const { t } = useTranslation();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative h-[150vh]" aria-labelledby="hero-heading">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center pt-20 overflow-hidden">
        {/* Background gradients — transform-only animation keeps it on GPU */}
        <motion.div
          style={{ scale: backgroundScale, opacity: backgroundOpacity }}
          className="absolute inset-0 w-full h-full bg-background -z-10 origin-center"
          aria-hidden="true"
        >
          <div className="glow-blob hidden md:block absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-neon-pink/20 blur-[120px]" aria-hidden="true" />
          <div className="glow-blob hidden md:block absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-neon-purple/20 blur-[120px]" aria-hidden="true" />
        </motion.div>

        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-8"
          >
            <Sparkles className="w-4 h-4 text-neon-pink" aria-hidden="true" />
            <span className="text-sm font-medium text-gray-300">{t("hero.subtitle")}</span>
          </motion.div>

          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter max-w-5xl leading-tight mb-8"
          >
            {t("hero.title1")} <span className="text-gradient">{t("hero.title2")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12"
          >
            {t("hero.desc")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="pricing" smooth={true} duration={500} offset={-80}>
              <Button size="lg" className="w-full sm:w-auto gap-2">
                {t("hero.cta1")} <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>
            </Link>
            <Link to="contact" smooth={true} duration={500} offset={-80}>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                {t("hero.cta2")}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
