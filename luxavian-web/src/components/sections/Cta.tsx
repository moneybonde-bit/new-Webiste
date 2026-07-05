import { MessageCircle } from "lucide-react";
import { ctaSection } from "@/content";
import { whatsappLink } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

/** Final conversion section with radial glow backdrop. */
export function Cta() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="absolute inset-0 bg-cta-glow" />
      <Container className="relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-gradient sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              {ctaSection.title}
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              {ctaSection.description}
            </p>
            <div className="mt-10">
              <ButtonLink
                href={whatsappLink(
                  "Halo Luxavian, saya ingin memulai konsultasi gratis."
                )}
                external
                size="lg"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {ctaSection.buttonLabel}
              </ButtonLink>
            </div>
            <p className="mt-5 text-sm text-subtle">{ctaSection.note}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
