// src/cards/curve-card/curve-card-config.ts
import { assert, type, string, number, optional, any, boolean } from 'superstruct';
import type { EntityNameItem } from '../../ha';
import { CURVE_CONFIG_DEFAULTS, curveConfigStructFields, curveEntityStructFields } from '../../utils/curve-config';

export interface CurveCardConfig {
  type: string;
  climate_entity: string;
  outdoor_entity: string;
  curve_output_entity: string;
  pid_output_entity?: string;
  flow_entity: string;
  rate_limiting_entity?: string;
  pid_active_entity?: string;
  show_last_updated?: boolean;
  name?: string | EntityNameItem | EntityNameItem[];
  /** @deprecated Use `name` instead */
  title?: string;
  // Live curve parameters from device entities
  curve_from_entities?: boolean;
  hc_entity?: string;
  n_entity?: string;
  shift_entity?: string;
  min_flow_entity?: string;
  max_flow_entity?: string;
  // Curve parameters (required after validation, optional in raw config)
  hc: number;
  n: number;
  shift: number;
  min_flow: number;
  max_flow: number;
  t_out_min: number;
  t_out_max: number;
  [key: string]: unknown;
}

/** Runtime validation schema for CurveCardConfig */
export const CurveCardConfigStruct = type({
  type: string(),
  climate_entity: string(),
  outdoor_entity: string(),
  curve_output_entity: string(),
  pid_output_entity: optional(string()),
  flow_entity: string(),
  rate_limiting_entity: optional(string()),
  pid_active_entity: optional(string()),
  show_last_updated: optional(boolean()),
  title: optional(any()),
  name: optional(any()),
  curve_from_entities: optional(any()),
  hc_entity: optional(string()),
  n_entity: optional(string()),
  shift_entity: optional(string()),
  ...curveEntityStructFields,
  hc: optional(number()),
  ...curveConfigStructFields,
  shift: optional(number()),
  t_out_min: optional(number()),
  t_out_max: optional(number()),
});

/** Default curve parameter values (matching @equitherm/core defaults) */
export const CURVE_CARD_DEFAULTS: Required<
  Pick<CurveCardConfig, 'hc' | 'shift' | 't_out_min' | 't_out_max'>
> & typeof CURVE_CONFIG_DEFAULTS = {
  hc: 0.9,
  shift: 0,
  t_out_min: -20,
  t_out_max: 20,
  ...CURVE_CONFIG_DEFAULTS,
};

/** Validate and apply defaults */
export function validateCurveCardConfig(config: unknown): CurveCardConfig {
  assert(config, CurveCardConfigStruct);
  return { ...CURVE_CARD_DEFAULTS, ...config };
}
