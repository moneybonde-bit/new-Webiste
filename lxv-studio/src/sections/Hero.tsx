import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "../components/ui/Button";
import { Link } from "react-scroll";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { services } from "../data/services";
import { useLocalized } from "../lib/localize";

export function Hero() {
  const { t } = useTranslation();
  const localize = useLocalized();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const ghostY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const marqueeOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const marqueeItems = services.map((s) => localize(s.title));

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section ref={ref} id="home" className="relative h-[160vh]" aria-labelledby="hero-heading">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-24 overflow-hidden">
        {/* Cinematic backdrop: vignette + off-center glows */}
        <motion.div
          style={{ opacity: backgroundOpacity }}
          className="absolute inset-0 w-full h-full bg-background -z-10"
          aria-hidden="true"
        >
          <div className="glow-blob hidden md:block absolute -top-32 right-[8%] w-[560px] h-[560px] bg-neon-purple/15 blur-[140px]" />
          <div className="glow-blob hidden md:block absolute bottom-[12%] -left-24 w-[480px] h-[480px] bg-neon-pink/12 blur-[130px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#0A0A0A_100%)]" />
        </motion.div>

        {/* Ghost display word drifting on its own parallax layer */}
        <motion.span
          style={{ y: ghostY }}
          aria-hidden="true"
          className="text-stroke pointer-events-none select-none absolute top-[16%] left-1/2 -translate-x-1/2 whitespace-nowrap text-[22vw] font-black tracking-tighter leading-none opacity-60"
        >
          LUXAVIAN
        </motion.span>

        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="container mx-auto px-6 relative z-10 flex-1 flex flex-col justify-center"
        >
          {/* Eyebrow — editorial meta row */}
          <motion.div
            {...fadeUp(0)}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-10 text-[11px] font-semibold uppercase tracking-[0.35em] text-gray-400"
          >
            <span className="text-neon-pink">(01)</span>
            <span>{t("hero.subtitle")}</span>
            <span aria-hidden="true" className="h-px w-16 bg-white/15 hidden sm:block" />
            <span className="hidden sm:inline text-gray-500">{t("hero.location")}</span>
          </motion.div>

          {/* Oversized asymmetric headline */}
          <h1 id="hero-heading" className="mb-12">
            <motion.span
              {...fadeUp(0.1)}
              className="block text-[clamp(3.2rem,10.5vw,9.5rem)] font-extrabold tracking-tighter leading-[0.95] text-white"
            >
              {t("hero.title1")}
            </motion.span>
            <motion.span
              {...fadeUp(0.22)}
              className="block text-[clamp(3.2rem,10.5vw,9.5rem)] leading-[1.02] font-editorial text-gradient md:pl-[9vw]"
            >
              {t("hero.title2")}
            </motion.span>
          </h1>

          {/* Asymmetric lower row: description right, CTAs left */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <motion.div {...fadeUp(0.34)} className="flex flex-col sm:flex-row gap-4 order-2 md:order-1">
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

            <motion.p
              {...fadeUp(0.3)}
              className="text-base md:text-lg text-gray-400 max-w-md leading-relaxed md:text-right order-1 md:order-2 border-l-2 md:border-l-0 md:border-r-2 border-neon-pink/50 pl-4 md:pl-0 md:pr-4"
            >
              {t("hero.desc")}
            </motion.p>
          </div>
        </motion.div>

        {/* Bottom strip: scroll cue + services marquee */}
        <motion.div style={{ opacity: marqueeOpacity }} className="relative z-10 pb-0">
          <div className="container mx-auto px-6 flex items-center justify-between pb-5">
            <span className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-gray-500">
              <ArrowDown className="w-3.5 h-3.5 text-neon-pink animate-bounce" aria-hidden="true" />
              {t("hero.scroll")}
            </span>
            <span className="hidden sm:block text-[11px] uppercase tracking-[0.3em] text-gray-600">
              {t("hero.est")} — {new Date().getFullYear()}
            </span>
          </div>

          <div className="border-t border-white/8 py-4 overflow-hidden" aria-hidden="true">
            <div className="animate-marquee flex w-max whitespace-nowrap">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0">
                  {marqueeItems.map((item, i) => (
                    <span
                      key={`${copy}-${i}`}
                      className="flex items-center text-sm font-medium uppercase tracking-[0.25em] text-gray-500"
                    >
                      <span className="px-8">{item}</span>
                      <span className="text-neon-pink/70">✦</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
