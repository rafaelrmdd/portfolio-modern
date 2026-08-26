import { useI18n } from "../../i18n/useI18n";
import { Section } from "../layout/Section";
import { Reveal } from "../ui/Reveal";
import { ArrowUpRightIcon } from "../ui/icons";

export function Contact() {
  const { t } = useI18n();

  return (
    <Section
      id="contact"
      label={t.contact.label}
      heading={t.contact.heading}
      intro={t.contact.intro}
    >
      <Reveal className="flex flex-col gap-10">
        <div className="flex flex-wrap items-center gap-4">
          <a href={`mailto:${t.contact.email}`} className="btn btn-primary">
            {t.contact.emailCta}
          </a>
          <a
            href={`mailto:${t.contact.email}`}
            className="font-display text-lg font-bold tracking-tight underline decoration-line underline-offset-8 transition-colors hover:decoration-accent sm:text-xl"
          >
            {t.contact.email}
          </a>
        </div>

        <ul className="flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-8">
          {t.contact.socials.map((social) => (
            <li key={social.id}>
              <a
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-muted transition-colors hover:text-fg"
              >
                {social.label}
                <ArrowUpRightIcon />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
