import { useI18n } from "../../i18n/useI18n";

/**
 * Fixed vertical rail of social links down the left gutter. Only appears at
 * xl and up, where the Container padding leaves room for it without crowding
 * the content column.
 */
export function SideRail() {
  const { t } = useI18n();

  return (
    <div className="pointer-events-none fixed inset-y-0 left-0 z-40 hidden w-16 xl:block">
      <div className="flex h-full flex-col items-center justify-end gap-8 pb-8">
        <ul className="pointer-events-auto flex flex-col items-center gap-7">
          {t.contact.socials.map((social) => (
            <li key={social.id}>
              <a
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="hud transition-colors hover:text-accent"
                style={{ writingMode: "vertical-rl" }}
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
        <span className="h-20 w-px bg-linear-to-b from-transparent to-line" />
      </div>
    </div>
  );
}
