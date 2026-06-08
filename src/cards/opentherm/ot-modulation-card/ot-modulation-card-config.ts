import { assert, type, string, optional, unknown, boolean, number } from 'superstruct';

export interface OtModulationCardConfig {
  type: string;
  modulation_entity: string;
  max_modulation_entity: string;
  flame_entity: string;
  hours?: number;
  fault_entity?: string;
  name?: unknown;
  show_last_updated?: boolean;
  [key: string]: unknown;
}

export const OtModulationCardConfigStruct = type({
  type: string(),
  modulation_entity: string(),
  max_modulation_entity: string(),
  flame_entity: string(),
  hours: optional(number()),
  fault_entity: optional(string()),
  name: optional(unknown()),
  show_last_updated: optional(boolean()),
});

export function validateOtModulationCardConfig(config: unknown): OtModulationCardConfig {
  assert(config, OtModulationCardConfigStruct);
  return config as OtModulationCardConfig;
}
