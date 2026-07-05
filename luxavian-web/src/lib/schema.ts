import { siteConfig, whatsappLink } from "@/config/site";
import { faqItems, services } from "@/content";

/**
 * Schema.org JSON-LD graph for the landing page.
 * A single @graph keeps entities linked (Organization ↔ WebSite ↔ Services)
 * and avoids duplicate script tags.
 */
export function buildJsonLd(): Record<string, unknown> {
  const organizationId = `${siteConfig.url}/#organization`;
  const websiteId = `${siteConfig.url}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
        "@id": organizationId,
        name: siteConfig.legalName,
        alternateName: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.contact.email,
        description: siteConfig.description,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.address.locality,
          addressRegion: siteConfig.address.region,
          addressCountry: siteConfig.address.country,
        },
        areaServed: [
          { "@type": "City", name: siteConfig.address.locality },
          { "@type": "State", name: siteConfig.address.region },
          { "@type": "Country", name: siteConfig.address.countryName },
        ],
        sameAs: [siteConfig.contact.instagram],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: siteConfig.contact.email,
          url: whatsappLink(),
          availableLanguage: ["id", "en"],
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteConfig.url,
        name: siteConfig.legalName,
        inLanguage: "id-ID",
        publisher: { "@id": organizationId },
      },
      {
        "@type": "WebPage",
        "@id": `${siteConfig.url}/#webpage`,
        url: siteConfig.url,
        name: `${siteConfig.legalName} — Software House & Digital Agency`,
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        inLanguage: "id-ID",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteConfig.url}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Beranda",
            item: siteConfig.url,
          },
        ],
      },
      ...services.map((service, index) => ({
        "@type": "Service",
        "@id": `${siteConfig.url}/#service-${index + 1}`,
        name: service.title,
        description: service.description,
        provider: { "@id": organizationId },
        areaServed: { "@type": "Country", name: siteConfig.address.countryName },
      })),
      {
        "@type": "FAQPage",
        "@id": `${siteConfig.url}/#faq`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
}
