import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Boxes,
  Building2,
  Cloud,
  Cpu,
  Factory,
  Fingerprint,
  Gauge,
  Globe,
  GraduationCap,
  HeartPulse,
  Landmark,
  LayoutTemplate,
  LifeBuoy,
  LineChart,
  Lock,
  Rocket,
  Search,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

/* ---------------------------------- Nav ---------------------------------- */

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Keunggulan", href: "#keunggulan" },
  { label: "Layanan", href: "#layanan" },
  { label: "Proses", href: "#proses" },
  { label: "FAQ", href: "#faq" },
];

/* ---------------------------------- Hero --------------------------------- */

export const hero = {
  badge: "Software House & Digital Agency — Palu, Sulawesi Tengah",
  headline: "Perangkat lunak berstandar dunia, dibangun untuk bisnis Anda.",
  subheadline:
    "Luxavian merancang dan membangun website, aplikasi enterprise, ERP, dan otomasi AI dengan kualitas rekayasa kelas internasional — untuk perusahaan yang serius bertumbuh secara digital.",
  primaryCta: "Konsultasi Gratis",
  secondaryCta: "Lihat Layanan",
  stats: [
    { value: "100", label: "Skor Lighthouse yang kami targetkan" },
    { value: "<1 dtk", label: "Waktu muat halaman" },
    { value: "24/7", label: "Infrastruktur terpantau" },
  ],
} as const;

/* ------------------------------ Why / Bento ------------------------------ */

export interface BentoItem {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Tailwind col-span classes controlling the bento layout. */
  className: string;
}

export const whySection = {
  eyebrow: "Mengapa Luxavian",
  title: "Standar rekayasa yang jarang ditemukan di pasar lokal.",
  description:
    "Kami menerapkan praktik pengembangan yang sama dengan perusahaan teknologi terbaik dunia — dari arsitektur hingga baris kode terakhir.",
} as const;

export const bentoItems: BentoItem[] = [
  {
    icon: Gauge,
    title: "Performa ekstrem",
    description:
      "Setiap halaman dioptimalkan hingga skor Lighthouse mendekati sempurna. Kecepatan bukan fitur tambahan — melainkan fondasi.",
    className: "md:col-span-2",
  },
  {
    icon: ShieldCheck,
    title: "Keamanan berlapis",
    description:
      "Enkripsi menyeluruh, audit dependensi, dan praktik keamanan modern di setiap lapisan aplikasi.",
    className: "md:col-span-1",
  },
  {
    icon: Bot,
    title: "AI-first",
    description:
      "Otomasi cerdas terintegrasi sejak desain awal — bukan ditempelkan belakangan.",
    className: "md:col-span-1",
  },
  {
    icon: Boxes,
    title: "Arsitektur yang tumbuh bersama bisnis",
    description:
      "Sistem modular yang siap menangani sepuluh pengguna hari ini dan sepuluh ribu pengguna tahun depan — tanpa ditulis ulang.",
    className: "md:col-span-2",
  },
  {
    icon: Cpu,
    title: "Teknologi terkini",
    description:
      "Next.js, TypeScript, dan infrastruktur cloud modern — teknologi yang dipakai Vercel, Stripe, dan Linear.",
    className: "md:col-span-1",
  },
  {
    icon: LifeBuoy,
    title: "Dukungan jangka panjang",
    description:
      "Pemeliharaan proaktif, pemantauan 24/7, dan tim yang merespons cepat saat Anda membutuhkannya.",
    className: "md:col-span-2",
  },
];

/* -------------------------------- Services ------------------------------- */

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  points: string[];
}

export const servicesSection = {
  eyebrow: "Layanan",
  title: "Satu tim untuk seluruh kebutuhan digital Anda.",
  description:
    "Dari website korporat hingga sistem enterprise — dirancang, dibangun, dan dipelihara oleh satu tim yang sama.",
} as const;

export const services: Service[] = [
  {
    icon: Globe,
    title: "Pengembangan Website",
    description:
      "Website korporat dan landing page berperforma tinggi yang membangun kepercayaan sejak detik pertama.",
    points: ["Next.js & TypeScript", "Skor Lighthouse maksimal", "Desain premium"],
  },
  {
    icon: ServerCog,
    title: "Aplikasi Enterprise & ERP",
    description:
      "Sistem internal yang menyatukan operasional — inventori, keuangan, SDM, dan produksi dalam satu platform.",
    points: ["Arsitektur modular", "Integrasi sistem lama", "Dashboard real-time"],
  },
  {
    icon: Workflow,
    title: "Otomasi AI",
    description:
      "Agen AI dan alur kerja otomatis yang memangkas pekerjaan repetitif dan mempercepat pengambilan keputusan.",
    points: ["Chatbot & asisten AI", "Otomasi dokumen", "Analitik prediktif"],
  },
  {
    icon: Search,
    title: "SEO & AEO",
    description:
      "Optimasi untuk mesin pencari dan mesin jawaban AI — agar bisnis Anda ditemukan di Google maupun ChatGPT.",
    points: ["SEO teknikal", "Structured data", "Answer Engine Optimization"],
  },
  {
    icon: Cloud,
    title: "Cloud & Infrastruktur",
    description:
      "Deployment, skalabilitas, dan keamanan infrastruktur ditangani penuh — Anda fokus pada bisnis.",
    points: ["CI/CD otomatis", "Pemantauan 24/7", "Skalabilitas otomatis"],
  },
  {
    icon: LayoutTemplate,
    title: "Desain Produk Digital",
    description:
      "Antarmuka yang terasa mahal dan mudah digunakan — dirancang dengan sistem desain yang konsisten.",
    points: ["UI/UX premium", "Design system", "Prototipe interaktif"],
  },
];

/* --------------------------------- Trust --------------------------------- */

export interface TrustPillar {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const trustSection = {
  eyebrow: "Dipercaya untuk Skala Enterprise",
  title: "Dibangun untuk organisasi yang tidak bisa berkompromi.",
  description:
    "Manufaktur, pertambangan, rumah sakit, universitas, hingga instansi pemerintah — kami memahami tuntutan keandalan di level tertinggi.",
  industries: [
    { icon: Factory, label: "Manufaktur" },
    { icon: HeartPulse, label: "Rumah Sakit" },
    { icon: GraduationCap, label: "Universitas" },
    { icon: Landmark, label: "Pemerintahan" },
    { icon: Building2, label: "Korporasi" },
    { icon: LineChart, label: "UKM Berkembang" },
  ],
} as const;

export const trustPillars: TrustPillar[] = [
  {
    icon: Rocket,
    title: "Kecepatan eksekusi",
    description:
      "Proses pengembangan terstruktur dengan rilis bertahap — hasil nyata terlihat dalam hitungan minggu, bukan bulan.",
  },
  {
    icon: Lock,
    title: "Keamanan enterprise",
    description:
      "Kontrol akses granular, enkripsi data, dan kepatuhan terhadap praktik keamanan industri.",
  },
  {
    icon: Sparkles,
    title: "Kecerdasan buatan",
    description:
      "Setiap sistem dirancang siap-AI: dari otomasi proses hingga analitik yang membantu keputusan strategis.",
  },
  {
    icon: Fingerprint,
    title: "Kode yang terpelihara",
    description:
      "TypeScript ketat, pengujian otomatis, dan dokumentasi — sistem Anda tetap sehat bertahun-tahun ke depan.",
  },
];

/* -------------------------------- Process -------------------------------- */

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSection = {
  eyebrow: "Proses Kerja",
  title: "Transparan dari hari pertama hingga peluncuran.",
  description:
    "Metodologi yang teruji memastikan setiap proyek selesai tepat waktu dengan kualitas yang terjaga.",
} as const;

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    description:
      "Kami mendalami bisnis, pengguna, dan tujuan Anda — sebelum satu baris kode ditulis.",
  },
  {
    number: "02",
    title: "Perencanaan",
    description:
      "Arsitektur teknis, lingkup kerja, dan linimasa disepakati secara tertulis dan terukur.",
  },
  {
    number: "03",
    title: "Desain",
    description:
      "Antarmuka dirancang dengan standar visual internasional dan divalidasi bersama Anda.",
  },
  {
    number: "04",
    title: "Pengembangan",
    description:
      "Kode berkualitas produksi dengan pembaruan progres berkala — Anda selalu tahu posisinya.",
  },
  {
    number: "05",
    title: "Peluncuran",
    description:
      "Pengujian menyeluruh, migrasi mulus, dan go-live tanpa gangguan operasional.",
  },
  {
    number: "06",
    title: "Optimasi",
    description:
      "Pemantauan performa, iterasi berkelanjutan, dan dukungan teknis jangka panjang.",
  },
];

/* ----------------------------------- FAQ ---------------------------------- */

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqSection = {
  eyebrow: "FAQ",
  title: "Pertanyaan yang sering diajukan.",
} as const;

export const faqItems: FaqItem[] = [
  {
    question: "Berapa lama waktu pengerjaan sebuah proyek?",
    answer:
      "Landing page premium umumnya selesai dalam 2–3 minggu. Website korporat 4–6 minggu. Sistem enterprise dan ERP disepakati per fase, biasanya dimulai dari 8 minggu untuk rilis pertama.",
  },
  {
    question: "Apakah Luxavian melayani klien di luar Sulawesi?",
    answer:
      "Ya. Kami berbasis di Palu, Sulawesi Tengah, dan melayani klien di seluruh Indonesia sepenuhnya secara remote dengan proses kerja yang terstruktur dan transparan.",
  },
  {
    question: "Teknologi apa yang digunakan?",
    answer:
      "Kami menggunakan Next.js, TypeScript, dan infrastruktur cloud modern — teknologi yang sama dengan yang dipakai perusahaan teknologi terkemuka dunia. Pilihan teknologi selalu disesuaikan dengan kebutuhan jangka panjang proyek Anda.",
  },
  {
    question: "Bagaimana dengan pemeliharaan setelah peluncuran?",
    answer:
      "Setiap proyek mencakup masa garansi. Setelahnya, tersedia paket pemeliharaan berlangganan yang meliputi pembaruan keamanan, pemantauan 24/7, backup, dan dukungan teknis prioritas.",
  },
  {
    question: "Apakah bisa mengintegrasikan AI ke sistem yang sudah ada?",
    answer:
      "Bisa. Kami merancang integrasi AI secara bertahap — mulai dari otomasi dokumen dan chatbot hingga analitik prediktif — tanpa mengganggu sistem yang sedang berjalan.",
  },
  {
    question: "Bagaimana memulai kerja sama?",
    answer:
      "Hubungi kami melalui WhatsApp atau email untuk sesi konsultasi gratis. Kami akan memetakan kebutuhan Anda dan menyusun proposal teknis beserta estimasi biaya tanpa komitmen apa pun.",
  },
];

/* ----------------------------------- CTA ---------------------------------- */

export const ctaSection = {
  title: "Siap membangun keunggulan digital Anda?",
  description:
    "Konsultasikan kebutuhan Anda tanpa biaya. Dalam satu sesi, kami petakan solusi teknis yang tepat — beserta estimasi waktu dan investasinya.",
  buttonLabel: "Mulai Konsultasi Gratis",
  note: "Respons dalam 24 jam kerja. Tanpa komitmen.",
} as const;

/* --------------------------------- Footer --------------------------------- */

export const footerNav = {
  layanan: [
    { label: "Pengembangan Website", href: "#layanan" },
    { label: "Aplikasi & ERP", href: "#layanan" },
    { label: "Otomasi AI", href: "#layanan" },
    { label: "SEO & AEO", href: "#layanan" },
  ],
  perusahaan: [
    { label: "Keunggulan", href: "#keunggulan" },
    { label: "Proses Kerja", href: "#proses" },
    { label: "FAQ", href: "#faq" },
    { label: "Kontak", href: "#kontak" },
  ],
} as const;
