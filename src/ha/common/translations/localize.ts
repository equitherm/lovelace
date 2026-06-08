// @source home-assistant/frontend/src/common/translations/localize.ts
// @synced 2026-06-08 @ SHA 1cca5f3
// @note Adapted: LocalizeKeys, FlattenObjectKeys, LandingPageKeys excluded — they
//   depend on TranslationDict from types.ts (deep generic chain). HTMLTemplateResult
//   removed from values param (Lit dependency). computeLocalize and FormatsType excluded
//   — runtime code depending on intl-messageformat and polyfills.

export type LocalizeFunc = (
  key: string,
  values?: Record<string, string | number | null | undefined>
) => string;
