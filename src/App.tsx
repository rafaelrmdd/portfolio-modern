import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { SideRail } from "./components/layout/SideRail";
import { About } from "./components/sections/About";
import { Contact } from "./components/sections/Contact";
import { Hero } from "./components/sections/Hero";
import { Projects } from "./components/sections/Projects";
import { Skills } from "./components/sections/Skills";
import { I18nProvider } from "./i18n/I18nProvider";
import { useI18n } from "./i18n/useI18n";
import { ThemeProvider } from "./theme/ThemeProvider";

function Site() {
  const { t } = useI18n();

  return (
    <div className="grain">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        {t.ui.skipToContent}
      </a>

      <Header />
      <SideRail />

      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </div>
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
