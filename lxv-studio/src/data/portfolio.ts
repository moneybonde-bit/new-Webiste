import type { Localized } from "../lib/localize";

/**
 * Portfolio data, organized as three categories with their own detail pages
 * (/portfolio/wedding, /portfolio/institution, /portfolio/business).
 *
 * To add a new project, append an entry to `portfolioItems` with the right
 * `category` — no component changes needed. `liveUrl` powers the
 * Preview / Live Demo button (replace the "#" placeholders with real URLs).
 * Replace `thumbnail` with a real screenshot (put it in /public/portfolio
 * and reference it as "/portfolio/name.jpg").
 */

export type PortfolioCategoryId = "wedding" | "institution" | "business";

export interface PortfolioCategory {
  id: PortfolioCategoryId;
  emoji: string;
  /** Card title on the landing page's Portfolio section. */
  title: Localized;
  /** Short blurb on the landing-page card. */
  cardDescription: Localized;
  /** H1 of the category detail page. */
  heroTitle: Localized;
  heroSubtitle: Localized;
  /** Breadcrumb / short label, e.g. "Wedding Website". */
  breadcrumb: Localized;
  /** Cover image for the landing-page card. */
  image: string;
}

export interface PortfolioItem {
  id: string;
  category: PortfolioCategoryId;
  /** Couple name, institution name, or business name. */
  title: Localized;
  /** Wedding theme, institution type, or industry. */
  subtitle: Localized;
  /** Year of delivery (shown on wedding cards). */
  year?: string;
  description: Localized;
  technologies?: string[];
  thumbnail: string;
  liveUrl?: string;
  featured?: boolean;
}

export const portfolioCategories: PortfolioCategory[] = [
  {
    id: "wedding",
    emoji: "💍",
    title: {
      en: "Digital Wedding Invitation",
      id: "Undangan Pernikahan Digital",
      zh: "数字婚礼请柬",
    },
    cardDescription: {
      en: "Elegant online invitations with RSVP, love story, gallery, and countdown.",
      id: "Undangan online elegan dengan RSVP, kisah cinta, galeri, dan hitung mundur.",
      zh: "优雅的在线请柬，包含回复、爱情故事、相册和倒计时。",
    },
    heroTitle: {
      en: "Digital Wedding Invitation Portfolio",
      id: "Portfolio Website Undangan Digital",
      zh: "数字婚礼请柬作品集",
    },
    heroSubtitle: {
      en: "A collection of digital invitation designs we have crafted.",
      id: "Berbagai desain undangan digital yang telah kami kerjakan.",
      zh: "我们精心打造的各种数字请柬设计。",
    },
    breadcrumb: {
      en: "Wedding Website",
      id: "Wedding Website",
      zh: "婚礼网站",
    },
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "institution",
    emoji: "🏛️",
    title: {
      en: "Institution Website",
      id: "Website Instansi & Organisasi",
      zh: "机构与组织网站",
    },
    cardDescription: {
      en: "Websites for churches, foundations, schools, government, NGOs, and communities.",
      id: "Website untuk gereja, yayasan, sekolah, pemerintahan, NGO, dan komunitas.",
      zh: "为教会、基金会、学校、政府、NGO 和社区打造的网站。",
    },
    heroTitle: {
      en: "Websites for Churches, Foundations, Organizations & Government",
      id: "Website untuk Gereja, Yayasan, Organisasi dan Pemerintahan",
      zh: "为教会、基金会、组织和政府打造的网站",
    },
    heroSubtitle: {
      en: "Informative, easy-to-manage websites that build public trust.",
      id: "Website informatif dan mudah dikelola yang membangun kepercayaan publik.",
      zh: "信息丰富、易于管理并赢得公众信任的网站。",
    },
    breadcrumb: {
      en: "Institution Website",
      id: "Institution Website",
      zh: "机构网站",
    },
    image:
      "https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "business",
    emoji: "💼",
    title: {
      en: "Business Website",
      id: "Website Bisnis",
      zh: "企业网站",
    },
    cardDescription: {
      en: "Property, company profile, restaurant, UMKM, startup, online shop, and more.",
      id: "Properti, company profile, restoran, UMKM, startup, toko online, dan lainnya.",
      zh: "房产、企业官网、餐厅、中小微企业、初创公司、网店等。",
    },
    heroTitle: {
      en: "Business Website Portfolio",
      id: "Portfolio Website Bisnis",
      zh: "企业网站作品集",
    },
    heroSubtitle: {
      en: "Websites that help businesses of every size look professional and sell better.",
      id: "Website yang membantu bisnis dari berbagai skala tampil profesional dan menjual lebih baik.",
      zh: "帮助各种规模的企业展现专业形象并提升销售的网站。",
    },
    breadcrumb: {
      en: "Business Website",
      id: "Business Website",
      zh: "企业网站",
    },
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200",
  },
];

export const portfolioItems: PortfolioItem[] = [
  /* ---------------------------------- Wedding --------------------------------- */
  {
    id: "andi-sinta",
    category: "wedding",
    title: { en: "Andi & Sinta", id: "Andi & Sinta", zh: "Andi & Sinta" },
    subtitle: { en: "Elegant Floral", id: "Elegant Floral", zh: "优雅花卉" },
    year: "2025",
    description: {
      en: "A soft floral invitation with RSVP, love story timeline, photo gallery, and live countdown.",
      id: "Undangan bernuansa floral lembut dengan RSVP, kisah cinta, galeri foto, dan hitung mundur.",
      zh: "柔美花卉风格请柬，包含回复、爱情故事、相册和倒计时。",
    },
    technologies: ["React", "Tailwind CSS"],
    thumbnail:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
    liveUrl: "#", // TODO: replace with live project URL
    featured: true,
  },
  {
    id: "kevin-maria",
    category: "wedding",
    title: { en: "Kevin & Maria", id: "Kevin & Maria", zh: "Kevin & Maria" },
    subtitle: { en: "Rustic Garden", id: "Rustic Garden", zh: "田园花园" },
    year: "2025",
    description: {
      en: "A warm garden-themed invitation with digital guestbook and location map.",
      id: "Undangan bertema taman yang hangat dengan buku tamu digital dan peta lokasi.",
      zh: "温馨花园主题请柬，包含数字留言簿和位置地图。",
    },
    technologies: ["React", "Tailwind CSS"],
    thumbnail:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=800",
    liveUrl: "#", // TODO: replace with live project URL
  },
  {
    id: "joshua-angel",
    category: "wedding",
    title: { en: "Joshua & Angel", id: "Joshua & Angel", zh: "Joshua & Angel" },
    subtitle: { en: "Modern Minimalist", id: "Modern Minimalist", zh: "现代简约" },
    year: "2026",
    description: {
      en: "A clean minimalist invitation with smooth animations and background music.",
      id: "Undangan minimalis bersih dengan animasi halus dan musik latar.",
      zh: "简洁的极简风请柬，动画流畅并配有背景音乐。",
    },
    technologies: ["React", "Tailwind CSS"],
    thumbnail:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800",
    liveUrl: "#", // TODO: replace with live project URL
  },
  {
    id: "riko-melissa",
    category: "wedding",
    title: { en: "Riko & Melissa", id: "Riko & Melissa", zh: "Riko & Melissa" },
    subtitle: { en: "Classic Royal", id: "Classic Royal", zh: "古典皇家" },
    year: "2026",
    description: {
      en: "A luxurious royal-style invitation with gold accents and elegant serif typography.",
      id: "Undangan bergaya royal mewah dengan aksen emas dan tipografi serif elegan.",
      zh: "华丽的皇家风格请柬，金色点缀与优雅衬线字体。",
    },
    technologies: ["React", "Tailwind CSS"],
    thumbnail:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=800",
    liveUrl: "#", // TODO: replace with live project URL
  },

  /* -------------------------------- Institution ------------------------------- */
  {
    id: "gereja-sion",
    category: "institution",
    title: { en: "Gereja Sion Palu", id: "Gereja Sion Palu", zh: "帕卢锡安教会" },
    subtitle: { en: "Church", id: "Gereja", zh: "教会" },
    description: {
      en: "A modern church website with service schedules, ministries, events, and sermon archives.",
      id: "Website gereja modern dengan jadwal ibadah, pelayanan, agenda kegiatan, dan arsip khotbah.",
      zh: "现代教会网站，包含礼拜时间表、事工、活动和讲道存档。",
    },
    technologies: ["React", "Tailwind CSS", "Supabase"],
    thumbnail:
      "https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&q=80&w=800",
    liveUrl: "#", // TODO: replace with live project URL
    featured: true,
  },
  {
    id: "yayasan-harapan",
    category: "institution",
    title: { en: "Yayasan Harapan Kasih", id: "Yayasan Harapan Kasih", zh: "希望之爱基金会" },
    subtitle: { en: "Foundation", id: "Yayasan", zh: "基金会" },
    description: {
      en: "A foundation profile with programs, donation information, and activity news.",
      id: "Profil yayasan dengan program, informasi donasi, dan berita kegiatan.",
      zh: "基金会官网，包含项目介绍、捐赠信息和活动新闻。",
    },
    technologies: ["React", "Tailwind CSS"],
    thumbnail:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=800",
    liveUrl: "#", // TODO: replace with live project URL
  },
  {
    id: "sma-harapan",
    category: "institution",
    title: { en: "SMA Harapan Bangsa", id: "SMA Harapan Bangsa", zh: "民族希望高中" },
    subtitle: { en: "Education", id: "Sekolah", zh: "教育" },
    description: {
      en: "A school website with announcements, teacher directory, and new-student registration info.",
      id: "Website sekolah dengan pengumuman, direktori guru, dan informasi penerimaan siswa baru.",
      zh: "学校网站，包含公告、教师名录和新生注册信息。",
    },
    technologies: ["React", "Tailwind CSS", "Supabase"],
    thumbnail:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
    liveUrl: "#", // TODO: replace with live project URL
  },
  {
    id: "portal-desa",
    category: "institution",
    title: { en: "Portal Desa Digital", id: "Portal Desa Digital", zh: "数字村庄门户" },
    subtitle: { en: "Government", id: "Pemerintahan", zh: "政府" },
    description: {
      en: "A village government portal with public services, digital forms, and transparency reports.",
      id: "Portal pemerintah desa dengan layanan publik, formulir digital, dan laporan transparansi.",
      zh: "村政府门户，包含公共服务、数字表单和透明度报告。",
    },
    technologies: ["React", "Tailwind CSS", "Supabase"],
    thumbnail:
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=800",
    liveUrl: "#", // TODO: replace with live project URL
  },
  {
    id: "lsm-peduli",
    category: "institution",
    title: { en: "LSM Peduli Sulawesi", id: "LSM Peduli Sulawesi", zh: "苏拉威西关怀NGO" },
    subtitle: { en: "NGO", id: "NGO", zh: "非政府组织" },
    description: {
      en: "An NGO website with campaigns, volunteer registration, and impact documentation.",
      id: "Website NGO dengan kampanye, pendaftaran relawan, dan dokumentasi dampak.",
      zh: "NGO 网站，包含活动、志愿者注册和影响力记录。",
    },
    technologies: ["React", "Tailwind CSS"],
    thumbnail:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=800",
    liveUrl: "#", // TODO: replace with live project URL
  },
  {
    id: "komunitas-kreatif",
    category: "institution",
    title: { en: "Komunitas Pemuda Kreatif", id: "Komunitas Pemuda Kreatif", zh: "创意青年社区" },
    subtitle: { en: "Community Organization", id: "Komunitas", zh: "社区组织" },
    description: {
      en: "A community hub with member profiles, event agenda, and open-registration forms.",
      id: "Wadah komunitas dengan profil anggota, agenda kegiatan, dan formulir pendaftaran.",
      zh: "社区平台，包含成员简介、活动日程和报名表单。",
    },
    technologies: ["React", "Tailwind CSS"],
    thumbnail:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800",
    liveUrl: "#", // TODO: replace with live project URL
  },

  /* ---------------------------------- Business -------------------------------- */
  {
    id: "palu-residence",
    category: "business",
    title: { en: "Palu Residence", id: "Palu Residence", zh: "帕卢住宅" },
    subtitle: { en: "Property", id: "Properti", zh: "房地产" },
    description: {
      en: "A property listing website with search, detailed listings, and direct agent contact.",
      id: "Website listing properti dengan pencarian, detail properti, dan kontak agen langsung.",
      zh: "房产列表网站，具有搜索、详细列表和直接联系经纪人的功能。",
    },
    technologies: ["React", "Tailwind CSS", "Supabase"],
    thumbnail:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
    liveUrl: "#", // TODO: replace with live project URL
    featured: true,
  },
  {
    id: "luxe-nail-studio",
    category: "business",
    title: { en: "Luxe Nail Studio", id: "Luxe Nail Studio", zh: "Luxe 美甲工作室" },
    subtitle: { en: "Beauty & Salon", id: "Kecantikan & Salon", zh: "美容与沙龙" },
    description: {
      en: "A stylish nail art studio website with service catalog, gallery, and online booking.",
      id: "Website studio nail art yang stylish dengan katalog layanan, galeri, dan booking online.",
      zh: "时尚的美甲工作室网站，包含服务目录、作品集和在线预约。",
    },
    technologies: ["React", "Tailwind CSS"],
    thumbnail:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800",
    liveUrl: "#", // TODO: replace with live project URL
  },
  {
    id: "rumah-kopi",
    category: "business",
    title: { en: "Rumah Kopi Nusantara", id: "Rumah Kopi Nusantara", zh: "群岛咖啡屋" },
    subtitle: { en: "Cafe & Restaurant", id: "Cafe & Restoran", zh: "咖啡馆与餐厅" },
    description: {
      en: "A cafe website with digital menu, table reservation, and location map.",
      id: "Website cafe dengan menu digital, reservasi meja, dan peta lokasi.",
      zh: "咖啡馆网站，包含电子菜单、订座和位置地图。",
    },
    technologies: ["React", "Tailwind CSS"],
    thumbnail:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800",
    liveUrl: "#", // TODO: replace with live project URL
  },
  {
    id: "karya-mandiri",
    category: "business",
    title: { en: "CV Karya Mandiri", id: "CV Karya Mandiri", zh: "Karya Mandiri 公司" },
    subtitle: { en: "Company Profile", id: "Company Profile", zh: "企业官网" },
    description: {
      en: "A company profile with services, project gallery, and client testimonials.",
      id: "Company profile dengan layanan, galeri proyek, dan testimoni klien.",
      zh: "企业官网，包含服务、项目展示和客户评价。",
    },
    technologies: ["React", "Tailwind CSS"],
    thumbnail:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    liveUrl: "#", // TODO: replace with live project URL
  },
  {
    id: "dapur-bunda",
    category: "business",
    title: { en: "Dapur Bunda", id: "Dapur Bunda", zh: "妈妈厨房" },
    subtitle: { en: "UMKM / Online Shop", id: "UMKM / Toko Online", zh: "中小微企业 / 网店" },
    description: {
      en: "An online shop for a home food business with product catalog and WhatsApp ordering.",
      id: "Toko online usaha makanan rumahan dengan katalog produk dan pemesanan via WhatsApp.",
      zh: "家庭食品网店，包含产品目录和 WhatsApp 下单。",
    },
    technologies: ["React", "Tailwind CSS"],
    thumbnail:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800",
    liveUrl: "#", // TODO: replace with live project URL
  },
  {
    id: "sulawesi-explore",
    category: "business",
    title: { en: "Sulawesi Explore", id: "Sulawesi Explore", zh: "苏拉威西探索" },
    subtitle: { en: "Travel & Tour", id: "Travel & Tour", zh: "旅游" },
    description: {
      en: "A travel website with tour packages, itinerary details, and booking inquiries.",
      id: "Website travel dengan paket wisata, detail itinerary, dan pemesanan.",
      zh: "旅游网站，包含旅行套餐、行程详情和预订咨询。",
    },
    technologies: ["React", "Tailwind CSS"],
    thumbnail:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
    liveUrl: "#", // TODO: replace with live project URL
  },
];

export function getCategory(id: string | undefined): PortfolioCategory | undefined {
  return portfolioCategories.find((c) => c.id === id);
}

export function getItemsByCategory(id: PortfolioCategoryId): PortfolioItem[] {
  return portfolioItems.filter((item) => item.category === id);
}
