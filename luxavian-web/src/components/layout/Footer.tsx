import Link from "next/link";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { siteConfig, whatsappLink } from "@/config/site";
import { footerNav } from "@/content";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

const socialLinks = [
  {
    label: "Email",
    href: `mailto:${siteConfig.contact.email}`,
    icon: Mail,
  },
  {
    label: "WhatsApp",
    href: whatsappLink(),
    icon: MessageCircle,
  },
  {
    label: "Instagram",
    href: siteConfig.contact.instagram,
    icon: Instagram,
  },
] as const;

/** Server-rendered footer — no client JavaScript. */
export function Footer() {
  return (
    <footer id="kontak" className="border-t border-line">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Software house dan digital agency berbasis di{" "}
              {siteConfig.address.locality}, {siteConfig.address.region} —
              membangun perangkat lunak berstandar internasional untuk bisnis
              di Indonesia.
            </p>
            <address className="mt-6 space-y-1 text-sm not-italic text-subtle">
              <p>
                {siteConfig.address.locality}, {siteConfig.address.region},{" "}
                {siteConfig.address.countryName}
              </p>
              <p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="transition-colors hover:text-white"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
            </address>
          </div>

          <nav aria-label="Layanan">
            <h2 className="text-sm font-semibold text-white">Layanan</h2>
            <ul className="mt-4 space-y-3">
              {footerNav.layanan.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Perusahaan">
            <h2 className="text-sm font-semibold text-white">Perusahaan</h2>
            <ul className="mt-4 space-y-3">
              {footerNav.perusahaan.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-subtle">
            © {new Date().getFullYear()} {siteConfig.legalName}. Hak cipta
            dilindungi.
          </p>
          <ul className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-muted transition-all duration-300 ease-premium hover:border-line-strong hover:text-white"
                >
                  <social.icon className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
