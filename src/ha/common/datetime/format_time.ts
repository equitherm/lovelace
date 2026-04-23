import memoizeOne from "memoize-one";
import type { FrontendLocaleData } from "../../types";
import { useAmPm } from "./use_am_pm";

// 9:15 PM || 21:15
export const formatTime = (dateObj: Date, locale: FrontendLocaleData) =>
  formatTimeMem(locale).format(dateObj);

const formatTimeMem = memoizeOne(
  (locale: FrontendLocaleData) =>
    new Intl.DateTimeFormat(locale.language, {
      hour: "numeric",
      minute: "2-digit",
      hourCycle: useAmPm(locale) ? "h12" : "h23",
    }),
);
