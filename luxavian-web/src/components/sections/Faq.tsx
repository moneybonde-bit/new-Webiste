import { faqItems, faqSection } from "@/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ChevronDown } from "lucide-react";

/**
 * FAQ — native <details>/<summary> accordion: fully keyboard-accessible,
 * SEO-crawlable, and zero client JavaScript.
 */
export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={faqSection.eyebrow} title={faqSection.title} />
        </Reveal>

        <div className="mx-auto mt-14 max-w-2xl space-y-3">
          {faqItems.map((item, index) => (
            <Reveal key={item.question} delay={index * 0.05}>
              <details className="group rounded-xl border border-line bg-surface transition-colors duration-300 open:border-line-strong open:bg-surface-raised">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left text-base font-medium text-white [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <ChevronDown
                    className="h-4 w-4 shrink-0 text-subtle transition-transform duration-300 ease-premium group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="px-6 pb-5 text-sm leading-relaxed text-muted">
                  {item.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
