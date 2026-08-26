import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { content, type Locale } from "../content/site";
import { I18nContext, LANG_STORAGE_KEY } from "./i18n-context";

function isLocale(value: string | null): value is Locale {
  return value === "en" || value === "pt";
}

function detectInitialLocale(): Locale {
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    // Storage blocked — fall through to the browser preference.
  }

  return navigator.language.toLowerCase().startsWith("pt") ? "pt" : "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setStoredLocale] = useState<Locale>(detectInitialLocale);
  const t = content[locale];

  // Keep the document in sync so screen readers announce the right language and
  // the tab title matches what is on screen.
  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = t.meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t.meta.description);
  }, [locale, t]);

  const setLocale = useCallback((next: Locale) => {
    setStoredLocale(next);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      // Storage blocked — the choice just will not survive a reload.
    }
  }, []);

  const value = useMemo(
    () => ({
      locale,
      t,
      setLocale,
      toggle: () => setLocale(locale === "en" ? "pt" : "en"),
    }),
    [locale, t, setLocale],
  );

  return <I18nContext value={value}>{children}</I18nContext>;
}
