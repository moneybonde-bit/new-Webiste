import type { LucideIcon } from "lucide-react";
import {
  Store,
  HeartHandshake,
  Briefcase,
  PartyPopper,
  GraduationCap,
} from "lucide-react";
import type { Localized } from "../lib/localize";

/**
 * Market segments shown in the "Target Clients" section.
 * To adjust a segment or its items, edit this file only.
 */
export interface ClientSegment {
  icon: LucideIcon;
  title: Localized;
  items: Localized[];
}

export const clientSegments: ClientSegment[] = [
  {
    icon: Store,
    title: { en: "Small Businesses", id: "Bisnis Kecil", zh: "小型企业" },
    items: [
      { en: "UMKM", id: "UMKM", zh: "中小微企业" },
      { en: "Local Businesses", id: "Bisnis Lokal", zh: "本地企业" },
      { en: "Cafes", id: "Kafe", zh: "咖啡馆" },
      { en: "Restaurants", id: "Restoran", zh: "餐厅" },
      { en: "Beauty Salons", id: "Salon Kecantikan", zh: "美容沙龙" },
      { en: "Clinics", id: "Klinik", zh: "诊所" },
      { en: "Property Agents", id: "Agen Properti", zh: "房产经纪" },
    ],
  },
  {
    icon: HeartHandshake,
    title: { en: "Organizations", id: "Organisasi", zh: "组织机构" },
    items: [
      { en: "Churches", id: "Gereja", zh: "教会" },
      { en: "Foundations", id: "Yayasan", zh: "基金会" },
      { en: "NGOs", id: "LSM", zh: "非政府组织" },
      { en: "Social Organizations", id: "Organisasi Sosial", zh: "社会组织" },
      { en: "Non-profit Institutions", id: "Lembaga Non-Profit", zh: "非营利机构" },
    ],
  },
  {
    icon: Briefcase,
    title: { en: "Professionals", id: "Profesional", zh: "专业人士" },
    items: [
      { en: "Consultants", id: "Konsultan", zh: "顾问" },
      { en: "Lawyers", id: "Pengacara", zh: "律师" },
      { en: "Architects", id: "Arsitek", zh: "建筑师" },
      { en: "Coaches", id: "Coach", zh: "教练" },
      { en: "Freelancers", id: "Freelancer", zh: "自由职业者" },
    ],
  },
  {
    icon: PartyPopper,
    title: { en: "Events", id: "Acara", zh: "活动" },
    items: [
      { en: "Wedding Invitations", id: "Undangan Pernikahan", zh: "婚礼请柬" },
      { en: "Family Events", id: "Acara Keluarga", zh: "家庭活动" },
      { en: "Company Events", id: "Acara Perusahaan", zh: "公司活动" },
    ],
  },
  {
    icon: GraduationCap,
    title: { en: "Education", id: "Pendidikan", zh: "教育" },
    items: [
      { en: "Schools", id: "Sekolah", zh: "学校" },
      { en: "Courses", id: "Kursus", zh: "课程" },
      { en: "Training Centers", id: "Pusat Pelatihan", zh: "培训中心" },
    ],
  },
];
