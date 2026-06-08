// @source home-assistant/frontend/src/common/datetime/format_time.ts
// @synced 2026-06-08 @ SHA 1cca5f3

import type { HassConfig } from "home-assistant-js-websocket";
import memoizeOne from "memoize-one";
import type { FrontendLocaleData } from "../../types";
import { resolveTimeZone } from "./resolve-time-zone";
import { useAmPm } from "./use_am_pm";

export const formatTime = (
  dateObj: Date,
  locale: FrontendLocaleData,
  config?: HassConfig
) => formatTimeMem(locale, config?.time_zone ?? "UTC").format(dateObj);

const formatTimeMem = memoizeOne(
  (locale: FrontendLocaleData, serverTimeZone: string) =>
    new Intl.DateTimeFormat(locale.language, {
      hour: "numeric",
      minute: "2-digit",
      hourCycle: useAmPm(locale) ? "h12" : "h23",
      timeZone: resolveTimeZone(locale.time_zone, serverTimeZone),
    })
);

export const formatTimeWithSeconds = (
  dateObj: Date,
  locale: FrontendLocaleData,
  config?: HassConfig
) => formatTimeWithSecondsMem(locale, config?.time_zone ?? "UTC").format(dateObj);

const formatTimeWithSecondsMem = memoizeOne(
  (locale: FrontendLocaleData, serverTimeZone: string) =>
    new Intl.DateTimeFormat(locale.language, {
      hour: useAmPm(locale) ? "numeric" : "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: useAmPm(locale) ? "h12" : "h23",
      timeZone: resolveTimeZone(locale.time_zone, serverTimeZone),
    })
);

export const formatTimeWeekday = (
  dateObj: Date,
  locale: FrontendLocaleData,
  config?: HassConfig
) => formatTimeWeekdayMem(locale, config?.time_zone ?? "UTC").format(dateObj);

const formatTimeWeekdayMem = memoizeOne(
  (locale: FrontendLocaleData, serverTimeZone: string) =>
    new Intl.DateTimeFormat(locale.language, {
      weekday: "long",
      hour: useAmPm(locale) ? "numeric" : "2-digit",
      minute: "2-digit",
      hourCycle: useAmPm(locale) ? "h12" : "h23",
      timeZone: resolveTimeZone(locale.time_zone, serverTimeZone),
    })
);

export const formatTime24h = (
  dateObj: Date,
  locale: FrontendLocaleData,
  config?: HassConfig
) => formatTime24hMem(locale, config?.time_zone ?? "UTC").format(dateObj);

const formatTime24hMem = memoizeOne(
  (locale: FrontendLocaleData, serverTimeZone: string) =>
    new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
      timeZone: resolveTimeZone(locale.time_zone, serverTimeZone),
    })
);
