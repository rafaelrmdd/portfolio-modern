import { useI18n } from "../../i18n/useI18n";
import { Container } from "../layout/Container";
import { Reveal } from "../ui/Reveal";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  const { t } = useI18n();

  return (
    <section
      id="top"
      className="gradient-wash relative flex min-h-dvh items-center pb-20 pt-32 sm:pt-36"
    >
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal>
              <p className="eyebrow">{t.hero.eyebrow}</p>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-6 font-display text-[clamp(2.75rem,8.5vw,6.5rem)] font-extrabold leading-[0.88] tracking-tighter">
                {t.hero.name}
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                <span className="text-gradient">{t.hero.role}</span>
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                {t.hero.tagline}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#projects" className="btn btn-primary">
                  {t.hero.primaryCta}
                </a>
                <a href="#contact" className="btn btn-ghost">
                  {t.hero.secondaryCta}
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <HeroVisual />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
