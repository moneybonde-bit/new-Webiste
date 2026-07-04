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
  deadline: z.string().optional(),
  description: z.string().min(10, "Please provide some project details"),
});

type FormData = z.infer<typeof schema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Construct the WhatsApp message
    const message = `Halo Luxavian Studio,\n\nNama: ${data.name}\nEmail: ${data.email}\nWhatsApp: ${data.whatsapp}\nPerusahaan: ${data.company || '-'}\nJenis Proyek: ${data.projectType}\nAnggaran: ${data.budget}\n\nDetail:\n${data.description}`;

    // Open WhatsApp in a new tab with the prefilled message
    window.open(whatsappLink(message), '_blank');
    
    setIsSubmitting(false);
    reset();
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">{t("contact.title")}</h2>
          <p className="text-gray-400">{t("contact.desc")}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-12"
        >
          {success ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-neon-pink mb-2">{t("contact.successTitle")}</h3>
              <p className="text-gray-400">{t("contact.successDesc")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t("contact.form.name")}</label>
                  <input {...register("name")} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-pink transition-colors" placeholder="John Doe" />
                  {errors.name && <p className="text-neon-pink text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t("contact.form.email")}</label>
                  <input {...register("email")} type="email" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-pink transition-colors" placeholder="john@example.com" />
                  {errors.email && <p className="text-neon-pink text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t("contact.form.whatsapp")}</label>
                  <input {...register("whatsapp")} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-pink transition-colors" placeholder="+62..." />
                  {errors.whatsapp && <p className="text-neon-pink text-xs mt-1">{errors.whatsapp.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t("contact.form.company")}</label>
                  <input {...register("company")} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-pink transition-colors" placeholder="Acme Corp (Optional)" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t("contact.form.projectType")}</label>
                  <select {...register("projectType")} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-pink transition-colors appearance-none">
                    <option value="">{t("contact.options.pt1")}</option>
                    <option value="website">{t("contact.options.pt2")}</option>
                    <option value="dashboard">{t("contact.options.pt3")}</option>
                    <option value="ai">{t("contact.options.pt4")}</option>
                    <option value="other">{t("contact.options.pt5")}</option>
                  </select>
                  {errors.projectType && <p className="text-neon-pink text-xs mt-1">{errors.projectType.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t("contact.form.budget")}</label>
                  <select {...register("budget")} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-pink transition-colors appearance-none">
                    <option value="">{t("contact.options.b1")}</option>
                    <option value="<5k">{t("contact.options.b2")}</option>
                    <option value="5k-10k">{t("contact.options.b3")}</option>
                    <option value="10k-20k">{t("contact.options.b4")}</option>
                    <option value="20k+">{t("contact.options.b5")}</option>
                  </select>
                  {errors.budget && <p className="text-neon-pink text-xs mt-1">{errors.budget.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">{t("contact.form.desc")}</label>
                <textarea {...register("description")} rows={5} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-pink transition-colors resize-none" placeholder="Tell us about your goals, features you need, etc." />
                {errors.description && <p className="text-neon-pink text-xs mt-1">{errors.description.message}</p>}
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto">
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
