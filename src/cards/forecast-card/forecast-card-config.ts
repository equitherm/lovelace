// src/cards/forecast-card/forecast-card-config.ts
import { assert, type, string, number, optional, any, boolean } from 'superstruct';
import type { EntityNameItem } from '../../ha';
import { CURVE_CONFIG_DEFAULTS, curveConfigStructFields, curveEntityStructFields } from '../../utils/curve-config';

export interface ForecastCardConfig {
  type: string;
  weather_entity: string;
  climate_entity: string;
  flow_entity: string;
  hours: number;
  name?: string | EntityNameItem | EntityNameItem[];
  curve_from_entities?: boolean;
  hc_entity?: string;
  n_entity?: string;
  shift_entity?: string;
  min_flow_entity?: string;
  max_flow_entity?: string;
  pid_active_entity?: string;
  show_last_updated?: boolean;
  hc: number;
  n: number;
  shift: number;
  min_flow: number;
  max_flow: number;
  [key: string]: unknown;
}

/** Runtime validation schema for ForecastCardConfig */
export const ForecastCardConfigStruct = type({
  type: string(),
  weather_entity: string(),
  climate_entity: string(),
  flow_entity: string(),
  hours: optional(number()),
  name: optional(any()),
  curve_from_entities: optional(any()),
  hc_entity: optional(string()),
  n_entity: optional(string()),
  shift_entity: optional(string()),
  ...curveEntityStructFields,
  pid_active_entity: optional(string()),
  show_last_updated: optional(boolean()),
  hc: optional(number()),
  ...curveConfigStructFields,
  shift: optional(number()),
});

export const FORECAST_CARD_DEFAULTS: Required<
  Pick<ForecastCardConfig, 'hours' | 'hc' | 'shift'>
> & typeof CURVE_CONFIG_DEFAULTS = {
  hours: 24,
  hc: 0.9,
  shift: 0,
  ...CURVE_CONFIG_DEFAULTS,
};

/** Validate and apply defaults */
export function validateForecastCardConfig(config: unknown): ForecastCardConfig {
  assert(config, ForecastCardConfigStruct);
  return { ...FORECAST_CARD_DEFAULTS, ...config };
}
