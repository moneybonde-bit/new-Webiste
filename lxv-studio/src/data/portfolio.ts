import type { Localized } from "../lib/localize";

/**
 * Portfolio projects shown in the Portfolio section.
 *
 * To add a new project, append an entry here — no component changes needed.
 * `url` powers the "Visit Website" button; `github` is optional and adds a
 * GitHub button when present. Replace `image` with a real screenshot
 * (put it in /public/portfolio and reference it as "/portfolio/name.jpg").
 */
export interface PortfolioProject {
  title: Localized;
  category: Localized;
  description: Localized;
  image: string;
  url?: string;
  github?: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    title: {
      en: "Digital Wedding Invitation",
      id: "Undangan Pernikahan Digital",
      zh: "数字婚礼请柬",
    },
    category: {
      en: "Wedding Invitation",
      id: "Undangan Digital",
      zh: "婚礼请柬",
    },
    description: {
      en: "An elegant online wedding invitation with RSVP, love story timeline, gallery, and countdown.",
      id: "Undangan pernikahan online yang elegan dengan RSVP, kisah cinta, galeri, dan hitung mundur.",
      zh: "优雅的在线婚礼请柬，包含回复、爱情故事、相册和倒计时。",
    },
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
    url: "#", // TODO: replace with live project URL
  },
  {
    title: {
      en: "Church Website",
      id: "Website Gereja",
      zh: "教会网站",
    },
    category: {
      en: "Organization",
      id: "Organisasi",
      zh: "组织机构",
    },
    description: {
      en: "A modern church website with service schedules, ministries, events, and sermon archives.",
      id: "Website gereja modern dengan jadwal ibadah, pelayanan, agenda kegiatan, dan arsip khotbah.",
      zh: "现代教会网站，包含礼拜时间表、事工、活动和讲道存档。",
    },
    image:
      "https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&q=80&w=800",
    url: "#", // TODO: replace with live project URL
  },
  {
    title: {
      en: "Property Website",
      id: "Website Properti",
      zh: "房地产网站",
    },
    category: {
      en: "Real Estate",
      id: "Properti",
      zh: "房地产",
    },
    description: {
      en: "A property listing website with search, detailed listings, and direct agent contact.",
      id: "Website listing properti dengan pencarian, detail properti, dan kontak agen langsung.",
      zh: "房产列表网站，具有搜索、详细列表和直接联系经纪人的功能。",
    },
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
    url: "#", // TODO: replace with live project URL
  },
  {
    title: {
      en: "Nail Art Website",
      id: "Website Nail Art",
      zh: "美甲网站",
    },
    category: {
      en: "Beauty & Salon",
      id: "Kecantikan & Salon",
      zh: "美容与沙龙",
    },
    description: {
      en: "A stylish nail art studio website with service catalog, gallery, and online booking.",
      id: "Website studio nail art yang stylish dengan katalog layanan, galeri, dan booking online.",
      zh: "时尚的美甲工作室网站，包含服务目录、作品集和在线预约。",
    },
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800",
    url: "#", // TODO: replace with live project URL
  },
];
