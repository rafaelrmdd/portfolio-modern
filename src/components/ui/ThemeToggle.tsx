import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { useI18n } from "../../i18n/useI18n";
import { useTheme } from "../../theme/useTheme";
import { MoonIcon, SunIcon } from "./icons";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();

  const isDark = theme === "dark";
  const label = isDark ? t.ui.toLight : t.ui.toDark;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-line text-fg transition-colors hover:bg-elevated"
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={theme}
          initial={reduceMotion ? false : { y: 14, rotate: -70, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { y: -14, rotate: 70, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="absolute grid place-items-center"
        >
          {isDark ? <MoonIcon /> : <SunIcon />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
