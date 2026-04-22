import { assert, type, string, optional, any, boolean } from 'superstruct';

export interface OtStatusCardConfig {
  type: string;
  boiler_temp_entity: string;
  return_temp_entity: string;
  flame_entity: string;
  setpoint_entity?: string;
  modulation_entity?: string;
  ch_active_entity?: string;
  dhw_active_entity?: string;
  name?: any;
  show_last_updated?: boolean;
  [key: string]: unknown;
}

export const OtStatusCardConfigStruct = type({
  type: string(),
  boiler_temp_entity: string(),
  return_temp_entity: string(),
  flame_entity: string(),
  setpoint_entity: optional(string()),
  modulation_entity: optional(string()),
  ch_enable_entity: optional(string()),
  dhw_active_entity: optional(string()),
  name: optional(any()),
  show_last_updated: optional(boolean()),
});

export function validateOtStatusCardConfig(config: unknown): OtStatusCardConfig {
  assert(config, OtStatusCardConfigStruct);
  return config as OtStatusCardConfig;
}
