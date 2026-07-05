/**
 * Central site configuration — the single source of truth for brand,
 * contact, and SEO identity. Update here, changes propagate everywhere.
 */
export const siteConfig = {
  name: "Luxavian",
  legalName: "Luxavian Digital Studio",
  url: "https://luxavian.it.com",
  description:
    "Luxavian Digital Studio — software house dan digital agency di Palu, Sulawesi Tengah. Kami membangun website, aplikasi enterprise, ERP, dan otomasi AI berstandar internasional untuk bisnis di Indonesia.",
  contact: {
    email: "hello@luxavian.id",
    whatsappNumber: "6285236074563",
    instagram: "https://instagram.com/luxavian.studio",
  },
  address: {
    locality: "Palu",
    region: "Sulawesi Tengah",
    country: "ID",
    countryName: "Indonesia",
  },
  keywords: [
    "digital agency Palu",
    "software house Sulawesi Tengah",
    "jasa pembuatan website Palu",
    "pengembangan aplikasi Indonesia",
    "ERP Indonesia",
    "AI automation Indonesia",
    "SEO Palu",
    "AEO",
    "software house Indonesia",
  ],
} as const;

/** Ready-to-use WhatsApp chat link, optionally with a prefilled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${siteConfig.contact.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
