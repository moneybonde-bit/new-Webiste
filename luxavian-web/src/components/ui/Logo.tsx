import Link from "next/link";
import { siteConfig } from "@/config/site";

/** Wordmark logo — pure text + CSS, zero image weight, crisp at any DPI. */
export function Logo() {
  return (
    <Link
      href="#"
      aria-label={`${siteConfig.legalName} — kembali ke atas`}
      className="inline-flex items-baseline gap-0.5 text-lg font-semibold tracking-tight text-white transition-opacity hover:opacity-80"
    >
      {siteConfig.name}
      <span aria-hidden="true" className="text-accent-soft">
        .
      </span>
    </Link>
  );
}
