// src/localize.ts
import { IntlMessageFormat } from 'intl-messageformat';
import type { HomeAssistant } from './ha/types';
import * as en from './translations/en.json';
import * as fr from './translations/fr.json';

const translations: Record<string, typeof en> = { en, fr };

const DEFAULT_LANG = 'en';

function getTranslatedString(key: string, lang: string): string | undefined {
  try {
    const keys = key.split('.');
    let value: unknown = translations[lang];
    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
    }
    return typeof value === 'string' ? value : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Setup a localize function with Home Assistant context.
 * Matches Mushroom's pattern for use in shared config.
 */
export default function setupCustomlocalize(hass?: HomeAssistant) {
  return function (key: string, params: Record<string, unknown> = {}): string {
    const lang = hass?.locale?.language ?? DEFAULT_LANG;

    let translated = getTranslatedString(key, lang);
    if (!translated) translated = getTranslatedString(key, DEFAULT_LANG);

    if (!translated) return key;

    try {
      const message = new IntlMessageFormat(translated, lang);
      return message.format(params as Record<string, string | number | Date>) as string;
    } catch {
      return translated;
    }
  };
}

/**
 * Simple localize without HA context (uses cached language).
 * For backwards compatibility.
 */
export function localize(key: string, params?: Record<string, unknown>): string {
  const hass = (document.querySelector('home-assistant') as HTMLElement & {
    hass?: HomeAssistant;
  })?.hass;

  const localizeFn = setupCustomlocalize(hass);
  return localizeFn(key, params);
}
