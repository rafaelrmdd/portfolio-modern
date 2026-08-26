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

export function Header() {
  const { t } = useI18n();
  const scrolled = useScrolled();
  const active = useActiveSection(SECTION_IDS);
  const [menuOpen, setMenuOpen] = useState(false);

  // A scrollable page behind an open full-screen menu is disorienting on touch.
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
    <header className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4">
      <Container>
        <nav
          aria-label={t.nav.menu}
          className={`flex items-center justify-between rounded-full px-3 py-2 transition-colors duration-300 sm:px-4 ${
            scrolled || menuOpen
              ? "border border-line bg-surface/75 backdrop-blur-xl"
              : "border border-transparent"
          }`}
        >
          <a
            href="#top"
            className="font-display text-sm font-extrabold tracking-tight"
          >
            <span className="text-gradient">{initials(t.hero.name)}</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {SECTION_IDS.map((id) => {
              const isActive = active === id;

              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative block rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                      isActive ? "text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                        className="absolute inset-0 -z-10 rounded-full bg-elevated"
                      />
                    )}
                    {t.nav[id]}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <LangToggle />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? t.nav.close : t.nav.menu}
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-fg transition-colors hover:bg-elevated md:hidden"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>
      </Container>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 -z-10 bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex h-full flex-col justify-center gap-2 px-8">
              {SECTION_IDS.map((id, index) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{
                    delay: 0.04 * index,
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <a
                    href={`#${id}`}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-4xl font-extrabold tracking-tight text-fg"
                  >
                    {t.nav[id]}
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
