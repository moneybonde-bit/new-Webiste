import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  /** Router path (may include a #hash). Omit for the current page. */
  to?: string;
}

/** Editorial breadcrumb: Home > Portfolio > Category. */
export function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em]">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight size={12} className="text-gray-600" aria-hidden="true" />
              )}
              {crumb.to && !isLast ? (
                <Link to={crumb.to} className="text-gray-400 hover:text-neon-pink transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-neon-pink">
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
