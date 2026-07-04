import type { LucideIcon } from "lucide-react";
import {
  Heart,
  Building2,
  Church,
  Home,
  Sparkles,
  AppWindow,
  Rocket,
  Wrench,
} from "lucide-react";
import type { Localized } from "../lib/localize";

/**
 * Services offered, shown in the Services section.
 * To add a new service, append an entry here — no component changes needed.
 */
export interface Service {
  icon: LucideIcon;
  title: Localized;
  description: Localized;
}

export const services: Service[] = [
  {
    icon: Heart,
    title: {
      en: "Digital Wedding Invitation",
      id: "Undangan Pernikahan Digital",
      zh: "数字婚礼请柬",
    },
    description: {
      en: "Elegant online wedding invitations.",
      id: "Undangan pernikahan online yang elegan.",
      zh: "优雅的在线婚礼请柬。",
    },
  },
  {
    icon: Building2,
    title: {
      en: "Business Website",
      id: "Website Bisnis",
      zh: "企业网站",
    },
    description: {
      en: "Professional websites for companies and local businesses.",
      id: "Website profesional untuk perusahaan dan bisnis lokal.",
      zh: "为公司和本地企业打造的专业网站。",
    },
  },
  {
    icon: Church,
    title: {
      en: "Church Website",
      id: "Website Gereja",
      zh: "教会网站",
    },
    description: {
      en: "Modern church websites with event and ministry information.",
      id: "Website gereja modern dengan informasi kegiatan dan pelayanan.",
      zh: "包含活动和事工信息的现代教会网站。",
    },
  },
  {
    icon: Home,
    title: {
      en: "Property Website",
      id: "Website Properti",
      zh: "房地产网站",
    },
    description: {
      en: "Property listing and real estate websites.",
      id: "Website listing properti dan real estate.",
      zh: "房产列表和房地产网站。",
    },
  },
  {
    icon: Sparkles,
    title: {
      en: "Beauty & Salon Website",
      id: "Website Kecantikan & Salon",
      zh: "美容沙龙网站",
    },
    description: {
      en: "For nail art, salons, spas, and beauty businesses.",
      id: "Untuk nail art, salon, spa, dan bisnis kecantikan.",
      zh: "适用于美甲、沙龙、水疗和美容行业。",
    },
  },
  {
    icon: AppWindow,
    title: {
      en: "Custom Web Application",
      id: "Aplikasi Web Kustom",
      zh: "定制网络应用",
    },
    description: {
      en: "Tailor-made systems based on client requirements.",
      id: "Sistem yang dibangun khusus sesuai kebutuhan klien.",
      zh: "根据客户需求量身定制的系统。",
    },
  },
  {
    icon: Rocket,
    title: {
      en: "Landing Page",
      id: "Landing Page",
      zh: "落地页",
    },
    description: {
      en: "High-converting landing pages for products and campaigns.",
      id: "Landing page dengan konversi tinggi untuk produk dan kampanye.",
      zh: "为产品和营销活动打造的高转化落地页。",
    },
  },
  {
    icon: Wrench,
    title: {
      en: "Website Maintenance",
      id: "Pemeliharaan Website",
      zh: "网站维护",
    },
    description: {
      en: "Regular updates, backups, and technical support.",
      id: "Pembaruan rutin, backup, dan dukungan teknis.",
      zh: "定期更新、备份和技术支持。",
    },
  },
];
