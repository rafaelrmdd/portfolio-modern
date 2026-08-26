import { useI18n } from "../../i18n/useI18n";
import { Section } from "../layout/Section";
import { Reveal } from "../ui/Reveal";

export function About() {
  const { t } = useI18n();

  return (
    <Section id="about" label={t.about.label} heading={t.about.heading}>
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="space-y-5 text-lg leading-relaxed text-muted">
          {t.about.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="divide-y divide-line border-t border-line">
            {t.about.facts.map((fact) => (
              <div
                key={fact.label}
                className="flex items-baseline justify-between gap-6 py-4"
              >
                <dt className="text-sm uppercase tracking-wider text-muted">
                  {fact.label}
                </dt>
                <dd className="text-right font-medium">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
