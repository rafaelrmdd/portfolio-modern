import { useI18n } from "../../i18n/useI18n";
import { Section } from "../layout/Section";
import { Reveal } from "../ui/Reveal";
import { ArrowUpRightIcon } from "../ui/icons";

export function Contact() {
  const { t } = useI18n();
  const mailto = `mailto:${t.contact.email}`;

  return (
    <Section
      id="contact"
      label={t.contact.label}
      heading={t.contact.heading}
      intro={t.contact.intro}
    >
      <Reveal>
        <a href={mailto} className="group block">
          <span className="block break-all font-display text-[clamp(1.6rem,6.6vw,5.5rem)] uppercase leading-[0.9] transition-colors duration-300 group-hover:text-accent">
            {t.contact.email}
          </span>
        </a>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6 border-t border-line pt-8">
          <span className="hud flex items-center gap-2.5">
            <span
              className="h-1.5 w-1.5 bg-accent"
              style={{ animation: "pulse-dot 2.4s ease-in-out infinite" }}
            />
            {t.contact.availability}
          </span>

          <a href={mailto} className="btn btn-primary">
            {t.contact.emailCta}
          </a>

          <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {t.contact.socials.map((social) => (
              <li key={social.id}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hud inline-flex items-center gap-1.5 transition-colors hover:text-accent"
                >
                  {social.label}
                  <ArrowUpRightIcon />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
