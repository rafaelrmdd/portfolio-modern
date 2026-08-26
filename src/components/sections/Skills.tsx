import type { CSSProperties } from "react";

import type { SkillGroup } from "../../content/site";
import { useI18n } from "../../i18n/useI18n";
import { Section } from "../layout/Section";
import { Reveal } from "../ui/Reveal";

/**
 * One marquee band per group. The item list is rendered twice inside a
 * max-content track so the -50% translation loops seamlessly; under
 * prefers-reduced-motion the animation is dropped and the band reads as a
 * plain horizontal list, which is why the duplicate copy is aria-hidden.
 */
function SkillBand({ group, index }: { group: SkillGroup; index: number }) {
  // Three passes per half: a group of four short words is narrower than the
  // band, and the -50% loop would expose a gap on every cycle.
  const half = (
    <span className="flex shrink-0 items-center">
      {[0, 1, 2].map((pass) =>
        group.items.map((item) => (
          <span key={`${pass}-${item}`} className="flex items-center">
            <span className="px-6 font-display text-[clamp(1.5rem,3.6vw,3rem)] uppercase leading-none">
              {item}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" />
          </span>
        )),
      )}
    </span>
  );

  return (
    <div className="border-t border-line py-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
        <span className="hud shrink-0 sm:w-28">{group.label}</span>

        <div className="marquee-mask min-w-0 flex-1 overflow-hidden">
          <div
            className={`marquee-track ${index % 2 === 1 ? "marquee-track-reverse" : ""}`}
            style={{ "--marquee-duration": `${26 + index * 7}s` } as CSSProperties}
          >
            {half}
            <span aria-hidden="true" className="flex shrink-0 items-center">
              {half}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Skills() {
  const { t } = useI18n();

  return (
    <Section
      id="skills"
      label={t.skills.label}
      heading={t.skills.heading}
      intro={t.skills.intro}
    >
      <div>
        {t.skills.groups.map((group, index) => (
          <Reveal key={group.id} delay={index * 0.05}>
            <SkillBand group={group} index={index} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
