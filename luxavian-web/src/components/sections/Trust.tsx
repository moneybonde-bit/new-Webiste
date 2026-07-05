import { trustPillars, trustSection } from "@/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/** Trust section — industries served + engineering pillars. */
export function Trust() {
  return (
    <section className="border-y border-line bg-surface/40 py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={trustSection.eyebrow}
            title={trustSection.title}
            description={trustSection.description}
          />
        </Reveal>

        <Reveal delay={0.15}>
          <ul className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-3">
            {trustSection.industries.map((industry) => (
              <li
                key={industry.label}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-4 py-2 text-sm text-muted transition-colors duration-300 hover:border-line-strong hover:text-white"
              >
                <industry.icon
                  className="h-4 w-4 text-accent-soft"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                {industry.label}
              </li>
            ))}
          </ul>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {trustPillars.map((pillar, index) => (
            <Reveal key={pillar.title} as="li" delay={index * 0.1}>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-white/[0.04] text-accent-soft">
                <pillar.icon
                  className="h-5 w-5"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-5 text-base font-semibold text-white">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {pillar.description}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
