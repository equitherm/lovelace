import { assert, type, string, optional, any, boolean, number } from 'superstruct';

export interface OtEfficiencyCardConfig {
  type: string;
  boiler_temp_entity: string;
  return_temp_entity: string;
  flame_entity?: string;
  ch_active_entity?: string;
  condensing_threshold?: number;
  hours?: number;
  name?: any;
  show_last_updated?: boolean;
  [key: string]: unknown;
}

export const OtEfficiencyCardConfigStruct = type({
  type: string(),
  boiler_temp_entity: string(),
  return_temp_entity: string(),
  flame_entity: optional(string()),
  ch_active_entity: optional(string()),
  condensing_threshold: optional(number()),
  hours: optional(number()),
  name: optional(any()),
  show_last_updated: optional(boolean()),
});

export function validateOtEfficiencyCardConfig(config: unknown): OtEfficiencyCardConfig {
  assert(config, OtEfficiencyCardConfigStruct);
  return config as OtEfficiencyCardConfig;
}
