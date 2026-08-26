import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { Hero } from "./components/sections/Hero";
import { I18nProvider } from "./i18n/I18nProvider";
import { useI18n } from "./i18n/useI18n";
import { ThemeProvider } from "./theme/ThemeProvider";

function Site() {
  const { t } = useI18n();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        {t.ui.skipToContent}
      </a>

      <Header />

      <main id="main">
        <Hero />
      </main>

      <Footer />
    </>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <Site />
      </I18nProvider>
    </ThemeProvider>
  );
}
