import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Clock,
  RefreshCw,
  LifeBuoy,
  Layers,
  Target,
  Play,
  ChevronDown,
  MessageCircle,
  Rows3,
} from "lucide-react";
import type { PackageDetail } from "@/src/data/pricingDetails";
import type { Localized } from "@/src/lib/localize";
import type { PricingPackage } from "./PricingCard";
import { Button } from "../ui/Button";

interface PackageDetailsProps {
  pkg: PricingPackage;
  detail: PackageDetail;
  resolve: (value: Localized) => string;
  labels: {
    delivery: string;
    revisions: string;
    support: string;
    technology: string;
    bestFor: string;
    recentExample: string;
    viewDemo: string;
    faq: string;
    consult: string;
    compareAll: string;
  };
  onConsult: () => void;
  onCompareAll: () => void;
}

function FactTile({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-neon-pink/10 text-neon-pink">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>
      <div className="text-xs uppercase tracking-wide text-gray-500">{label}</div>
      <div className="mt-1 text-sm font-semibold text-white">{value}</div>
    </div>
  );
}

function FaqRow({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left text-sm font-medium text-white"
      >
        {question}
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-gray-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 text-sm leading-relaxed text-gray-400">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Expanded content shown for the selected package in Compare Mode. */
export function PackageDetails({
  pkg,
  detail,
  resolve,
  labels,
  onConsult,
  onCompareAll,
}: PackageDetailsProps) {
  return (
    <div className="space-y-8">
      {/* Fact tiles */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <FactTile icon={Clock} label={labels.delivery} value={resolve(detail.deliveryTime)} />
        <FactTile icon={RefreshCw} label={labels.revisions} value={resolve(detail.revisions)} />
        <FactTile icon={LifeBuoy} label={labels.support} value={resolve(detail.support)} />
      </div>

      {/* Technology */}
      <div>
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
          <Layers className="h-4 w-4 text-neon-pink" aria-hidden="true" />
          {labels.technology}
        </h4>
        <ul className="flex flex-wrap gap-2">
          {detail.technology.map((tech, i) => (
            <li
              key={i}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-300"
            >
              {resolve(tech)}
            </li>
          ))}
        </ul>
      </div>

      {/* Best for */}
      <div>
        <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
          <Target className="h-4 w-4 text-neon-pink" aria-hidden="true" />
          {labels.bestFor}
        </h4>
        <p className="text-sm leading-relaxed text-gray-400">{resolve(detail.bestFor)}</p>
      </div>

      {/* Recent example */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-white">{labels.recentExample}</h4>
        <div className="group relative overflow-hidden rounded-2xl border border-white/10">
          <div className="relative aspect-[16/9] w-full bg-gradient-to-br from-neon-pink/20 via-neon-purple/10 to-transparent">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,0,127,0.25),transparent_50%)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                <Play className="h-5 w-5 translate-x-0.5 text-white" aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-black/30 px-4 py-3">
            <span className="text-xs text-gray-400">{resolve(detail.demoCaption)}</span>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/10"
            >
              {labels.viewDemo}
            </a>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-white">{labels.faq}</h4>
        <div className="space-y-2">
          {detail.faqs.map((faq, i) => (
            <React.Fragment key={i}>
              <FaqRow question={resolve(faq.question)} answer={resolve(faq.answer)} />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Dual CTA */}
      <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row">
        <Button className="w-full gap-2 sm:w-auto" onClick={onConsult}>
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          {labels.consult}
        </Button>
        <Button variant="outline" className="w-full gap-2 sm:w-auto" onClick={onCompareAll}>
          <Rows3 className="h-4 w-4" aria-hidden="true" />
          {labels.compareAll}
        </Button>
      </div>
    </div>
  );
}
