import React from "react";
import type { PortfolioItem } from "../../data/portfolio";
import { PortfolioCard } from "./PortfolioCard";

interface PortfolioGridProps {
  items: PortfolioItem[];
  primaryLabel: string;
  detailLabel?: string;
  ariaLabel: string;
}

/** Responsive gallery grid — just maps data onto PortfolioCard. */
export function PortfolioGrid({ items, primaryLabel, detailLabel, ariaLabel }: PortfolioGridProps) {
  return (
    <ul
      aria-label={ariaLabel}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14"
    >
      {items.map((item, index) => (
        <PortfolioCard
          key={item.id}
          item={item}
          index={index}
          primaryLabel={primaryLabel}
          detailLabel={detailLabel}
        />
      ))}
    </ul>
  );
}
