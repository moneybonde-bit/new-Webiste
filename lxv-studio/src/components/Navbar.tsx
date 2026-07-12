import React, { useState, useEffect } from "react";
import { cn } from "@/src/lib/utils";
import { Menu, X, Globe } from "lucide-react";
import { Link } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Button } from "./ui/Button";
import { useTranslation } from "react-i18next";
import { Logo } from "./ui/Logo";

interface NavAnchorProps {
  to: string;
  className?: string;
  onClick?: () => void;
  "aria-label"?: string;
  children: React.ReactNode;
}

/**
 * Section anchor that works from any route: smooth-scrolls on the home page,
 * navigates to /#section from other pages (HomePage handles the hash).
 */
function NavAnchor({ to, className, onClick, children, ...rest }: NavAnchorProps) {
  const { pathname } = useLocation();
  if (pathname === "/") {
    return (
      <Link to={to} smooth={true} duration={500} className={className} onClick={onClick} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <RouterLink to={`/#${to}`} className={className} onClick={onClick} {...rest}>
      {children}
    </RouterLink>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const navLinks = [
    { name: t("nav.services"), to: "services" },
    { name: t("nav.portfolio"), to: "portfolio" },
    { name: t("nav.faq"), to: "faq" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeLanguage = (lng: string) => i18n.changeLanguage(lng);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled ? "bg-[#0A0A0A]/80 backdrop-blur-md border-white/5 py-4" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between relative z-50">
        <NavAnchor
          to="home"
          className="cursor-pointer"
          aria-label="Luxavian Digital Studio — scroll to top"
          onClick={() => setMobileMenuOpen(false)}
        >
          <Logo />
        </NavAnchor>

        {/* Desktop Nav */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavAnchor
              key={link.name}
              to={link.to}
              className="text-sm text-gray-300 hover:text-white cursor-pointer transition-colors"
            >
              {link.name}
            </NavAnchor>
          ))}

          {/* Language Switcher */}
          <div
            role="group"
            aria-label="Language switcher"
            className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5"
          >
            <Globe size={14} className="text-gray-400" aria-hidden="true" />
            <button
              onClick={() => changeLanguage("en")}
              aria-label="Switch to English"
              aria-pressed={i18n.language === "en"}
              className={cn("text-xs font-medium transition-colors", i18n.language === "en" ? "text-neon-pink" : "text-gray-400 hover:text-white")}
            >EN</button>
            <span className="text-gray-600 text-xs" aria-hidden="true">|</span>
            <button
              onClick={() => changeLanguage("id")}
              aria-label="Beralih ke Bahasa Indonesia"
              aria-pressed={i18n.language === "id"}
              className={cn("text-xs font-medium transition-colors", i18n.language === "id" ? "text-neon-pink" : "text-gray-400 hover:text-white")}
            >ID</button>
            <span className="text-gray-600 text-xs" aria-hidden="true">|</span>
            <button
              onClick={() => changeLanguage("zh")}
              aria-label="切换到中文"
              aria-pressed={i18n.language === "zh"}
              className={cn("text-xs font-medium transition-colors", i18n.language === "zh" ? "text-neon-pink" : "text-gray-400 hover:text-white")}
            >中文</button>
          </div>

          <NavAnchor to="contact">
            <Button size="sm">{t("nav.startProject")}</Button>
          </NavAnchor>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white relative z-50 p-2"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center gap-6 h-screen w-screen overflow-y-auto pt-24 pb-12"
        >
          <div className="flex flex-col items-center gap-6 w-full px-8">
            <div
              role="group"
              aria-label="Language switcher"
              className="flex items-center gap-4 pb-6 border-b border-white/5 w-full justify-center"
            >
              <button
                onClick={() => changeLanguage("en")}
                aria-label="Switch to English"
                aria-pressed={i18n.language === "en"}
                className={cn("text-lg font-medium transition-colors", i18n.language === "en" ? "text-neon-pink" : "text-white hover:text-gray-300")}
              >EN</button>
              <button
                onClick={() => changeLanguage("id")}
                aria-label="Beralih ke Bahasa Indonesia"
                aria-pressed={i18n.language === "id"}
                className={cn("text-lg font-medium transition-colors", i18n.language === "id" ? "text-neon-pink" : "text-white hover:text-gray-300")}
              >ID</button>
              <button
                onClick={() => changeLanguage("zh")}
                aria-label="切换到中文"
                aria-pressed={i18n.language === "zh"}
                className={cn("text-lg font-medium transition-colors", i18n.language === "zh" ? "text-neon-pink" : "text-white hover:text-gray-300")}
              >中文</button>
            </div>
            {navLinks.map((link) => (
              <NavAnchor
                key={link.name}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-bold text-gray-300 hover:text-white cursor-pointer py-2"
              >
                {link.name}
              </NavAnchor>
            ))}
            <NavAnchor
              to="contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full max-w-xs mt-4"
            >
              <Button className="w-full" size="lg">{t("nav.startProject")}</Button>
            </NavAnchor>
          </div>
        </div>
      )}
    </header>
  );
}
