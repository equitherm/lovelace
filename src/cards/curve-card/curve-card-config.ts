// src/cards/curve-card/curve-card-config.ts
import { assert, type, string, number, optional, any } from 'superstruct';
import type { EntityNameItem } from '../../ha';

export interface CurveCardConfig {
  type: string;
  climate_entity: string;
  outdoor_entity: string;
  curve_output_entity: string;
  pid_output_entity?: string;
  flow_entity: string;
  rate_limiting_entity?: string;
  pid_active_entity?: string;
  name?: string | EntityNameItem | EntityNameItem[];
  /** @deprecated Use `name` instead */
  title?: string;
  // Live curve parameters from device entities
  curve_from_entities?: boolean;
  hc_entity?: string;
  n_entity?: string;
  shift_entity?: string;
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
  title: optional(any()),
  name: optional(any()),
  curve_from_entities: optional(any()),
  hc_entity: optional(string()),
  n_entity: optional(string()),
  shift_entity: optional(string()),
  hc: optional(number()),
  n: optional(number()),
  shift: optional(number()),
  min_flow: optional(number()),
  max_flow: optional(number()),
  t_out_min: optional(number()),
  t_out_max: optional(number()),
});

/** Default curve parameter values (matching @equitherm/core defaults) */
export const CURVE_CARD_DEFAULTS: Required<
  Pick<CurveCardConfig, 'hc' | 'n' | 'shift' | 'min_flow' | 'max_flow' | 't_out_min' | 't_out_max'>
> = {
  hc: 0.9,
  n: 1.25,
  shift: 0,
  min_flow: 20,
  max_flow: 70,
  t_out_min: -20,
  t_out_max: 20,
};

/** Validate and apply defaults */
export function validateCurveCardConfig(config: unknown): CurveCardConfig {
  assert(config, CurveCardConfigStruct);
  return { ...CURVE_CARD_DEFAULTS, ...config };
}
