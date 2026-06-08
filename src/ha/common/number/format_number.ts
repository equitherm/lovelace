// @source home-assistant/frontend/src/common/number/format_number.ts
// @synced 2026-06-08 @ SHA 1cca5f3

import type {
  HassEntity,
  HassEntityAttributeBase,
} from "home-assistant-js-websocket";
import type { EntityRegistryDisplayEntry } from "../../types";
import type { FrontendLocaleData } from "../../types";
import { round } from "./round";

enum NumberFormat {
  language = "language",
  system = "system",
  comma_decimal = "comma_decimal",
  decimal_comma = "decimal_comma",
  quote_decimal = "quote_decimal",
  space_comma = "space_comma",
  none = "none",
}

export const isNumericState = (stateObj: HassEntity): boolean =>
  isNumericFromAttributes(stateObj.attributes);

export const isNumericFromAttributes = (
  attributes: HassEntityAttributeBase,
  numericDeviceClasses?: string[]
): boolean =>
  !!attributes.unit_of_measurement ||
  !!attributes.state_class ||
  (numericDeviceClasses || []).includes(attributes.device_class || "");

export const numberFormatToLocale = (
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
): string => {
  const locale = localeOptions
    ? numberFormatToLocale(localeOptions)
    : undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (Number as any).isNaN =
    Number.isNaN ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function isNaN(input: any): input is number {
      return typeof input === "number" && isNaN(input);
    };

  if (
    localeOptions?.number_format !== NumberFormat.none &&
    !Number.isNaN(Number(num))
  ) {
    return new Intl.NumberFormat(
      locale,
      getDefaultFormatOptions(num, options)
    ).format(Number(num));
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
    ).format(Number(num));
  }

  if (typeof num === "string") {
    return num;
  }
  return `${round(num, options?.maximumFractionDigits).toString()}${
    options?.style === "currency" ? ` ${options.currency}` : ""
  }`;
};

export const getNumberFormatOptions = (
  entityState?: HassEntity,
  entity?: EntityRegistryDisplayEntry
): Intl.NumberFormatOptions | undefined => {
  const precision = entity?.display_precision;
  if (precision != null) {
    return {
      maximumFractionDigits: precision,
      minimumFractionDigits: precision,
    };
  }
  if (
    Number.isInteger(Number(entityState?.attributes?.step)) &&
    Number.isInteger(Number(entityState?.state))
  ) {
    return { maximumFractionDigits: 0 };
  }
  return undefined;
};

export const getDefaultFormatOptions = (
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
