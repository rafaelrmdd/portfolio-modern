import { createContext } from "react";

import type { Dictionary, Locale } from "../content/site";

export type I18nContextValue = {
  locale: Locale;
  /** The whole dictionary for the active locale, typed end to end. */
  t: Dictionary;
  setLocale: (locale: Locale) => void;
  toggle: () => void;
};

export const LANG_STORAGE_KEY = "lang";

export const I18nContext = createContext<I18nContextValue | null>(null);
