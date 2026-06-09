import { defaulted, type, string, optional, unknown, boolean, number } from 'superstruct';
import { create } from 'superstruct';

const DEFAULT_HOURS = 6;
const DEFAULT_CONDENSING_THRESHOLD = 55;

export interface OtEfficiencyCardConfig {
  type: string;
  boiler_temp_entity: string;
  return_temp_entity: string;
  flame_entity?: string;
  ch_active_entity?: string;
  condensing_threshold?: number;
  hours?: number;
  fault_entity?: string;
  dhw_temp_entity?: string;
  dhw_setpoint_entity?: string;
  dhw_active_entity?: string;
  name?: unknown;
  show_last_updated?: boolean;
  [key: string]: unknown;
}

export const OtEfficiencyCardConfigStruct = type({
  type: string(),
  boiler_temp_entity: string(),
  return_temp_entity: string(),
  flame_entity: optional(string()),
  ch_active_entity: optional(string()),
  condensing_threshold: optional(defaulted(number(), DEFAULT_CONDENSING_THRESHOLD)),
  hours: optional(defaulted(number(), DEFAULT_HOURS)),
  fault_entity: optional(string()),
  dhw_temp_entity: optional(string()),
  dhw_setpoint_entity: optional(string()),
  dhw_active_entity: optional(string()),
  name: optional(unknown()),
  show_last_updated: optional(boolean()),
});

export function validateOtEfficiencyCardConfig(config: unknown): OtEfficiencyCardConfig {
  return create(config, OtEfficiencyCardConfigStruct);
}
