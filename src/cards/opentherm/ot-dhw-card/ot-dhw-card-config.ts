import { assert, type, string, optional, any, boolean } from 'superstruct';

export interface OtDhwCardConfig {
  type: string;
  dhw_enable_entity: string;
  dhw_setpoint_entity: string;
  dhw_active_entity?: string;
  dhw_temp_entity?: string;
  name?: any;
  show_last_updated?: boolean;
  [key: string]: unknown;
}

export const OtDhwCardConfigStruct = type({
  type: string(),
  dhw_enable_entity: string(),
  dhw_setpoint_entity: string(),
  dhw_active_entity: optional(string()),
  dhw_temp_entity: optional(string()),
  name: optional(any()),
  show_last_updated: optional(boolean()),
});

export function validateOtDhwCardConfig(config: unknown): OtDhwCardConfig {
  assert(config, OtDhwCardConfigStruct);
  return config as OtDhwCardConfig;
}
