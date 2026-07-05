import type { LucideIcon } from "lucide-react";
import {
  Store,
  UtensilsCrossed,
  Mountain,
  Factory,
  Landmark,
  HeartHandshake,
  Church,
  GraduationCap,
  Stethoscope,
  Rocket,
  Sparkles,
  Globe,
  LayoutTemplate,
  Server,
  Database,
  Gauge,
  Search,
  Bot,
  Mail,
  Smartphone,
  Zap,
  CalendarClock,
  CalendarRange,
  CalendarCheck,
  Video,
  Phone,
  MapPin,
} from "lucide-react";
import type { Localized } from "../lib/localize";

export interface Option {
  id: string;
  label: Localized;
  icon?: LucideIcon;
  hint?: Localized;
}

/** Package choices for step 1 — kept in sync (by id) with pricingDetails. */
export const packageOptions: Option[] = [
  {
    id: "umkm",
    label: { en: "UMKM Starter", id: "UMKM Starter", zh: "UMKM 入门版" },
    hint: { en: "From Rp500.000", id: "Mulai Rp500.000", zh: "Rp500.000 起" },
  },
  {
    id: "community",
    label: {
      en: "Community & Foundation",
      id: "Community & Foundation",
      zh: "社区与基金会",
    },
    hint: { en: "From Rp1.000.000", id: "Mulai Rp1.000.000", zh: "Rp1.000.000 起" },
  },
  {
    id: "institution",
    label: {
      en: "Institution & Government",
      id: "Institution & Government",
      zh: "机构与政府",
    },
    hint: { en: "From Rp3.000.000", id: "Mulai Rp3.000.000", zh: "Rp3.000.000 起" },
  },
  {
    id: "custom",
    label: { en: "Custom Solution", id: "Solusi Kustom", zh: "定制方案" },
    hint: { en: "Contact us", id: "Hubungi kami", zh: "联系我们" },
  },
];

export const businessTypes: Option[] = [
  { id: "umkm", label: { en: "UMKM", id: "UMKM", zh: "中小微企业" }, icon: Store },
  { id: "restaurant", label: { en: "Restaurant", id: "Restoran", zh: "餐厅" }, icon: UtensilsCrossed },
  { id: "mining", label: { en: "Mining", id: "Pertambangan", zh: "矿业" }, icon: Mountain },
  { id: "manufacturing", label: { en: "Manufacturing", id: "Manufaktur", zh: "制造业" }, icon: Factory },
  { id: "government", label: { en: "Government", id: "Pemerintahan", zh: "政府" }, icon: Landmark },
  { id: "ngo", label: { en: "NGO", id: "LSM", zh: "非政府组织" }, icon: HeartHandshake },
  { id: "church", label: { en: "Church", id: "Gereja", zh: "教会" }, icon: Church },
  { id: "school", label: { en: "School", id: "Sekolah", zh: "学校" }, icon: GraduationCap },
  { id: "hospital", label: { en: "Hospital", id: "Rumah Sakit", zh: "医院" }, icon: Stethoscope },
  { id: "startup", label: { en: "Startup", id: "Startup", zh: "初创公司" }, icon: Rocket },
  { id: "other", label: { en: "Other", id: "Lainnya", zh: "其他" }, icon: Sparkles },
];

export const projectGoals: Option[] = [
  { id: "website", label: { en: "Website", id: "Website", zh: "网站" }, icon: Globe },
  { id: "landing", label: { en: "Landing Page", id: "Landing Page", zh: "落地页" }, icon: LayoutTemplate },
  { id: "internal", label: { en: "Internal System", id: "Sistem Internal", zh: "内部系统" }, icon: Server },
  { id: "erp", label: { en: "ERP", id: "ERP", zh: "ERP" }, icon: Database },
  { id: "dashboard", label: { en: "Dashboard", id: "Dashboard", zh: "仪表板" }, icon: Gauge },
  { id: "seo", label: { en: "SEO", id: "SEO", zh: "SEO" }, icon: Search },
  { id: "ai", label: { en: "AI Automation", id: "Otomasi AI", zh: "AI 自动化" }, icon: Bot },
  { id: "invitation", label: { en: "Digital Invitation", id: "Undangan Digital", zh: "电子请柬" }, icon: Mail },
  { id: "mobile", label: { en: "Mobile App", id: "Aplikasi Mobile", zh: "移动应用" }, icon: Smartphone },
  { id: "other", label: { en: "Other", id: "Lainnya", zh: "其他" }, icon: Sparkles },
];

export const timelines: Option[] = [
  { id: "asap", label: { en: "ASAP", id: "Secepatnya", zh: "尽快" }, icon: Zap },
  { id: "1month", label: { en: "1 Month", id: "1 Bulan", zh: "1 个月" }, icon: CalendarClock },
  { id: "2months", label: { en: "2 Months", id: "2 Bulan", zh: "2 个月" }, icon: CalendarRange },
  { id: "flexible", label: { en: "Flexible", id: "Fleksibel", zh: "灵活" }, icon: CalendarCheck },
];

export const budgets: Option[] = [
  { id: "lt1", label: { en: "< 1 Million", id: "< 1 Juta", zh: "< 100 万印尼盾" } },
  { id: "1to3", label: { en: "1–3 Million", id: "1–3 Juta", zh: "100–300 万印尼盾" } },
  { id: "3to10", label: { en: "3–10 Million", id: "3–10 Juta", zh: "300–1000 万印尼盾" } },
  { id: "10to25", label: { en: "10–25 Million", id: "10–25 Juta", zh: "1000–2500 万印尼盾" } },
  { id: "gt25", label: { en: "25 Million+", id: "25 Juta+", zh: "2500 万印尼盾以上" } },
  { id: "custom", label: { en: "Custom", id: "Kustom", zh: "定制" } },
];

export const meetingTypes: Option[] = [
  { id: "gmeet", label: { en: "Google Meet", id: "Google Meet", zh: "Google Meet" }, icon: Video },
  { id: "zoom", label: { en: "Zoom", id: "Zoom", zh: "Zoom" }, icon: Video },
  { id: "phone", label: { en: "Phone Call", id: "Telepon", zh: "电话" }, icon: Phone },
  { id: "offline", label: { en: "Offline (Palu Area)", id: "Tatap Muka (Area Palu)", zh: "线下（帕卢地区）" }, icon: MapPin },
];

/** All static UI microcopy for the consultation flow, kept trilingual. */
export const consultationCopy = {
  eyebrow: { en: "Free Consultation", id: "Konsultasi Gratis", zh: "免费咨询" },
  title: {
    en: "Let's shape your project",
    id: "Mari susun proyek Anda",
    zh: "让我们规划您的项目",
  },
  subtitle: {
    en: "A few quick questions so we can prepare the right solution before we talk. Takes about a minute.",
    id: "Beberapa pertanyaan singkat agar kami dapat menyiapkan solusi yang tepat sebelum berbincang. Hanya sekitar satu menit.",
    zh: "几个简单的问题，让我们在交谈前准备好合适的方案。大约一分钟即可完成。",
  },
  back: { en: "Back", id: "Kembali", zh: "返回" },
  next: { en: "Continue", id: "Lanjut", zh: "继续" },
  review: { en: "Review", id: "Tinjau", zh: "查看" },
  backHome: { en: "Back to home", id: "Kembali ke beranda", zh: "返回首页" },
  stepLabel: { en: "Step", id: "Langkah", zh: "步骤" },
  ofLabel: { en: "of", id: "dari", zh: "/" },
  optional: { en: "optional", id: "opsional", zh: "选填" },
  selectMultiple: {
    en: "Select all that apply",
    id: "Pilih semua yang sesuai",
    zh: "选择所有适用项",
  },
  steps: {
    package: { en: "Package", id: "Paket", zh: "套餐" },
    business: { en: "Business Type", id: "Jenis Bisnis", zh: "业务类型" },
    goals: { en: "Project Goals", id: "Tujuan Proyek", zh: "项目目标" },
    timeline: { en: "Timeline", id: "Linimasa", zh: "时间安排" },
    budget: { en: "Budget", id: "Anggaran", zh: "预算" },
    contact: { en: "Contact", id: "Kontak", zh: "联系方式" },
    review: { en: "Review", id: "Ringkasan", zh: "确认" },
  },
  questions: {
    package: {
      en: "Which package fits best?",
      id: "Paket mana yang paling sesuai?",
      zh: "哪个套餐最合适？",
    },
    business: {
      en: "What kind of organization are you?",
      id: "Anda organisasi seperti apa?",
      zh: "您是哪类组织？",
    },
    goals: {
      en: "What do you want to build?",
      id: "Apa yang ingin Anda bangun?",
      zh: "您想构建什么？",
    },
    timeline: {
      en: "When do you want to start?",
      id: "Kapan Anda ingin memulai?",
      zh: "您希望何时开始？",
    },
    budget: {
      en: "What's your estimated budget?",
      id: "Berapa estimasi anggaran Anda?",
      zh: "您的预算大约是多少？",
    },
    contact: {
      en: "How can we reach you?",
      id: "Bagaimana kami dapat menghubungi Anda?",
      zh: "我们如何与您联系？",
    },
    review: {
      en: "Does everything look right?",
      id: "Apakah semuanya sudah benar?",
      zh: "确认一下信息是否正确？",
    },
  },
  fields: {
    name: { en: "Full Name", id: "Nama Lengkap", zh: "姓名" },
    company: { en: "Company / Organization", id: "Perusahaan / Organisasi", zh: "公司 / 组织" },
    email: { en: "Email", id: "Email", zh: "电子邮箱" },
    phone: { en: "Phone", id: "Telepon", zh: "电话" },
    whatsapp: { en: "WhatsApp", id: "WhatsApp", zh: "WhatsApp" },
    message: { en: "Message", id: "Pesan", zh: "留言" },
    namePlaceholder: { en: "e.g. Andi Wijaya", id: "mis. Andi Wijaya", zh: "例如：李明" },
    companyPlaceholder: { en: "e.g. PT Maju Bersama", id: "mis. PT Maju Bersama", zh: "例如：某某有限公司" },
    emailPlaceholder: { en: "you@company.com", id: "anda@perusahaan.com", zh: "you@company.com" },
    phonePlaceholder: { en: "+62…", id: "+62…", zh: "+62…" },
    messagePlaceholder: {
      en: "Anything else we should know?",
      id: "Ada hal lain yang perlu kami ketahui?",
      zh: "还有什么需要我们了解的吗？",
    },
  },
  review_labels: {
    package: { en: "Selected Package", id: "Paket Dipilih", zh: "所选套餐" },
    business: { en: "Business Type", id: "Jenis Bisnis", zh: "业务类型" },
    goals: { en: "Requested Services", id: "Layanan Diminta", zh: "所需服务" },
    timeline: { en: "Timeline", id: "Linimasa", zh: "时间安排" },
    budget: { en: "Budget", id: "Anggaran", zh: "预算" },
    contact: { en: "Contact Information", id: "Informasi Kontak", zh: "联系信息" },
    meeting: { en: "Preferred Meeting", id: "Preferensi Pertemuan", zh: "会议方式" },
    notProvided: { en: "Not specified", id: "Belum diisi", zh: "未填写" },
  },
  cta: {
    createWorkspace: {
      en: "Create my project workspace",
      id: "Buat ruang kerja proyek saya",
      zh: "创建我的项目空间",
    },
    creating: { en: "Creating your project…", id: "Membuat proyek Anda…", zh: "正在创建您的项目…" },
    workspaceHint: {
      en: "We'll open your personal dashboard where you can track progress, share files, and talk to us.",
      id: "Kami akan membuka dasbor pribadi Anda untuk memantau progres, berbagi file, dan berdiskusi dengan kami.",
      zh: "我们将为您开启专属仪表板，随时跟踪进度、共享文件并与我们沟通。",
    },
    meetingTitle: {
      en: "How would you like to meet?",
      id: "Bagaimana Anda ingin bertemu?",
      zh: "您希望如何会面？",
    },
  },
  validation: {
    nameRequired: { en: "Please enter your name", id: "Mohon isi nama Anda", zh: "请输入您的姓名" },
    emailRequired: {
      en: "Please enter a valid email — it's how you'll access your project dashboard",
      id: "Mohon isi email yang valid — email ini untuk mengakses dasbor proyek Anda",
      zh: "请输入有效的电子邮箱——用于访问您的项目仪表板",
    },
    contactRequired: {
      en: "Please provide a phone or WhatsApp number",
      id: "Mohon isi nomor telepon atau WhatsApp",
      zh: "请提供电话或 WhatsApp 号码",
    },
    submitFailed: {
      en: "Something went wrong while creating your project. Please try again.",
      id: "Terjadi kesalahan saat membuat proyek Anda. Silakan coba lagi.",
      zh: "创建项目时出现问题，请重试。",
    },
  },
  success: {
    eyebrow: { en: "Project created", id: "Proyek dibuat", zh: "项目已创建" },
    title: {
      en: "Your project workspace is ready",
      id: "Ruang kerja proyek Anda siap",
      zh: "您的项目空间已准备就绪",
    },
    magicLink: {
      en: "We've emailed you a secure sign-in link. Open it to access your project dashboard — no password needed.",
      id: "Kami telah mengirim tautan masuk aman ke email Anda. Buka untuk mengakses dasbor proyek Anda — tanpa kata sandi.",
      zh: "我们已向您的邮箱发送了安全登录链接。打开即可访问项目仪表板，无需密码。",
    },
    openDashboard: { en: "Open my dashboard", id: "Buka dasbor saya", zh: "打开我的仪表板" },
  },
} as const;
