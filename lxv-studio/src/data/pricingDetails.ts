import type { Localized } from "../lib/localize";

/**
 * Rich "Compare Mode" details for each pricing package, aligned by index
 * (0–3) with the packages defined in `i18n.ts` (`pricing.packages`).
 *
 * Base fields (name, price, features, cta) stay in i18n so they share the
 * existing translations. The extra detail shown when a card is selected
 * lives here, side by side across languages, following the `src/data`
 * convention used elsewhere in the app.
 */
export interface PackageDetail {
  /** Stable identifier used in routing (`/consultation?package=<id>`). */
  id: string;
  deliveryTime: Localized;
  revisions: Localized;
  support: Localized;
  technology: Localized[];
  bestFor: Localized;
  demoCaption: Localized;
  faqs: { question: Localized; answer: Localized }[];
}

export const packageDetails: PackageDetail[] = [
  {
    id: "umkm",
    deliveryTime: {
      en: "3–5 working days",
      id: "3–5 hari kerja",
      zh: "3–5 个工作日",
    },
    revisions: {
      en: "2 major revisions",
      id: "2 kali revisi mayor",
      zh: "2 次重大修订",
    },
    support: { en: "30 days", id: "30 hari", zh: "30 天" },
    technology: [
      { en: "Next.js", id: "Next.js", zh: "Next.js" },
      { en: "Responsive Design", id: "Desain Responsif", zh: "响应式设计" },
      { en: "SEO Ready", id: "Siap SEO", zh: "SEO 就绪" },
      { en: "WhatsApp Integration", id: "Integrasi WhatsApp", zh: "WhatsApp 集成" },
      { en: "Security Best Practices", id: "Praktik Keamanan Terbaik", zh: "安全最佳实践" },
    ],
    bestFor: {
      en: "Perfect for local businesses, cafés, clinics, consultants, online shops, and startups building their first trusted digital presence.",
      id: "Cocok untuk bisnis lokal, kafe, klinik, konsultan, toko online, dan startup yang membangun identitas digital pertama yang terpercaya.",
      zh: "非常适合本地企业、咖啡馆、诊所、顾问、网店和初创公司建立首个可信的数字形象。",
    },
    demoCaption: {
      en: "Example of a website in this package",
      id: "Contoh Website Paket Ini",
      zh: "此套餐的网站示例",
    },
    faqs: [
      {
        question: {
          en: "Can I upgrade later?",
          id: "Bisakah saya upgrade nanti?",
          zh: "以后可以升级吗？",
        },
        answer: {
          en: "Yes. This package is built on a scalable foundation, so you can grow into a larger package anytime without starting over.",
          id: "Bisa. Paket ini dibangun di atas fondasi yang skalabel, sehingga Anda dapat berkembang ke paket lebih besar kapan saja tanpa mulai dari awal.",
          zh: "可以。此套餐基于可扩展的基础构建，您可以随时升级到更大的套餐，无需从头开始。",
        },
      },
      {
        question: {
          en: "Do I need to prepare the content?",
          id: "Apakah saya perlu menyiapkan konten?",
          zh: "我需要准备内容吗？",
        },
        answer: {
          en: "You provide the core text and images; we handle structure, layout, and polish. We can also guide you on what to prepare.",
          id: "Anda menyediakan teks dan gambar utama; kami menangani struktur, tata letak, dan penyempurnaan. Kami juga dapat memandu apa yang perlu disiapkan.",
          zh: "您提供核心文字和图片；我们负责结构、布局和优化。我们也可以指导您准备哪些内容。",
        },
      },
      {
        question: {
          en: "Is hosting included?",
          id: "Apakah hosting termasuk?",
          zh: "包含托管吗？",
        },
        answer: {
          en: "We assist with domain and hosting setup. Domain and premium hosting fees are billed separately based on your needs.",
          id: "Kami membantu penyiapan domain dan hosting. Biaya domain dan hosting premium ditagih terpisah sesuai kebutuhan Anda.",
          zh: "我们协助设置域名和托管。域名和高级托管费用根据您的需求单独计费。",
        },
      },
    ],
  },
  {
    id: "community",
    deliveryTime: {
      en: "1–2 weeks",
      id: "1–2 minggu",
      zh: "1–2 周",
    },
    revisions: {
      en: "3 major revisions",
      id: "3 kali revisi mayor",
      zh: "3 次重大修订",
    },
    support: { en: "60 days", id: "60 hari", zh: "60 天" },
    technology: [
      { en: "Next.js", id: "Next.js", zh: "Next.js" },
      { en: "Content Management", id: "Manajemen Konten", zh: "内容管理" },
      { en: "News & Gallery", id: "Berita & Galeri", zh: "新闻与图库" },
      { en: "Online Forms", id: "Formulir Online", zh: "在线表单" },
      { en: "Admin Training", id: "Pelatihan Admin", zh: "管理员培训" },
      { en: "SEO Ready", id: "Siap SEO", zh: "SEO 就绪" },
    ],
    bestFor: {
      en: "Ideal for churches, foundations, communities, and small schools that need an informative, self-manageable website.",
      id: "Ideal untuk gereja, yayasan, komunitas, dan sekolah kecil yang membutuhkan website informatif yang mudah dikelola sendiri.",
      zh: "非常适合需要信息丰富、可自行管理网站的教会、基金会、社区和小型学校。",
    },
    demoCaption: {
      en: "Example of a website in this package",
      id: "Contoh Website Paket Ini",
      zh: "此套餐的网站示例",
    },
    faqs: [
      {
        question: {
          en: "Can our team update the website ourselves?",
          id: "Bisakah tim kami memperbarui website sendiri?",
          zh: "我们的团队可以自己更新网站吗？",
        },
        answer: {
          en: "Yes. This package includes an admin manager and user training so your team can publish news, events, and photos independently.",
          id: "Bisa. Paket ini mencakup pengelola admin dan pelatihan pengguna agar tim Anda dapat mempublikasikan berita, acara, dan foto secara mandiri.",
          zh: "可以。此套餐包含管理面板和用户培训，让您的团队能够独立发布新闻、活动和照片。",
        },
      },
      {
        question: {
          en: "How many pages are included?",
          id: "Berapa halaman yang termasuk?",
          zh: "包含多少页面？",
        },
        answer: {
          en: "Up to 10 pages, plus dynamic sections like articles and event agendas that grow with your content.",
          id: "Hingga 10 halaman, ditambah bagian dinamis seperti artikel dan agenda acara yang bertambah seiring konten Anda.",
          zh: "最多 10 个页面，外加文章和活动日程等随内容增长的动态板块。",
        },
      },
      {
        question: {
          en: "Do you help migrate our old content?",
          id: "Apakah Anda membantu memindahkan konten lama kami?",
          zh: "你们会帮助迁移我们的旧内容吗？",
        },
        answer: {
          en: "Yes. We can migrate existing pages, images, and documents so nothing important is lost in the transition.",
          id: "Ya. Kami dapat memindahkan halaman, gambar, dan dokumen yang ada agar tidak ada hal penting yang hilang saat transisi.",
          zh: "是的。我们可以迁移现有的页面、图片和文档，确保过渡期间不丢失重要内容。",
        },
      },
    ],
  },
  {
    id: "institution",
    deliveryTime: {
      en: "3–6 weeks",
      id: "3–6 minggu",
      zh: "3–6 周",
    },
    revisions: {
      en: "Iterative per milestone",
      id: "Iteratif per milestone",
      zh: "按里程碑迭代",
    },
    support: { en: "90 days", id: "90 hari", zh: "90 天" },
    technology: [
      { en: "Next.js", id: "Next.js", zh: "Next.js" },
      { en: "Admin & Multi-User", id: "Admin & Multi-Pengguna", zh: "管理员与多用户" },
      { en: "Database", id: "Basis Data", zh: "数据库" },
      { en: "Administration Dashboard", id: "Dashboard Administrasi", zh: "管理仪表板" },
      { en: "Google Workspace Integration", id: "Integrasi Google Workspace", zh: "Google Workspace 集成" },
      { en: "Data Backup & Security", id: "Backup Data & Keamanan", zh: "数据备份与安全" },
    ],
    bestFor: {
      en: "Built for schools, government agencies, and companies that need administration, data management, and multi-user systems.",
      id: "Dibangun untuk sekolah, instansi pemerintah, dan perusahaan yang membutuhkan administrasi, manajemen data, dan sistem multi-pengguna.",
      zh: "专为需要行政管理、数据管理和多用户系统的学校、政府机构和公司打造。",
    },
    demoCaption: {
      en: "Example of a system in this package",
      id: "Contoh Sistem Paket Ini",
      zh: "此套餐的系统示例",
    },
    faqs: [
      {
        question: {
          en: "Can it integrate with our existing systems?",
          id: "Bisakah terintegrasi dengan sistem kami yang ada?",
          zh: "能与我们现有的系统集成吗？",
        },
        answer: {
          en: "Yes. We integrate with Google Workspace, spreadsheets, and most third-party services, and can connect to existing databases where feasible.",
          id: "Bisa. Kami berintegrasi dengan Google Workspace, spreadsheet, dan sebagian besar layanan pihak ketiga, serta dapat terhubung ke basis data yang ada bila memungkinkan.",
          zh: "可以。我们可与 Google Workspace、电子表格和大多数第三方服务集成，并在可行的情况下连接现有数据库。",
        },
      },
      {
        question: {
          en: "How is data kept secure?",
          id: "Bagaimana data dijaga keamanannya?",
          zh: "如何保证数据安全？",
        },
        answer: {
          en: "We apply role-based access control, encryption, automated backups, and industry security practices at every layer.",
          id: "Kami menerapkan kontrol akses berbasis peran, enkripsi, backup otomatis, dan praktik keamanan industri di setiap lapisan.",
          zh: "我们在每一层都应用基于角色的访问控制、加密、自动备份和行业安全实践。",
        },
      },
      {
        question: {
          en: "Do you provide training for staff?",
          id: "Apakah Anda menyediakan pelatihan untuk staf?",
          zh: "你们为员工提供培训吗？",
        },
        answer: {
          en: "Yes. Implementation assistance and staff training are included so your team is confident using the system from day one.",
          id: "Ya. Pendampingan implementasi dan pelatihan staf termasuk agar tim Anda percaya diri menggunakan sistem sejak hari pertama.",
          zh: "是的。包含实施协助和员工培训，让您的团队从第一天起就能自信地使用系统。",
        },
      },
    ],
  },
  {
    id: "custom",
    deliveryTime: {
      en: "Defined during discovery",
      id: "Ditentukan saat discovery",
      zh: "在需求调研阶段确定",
    },
    revisions: {
      en: "Agreed per scope",
      id: "Disepakati per lingkup",
      zh: "按范围协商确定",
    },
    support: {
      en: "Tailored SLA",
      id: "SLA yang disesuaikan",
      zh: "定制 SLA",
    },
    technology: [
      { en: "Next.js / Custom Stack", id: "Next.js / Stack Kustom", zh: "Next.js / 定制技术栈" },
      { en: "Dashboards & Internal Apps", id: "Dashboard & Aplikasi Internal", zh: "仪表板与内部应用" },
      { en: "AI Automation", id: "Otomasi AI", zh: "AI 自动化" },
      { en: "Third-party Integrations", id: "Integrasi Pihak Ketiga", zh: "第三方集成" },
      { en: "Cloud Infrastructure", id: "Infrastruktur Cloud", zh: "云基础设施" },
      { en: "Ongoing Development", id: "Pengembangan Berkelanjutan", zh: "持续开发" },
    ],
    bestFor: {
      en: "For organizations with specific workflows: custom dashboards, internal applications, portals, ERP, or AI automation designed around how you actually work.",
      id: "Untuk organisasi dengan alur kerja spesifik: dashboard kustom, aplikasi internal, portal, ERP, atau otomasi AI yang dirancang sesuai cara kerja Anda.",
      zh: "适用于有特定工作流程的组织：围绕您实际工作方式设计的定制仪表板、内部应用、门户、ERP 或 AI 自动化。",
    },
    demoCaption: {
      en: "Example of a custom solution",
      id: "Contoh Solusi Kustom",
      zh: "定制解决方案示例",
    },
    faqs: [
      {
        question: {
          en: "How does pricing work for custom projects?",
          id: "Bagaimana penetapan harga untuk proyek kustom?",
          zh: "定制项目如何定价？",
        },
        answer: {
          en: "After a discovery call we scope the work and provide a transparent, itemized estimate — no hidden fees, no obligation.",
          id: "Setelah sesi discovery, kami menentukan lingkup kerja dan memberikan estimasi transparan dan terperinci — tanpa biaya tersembunyi, tanpa keterikatan.",
          zh: "在需求调研通话后，我们界定工作范围并提供透明、明细化的报价——无隐藏费用，无义务。",
        },
      },
      {
        question: {
          en: "Can we start small and expand?",
          id: "Bisakah kami mulai kecil lalu berkembang?",
          zh: "我们可以先从小规模开始再扩展吗？",
        },
        answer: {
          en: "Absolutely. We deliver in phases, so you see working results early and expand scope as confidence and budget allow.",
          id: "Tentu. Kami mengerjakan secara bertahap, sehingga Anda melihat hasil nyata lebih awal dan memperluas lingkup sesuai kepercayaan dan anggaran.",
          zh: "当然可以。我们分阶段交付，让您尽早看到可用成果，并根据信心和预算扩展范围。",
        },
      },
      {
        question: {
          en: "Do you sign an NDA?",
          id: "Apakah Anda menandatangani NDA?",
          zh: "你们会签署保密协议吗？",
        },
        answer: {
          en: "Yes. For sensitive projects we are happy to sign an NDA before discussing detailed requirements.",
          id: "Ya. Untuk proyek sensitif, kami dengan senang hati menandatangani NDA sebelum membahas kebutuhan secara detail.",
          zh: "是的。对于敏感项目，我们乐于在讨论详细需求前签署保密协议。",
        },
      },
    ],
  },
];
