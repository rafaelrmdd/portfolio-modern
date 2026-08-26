import { useI18n } from "../../i18n/useI18n";
import { Section } from "../layout/Section";
import { Reveal } from "../ui/Reveal";

export function About() {
  const { t } = useI18n();

  return (
    <Section id="about" label={t.about.label} heading={t.about.heading}>
      <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <Reveal>
            <blockquote className="border-l-2 border-accent pl-6 font-display text-[clamp(1.35rem,2.6vw,2rem)] uppercase leading-[1.05]">
              {t.about.quote}
            </blockquote>
          </Reveal>

          <Reveal delay={0.08} className="mt-9 space-y-5 text-lg leading-relaxed text-muted">
            {t.about.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.14}>
          <dl>
            {t.about.facts.map((fact) => (
              <div
                key={fact.label}
                className="flex items-baseline justify-between gap-6 border-t border-line py-4"
              >
                <dt className="hud">{fact.label}</dt>
                <dd className="text-right font-medium">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
