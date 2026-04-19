import { assert, type, string, optional, any, boolean } from 'superstruct';
import type { EntityNameItem } from '../../ha';

export interface PidCardConfig {
  type: string;
  pid_correction_entity: string;
  pid_proportional_entity: string;
  pid_integral_entity: string;
  pid_derivative_entity: string;
  climate_entity?: string;
  pid_active_entity?: string;
  name?: string | EntityNameItem | EntityNameItem[];
  show_last_updated?: boolean;
  [key: string]: unknown;
}

export const PidCardConfigStruct = type({
  type: string(),
  pid_correction_entity: string(),
  pid_proportional_entity: string(),
  pid_integral_entity: string(),
  pid_derivative_entity: string(),
  climate_entity: optional(string()),
  pid_active_entity: optional(string()),
  name: optional(any()),
  show_last_updated: optional(boolean()),
});

export function validatePidCardConfig(config: unknown): PidCardConfig {
  assert(config, PidCardConfigStruct);
  return config as PidCardConfig;
}
