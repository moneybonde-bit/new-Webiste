import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { useTranslation } from "react-i18next";
import { Logo } from "./ui/Logo";
import { Github, Instagram, Linkedin, Mail, MessageCircle, Facebook } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#0A0A0A] pt-20 pb-10 border-t border-white/5 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-neon-pink/30 to-transparent" />
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Logo className="mb-6" />
            <p className="text-gray-400 max-w-sm mb-4 leading-relaxed">
              Building Digital Solutions for Everyone.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-tight">Navigation</h4>
            <div className="flex flex-col gap-4 text-sm text-gray-400">
              <ScrollLink to="about" smooth={true} duration={500} className="hover:text-neon-pink cursor-pointer transition-colors w-fit">{t("nav.about")}</ScrollLink>
              <ScrollLink to="portfolio" smooth={true} duration={500} className="hover:text-neon-pink cursor-pointer transition-colors w-fit">{t("nav.portfolio")}</ScrollLink>
              <ScrollLink to="pricing" smooth={true} duration={500} className="hover:text-neon-pink cursor-pointer transition-colors w-fit">Pricing</ScrollLink>
              <ScrollLink to="faq" smooth={true} duration={500} className="hover:text-neon-pink cursor-pointer transition-colors w-fit">{t("nav.faq")}</ScrollLink>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-tight">Legal & Connect</h4>
            <div className="flex flex-col gap-4 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors w-fit">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors w-fit">Terms of Service</a>
              
              <div className="flex gap-4 mt-4">
                <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-neon-pink hover:text-white transition-all text-gray-400">
                  <MessageCircle size={16} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-neon-pink hover:text-white transition-all text-gray-400">
                  <Instagram size={16} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-neon-pink hover:text-white transition-all text-gray-400">
                  <Facebook size={16} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-neon-pink hover:text-white transition-all text-gray-400">
                  <Linkedin size={16} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-neon-pink hover:text-white transition-all text-gray-400">
                  <Github size={16} />
                </a>
                <a href="mailto:hello@luxavian.id" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-neon-pink hover:text-white transition-all text-gray-400">
                  <Mail size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} Luxavian Digital Studio. {t("footer.rights")}
          </div>
          <div className="flex items-center gap-2">
            <span>luxavian.it.com</span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-green-500 font-medium">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
