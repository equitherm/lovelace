import memoizeOne from "memoize-one";
import type { FrontendLocaleData } from "../../types";

export const useAmPm = memoizeOne((locale: FrontendLocaleData): boolean => {
  if (locale.time_format === "language" || locale.time_format === "system") {
    const testLanguage =
      locale.time_format === "language" ? locale.language : undefined;
    const test = new Date("January 1, 2023 22:00:00").toLocaleString(
      testLanguage,
    );
    return test.includes("10");
  }

  return locale.time_format === "12";
});
