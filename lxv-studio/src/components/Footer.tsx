import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { useTranslation } from "react-i18next";
import { Logo } from "./ui/Logo";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { siteConfig, whatsappLink } from "../config/site";

export function Footer() {
  const { t } = useTranslation();

  const companyLinks = [
    { label: t("footer.links.about"), to: "why" },
    { label: t("footer.links.portfolio"), to: "portfolio" },
    { label: t("footer.links.services"), to: "services" },
  ];

  const serviceLinks = [
    t("footer.links.businessWebsite"),
    t("footer.links.weddingInvitation"),
    t("footer.links.customWebApp"),
  ];

  const contactLinks = [
    { label: "WhatsApp", href: whatsappLink(), icon: MessageCircle, ariaLabel: "Chat with us on WhatsApp" },
    { label: "Email", href: `mailto:${siteConfig.contact.email}`, icon: Mail, ariaLabel: `Email us at ${siteConfig.contact.email}` },
    { label: "Instagram", href: siteConfig.contact.instagram, icon: Instagram, ariaLabel: "Luxavian on Instagram" },
  ];

  return (
    <footer className="bg-[#0A0A0A] pt-20 pb-10 border-t border-white/5 overflow-hidden relative" aria-label="Site footer">
      {/* Background accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-neon-pink/30 to-transparent" aria-hidden="true" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Logo className="mb-6" />
            <p className="text-gray-400 max-w-sm leading-relaxed">
              {t("footer.desc")}
            </p>
          </div>

          <nav aria-label={t("footer.columns.company")}>
            <h2 className="text-white font-bold mb-6 tracking-tight text-sm uppercase">{t("footer.columns.company")}</h2>
            <ul className="flex flex-col gap-4 text-sm text-gray-400">
              {companyLinks.map((link) => (
                <li key={link.to}>
                  <ScrollLink
                    to={link.to}
                    smooth={true}
                    duration={500}
                    className="hover:text-neon-pink cursor-pointer transition-colors focus-visible:outline-none focus-visible:text-neon-pink"
                  >
                    {link.label}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t("footer.columns.services")}>
            <h2 className="text-white font-bold mb-6 tracking-tight text-sm uppercase">{t("footer.columns.services")}</h2>
            <ul className="flex flex-col gap-4 text-sm text-gray-400">
              {serviceLinks.map((label) => (
                <li key={label}>
                  <ScrollLink
                    to="services"
                    smooth={true}
                    duration={500}
                    className="hover:text-neon-pink cursor-pointer transition-colors focus-visible:outline-none focus-visible:text-neon-pink"
                  >
                    {label}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t("footer.columns.contact")}>
            <h2 className="text-white font-bold mb-6 tracking-tight text-sm uppercase">{t("footer.columns.contact")}</h2>
            <ul className="flex flex-col gap-4 text-sm text-gray-400">
              {contactLinks.map(({ label, href, icon: Icon, ariaLabel }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={ariaLabel}
                    className="inline-flex items-center gap-3 hover:text-neon-pink transition-colors focus-visible:outline-none focus-visible:text-neon-pink"
                  >
                    <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0" aria-hidden="true">
                      <Icon size={14} />
                    </span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 text-center md:text-left">
          <div>
            <span>© {new Date().getFullYear()} {siteConfig.legalName}. </span>
            <span>{siteConfig.tagline}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{siteConfig.domain}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden="true" />
            <span className="text-green-500 font-medium">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
