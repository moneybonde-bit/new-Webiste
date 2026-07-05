import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { useLocalized } from "../lib/localize";
import { whatsappLink, siteConfig } from "../config/site";
import { Logo } from "../components/ui/Logo";
import { Button } from "../components/ui/Button";
import { StepProgress } from "../components/consultation/StepProgress";
import { OptionGrid } from "../components/consultation/OptionGrid";
import { ContactForm } from "../components/consultation/ContactForm";
import { ReviewSummary, type SummaryRow } from "../components/consultation/ReviewSummary";
import {
  budgets,
  businessTypes,
  consultationCopy,
  meetingTypes,
  packageOptions,
  projectGoals,
  timelines,
  type Option,
} from "../data/consultation";
import {
  buildConsultationMessage,
  emptyConsultation,
  type ConsultationState,
  type ContactInfo,
} from "../lib/consultationMessage";

const TOTAL_STEPS = 7; // 0..5 questions + 6 review

export function ConsultationPage() {
  const resolve = useLocalized();
  const [params] = useSearchParams();
  const [state, setState] = useState<ConsultationState>(() => ({
    ...emptyConsultation,
    packageId: params.get("package"),
  }));
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [contactErrors, setContactErrors] = useState<Partial<Record<keyof ContactInfo, string>>>({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const c = resolve; // shorthand for resolving Localized copy

  const stepTitles = [
    c(consultationCopy.steps.package),
    c(consultationCopy.steps.business),
    c(consultationCopy.steps.goals),
    c(consultationCopy.steps.timeline),
    c(consultationCopy.steps.budget),
    c(consultationCopy.steps.contact),
    c(consultationCopy.steps.review),
  ];

  const setContact = (patch: Partial<ContactInfo>) =>
    setState((s) => ({ ...s, contact: { ...s.contact, ...patch } }));

  const toggleGoal = (id: string) =>
    setState((s) => ({
      ...s,
      goals: s.goals.includes(id) ? s.goals.filter((g) => g !== id) : [...s.goals, id],
    }));

  const canContinue = useMemo(() => {
    switch (step) {
      case 0:
        return state.packageId !== null;
      case 1:
        return state.businessType !== null;
      case 2:
        return state.goals.length > 0;
      case 3:
        return state.timeline !== null;
      case 4:
        return state.budget !== null;
      case 5:
        return true; // validated on submit
      default:
        return true;
    }
  }, [step, state]);

  const validateContact = (): boolean => {
    const errors: Partial<Record<keyof ContactInfo, string>> = {};
    if (!state.contact.name.trim()) errors.name = c(consultationCopy.validation.nameRequired);
    if (!state.contact.phone.trim() && !state.contact.whatsapp.trim())
      errors.phone = c(consultationCopy.validation.contactRequired);
    setContactErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const goNext = () => {
    if (step === 5 && !validateContact()) return;
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSend = () => {
    const message = buildConsultationMessage(state, resolve);
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  };

  const labelFor = (list: Option[], id: string | null) => {
    const found = list.find((o) => o.id === id);
    return found ? c(found.label) : c(consultationCopy.review_labels.notProvided);
  };

  const summaryRows: SummaryRow[] = [
    { label: c(consultationCopy.review_labels.package), value: labelFor(packageOptions, state.packageId) },
    { label: c(consultationCopy.review_labels.business), value: labelFor(businessTypes, state.businessType) },
    {
      label: c(consultationCopy.review_labels.goals),
      value:
        state.goals.length > 0
          ? state.goals.map((g) => labelFor(projectGoals, g)).join(", ")
          : c(consultationCopy.review_labels.notProvided),
    },
    { label: c(consultationCopy.review_labels.timeline), value: labelFor(timelines, state.timeline) },
    { label: c(consultationCopy.review_labels.budget), value: labelFor(budgets, state.budget) },
    {
      label: c(consultationCopy.review_labels.contact),
      value:
        [state.contact.name, state.contact.phone || state.contact.whatsapp]
          .filter(Boolean)
          .join(" · ") || c(consultationCopy.review_labels.notProvided),
    },
  ];

  const question = [
    consultationCopy.questions.package,
    consultationCopy.questions.business,
    consultationCopy.questions.goals,
    consultationCopy.questions.timeline,
    consultationCopy.questions.budget,
    consultationCopy.questions.contact,
    consultationCopy.questions.review,
  ][step];

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <OptionGrid
            options={packageOptions}
            value={state.packageId ? [state.packageId] : []}
            onToggle={(id) => setState((s) => ({ ...s, packageId: id }))}
            resolve={resolve}
            columns={2}
          />
        );
      case 1:
        return (
          <OptionGrid
            options={businessTypes}
            value={state.businessType ? [state.businessType] : []}
            onToggle={(id) => setState((s) => ({ ...s, businessType: id }))}
            resolve={resolve}
          />
        );
      case 2:
        return (
          <OptionGrid
            options={projectGoals}
            value={state.goals}
            onToggle={toggleGoal}
            resolve={resolve}
            multiple
          />
        );
      case 3:
        return (
          <OptionGrid
            options={timelines}
            value={state.timeline ? [state.timeline] : []}
            onToggle={(id) => setState((s) => ({ ...s, timeline: id }))}
            resolve={resolve}
            columns={2}
          />
        );
      case 4:
        return (
          <OptionGrid
            options={budgets}
            value={state.budget ? [state.budget] : []}
            onToggle={(id) => setState((s) => ({ ...s, budget: id }))}
            resolve={resolve}
          />
        );
      case 5:
        return (
          <ContactForm
            value={state.contact}
            onChange={setContact}
            errors={contactErrors}
            labels={{
              name: c(consultationCopy.fields.name),
              company: c(consultationCopy.fields.company),
              email: c(consultationCopy.fields.email),
              phone: c(consultationCopy.fields.phone),
              whatsapp: c(consultationCopy.fields.whatsapp),
              message: c(consultationCopy.fields.message),
              namePlaceholder: c(consultationCopy.fields.namePlaceholder),
              companyPlaceholder: c(consultationCopy.fields.companyPlaceholder),
              emailPlaceholder: c(consultationCopy.fields.emailPlaceholder),
              phonePlaceholder: c(consultationCopy.fields.phonePlaceholder),
              messagePlaceholder: c(consultationCopy.fields.messagePlaceholder),
              optional: c(consultationCopy.optional),
            }}
          />
        );
      default:
        return (
          <ReviewSummary
            rows={summaryRows}
            meetingOptions={meetingTypes}
            meeting={state.meeting}
            onMeeting={(id) => setState((s) => ({ ...s, meeting: id }))}
            resolve={resolve}
            labels={{
              meetingTitle: c(consultationCopy.cta.meetingTitle),
              sendWhatsApp: c(consultationCopy.cta.sendWhatsApp),
              schedule: c(consultationCopy.cta.schedule),
            }}
            onSend={handleSend}
          />
        );
    }
  };

  const isReview = step === TOTAL_STEPS - 1;

  return (
    <div className="relative min-h-screen bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(255,0,127,0.15),transparent_70%)]" />

      {/* Top bar */}
      <header className="border-b border-white/5">
        <div className="container mx-auto flex items-center justify-between px-6 py-5">
          <Link to="/" aria-label={`${siteConfig.legalName} — ${c(consultationCopy.backHome)}`}>
            <Logo />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">{c(consultationCopy.backHome)}</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl px-6 py-12 md:py-16">
        <div className="mb-8 text-center">
          <p className="text-sm font-medium text-neon-pink">{c(consultationCopy.eyebrow)}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
            {c(consultationCopy.title)}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-400 md:text-base">
            {c(consultationCopy.subtitle)}
          </p>
        </div>

        <div className="mb-10">
          <StepProgress steps={stepTitles} current={step} />
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              {c(consultationCopy.stepLabel)} {step + 1} {c(consultationCopy.ofLabel)} {TOTAL_STEPS}
            </p>
            <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">{c(question)}</h2>
            {step === 2 && (
              <p className="mt-1 text-sm text-gray-500">{c(consultationCopy.selectMultiple)}</p>
            )}
          </div>

          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav controls (hidden on review — its own CTAs take over) */}
          {!isReview && (
            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 0}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-gray-400 transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-0"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                {c(consultationCopy.back)}
              </button>
              <Button onClick={goNext} disabled={!canContinue} className="gap-2">
                {step === 5 ? c(consultationCopy.review) : c(consultationCopy.next)}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          )}

          {isReview && (
            <div className="mt-8">
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-gray-400 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                {c(consultationCopy.back)}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
