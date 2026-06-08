import { assert, type, string, optional, unknown, boolean, number } from 'superstruct';

export interface OtDhwCardConfig {
  type: string;
  dhw_enable_entity: string;
  dhw_setpoint_entity: string;
  dhw_active_entity?: string;
  dhw_temp_entity?: string;
  fault_entity?: string;
  hours?: number;
  name?: unknown;
  show_last_updated?: boolean;
  [key: string]: unknown;
}

export const OtDhwCardConfigStruct = type({
  type: string(),
  dhw_enable_entity: string(),
  dhw_setpoint_entity: string(),
  dhw_active_entity: optional(string()),
  dhw_temp_entity: optional(string()),
  fault_entity: optional(string()),
  hours: optional(number()),
  name: optional(unknown()),
  show_last_updated: optional(boolean()),
});

export function validateOtDhwCardConfig(config: unknown): OtDhwCardConfig {
  assert(config, OtDhwCardConfigStruct);
  return config as OtDhwCardConfig;
}
