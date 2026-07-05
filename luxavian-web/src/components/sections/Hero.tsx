import { ArrowRight, MessageCircle } from "lucide-react";
import { hero } from "@/content";
import { whatsappLink } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Hero — server component; entrance animation is handled by the thin
 * Reveal client wrapper, background glow is pure CSS.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-36 sm:pb-32 sm:pt-44">
      <div aria-hidden="true" className="absolute inset-0 bg-hero-glow" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 h-[32rem] w-[56rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl motion-safe:animate-slow-drift"
      />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-4 py-1.5 text-xs font-medium tracking-wide text-muted sm:text-sm">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-accent-soft"
              />
              {hero.badge}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-8 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-gradient sm:text-6xl lg:text-[4.25rem]">
              {hero.headline}
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              {hero.subheadline}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <ButtonLink
                href={whatsappLink("Halo Luxavian, saya ingin konsultasi gratis.")}
                external
                size="lg"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {hero.primaryCta}
              </ButtonLink>
              <ButtonLink href="#layanan" variant="secondary" size="lg">
                {hero.secondaryCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.45}>
            <dl className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              {hero.stats.map((stat) => (
                <div key={stat.label} className="bg-surface px-6 py-6">
                  <dt className="order-last mt-1.5 text-xs leading-snug text-subtle">
                    {stat.label}
                  </dt>
                  <dd className="text-3xl font-semibold tracking-tight text-white">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
