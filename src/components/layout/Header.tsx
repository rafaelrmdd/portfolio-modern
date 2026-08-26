import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { useActiveSection } from "../../hooks/useActiveSection";
import { useScrolled } from "../../hooks/useScrolled";
import { useI18n } from "../../i18n/useI18n";
import { SECTION_IDS } from "../../lib/sections";
import { LangToggle } from "../ui/LangToggle";
import { ThemeToggle } from "../ui/ThemeToggle";
import { CloseIcon, MenuIcon } from "../ui/icons";
import { Container } from "./Container";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const pad = (index: number) => String(index + 1).padStart(2, "0");

export function Header() {
  const { t } = useI18n();
  const scrolled = useScrolled();
  const active = useActiveSection(SECTION_IDS);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-colors duration-300 ${
          scrolled || menuOpen
            ? "border-b border-line bg-bg/85 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <Container className="flex h-16 items-center justify-between gap-6">
          <a
            href="#top"
            className="font-mono text-xs font-bold tracking-[0.2em] text-muted transition-colors hover:text-fg"
          >
            [<span className="text-accent">{initials(t.hero.name)}</span>]
          </a>

          <nav aria-label={t.nav.menu} className="hidden md:block">
            <ul className="flex items-center gap-8">
              {SECTION_IDS.map((id, index) => {
                const isActive = active === id;

                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      aria-current={isActive ? "true" : undefined}
                      className="group flex items-baseline gap-2"
                    >
                      <span
                        className={`hud transition-colors ${
                          isActive ? "text-accent" : "text-muted/45"
                        }`}
                      >
                        {pad(index)}
                      </span>
                      <span
                        className={`hud transition-colors ${
                          isActive ? "text-fg" : "group-hover:text-fg"
                        }`}
                      >
                        {t.nav[id]}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <LangToggle />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? t.nav.close : t.nav.menu}
              className="grid h-9 w-9 place-items-center text-fg ring-1 ring-line transition-colors hover:bg-elevated md:hidden"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </Container>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 -z-10 bg-bg/97 backdrop-blur-xl md:hidden"
          >
            <ul className="flex h-full flex-col justify-center gap-3 px-8">
              {SECTION_IDS.map((id, index) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{
                    delay: 0.05 * index,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="border-b border-line pb-3"
                >
                  <a
                    href={`#${id}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline gap-4"
                  >
                    <span className="hud text-accent">{pad(index)}</span>
                    <span className="font-display text-4xl uppercase leading-none text-fg">
                      {t.nav[id]}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
