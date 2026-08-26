import { useI18n } from "../../i18n/useI18n";
import { Container } from "./Container";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-line py-8">
      <Container className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="hud">
          {new Date().getFullYear()} — {t.hero.name}
        </p>
        <div className="flex items-center gap-6">
          <span className="hud">{t.footer.builtWith}</span>
          <a href="#top" className="hud transition-colors hover:text-accent">
            {t.ui.backToTop}
          </a>
        </div>
      </Container>
    </footer>
  );
}
