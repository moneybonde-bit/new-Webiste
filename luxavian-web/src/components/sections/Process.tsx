import { processSection, processSteps } from "@/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/** Process timeline — vertical line with numbered milestones. */
export function Process() {
  return (
    <section id="proses" className="scroll-mt-20 py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={processSection.eyebrow}
            title={processSection.title}
            description={processSection.description}
          />
        </Reveal>

        <ol className="relative mx-auto mt-16 max-w-2xl">
          <div
            aria-hidden="true"
            className="absolute bottom-6 left-[1.4375rem] top-6 w-px bg-gradient-to-b from-accent/60 via-line-strong to-transparent"
          />
          {processSteps.map((step, index) => (
            <Reveal key={step.number} as="li" delay={index * 0.08}>
              <div className="relative flex gap-6 pb-12 last:pb-0">
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line bg-surface font-mono text-sm text-accent-soft shadow-[0_0_20px_-4px_rgba(79,70,229,0.3)]">
                  {step.number}
                </div>
                <div className="pt-2.5">
                  <h3 className="text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
