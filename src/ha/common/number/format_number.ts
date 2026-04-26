import type { FrontendLocaleData } from "../../types";

enum NumberFormat {
  language = "language",
  system = "system",
  comma_decimal = "comma_decimal",
  decimal_comma = "decimal_comma",
  quote_decimal = "quote_decimal",
  space_comma = "space_comma",
  none = "none",
}

const numberFormatToLocale = (
  localeOptions: FrontendLocaleData
): string | string[] | undefined => {
  switch (localeOptions.number_format) {
    case NumberFormat.comma_decimal:
      return ["en-US", "en"];
    case NumberFormat.decimal_comma:
      return ["de", "es", "it"];
    case NumberFormat.space_comma:
      return ["fr", "sv", "cs"];
    case NumberFormat.quote_decimal:
      return ["de-CH"];
    case NumberFormat.system:
      return undefined;
    default:
      return localeOptions.language;
  }
};

export const formatNumber = (
  num: string | number,
  localeOptions?: FrontendLocaleData,
  options?: Intl.NumberFormatOptions
): string =>
  formatNumberToParts(num, localeOptions, options)
    .map((part) => part.value)
    .join("");

const formatNumberToParts = (
  num: string | number,
  localeOptions?: FrontendLocaleData,
  options?: Intl.NumberFormatOptions
): any[] => {
  const locale = localeOptions
    ? numberFormatToLocale(localeOptions)
    : undefined;

  if (
    localeOptions?.number_format !== NumberFormat.none &&
    !Number.isNaN(Number(num))
  ) {
    return new Intl.NumberFormat(
      locale,
      getDefaultFormatOptions(num, options)
    ).formatToParts(Number(num));
  }

  if (
    !Number.isNaN(Number(num)) &&
    num !== "" &&
    localeOptions?.number_format === NumberFormat.none
  ) {
    return new Intl.NumberFormat(
      "en-US",
      getDefaultFormatOptions(num, {
        ...options,
        useGrouping: false,
      })
    ).formatToParts(Number(num));
  }

  return [{ type: "literal", value: num }];
};

const getDefaultFormatOptions = (
  num: string | number,
  options?: Intl.NumberFormatOptions
): Intl.NumberFormatOptions => {
  const defaultOptions: Intl.NumberFormatOptions = {
    maximumFractionDigits: 2,
    ...options,
  };

  if (typeof num !== "string") {
    return defaultOptions;
  }

  if (
    !options ||
    (options.minimumFractionDigits === undefined &&
      options.maximumFractionDigits === undefined)
  ) {
    const digits = num.indexOf(".") > -1 ? num.split(".")[1].length : 0;
    defaultOptions.minimumFractionDigits = digits;
    defaultOptions.maximumFractionDigits = digits;
  }

  return defaultOptions;
};
