import { motion } from "motion/react";

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
      className="relative flex items-center rounded-full border border-line p-0.5 text-[11px] font-semibold tracking-wide"
    >
      {LOCALES.map((value) => {
        const isActive = value === locale;

        return (
          <button
            key={value}
            type="button"
            onClick={() => setLocale(value)}
            aria-label={labelFor(value)}
            aria-pressed={isActive}
            className={`relative z-10 rounded-full px-2.5 py-1 uppercase transition-colors ${
              isActive ? "text-bg" : "text-muted hover:text-fg"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="lang-pill"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                className="absolute inset-0 -z-10 rounded-full bg-fg"
              />
            )}
            {value}
          </button>
        );
      })}
    </div>
  );
}
