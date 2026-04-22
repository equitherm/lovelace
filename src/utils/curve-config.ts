import { optional, number, string } from 'superstruct';

/** Curve parameters shared across curve-card and forecast-card */
export interface CurveConfigFields {
  n: number;
  min_flow: number;
  max_flow: number;
}

/** Default values for shared curve parameters (matching @equitherm/core defaults) */
export const CURVE_CONFIG_DEFAULTS: Required<CurveConfigFields> = {
  n: 1.25,
  min_flow: 20,
  max_flow: 70,
};

/** Superstruct fields for shared curve params — spread into a card's config struct */
export const curveConfigStructFields = {
  n: optional(number()),
  min_flow: optional(number()),
  max_flow: optional(number()),
};

/** Superstruct fields for live entity overrides — spread when curve_from_entities is enabled */
export const curveEntityStructFields = {
  min_flow_entity: optional(string()),
  max_flow_entity: optional(string()),
};
