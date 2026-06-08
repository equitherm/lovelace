// @source home-assistant/frontend/src/data/translation.ts
// @synced 2026-06-08 @ SHA 1cca5f3
// @note Adapted: Runtime functions (getHassTranslations, subscribeTranslationPreferences,
//   saveTranslationPreferences) excluded — they import from data/frontend.ts which we
//   don't vendor.

export enum NumberFormat {
  language = "language",
  system = "system",
  comma_decimal = "comma_decimal",
  decimal_comma = "decimal_comma",
  quote_decimal = "quote_decimal",
  space_comma = "space_comma",
  none = "none",
}

export enum TimeFormat {
  language = "language",
  system = "system",
  am_pm = "12",
  twenty_four = "24",
}

export enum TimeZone {
  local = "local",
  server = "server",
}

export enum DateFormat {
  language = "language",
  system = "system",
  DMY = "DMY",
  MDY = "MDY",
  YMD = "YMD",
}

export enum FirstWeekday {
  language = "language",
  monday = "monday",
  tuesday = "tuesday",
  wednesday = "wednesday",
  thursday = "thursday",
  friday = "friday",
  saturday = "saturday",
  sunday = "sunday",
}

export interface FrontendLocaleData {
  language: string;
  number_format: NumberFormat;
  time_format: TimeFormat;
  date_format: DateFormat;
  first_weekday: FirstWeekday;
  time_zone: TimeZone;
}

declare global {
  interface FrontendUserData {
    language: FrontendLocaleData;
  }
}

export type TranslationCategory =
  | "title"
  | "state"
  | "entity"
  | "entity_component"
  | "exceptions"
  | "config"
  | "config_subentries"
  | "config_panel"
  | "options"
  | "device_automation"
  | "mfa_setup"
  | "system_health"
  | "application_credentials"
  | "issues"
  | "preview_features"
  | "selector"
  | "services"
  | "triggers"
  | "conditions";
