import type { Localized } from "./localize";
import {
  budgets,
  businessTypes,
  meetingTypes,
  packageOptions,
  projectGoals,
  timelines,
} from "../data/consultation";

export interface ContactInfo {
  name: string;
  company: string;
  email: string;
  phone: string;
  whatsapp: string;
  message: string;
}

export interface ConsultationState {
  packageId: string | null;
  businessType: string | null;
  goals: string[];
  timeline: string | null;
  budget: string | null;
  meeting: string | null;
  contact: ContactInfo;
}

export const emptyConsultation: ConsultationState = {
  packageId: null,
  businessType: null,
  goals: [],
  timeline: null,
  budget: null,
  meeting: null,
  contact: { name: "", company: "", email: "", phone: "", whatsapp: "", message: "" },
};

/** A plain resolver (not the hook) so this works outside React render. */
type Resolve = (value: Localized) => string;

function labelFor(list: { id: string; label: Localized }[], id: string | null, resolve: Resolve): string {
  const found = list.find((o) => o.id === id);
  return found ? resolve(found.label) : "";
}

/**
 * Build a professional, structured WhatsApp message from the collected
 * consultation answers, localized to the active language.
 */
export function buildConsultationMessage(
  state: ConsultationState,
  resolve: Resolve,
): string {
  const lines: string[] = [];
  lines.push("Halo Luxavian Digital Studio 👋");
  lines.push("");
  lines.push("Saya ingin konsultasi dengan detail berikut:");
  lines.push("");

  const pkg = labelFor(packageOptions, state.packageId, resolve);
  if (pkg) lines.push(`• Paket: ${pkg}`);

  const biz = labelFor(businessTypes, state.businessType, resolve);
  if (biz) lines.push(`• Jenis Bisnis: ${biz}`);

  if (state.goals.length > 0) {
    const goalLabels = state.goals
      .map((g) => labelFor(projectGoals, g, resolve))
      .filter(Boolean)
      .join(", ");
    lines.push(`• Kebutuhan: ${goalLabels}`);
  }

  const timeline = labelFor(timelines, state.timeline, resolve);
  if (timeline) lines.push(`• Linimasa: ${timeline}`);

  const budget = labelFor(budgets, state.budget, resolve);
  if (budget) lines.push(`• Anggaran: ${budget}`);

  const meeting = labelFor(meetingTypes, state.meeting, resolve);
  if (meeting) lines.push(`• Preferensi Pertemuan: ${meeting}`);

  lines.push("");
  lines.push("Kontak:");
  if (state.contact.name) lines.push(`• Nama: ${state.contact.name}`);
  if (state.contact.company) lines.push(`• Perusahaan: ${state.contact.company}`);
  if (state.contact.email) lines.push(`• Email: ${state.contact.email}`);
  if (state.contact.phone) lines.push(`• Telepon: ${state.contact.phone}`);
  if (state.contact.whatsapp) lines.push(`• WhatsApp: ${state.contact.whatsapp}`);

  if (state.contact.message) {
    lines.push("");
    lines.push(`Catatan: ${state.contact.message}`);
  }

  lines.push("");
  lines.push("Terima kasih.");

  return lines.join("\n");
}
