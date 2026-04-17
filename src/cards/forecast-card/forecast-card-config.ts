// src/cards/forecast-card/forecast-card-config.ts
import { assert, type, string, number, optional, any } from 'superstruct';
import type { EntityNameItem } from '../../ha';

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
  pid_active_entity?: string;
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
  pid_active_entity: optional(string()),
  hc: optional(number()),
  n: optional(number()),
  shift: optional(number()),
  min_flow: optional(number()),
  max_flow: optional(number()),
});

/** Default forecast card parameter values (matching @equitherm/core defaults) */
export const FORECAST_CARD_DEFAULTS: Required<
  Pick<ForecastCardConfig, 'hours' | 'hc' | 'n' | 'shift' | 'min_flow' | 'max_flow'>
> = {
  hours: 24,
  hc: 0.9,
  n: 1.25,
  shift: 0,
  min_flow: 20,
  max_flow: 70,
};

/** Validate and apply defaults */
export function validateForecastCardConfig(config: unknown): ForecastCardConfig {
  assert(config, ForecastCardConfigStruct);
  return { ...FORECAST_CARD_DEFAULTS, ...config };
}
