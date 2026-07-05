# Luxavian Digital Studio — Website

Landing page produksi untuk Luxavian Digital Studio, dibangun dengan Next.js 14 App Router.

## Teknologi

- **Next.js 14** (App Router, Server Components, static prerender)
- **TypeScript** (strict + `noUncheckedIndexedAccess`)
- **Tailwind CSS** — design tokens di `tailwind.config.ts`
- **Framer Motion** — hanya pada wrapper animasi tipis (`Reveal`)
- **Geist Sans / Mono** via `next/font` (self-hosted, zero layout shift)

## Perintah

```bash
npm install
npm run dev        # development
npm run build      # production build (fully static)
npm run start      # serve production build
npm run lint       # ESLint (no-console enforced)
npm run typecheck  # tsc --noEmit
```

## Struktur

```
src/
  app/          # layout (metadata, JSON-LD), page, sitemap, robots, manifest, icon
  config/       # site.ts — satu sumber kebenaran untuk brand & kontak
  content/      # seluruh copy halaman (typed constants)
  lib/          # utils (cn), schema (JSON-LD builder)
  components/
    ui/         # Button, Card, Container, SectionHeading, Logo
    motion/     # Reveal (satu-satunya wrapper client untuk animasi scroll)
    layout/     # Navbar (client), Footer (server)
    sections/   # Hero, WhyBento, Services, Trust, Process, Faq, Cta
```

## Prinsip

- Semua copy diubah di `src/content/index.ts`; identitas brand di `src/config/site.ts`.
- Komponen server secara default — JavaScript klien hanya untuk Navbar dan Reveal.
- `prefers-reduced-motion` dihormati di semua animasi; konten tetap terlihat tanpa JavaScript.
- SEO: metadata lengkap, OpenGraph/Twitter, canonical, robots, sitemap, dan JSON-LD
  (`Organization`, `LocalBusiness`, `WebSite`, `WebPage`, `BreadcrumbList`, `Service`, `FAQPage`).
