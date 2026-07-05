import React from "react";
import type { ContactInfo } from "@/src/lib/consultationMessage";
import { cn } from "@/src/lib/utils";

interface FieldLabels {
  name: string;
  company: string;
  email: string;
  phone: string;
  whatsapp: string;
  message: string;
  namePlaceholder: string;
  companyPlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  messagePlaceholder: string;
  optional: string;
}

interface ContactFormProps {
  value: ContactInfo;
  onChange: (patch: Partial<ContactInfo>) => void;
  labels: FieldLabels;
  errors: Partial<Record<keyof ContactInfo, string>>;
}

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-gray-300">
        {label}
        {optional && <span className="ml-1.5 text-xs text-gray-500">({optional})</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

const inputBase =
  "w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none transition-colors focus:border-neon-pink/60 focus:bg-white/[0.05]";

/** Contact fields for the final data-collection step. */
export function ContactForm({ value, onChange, labels, errors }: ContactFormProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Field id="c-name" label={labels.name} error={errors.name}>
        <input
          id="c-name"
          type="text"
          autoComplete="name"
          value={value.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder={labels.namePlaceholder}
          className={cn(inputBase, errors.name ? "border-red-400/60" : "border-white/10")}
        />
      </Field>

      <Field id="c-company" label={labels.company} optional={labels.optional}>
        <input
          id="c-company"
          type="text"
          autoComplete="organization"
          value={value.company}
          onChange={(e) => onChange({ company: e.target.value })}
          placeholder={labels.companyPlaceholder}
          className={cn(inputBase, "border-white/10")}
        />
      </Field>

      <Field id="c-email" label={labels.email} optional={labels.optional}>
        <input
          id="c-email"
          type="email"
          autoComplete="email"
          value={value.email}
          onChange={(e) => onChange({ email: e.target.value })}
          placeholder={labels.emailPlaceholder}
          className={cn(inputBase, "border-white/10")}
        />
      </Field>

      <Field id="c-phone" label={labels.phone} error={errors.phone}>
        <input
          id="c-phone"
          type="tel"
          autoComplete="tel"
          value={value.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
          placeholder={labels.phonePlaceholder}
          className={cn(inputBase, errors.phone ? "border-red-400/60" : "border-white/10")}
        />
      </Field>

      <Field id="c-wa" label={labels.whatsapp} optional={labels.optional}>
        <input
          id="c-wa"
          type="tel"
          value={value.whatsapp}
          onChange={(e) => onChange({ whatsapp: e.target.value })}
          placeholder={labels.phonePlaceholder}
          className={cn(inputBase, "border-white/10")}
        />
      </Field>

      <div className="sm:col-span-2">
        <Field id="c-msg" label={labels.message} optional={labels.optional}>
          <textarea
            id="c-msg"
            rows={3}
            value={value.message}
            onChange={(e) => onChange({ message: e.target.value })}
            placeholder={labels.messagePlaceholder}
            className={cn(inputBase, "resize-none border-white/10")}
          />
        </Field>
      </div>
    </div>
  );
}
