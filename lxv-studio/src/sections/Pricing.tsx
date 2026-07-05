import React, { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Info } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useLocalized } from "../lib/localize";
import { packageDetails } from "../data/pricingDetails";
import { PricingCard, type PricingPackage } from "../components/pricing/PricingCard";
import { PackageDetails } from "../components/pricing/PackageDetails";
import { CompareSidebar } from "../components/pricing/CompareSidebar";

export function Pricing() {
  const { t } = useTranslation();
  const resolve = useLocalized();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number | null>(null);

  const packages = t("pricing.packages", { returnObjects: true }) as PricingPackage[];
  const helper = t("pricing.compare.helper");

  const selectedPkg = selected !== null ? packages[selected] : undefined;
  const selectedDetail = selected !== null ? packageDetails[selected] : undefined;

  const detailLabels = {
    delivery: t("pricing.compare.delivery"),
    revisions: t("pricing.compare.revisions"),
    support: t("pricing.compare.support"),
    technology: t("pricing.compare.technology"),
    bestFor: t("pricing.compare.bestFor"),
    recentExample: t("pricing.compare.recentExample"),
    viewDemo: t("pricing.compare.viewDemo"),
    faq: t("pricing.compare.faq"),
    consult: t("pricing.compare.consult"),
    compareAll: t("pricing.compare.compareAll"),
  };

  const sidebarLabels = {
    selected: t("pricing.compare.selected"),
    price: t("pricing.compare.price"),
    delivery: t("pricing.compare.delivery"),
    support: t("pricing.compare.support"),
    consult: t("pricing.compare.consult"),
    close: t("pricing.compare.close"),
  };

  const goToConsultation = (id: string) => navigate(`/consultation?package=${id}`);

  return (
    <section id="pricing" className="relative border-y border-white/5 bg-dark/30 py-24">
      <div className="pointer-events-none absolute left-1/4 top-0 -z-10 h-96 w-96 rounded-full bg-neon-pink/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-neon-purple/10 blur-[120px]" />

      <div className="container mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-bold tracking-tight md:text-5xl"
          >
            {t("pricing.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400"
          >
            {t("pricing.desc")}
          </motion.p>
        </div>

        <LayoutGroup>
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {packages.map((pkg, index) => (
              <React.Fragment key={index}>
                <PricingCard
                  pkg={pkg}
                  index={index}
                  helperText={helper}
                  state={
                    selected === null
                      ? "idle"
                      : selected === index
                        ? "selected"
                        : "dimmed"
                  }
                  onSelect={setSelected}
                />
              </React.Fragment>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {selectedPkg && selectedDetail && (
              <motion.div
                key={selectedDetail.id}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 gap-6 pt-6 lg:grid-cols-[1fr_340px]">
                  <div className="rounded-[24px] border border-white/10 bg-white/[0.02] p-6 sm:p-8">
                    <PackageDetails
                      pkg={selectedPkg}
                      detail={selectedDetail}
                      resolve={resolve}
                      labels={detailLabels}
                      onConsult={() => goToConsultation(selectedDetail.id)}
                      onCompareAll={() => setSelected(null)}
                    />
                  </div>

                  <div className="lg:sticky lg:top-24 lg:h-fit">
                    <CompareSidebar
                      pkg={selectedPkg}
                      detail={selectedDetail}
                      resolve={resolve}
                      labels={sidebarLabels}
                      onConsult={() => goToConsultation(selectedDetail.id)}
                      onClose={() => setSelected(null)}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <p className="inline-flex items-center gap-2 text-sm text-gray-500">
            <Info className="h-4 w-4" aria-hidden="true" />
            {t("pricing.note")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
