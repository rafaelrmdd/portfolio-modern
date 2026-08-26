import { useI18n } from "../../i18n/useI18n";
import { Container } from "./Container";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col items-start justify-between gap-4 text-sm text-muted sm:flex-row sm:items-center">
        <p>
          {new Date().getFullYear()} {t.hero.name}. {t.footer.note}
        </p>
        <div className="flex items-center gap-4">
          <span>{t.footer.builtWith}</span>
          <a href="#top" className="transition-colors hover:text-fg">
            {t.ui.backToTop}
          </a>
        </div>
      </Container>
    </footer>
  );
}
