import { type, string, optional, boolean, unknown, number } from 'superstruct';
import { create } from 'superstruct';

const DEFAULT_HOURS = 1;

export interface OtHeatingCardConfig {
  type: string;
  // Content (ex-status) — always visible
  boiler_temp_entity: string;
  return_temp_entity: string;
  flame_entity: string;
  setpoint_entity?: string;
  // Feature panel — visible if configured
  max_modulation_entity?: string;
  modulation_entity?: string;
  // Monitoring — visible if flame_entity + hours
  hours?: number;
  ch_active_entity?: string;
  // Common
  dhw_active_entity?: string;
  fault_entity?: string;
  name?: unknown;
  show_last_updated?: boolean;
  [key: string]: unknown;
}

export const OtHeatingCardConfigStruct = type({
  type: string(),
  boiler_temp_entity: string(),
  return_temp_entity: string(),
  flame_entity: string(),
  setpoint_entity: optional(string()),
  max_modulation_entity: optional(string()),
  modulation_entity: optional(string()),
  hours: optional(number()),
  ch_active_entity: optional(string()),
  dhw_active_entity: optional(string()),
  fault_entity: optional(string()),
  name: optional(unknown()),
  show_last_updated: optional(boolean()),
});

export function validateOtHeatingCardConfig(config: unknown): OtHeatingCardConfig {
  return create(config, OtHeatingCardConfigStruct);
}
