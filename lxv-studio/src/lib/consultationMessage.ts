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
