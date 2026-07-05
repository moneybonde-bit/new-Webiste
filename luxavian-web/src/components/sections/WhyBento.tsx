import { bentoItems, whySection } from "@/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardIcon } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/** "Why Luxavian" — asymmetric bento grid with staggered reveals. */
export function WhyBento() {
  return (
    <section id="keunggulan" className="scroll-mt-20 py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={whySection.eyebrow}
            title={whySection.title}
            description={whySection.description}
          />
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
          {bentoItems.map((item, index) => (
            <Reveal
              key={item.title}
              as="li"
              delay={(index % 3) * 0.1}
              className={cn("flex", item.className)}
            >
              <Card className="flex-1">
                <CardIcon>
                  <item.icon className="h-5 w-5" strokeWidth={1.75} />
                </CardIcon>
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
