// @source home-assistant/frontend/src/common/datetime/use_am_pm.ts
// @synced 2026-06-08 @ SHA 1cca5f3

import memoizeOne from "memoize-one";
import type { FrontendLocaleData } from "../../types";
import { TimeFormat } from "../../types";

export const useAmPm = memoizeOne((locale: FrontendLocaleData): boolean => {
  if (locale.time_format === TimeFormat.language || locale.time_format === TimeFormat.system) {
    const testLanguage =
      locale.time_format === TimeFormat.language ? locale.language : undefined;
    const test = new Date("January 1, 2023 22:00:00").toLocaleString(
      testLanguage,
    );
    return test.includes("10");
  }

  return locale.time_format === TimeFormat.am_pm;
});
