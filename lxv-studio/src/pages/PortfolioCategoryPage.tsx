import React, { lazy, useEffect } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Navbar } from "../components/Navbar";
import { LazySection } from "../components/LazySection";
import { Button } from "../components/ui/Button";
import { PortfolioHero } from "../components/portfolio/PortfolioHero";
import { PortfolioGrid } from "../components/portfolio/PortfolioGrid";
import { getCategory, getItemsByCategory } from "../data/portfolio";
import { useLocalized } from "../lib/localize";

const Footer = lazy(() =>
  import("../components/Footer").then((m) => ({ default: m.Footer })),
);
const FloatingWhatsApp = lazy(() =>
  import("../components/FloatingWhatsApp").then((m) => ({
    default: m.FloatingWhatsApp,
  })),
);

/** Detail page for one portfolio category (/portfolio/:category). */
export function PortfolioCategoryPage() {
  const { category: categoryId } = useParams();
  const { t } = useTranslation();
  const localize = useLocalized();
  const category = getCategory(categoryId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);

  if (!category) return <Navigate to="/" replace />;

  const items = getItemsByCategory(category.id);
  const primaryLabel =
    category.id === "business" ? t("portfolio.liveDemo") : t("portfolio.preview");
  const detailLabel = category.id === "wedding" ? t("portfolio.detail") : undefined;

  return (
    <>
      <Navbar />

      <main id="main-content" aria-labelledby="portfolio-category-heading">
        <PortfolioHero
          crumbs={[
            { label: t("nav.home"), to: "/" },
            { label: t("nav.portfolio"), to: "/#portfolio" },
            { label: localize(category.breadcrumb) },
          ]}
          emoji={category.emoji}
          title={localize(category.heroTitle)}
          subtitle={localize(category.heroSubtitle)}
          headingId="portfolio-category-heading"
        />

        <section className="pb-28 md:pb-36">
          <div className="container mx-auto px-6">
            <PortfolioGrid
              items={items}
              primaryLabel={primaryLabel}
              detailLabel={detailLabel}
              ariaLabel={localize(category.heroTitle)}
            />
          </div>
        </section>

        {/* Closing CTA strip */}
        <section className="border-t border-white/5 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="container mx-auto px-6 flex flex-col items-center text-center"
          >
            <p className="font-editorial text-[clamp(1.8rem,4vw,3rem)] leading-[1.15] text-gradient max-w-2xl mb-8">
              {t("finalCta.line1")} {t("finalCta.line2")}
            </p>
            <Link to="/consultation">
              <Button size="lg" className="gap-2">
                {t("finalCta.button")} <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>
            </Link>
          </motion.div>
        </section>
      </main>

      <LazySection><Footer /></LazySection>
      <LazySection><FloatingWhatsApp /></LazySection>
    </>
  );
}
