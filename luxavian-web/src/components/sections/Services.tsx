import { Check } from "lucide-react";
import { services, servicesSection } from "@/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardIcon } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";

/** Services grid — glow border on hover via layered gradient overlay. */
export function Services() {
  return (
    <section id="layanan" className="scroll-mt-20 py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={servicesSection.eyebrow}
            title={servicesSection.title}
            description={servicesSection.description}
          />
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal
              key={service.title}
              as="li"
              delay={(index % 3) * 0.1}
              className="flex"
            >
              <Card className="flex-1">
                {/* Gradient glow overlay, revealed on hover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(24rem 12rem at 50% -10%, rgba(79,70,229,0.15), transparent 70%)",
                  }}
                />
                <div className="relative">
                  <CardIcon>
                    <service.icon className="h-5 w-5" strokeWidth={1.75} />
                  </CardIcon>
                  <h3 className="text-lg font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2.5 text-sm text-subtle"
                      >
                        <Check
                          className="h-3.5 w-3.5 shrink-0 text-accent-soft"
                          strokeWidth={2.5}
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
