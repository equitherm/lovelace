// src/localize.ts
import { IntlMessageFormat } from 'intl-messageformat';
import * as en from './translations/en.json';
import * as fr from './translations/fr.json';

const translations: Record<string, typeof en> = { en, fr };

let cachedLang: string | null = null;

function getLanguage(): string {
  const hass = (document.querySelector('home-assistant') as HTMLElement & {
    hass?: { language?: string };
  })?.hass;

  if (hass?.language && hass.language !== cachedLang) {
    cachedLang = hass.language;
  }

  return cachedLang || 'en';
}

export function localize(key: string, params?: Record<string, unknown>): string {
  const lang = getLanguage();
  const keys = key.split('.');
  let value: unknown = translations[lang] ?? translations.en;

  for (const k of keys) {
    value = (value as Record<string, unknown>)?.[k];
    if (value === undefined) {
      // Fallback to English
      value = translations.en;
      for (const fk of keys) {
        value = (value as Record<string, unknown>)?.[fk];
        if (value === undefined) return key;
      }
      break;
    }
  }

  if (typeof value !== 'string') return key;

  if (params) {
    try {
      return new IntlMessageFormat(value, lang).format(params) as string;
    } catch {
      return value;
    }
  }

  return value;
}

export default localize;
