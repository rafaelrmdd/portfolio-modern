import { useI18n } from "../../i18n/useI18n";
import { Section } from "../layout/Section";
import { Reveal } from "../ui/Reveal";

export function Skills() {
  const { t } = useI18n();

  return (
    <Section
      id="skills"
      label={t.skills.label}
      heading={t.skills.heading}
      intro={t.skills.intro}
    >
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {t.skills.groups.map((group, index) => (
          <Reveal key={group.id} delay={index * 0.06}>
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-muted">
              {group.label}
            </h3>
            <ul className="mt-4 space-y-2.5 border-t border-line pt-4">
              {group.items.map((item) => (
                <li key={item} className="text-lg font-medium">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
