// src/cards/tuning-card/tuning-card-config.ts
import { assert, type, string, number, optional, any } from 'superstruct';
import type { EntityNameItem } from '../../ha';

export interface TuningCardConfig {
  type: string;
  climate_entity: string;
  outdoor_entity: string;
  hc_entity: string;
  shift_entity: string;
  name?: string | EntityNameItem | EntityNameItem[];
  curve_from_entities?: boolean;
  n_entity?: string;
  /** Service to call after applying a value, e.g. "climate.equitherm_force_recalculate". Skipped if not configured or service not found. */
  recalculate_service?: string;
  n: number;
  min_flow: number;
  max_flow: number;
  t_out_min: number;
  t_out_max: number;
  [key: string]: unknown;
}

/** Runtime validation schema for TuningCardConfig */
export const TuningCardConfigStruct = type({
  type: string(),
  climate_entity: string(),
  outdoor_entity: string(),
  hc_entity: string(),
  shift_entity: string(),
  name: optional(any()),
  curve_from_entities: optional(any()),
  n_entity: optional(string()),
  recalculate_service: optional(string()),
  n: optional(number()),
  min_flow: optional(number()),
  max_flow: optional(number()),
  t_out_min: optional(number()),
  t_out_max: optional(number()),
});

/** Default tuning card parameter values (matching @equitherm/core defaults) */
export const TUNING_CARD_DEFAULTS: Required<
  Pick<TuningCardConfig, 'n' | 'min_flow' | 'max_flow' | 't_out_min' | 't_out_max'>
> = {
  n: 1.25,
  min_flow: 20,
  max_flow: 70,
  t_out_min: -20,
  t_out_max: 20,
};

/** Validate and apply defaults */
export function validateTuningCardConfig(config: unknown): TuningCardConfig {
  assert(config, TuningCardConfigStruct);
  return { ...TUNING_CARD_DEFAULTS, ...config };
}
