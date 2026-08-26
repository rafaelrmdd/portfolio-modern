import { LOCALES, type Locale } from "../../content/site";
import { useI18n } from "../../i18n/useI18n";

export function LangToggle() {
  const { locale, setLocale, t } = useI18n();

  const labelFor = (value: Locale) =>
    value === "pt" ? t.ui.switchToPortuguese : t.ui.switchToEnglish;

  return (
    <div
      role="group"
      aria-label={t.ui.language}
      className="flex items-center gap-1 px-1"
    >
      {LOCALES.map((value, index) => (
        <span key={value} className="flex items-center gap-1">
          {index > 0 && <span className="hud text-line">/</span>}
          <button
            type="button"
            onClick={() => setLocale(value)}
            aria-label={labelFor(value)}
            aria-pressed={value === locale}
            className={`hud transition-colors ${
              value === locale ? "text-accent" : "hover:text-fg"
            }`}
          >
            {value}
          </button>
        </span>
      ))}
    </div>
  );
}
