import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        about: "About",
        services: "Services",
        portfolio: "Portfolio",
        faq: "FAQ",
        startProject: "Start Project"
      },
      hero: {
        subtitle: "Modern Digital Agency",
        title1: "Build Better.",
        title2: "Grow Smarter.",
        desc: "Website, dashboard, automation, and AI solutions that help businesses and organizations work more efficiently and build greater trust.",
        cta1: "Choose a Service",
        cta2: "Free Consultation",
        location: "Central Sulawesi — Indonesia",
        est: "Digital Studio",
        scroll: "Scroll to explore"
      },
      about: {
        title1: "Luxavian Digital Studio helps organizations transform ideas into modern digital products.",
        title2: "",
        desc: "From company websites to internal systems and automation, we build technology that is simple to use, easy to maintain, and designed to support long-term growth.",
        desc2: "Based in Central Sulawesi. Serving clients across Indonesia.",
      },
      why: {
        title: "Why Choose Luxavian Studio?",
        problemLabel: "The Problem",
        problemTitle: "Most websites look fine — and do nothing.",
        problemDesc: "Templates that all look the same, slow pages, and layouts that never turn visitors into trust or action.",
        solutionLabel: "Our Answer",
        solutionTitle: "We craft digital experiences that earn trust and move people to act.",
        desc: "We are here as a collaborative partner ready to understand your challenges and provide the best digital solutions.",
        reasons: [
          "Affordable pricing",
          "Modern design",
          "Easy communication",
          "Long-term partnership",
          "Fast support",
          "Technology that grows with your organization",
          "Based in Central Sulawesi",
          "Ready to serve all over Indonesia"
        ]
      },
      clients: {
        title: "Who We Help",
        desc: "We are ready to work with various sectors to deliver the right solutions."
      },
      pricing: {
        title: "Pricing Packages",
        desc: "Choose the package that fits your organization's needs.",
        compare: {
          helper: "Click to compare",
          delivery: "Estimated Delivery",
          revisions: "Revision Policy",
          support: "Support",
          technology: "Technology Included",
          bestFor: "Best For",
          recentExample: "Recent Example",
          viewDemo: "View Demo",
          faq: "Frequently Asked Questions",
          consult: "Free Consultation",
          compareAll: "Compare All Packages",
          selected: "Selected Package",
          price: "Price",
          close: "Close comparison"
        },
        note: "• Prices above are starting prices.\n• Final costs will be adjusted based on the number of pages, features, design, integration, and project needs.\n• Domain, premium hosting, business email, or third-party services may incur additional costs depending on needs.\n• All projects begin with a consultation to ensure the provided solution exactly meets your needs.",
        packages: [
          {
            name: "UMKM Starter",
            badge: "🌱 Suitable for UMKM",
            price: "From Rp500.000",
            desc: "Simple and professional website solutions to help SMEs, home businesses, stores, or personal brands have a trusted digital identity.",
            target: [],
            features: [
              "Landing Page / Company Profile",
              "Up to 3 Pages",
              "Mobile Responsive",
              "WhatsApp Button",
              "Google Maps",
              "Contact Form",
              "Social Media Integration",
              "Basic SEO Optimization",
              "Domain & Hosting Setup Assistance*",
              "2x Revisions"
            ],
            cta: "Start Consultation"
          },
          {
            name: "Community & Foundation",
            badge: "⭐ Most Popular",
            price: "From Rp1.000.000",
            desc: "Designed for churches, foundations, communities, small schools, or organizations that need an informative and easily managed website.",
            target: [],
            features: [
              "All UMKM Package features",
              "Up to 10 Pages",
              "News / Articles",
              "Photo Gallery",
              "Event Agenda",
              "Online Forms",
              "Document Downloads",
              "Website Admin Manager",
              "User Training",
              "3x Revisions"
            ],
            cta: "Choose Package"
          },
          {
            name: "Institution & Government",
            badge: "🚀 Professional",
            price: "From Rp3.000.000",
            desc: "Website solutions and information systems for schools, government agencies, companies, or organizations that need administration and data management features.",
            target: [],
            features: [
              "All Community Package features",
              "Admin Login",
              "Multi User",
              "Database",
              "Administration Dashboard",
              "Data Management",
              "Digital Forms",
              "Google Workspace Integration",
              "Google Sheets Integration",
              "Data Backup",
              "Basic Security",
              "Performance Optimization",
              "Implementation Assistance"
            ],
            cta: "Discuss Needs"
          },
          {
            name: "Custom Solution",
            badge: "✨ Built to Needs",
            price: "Contact Us",
            desc: "Have more specific needs?\n\nWe are ready to build websites, dashboards, internal applications, administration systems, organization portals, or other digital solutions specifically designed according to your organization's workflow.\n\nBefore providing an offer, our team will invite you to discuss via Zoom or Google Meet to understand the needs, scope of work, timeline, and provide a transparent cost estimate.",
            target: [],
            features: [
              "Free Consultation",
              "Zoom / Google Meet",
              "Needs Analysis",
              "Solution Design",
              "Technical Proposal",
              "Time Estimation",
              "Cost Estimation",
              "Integration with Other Platforms",
              "Ongoing Development Support"
            ],
            cta: "Schedule Discussion"
          }
        ],
        faq: {
          q1: "Do you serve all of Indonesia?",
          a1: "Yes. Although based in Central Sulawesi, we serve clients from all over Indonesia online or in person as needed.",
          q2: "Can you help with domain and hosting?",
          a2: "Yes. We can help with purchasing, configuring, and managing the domain and hosting until the website is ready to use.",
          q3: "Are maintenance services available?",
          a3: "Yes. We provide maintenance and ongoing development services according to needs.",
          q4: "What if I don't know what kind of website I need?",
          a4: "No problem. Our team is ready to discuss and provide the best recommendations before the project begins."
        }
      },
      services: {
        title: "Our Services",
        desc: "Premium digital solutions tailored to your goals."
      },
      portfolio: {
        title: "Our Work",
        desc: "Real projects we have crafted for our clients.",
        visit: "Visit Website",
        label: "Selected Work",
        viewCategory: "View Portfolio",
        projectsSuffix: "Projects",
        preview: "Preview",
        detail: "Detail",
        liveDemo: "Live Demo"
      },
      results: {
        stats: [
          { value: "100%", label: "Custom-designed, no templates" },
          { value: "10+", label: "Sectors served across Indonesia" },
          { value: "3", label: "Languages, one studio" },
          { value: "24/7", label: "Fast, human support" }
        ]
      },
      workflow: {
        title: "How We Work",
        desc: "A transparent and collaborative process from start to finish.",
        steps: [
          { title: "Consultation", desc: "We discuss your goals, business needs, and project requirements." },
          { title: "Planning & Design", desc: "We prepare the structure, UI/UX, and visual concept." },
          { title: "Development", desc: "We build a fast, responsive, and optimized website." },
          { title: "Review", desc: "You review the project and request revisions if needed." },
          { title: "Launch", desc: "We deploy your website and ensure everything works properly." }
        ]
      },
      faq: {
        title: "Frequently Asked Questions",
        desc: "Find answers to common questions about our services.",
        items: [
          {
            q: "Do you only serve clients in Central Sulawesi?",
            a: "While we are based in Central Sulawesi, we are ready to serve clients from all over Indonesia and globally."
          },
          {
            q: "How much does a website cost?",
            a: "Our pricing is flexible and transparent. We tailor the cost to your specific needs without hidden fees. Contact us for a free consultation."
          },
          {
            q: "Do you provide maintenance after the project is done?",
            a: "Yes, we provide post-project support and maintenance to ensure your digital solution runs smoothly."
          },
          {
            q: "I don't understand technology, can you still help?",
            a: "Absolutely! We communicate in a clear, easy-to-understand way and will guide you through every step of the process."
          }
        ]
      },
      finalCta: {
        label: "One Last Thing",
        line1: "Have an idea?",
        line2: "Let's make it real.",
        desc: "Tell us where you want to go. We'll design the way there.",
        button: "Start a Project",
        whatsapp: "Chat on WhatsApp"
      },
      contact: {
        title: "Let's Build Digital Solutions Together.",
        desc: "We believe every organization has different needs. Discuss your challenges, and let's design the right solution. No need to worry if you are just starting out, we guide every process.",
        successTitle: "Message Sent Successfully!",
        successDesc: "Thank you for contacting us. We will get back to you shortly.",
        form: {
          name: "Name",
          email: "Email",
          whatsapp: "WhatsApp Number",
          company: "Company / Organization",
          projectType: "Project Type",
          budget: "Estimated Budget",
          desc: "Project Details",
          send: "Send Message",
          sending: "Sending..."
        },
        options: {
          pt1: "Select a project type...",
          pt2: "Website / Landing Page",
          pt3: "Dashboard / Internal System",
          pt4: "AI & Automation",
          pt5: "Other",
          b1: "Select budget range...",
          b2: "Under $5,000",
          b3: "$5,000 - $10,000",
          b4: "$10,000 - $20,000",
          b5: "$20,000+"
        }
      },
      footer: {
        desc: "From Central Sulawesi, Building Digital Solutions for Indonesia.",
        columns: { company: "Company", services: "Services", contact: "Contact" },
        links: {
          about: "About Us",
          portfolio: "Portfolio",
          services: "Services",
          businessWebsite: "Business Website",
          weddingInvitation: "Wedding Invitation",
          customWebApp: "Custom Web App"
        }
      }
    }
  },
  id: {
    translation: {
      nav: {
        home: "Beranda",
        about: "Tentang",
        services: "Layanan",
        portfolio: "Portofolio",
        faq: "FAQ",
        startProject: "Mulai Proyek"
      },
      hero: {
        subtitle: "Mitra Digital Modern",
        title1: "Build Better.",
        title2: "Grow Smarter.",
        desc: "Website, dashboard, otomasi, dan solusi AI yang membantu bisnis dan organisasi bekerja lebih efisien dan membangun kepercayaan yang lebih besar.",
        cta1: "Pilih Layanan",
        cta2: "Konsultasi Gratis",
        location: "Sulawesi Tengah — Indonesia",
        est: "Studio Digital",
        scroll: "Scroll untuk menjelajah"
      },
      about: {
        title1: "Luxavian Digital Studio membantu organisasi mengubah ide menjadi produk digital modern.",
        title2: "",
        desc: "Dari website perusahaan hingga sistem internal dan otomasi, kami membangun teknologi yang mudah digunakan, mudah dipelihara, dan dirancang untuk mendukung pertumbuhan jangka panjang.",
        desc2: "Berbasis di Sulawesi Tengah. Melayani klien di seluruh Indonesia.",
      },
      why: {
        title: "Mengapa Memilih Luxavian Studio?",
        problemLabel: "Masalahnya",
        problemTitle: "Kebanyakan website terlihat bagus — tapi tidak menghasilkan apa-apa.",
        problemDesc: "Template yang serba mirip, halaman yang lambat, dan tata letak yang tidak pernah mengubah pengunjung menjadi kepercayaan atau tindakan.",
        solutionLabel: "Jawaban Kami",
        solutionTitle: "Kami merancang pengalaman digital yang membangun kepercayaan dan mendorong orang untuk bertindak.",
        desc: "Kami hadir sebagai mitra kolaboratif yang siap memahami tantangan Anda dan memberikan solusi digital terbaik.",
        reasons: [
          "Harga terjangkau",
          "Desain modern",
          "Komunikasi mudah",
          "Kemitraan jangka panjang",
          "Dukungan cepat",
          "Teknologi yang berkembang bersama organisasi Anda",
          "Berbasis di Sulawesi Tengah",
          "Siap melayani seluruh Indonesia"
        ]
      },
      clients: {
        title: "Target Klien",
        desc: "Kami siap bekerja sama dengan berbagai sektor untuk menghadirkan solusi yang tepat guna."
      },
      pricing: {
        title: "Pilihan Layanan",
        desc: "Pilih paket yang sesuai dengan kebutuhan organisasi Anda.",
        compare: {
          helper: "Klik untuk membandingkan",
          delivery: "Estimasi Pengerjaan",
          revisions: "Kebijakan Revisi",
          support: "Dukungan",
          technology: "Teknologi Termasuk",
          bestFor: "Cocok Untuk",
          recentExample: "Contoh Terbaru",
          viewDemo: "Lihat Demo",
          faq: "Pertanyaan yang Sering Diajukan",
          consult: "Konsultasi Gratis",
          compareAll: "Bandingkan Semua Paket",
          selected: "Paket Dipilih",
          price: "Harga",
          close: "Tutup perbandingan"
        },
        note: "• Harga di atas adalah harga mulai (starting price).\n• Biaya akhir akan disesuaikan dengan jumlah halaman, fitur, desain, integrasi, dan kebutuhan proyek.\n• Domain, hosting premium, email bisnis, maupun layanan pihak ketiga dapat dikenakan biaya tambahan sesuai kebutuhan.\n• Seluruh proyek diawali dengan konsultasi agar solusi yang diberikan benar-benar sesuai dengan kebutuhan Anda.",
        packages: [
          {
            name: "UMKM Starter",
            badge: "🌱 Cocok untuk UMKM",
            price: "Mulai dari Rp500.000",
            desc: "Solusi website sederhana dan profesional untuk membantu UMKM, usaha rumahan, toko, maupun personal brand memiliki identitas digital yang terpercaya.",
            target: [],
            features: [
              "Landing Page / Company Profile",
              "Hingga 3 Halaman",
              "Mobile Responsive",
              "Tombol WhatsApp",
              "Google Maps",
              "Form Kontak",
              "Integrasi Media Sosial",
              "Optimasi SEO Dasar",
              "Bantuan Setup Domain & Hosting*",
              "Revisi 2 Kali"
            ],
            cta: "Mulai Konsultasi"
          },
          {
            name: "Community & Foundation",
            badge: "⭐ Paling Populer",
            price: "Mulai dari Rp1.000.000",
            desc: "Dirancang untuk gereja, yayasan, komunitas, sekolah kecil, maupun organisasi yang membutuhkan website informatif dan mudah dikelola.",
            target: [],
            features: [
              "Semua fitur Paket UMKM",
              "Hingga 10 Halaman",
              "Berita / Artikel",
              "Galeri Foto",
              "Agenda Kegiatan",
              "Formulir Online",
              "Download Dokumen",
              "Admin Pengelola Website",
              "Pelatihan Penggunaan",
              "Revisi 3 Kali"
            ],
            cta: "Pilih Paket"
          },
          {
            name: "Institution & Government",
            badge: "🚀 Profesional",
            price: "Mulai dari Rp3.000.000",
            desc: "Solusi website dan sistem informasi untuk sekolah, instansi pemerintah, perusahaan, maupun organisasi yang membutuhkan fitur administrasi dan pengelolaan data.",
            target: [],
            features: [
              "Semua fitur Paket Community",
              "Login Admin",
              "Multi User",
              "Database",
              "Dashboard Administrasi",
              "Manajemen Data",
              "Form Digital",
              "Integrasi Google Workspace",
              "Integrasi Google Sheets",
              "Backup Data",
              "Keamanan Dasar",
              "Optimasi Performa",
              "Pendampingan Implementasi"
            ],
            cta: "Diskusikan Kebutuhan"
          },
          {
            name: "Custom Solution",
            badge: "✨ Dibangun Sesuai Kebutuhan",
            price: "Hubungi Kami",
            desc: "Memiliki kebutuhan yang lebih spesifik?\n\nKami siap membangun website, dashboard, aplikasi internal, sistem administrasi, portal organisasi, maupun solusi digital lainnya yang dirancang khusus sesuai proses kerja organisasi Anda.\n\nSebelum memberikan penawaran, tim kami akan mengundang Anda berdiskusi melalui Zoom atau Google Meet untuk memahami kebutuhan, ruang lingkup pekerjaan, target waktu, serta memberikan estimasi biaya yang transparan.",
            target: [],
            features: [
              "Konsultasi Gratis",
              "Zoom / Google Meet",
              "Analisis Kebutuhan",
              "Desain Solusi",
              "Proposal Teknis",
              "Estimasi Waktu",
              "Estimasi Biaya",
              "Integrasi dengan Platform Lain",
              "Dukungan Pengembangan Lanjutan"
            ],
            cta: "Jadwalkan Diskusi"
          }
        ],
        faq: {
          q1: "Apakah melayani seluruh Indonesia?",
          a1: "Ya. Meskipun berbasis di Sulawesi Tengah, kami melayani klien dari seluruh Indonesia secara online maupun tatap muka sesuai kebutuhan.",
          q2: "Apakah bisa membantu domain dan hosting?",
          a2: "Ya. Kami dapat membantu pembelian, konfigurasi, dan pengelolaan domain serta hosting hingga website siap digunakan.",
          q3: "Apakah tersedia layanan maintenance?",
          a3: "Ya. Kami menyediakan layanan pemeliharaan dan pengembangan lanjutan sesuai kebutuhan.",
          q4: "Bagaimana jika saya belum tahu website seperti apa yang dibutuhkan?",
          a4: "Tidak masalah. Tim kami siap berdiskusi dan memberikan rekomendasi terbaik sebelum proyek dimulai."
        }
      },
      services: {
        title: "Layanan Kami",
        desc: "Solusi digital premium yang disesuaikan dengan tujuan Anda."
      },
      portfolio: {
        title: "Portofolio",
        desc: "Proyek nyata yang telah kami kerjakan untuk klien kami.",
        visit: "Kunjungi Website",
        label: "Karya Pilihan",
        viewCategory: "Lihat Portfolio",
        projectsSuffix: "Proyek",
        preview: "Preview",
        detail: "Detail",
        liveDemo: "Live Demo"
      },
      results: {
        stats: [
          { value: "100%", label: "Desain kustom, tanpa template" },
          { value: "10+", label: "Sektor terlayani di Indonesia" },
          { value: "3", label: "Bahasa, satu studio" },
          { value: "24/7", label: "Dukungan cepat dan responsif" }
        ]
      },
      workflow: {
        title: "Cara Kami Bekerja",
        desc: "Proses yang transparan dan kolaboratif dari awal hingga akhir.",
        steps: [
          { title: "Konsultasi", desc: "Kami mendiskusikan tujuan, kebutuhan bisnis, dan kebutuhan proyek Anda." },
          { title: "Perencanaan & Desain", desc: "Kami menyiapkan struktur, UI/UX, dan konsep visual." },
          { title: "Pengembangan", desc: "Kami membangun website yang cepat, responsif, dan teroptimasi." },
          { title: "Peninjauan", desc: "Anda meninjau proyek dan meminta revisi jika diperlukan." },
          { title: "Peluncuran", desc: "Kami merilis website Anda dan memastikan semuanya berjalan baik." }
        ]
      },
      faq: {
        title: "Pertanyaan Umum",
        desc: "Temukan jawaban untuk pertanyaan umum tentang layanan kami.",
        items: [
          {
            q: "Apakah Anda hanya melayani klien di Sulawesi Tengah?",
            a: "Meskipun kami berbasis di Sulawesi Tengah, kami siap melayani klien dari seluruh Indonesia dan global."
          },
          {
            q: "Berapa biaya pembuatan website?",
            a: "Harga kami fleksibel dan transparan. Kami menyesuaikan biaya dengan kebutuhan Anda tanpa biaya tersembunyi. Hubungi kami untuk konsultasi gratis."
          },
          {
            q: "Apakah Anda menyediakan pemeliharaan setelah proyek selesai?",
            a: "Ya, kami memberikan dukungan dan pemeliharaan setelah proyek selesai untuk memastikan solusi digital Anda berjalan lancar."
          },
          {
            q: "Saya tidak paham teknologi, apakah Anda bisa membantu?",
            a: "Tentu! Kami berkomunikasi dengan bahasa yang mudah dipahami dan akan mendampingi Anda di setiap tahap proses."
          }
        ]
      },
      finalCta: {
        label: "Satu Hal Lagi",
        line1: "Punya ide?",
        line2: "Mari kita wujudkan.",
        desc: "Ceritakan tujuan Anda. Kami rancang jalan menuju ke sana.",
        button: "Mulai Proyek",
        whatsapp: "Chat via WhatsApp"
      },
      contact: {
        title: "Mari Bangun Solusi Digital Bersama.",
        desc: "Kami percaya setiap organisasi memiliki kebutuhan yang berbeda. Karena itu kami tidak menawarkan solusi yang sama untuk semua orang. Kami siap berdiskusi, memahami tantangan Anda, dan merancang solusi digital yang paling sesuai dengan tujuan Anda. Tidak perlu khawatir jika baru memulai transformasi digital. Kami akan mendampingi setiap prosesnya.",
        successTitle: "Pesan Berhasil Terkirim!",
        successDesc: "Terima kasih telah menghubungi kami. Tim kami akan segera merespons pesan Anda.",
        form: {
          name: "Nama Lengkap",
          email: "Alamat Email",
          whatsapp: "Nomor WhatsApp",
          company: "Perusahaan / Organisasi",
          projectType: "Jenis Proyek",
          budget: "Estimasi Anggaran",
          desc: "Detail Proyek",
          send: "Kirim Pesan",
          sending: "Mengirim..."
        },
        options: {
          pt1: "Pilih jenis proyek...",
          pt2: "Website / Landing Page",
          pt3: "Dashboard / Sistem Internal",
          pt4: "AI & Automasi",
          pt5: "Lainnya",
          b1: "Pilih rentang anggaran...",
          b2: "Di bawah Rp 5 Juta",
          b3: "Rp 5 Juta - Rp 15 Juta",
          b4: "Rp 15 Juta - Rp 30 Juta",
          b5: "Di atas Rp 30 Juta"
        }
      },
      footer: {
        desc: "Dari Sulawesi Tengah, Membangun Solusi Digital untuk Indonesia.",
        columns: { company: "Perusahaan", services: "Layanan", contact: "Kontak" },
        links: {
          about: "Tentang Kami",
          portfolio: "Portofolio",
          services: "Layanan",
          businessWebsite: "Website Bisnis",
          weddingInvitation: "Undangan Pernikahan",
          customWebApp: "Aplikasi Web Kustom"
        }
      }
    }
  },
  zh: {
    translation: {
      nav: {
        home: "首页",
        about: "关于",
        services: "服务",
        portfolio: "作品集",
        faq: "常见问题",
        startProject: "开始项目"
      },
      hero: {
        subtitle: "现代数字机构",
        title1: "Build Better.",
        title2: "Grow Smarter.",
        desc: "帮助企业和组织更高效工作并建立更大信任的网站、仪表板、自动化和人工智能解决方案。",
        cta1: "选择服务",
        cta2: "免费咨询",
        location: "中苏拉威西 — 印度尼西亚",
        est: "数字工作室",
        scroll: "滚动探索"
      },
      about: {
        title1: "Luxavian Digital Studio 帮助组织将创意转化为现代数字产品。",
        title2: "",
        desc: "从企业网站到内部系统和自动化，我们构建易于使用、易于维护且旨在支持长期增长的技术。",
        desc2: "总部位于中苏拉威西，服务全印尼客户。",
      },
      why: {
        title: "为什么选择 Luxavian Studio？",
        problemLabel: "问题所在",
        problemTitle: "大多数网站看起来不错——却毫无作用。",
        problemDesc: "千篇一律的模板、缓慢的页面，以及无法将访客转化为信任与行动的布局。",
        solutionLabel: "我们的答案",
        solutionTitle: "我们打造能够赢得信任、促使人们行动的数字体验。",
        desc: "我们作为协作合作伙伴，随时准备了解您的挑战并提供最佳的数字解决方案。",
        reasons: [
          "价格实惠",
          "现代设计",
          "沟通顺畅",
          "长期合作伙伴关系",
          "快速支持",
          "随您的组织共同发展的技术",
          "总部位于中苏拉威西",
          "准备服务整个印度尼西亚"
        ]
      },
      clients: {
        title: "我们帮助谁",
        desc: "我们准备与各个部门合作，提供正确的解决方案。"
      },
      pricing: {
        title: "服务套餐",
        desc: "选择适合您组织需求的套餐。",
        compare: {
          helper: "点击进行比较",
          delivery: "预计交付时间",
          revisions: "修订政策",
          support: "技术支持",
          technology: "包含技术",
          bestFor: "适用于",
          recentExample: "近期案例",
          viewDemo: "查看演示",
          faq: "常见问题",
          consult: "免费咨询",
          compareAll: "比较所有套餐",
          selected: "所选套餐",
          price: "价格",
          close: "关闭比较"
        },
        note: "• 以上价格为起始价格。\n• 最终费用将根据页面数量、功能、设计、集成和项目需求进行调整。\n• 域名、高级主机、企业电子邮件或第三方服务可能需要根据需求收取额外费用。\n• 所有项目都从咨询开始，以确保提供的解决方案完全符合您的需求。",
        packages: [
          {
            name: "中小微企业入门版 (UMKM Starter)",
            badge: "🌱 适合中小微企业",
            price: "起始价 Rp500,000",
            desc: "简单专业的网站解决方案，帮助中小微企业、家庭企业、商店或个人品牌建立值得信赖的数字身份。",
            target: [],
            features: [
              "登陆页面 / 公司简介",
              "最多 3 页",
              "移动端响应式",
              "WhatsApp 按钮",
              "Google 地图",
              "联系表单",
              "社交媒体集成",
              "基础 SEO 优化",
              "域名和主机设置协助*",
              "2次修改"
            ],
            cta: "开始咨询"
          },
          {
            name: "社区与基金会 (Community & Foundation)",
            badge: "⭐ 最受欢迎",
            price: "起始价 Rp1,000,000",
            desc: "专为需要信息丰富且易于管理的网站的教堂、基金会、社区、小型学校或组织而设计。",
            target: [],
            features: [
              "所有入门版功能",
              "最多 10 页",
              "新闻 / 文章",
              "图片库",
              "活动日程",
              "在线表单",
              "文档下载",
              "网站后台管理",
              "用户培训",
              "3次修改"
            ],
            cta: "选择套餐"
          },
          {
            name: "机构与政府 (Institution & Government)",
            badge: "🚀 专业版",
            price: "起始价 Rp3,000,000",
            desc: "为需要行政管理和数据管理功能的学校、政府机构、公司或组织提供的网站和信息系统解决方案。",
            target: [],
            features: [
              "所有社区版功能",
              "管理员登录",
              "多用户",
              "数据库",
              "管理控制台",
              "数据管理",
              "数字表单",
              "Google Workspace 集成",
              "Google Sheets 集成",
              "数据备份",
              "基础安全",
              "性能优化",
              "实施协助"
            ],
            cta: "讨论需求"
          },
          {
            name: "定制解决方案 (Custom Solution)",
            badge: "✨ 按需构建",
            price: "联系我们",
            desc: "有更具体的需求？\n\n我们准备好构建专门根据您组织工作流程设计的网站、仪表板、内部应用程序、管理系统、组织门户或其他数字解决方案。\n\n在提供报价之前，我们的团队将邀请您通过 Zoom 或 Google Meet 进行讨论，了解您的需求、工作范围、时间表，并提供透明的成本估算。",
            target: [],
            features: [
              "免费咨询",
              "Zoom / Google Meet",
              "需求分析",
              "解决方案设计",
              "技术提案",
              "时间估算",
              "成本估算",
              "与其他平台集成",
              "持续开发支持"
            ],
            cta: "安排讨论"
          }
        ],
        faq: {
          q1: "你们服务全印尼吗？",
          a1: "是的。尽管总部位于中苏拉威西省，但我们可以根据需要在线或亲自为来自印尼各地的客户提供服务。",
          q2: "能帮忙处理域名和主机吗？",
          a2: "可以。我们可以协助购买、配置和管理域名和主机，直到网站准备就绪。",
          q3: "是否提供维护服务？",
          a3: "是的。我们根据需求提供维护和持续开发服务。",
          q4: "如果我不知道需要什么样的网站怎么办？",
          a4: "没关系。在项目开始之前，我们的团队随时准备进行讨论并提供最佳建议。"
        }
      },
      services: {
        title: "我们的服务",
        desc: "根据您的目标量身定制的高端数字解决方案。"
      },
      portfolio: {
        title: "我们的作品",
        desc: "我们为客户打造的真实项目。",
        visit: "访问网站",
        label: "精选作品",
        viewCategory: "查看作品集",
        projectsSuffix: "个项目",
        preview: "预览",
        detail: "详情",
        liveDemo: "在线演示"
      },
      results: {
        stats: [
          { value: "100%", label: "定制设计，绝无模板" },
          { value: "10+", label: "服务印尼多个行业" },
          { value: "3", label: "三种语言，一个工作室" },
          { value: "24/7", label: "快速贴心的支持" }
        ]
      },
      workflow: {
        title: "我们的工作方式",
        desc: "从头到尾的透明协作过程。",
        steps: [
          { title: "咨询", desc: "我们讨论您的目标、业务需求和项目要求。" },
          { title: "规划与设计", desc: "我们准备网站结构、UI/UX 和视觉概念。" },
          { title: "开发", desc: "我们构建快速、响应式且经过优化的网站。" },
          { title: "审阅", desc: "您审阅项目，并在需要时提出修改意见。" },
          { title: "上线", desc: "我们部署您的网站并确保一切正常运行。" }
        ]
      },
      faq: {
        title: "常见问题",
        desc: "查找有关我们服务的常见问题的答案。",
        items: [
          {
            q: "您只服务于中苏拉威西省的客户吗？",
            a: "虽然我们总部位于中苏拉威西省，但我们准备服务来自整个印度尼西亚和全球的客户。"
          },
          {
            q: "建一个网站要多少钱？",
            a: "我们的定价灵活且透明。我们将根据您的具体需求定制费用，无隐藏费用。请联系我们免费咨询。"
          },
          {
            q: "项目完成后您会提供维护吗？",
            a: "是的，我们提供项目后支持和维护，以确保您的数字解决方案顺利运行。"
          },
          {
            q: "我不懂技术，您还能帮忙吗？",
            a: "当然！我们以清晰易懂的方式沟通，并会指导您完成每一步。"
          }
        ]
      },
      finalCta: {
        label: "最后一件事",
        line1: "有想法？",
        line2: "让我们一起实现。",
        desc: "告诉我们您想去的方向，我们为您设计通往那里的路。",
        button: "开始项目",
        whatsapp: "WhatsApp 联系"
      },
      contact: {
        title: "让我们一起构建数字解决方案。",
        desc: "我们相信每个组织都有不同的需求。讨论您的挑战，让我们设计正确的解决方案。如果您刚刚起步，无需担心，我们将指导每个过程。",
        successTitle: "信息发送成功！",
        successDesc: "感谢您联系我们。我们会尽快回复您。",
        form: {
          name: "姓名",
          email: "电子邮件",
          whatsapp: "WhatsApp 号码",
          company: "公司/组织",
          projectType: "项目类型",
          budget: "估计预算",
          desc: "项目详情",
          send: "发送信息",
          sending: "发送中..."
        },
        options: {
          pt1: "选择项目类型...",
          pt2: "网站 / 登陆页面",
          pt3: "仪表板 / 内部系统",
          pt4: "AI 和自动化",
          pt5: "其他",
          b1: "选择预算范围...",
          b2: "低于 $5,000",
          b3: "$5,000 - $10,000",
          b4: "$10,000 - $20,000",
          b5: "$20,000 以上"
        }
      },
      footer: {
        desc: "来自中苏拉威西，为印度尼西亚构建数字解决方案。",
        columns: { company: "公司", services: "服务", contact: "联系" },
        links: {
          about: "关于我们",
          portfolio: "作品集",
          services: "服务",
          businessWebsite: "企业网站",
          weddingInvitation: "婚礼请柬",
          customWebApp: "定制网络应用"
        }
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
