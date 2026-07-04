import { useTranslation } from "react-i18next";

/** A string translated into every language the site supports. */
export interface Localized {
  en: string;
  id: string;
  zh: string;
}

/**
 * Returns a resolver that picks the right translation for the active
 * language, falling back to English. Used by the data files in `src/data`
 * so content editors can keep all translations of an item side by side.
 */
export function useLocalized(): (value: Localized) => string {
  const { i18n } = useTranslation();
  const lang = i18n.language?.split("-")[0] as keyof Localized;
  return (value) => value[lang] ?? value.en;
}
