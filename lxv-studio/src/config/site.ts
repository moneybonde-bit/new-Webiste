/**
 * Central site configuration.
 *
 * All company information lives here — update this single file to change
 * contact details, social links, or branding across the entire website.
 */

export const siteConfig = {
  name: "Luxavian",
  legalName: "Luxavian Digital Studio",
  tagline: "Crafting Elegant Digital Experiences.",
  domain: "luxavian.it.com",

  /** Path (relative to /public) of the official logo used in nav, about & footer. */
  logo: "/logos/luxavian-logo.png",

  contact: {
    /** International format, digits only (used for wa.me links). */
    whatsappNumber: "6285236074563",
    email: "hello@luxavian.id",
    instagram: "https://instagram.com/luxavian.studio",
  },

  location: "Central Sulawesi, Indonesia",
} as const;

/** Ready-to-use WhatsApp chat link, optionally with a prefilled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${siteConfig.contact.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
