import { assert, type, string, optional, any, boolean, number } from 'superstruct';

export interface OtModulationCardConfig {
  type: string;
  modulation_entity: string;
  max_modulation_entity: string;
  flame_entity: string;
  hours?: number;
  name?: any;
  show_last_updated?: boolean;
  [key: string]: unknown;
}

export const OtModulationCardConfigStruct = type({
  type: string(),
  modulation_entity: string(),
  max_modulation_entity: string(),
  flame_entity: string(),
  hours: optional(number()),
  name: optional(any()),
  show_last_updated: optional(boolean()),
});

export function validateOtModulationCardConfig(config: unknown): OtModulationCardConfig {
  assert(config, OtModulationCardConfigStruct);
  return config as OtModulationCardConfig;
}
