import React, { useState } from "react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../components/ui/Button";
import { useTranslation } from "react-i18next";
import { whatsappLink } from "../config/site";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  whatsapp: z.string().min(8, "Valid WhatsApp number is required"),
  company: z.string().optional(),
  projectType: z.string().min(1, "Please select a project type"),
  budget: z.string().min(1, "Please select a budget range"),
  description: z.string().min(10, "Please provide some project details"),
});

type FormData = z.infer<typeof schema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    const message = `Halo Luxavian Studio,\n\nNama: ${data.name}\nEmail: ${data.email}\nWhatsApp: ${data.whatsapp}\nPerusahaan: ${data.company || "-"}\nJenis Proyek: ${data.projectType}\nAnggaran: ${data.budget}\n\nDetail:\n${data.description}`;
    window.open(whatsappLink(message), "_blank");
    setIsSubmitting(false);
    setSuccess(true);
    reset();
  };

  return (
    <section id="contact" className="py-24 relative" aria-labelledby="contact-heading">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 id="contact-heading" className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">{t("contact.title")}</h2>
          <p className="text-gray-400">{t("contact.desc")}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-12"
        >
          {success ? (
            <div className="text-center py-16" role="status" aria-live="polite">
              <h3 className="text-2xl font-bold text-neon-pink mb-2">{t("contact.successTitle")}</h3>
              <p className="text-gray-400">{t("contact.successDesc")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate aria-label={t("contact.title")}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-gray-300 mb-2">{t("contact.form.name")}</label>
                  <input
                    id="contact-name"
                    {...register("name")}
                    autoComplete="name"
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-pink transition-colors"
                    placeholder="John Doe"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "contact-name-err" : undefined}
                  />
                  {errors.name && <p id="contact-name-err" role="alert" className="text-neon-pink text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-gray-300 mb-2">{t("contact.form.email")}</label>
                  <input
                    id="contact-email"
                    {...register("email")}
                    type="email"
                    autoComplete="email"
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-pink transition-colors"
                    placeholder="john@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "contact-email-err" : undefined}
                  />
                  {errors.email && <p id="contact-email-err" role="alert" className="text-neon-pink text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-wa" className="block text-sm font-medium text-gray-300 mb-2">{t("contact.form.whatsapp")}</label>
                  <input
                    id="contact-wa"
                    {...register("whatsapp")}
                    type="tel"
                    autoComplete="tel"
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-pink transition-colors"
                    placeholder="+62..."
                    aria-invalid={!!errors.whatsapp}
                    aria-describedby={errors.whatsapp ? "contact-wa-err" : undefined}
                  />
                  {errors.whatsapp && <p id="contact-wa-err" role="alert" className="text-neon-pink text-xs mt-1">{errors.whatsapp.message}</p>}
                </div>
                <div>
                  <label htmlFor="contact-company" className="block text-sm font-medium text-gray-300 mb-2">{t("contact.form.company")}</label>
                  <input
                    id="contact-company"
                    {...register("company")}
                    autoComplete="organization"
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-pink transition-colors"
                    placeholder="Acme Corp (Optional)"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-type" className="block text-sm font-medium text-gray-300 mb-2">{t("contact.form.projectType")}</label>
                  <select
                    id="contact-type"
                    {...register("projectType")}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-pink transition-colors appearance-none"
                    aria-invalid={!!errors.projectType}
                    aria-describedby={errors.projectType ? "contact-type-err" : undefined}
                  >
                    <option value="">{t("contact.options.pt1")}</option>
                    <option value="website">{t("contact.options.pt2")}</option>
                    <option value="dashboard">{t("contact.options.pt3")}</option>
                    <option value="ai">{t("contact.options.pt4")}</option>
                    <option value="other">{t("contact.options.pt5")}</option>
                  </select>
                  {errors.projectType && <p id="contact-type-err" role="alert" className="text-neon-pink text-xs mt-1">{errors.projectType.message}</p>}
                </div>
                <div>
                  <label htmlFor="contact-budget" className="block text-sm font-medium text-gray-300 mb-2">{t("contact.form.budget")}</label>
                  <select
                    id="contact-budget"
                    {...register("budget")}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-pink transition-colors appearance-none"
                    aria-invalid={!!errors.budget}
                    aria-describedby={errors.budget ? "contact-budget-err" : undefined}
                  >
                    <option value="">{t("contact.options.b1")}</option>
                    <option value="<5jt">{t("contact.options.b2")}</option>
                    <option value="5-15jt">{t("contact.options.b3")}</option>
                    <option value="15-30jt">{t("contact.options.b4")}</option>
                    <option value=">30jt">{t("contact.options.b5")}</option>
                  </select>
                  {errors.budget && <p id="contact-budget-err" role="alert" className="text-neon-pink text-xs mt-1">{errors.budget.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="contact-desc" className="block text-sm font-medium text-gray-300 mb-2">{t("contact.form.desc")}</label>
                <textarea
                  id="contact-desc"
                  {...register("description")}
                  rows={5}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-pink transition-colors resize-none"
                  placeholder="Tell us about your goals, features you need, etc."
                  aria-invalid={!!errors.description}
                  aria-describedby={errors.description ? "contact-desc-err" : undefined}
                />
                {errors.description && <p id="contact-desc-err" role="alert" className="text-neon-pink text-xs mt-1">{errors.description.message}</p>}
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto" aria-busy={isSubmitting}>
                  {isSubmitting ? t("contact.form.sending") : t("contact.form.send")}
                </Button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
