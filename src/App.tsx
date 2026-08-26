import { I18nProvider } from "./i18n/I18nProvider";
import { useI18n } from "./i18n/useI18n";
import { ThemeProvider } from "./theme/ThemeProvider";
import { useTheme } from "./theme/useTheme";

function ProvidersPreview() {
  const { t, locale, toggle: toggleLocale } = useI18n();
  const { theme, preference, toggle: toggleTheme } = useTheme();

  return (
    <main className="grid min-h-dvh place-items-center gap-8 px-6 text-center">
      <h1 className="font-display text-5xl font-extrabold tracking-tight sm:text-7xl">
        <span className="text-gradient">{t.hero.name}</span>
      </h1>
      <p className="max-w-xl text-muted">{t.hero.tagline}</p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-full border border-line px-5 py-2 text-sm hover:bg-elevated"
        >
          {theme} ({preference})
        </button>
        <button
          type="button"
          onClick={toggleLocale}
          className="rounded-full border border-line px-5 py-2 text-sm hover:bg-elevated"
        >
          {locale.toUpperCase()}
        </button>
      </div>
    </main>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <ProvidersPreview />
      </I18nProvider>
    </ThemeProvider>
  );
}
