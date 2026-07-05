import React from "react";
import { motion } from "motion/react";
import { Clock, LifeBuoy, MessageCircle, X } from "lucide-react";
import type { PackageDetail } from "@/src/data/pricingDetails";
import type { Localized } from "@/src/lib/localize";
import type { PricingPackage } from "./PricingCard";
import { Button } from "../ui/Button";

interface CompareSidebarProps {
  pkg: PricingPackage;
  detail: PackageDetail;
  resolve: (value: Localized) => string;
  labels: {
    selected: string;
    price: string;
    delivery: string;
    support: string;
    consult: string;
    close: string;
  };
  onConsult: () => void;
  onClose: () => void;
}

/**
 * Floating summary of the selected package. Sticky beside the details on
 * desktop; rendered inline below the details on mobile (the parent controls
 * placement via wrapper classes).
 */
export function CompareSidebar({
  pkg,
  detail,
  resolve,
  labels,
  onConsult,
  onClose,
}: CompareSidebarProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ type: "spring", stiffness: 240, damping: 28 }}
      aria-label={labels.selected}
      className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#121016] p-6"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-neon-pink/15 to-transparent"
      />

      <button
        type="button"
        onClick={onClose}
        aria-label={labels.close}
        className="absolute right-4 top-4 z-10 text-gray-500 transition-colors hover:text-white"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>

      <div className="relative z-10">
        <p className="text-xs uppercase tracking-wide text-gray-500">{labels.selected}</p>
        <h3 className="mt-1 text-lg font-bold text-white">{pkg.name}</h3>

        <div className="mt-5 space-y-4">
          <div>
            <p className="text-xs text-gray-500">{labels.price}</p>
            <p className="bg-gradient-to-br from-white to-gray-400 bg-clip-text text-2xl font-black text-transparent">
              {pkg.price}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
              <Clock className="h-4 w-4 shrink-0 text-neon-pink" aria-hidden="true" />
              <div>
                <p className="text-[11px] uppercase tracking-wide text-gray-500">{labels.delivery}</p>
                <p className="text-sm font-medium text-white">{resolve(detail.deliveryTime)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
              <LifeBuoy className="h-4 w-4 shrink-0 text-neon-pink" aria-hidden="true" />
              <div>
                <p className="text-[11px] uppercase tracking-wide text-gray-500">{labels.support}</p>
                <p className="text-sm font-medium text-white">{resolve(detail.support)}</p>
              </div>
            </div>
          </div>
        </div>

        <Button className="mt-6 w-full gap-2" onClick={onConsult}>
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          {labels.consult}
        </Button>
      </div>
    </motion.aside>
  );
}
