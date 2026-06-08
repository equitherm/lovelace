import { defaulted, type, string, optional, unknown, boolean, number } from 'superstruct';
import { create } from 'superstruct';

const DEFAULT_HOURS = 1;

export interface OtModulationCardConfig {
  type: string;
  modulation_entity: string;
  max_modulation_entity: string;
  flame_entity: string;
  hours?: number;
  ch_active_entity?: string;
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
  hours: optional(defaulted(number(), DEFAULT_HOURS)),
  ch_active_entity: optional(string()),
  fault_entity: optional(string()),
  name: optional(unknown()),
  show_last_updated: optional(boolean()),
});

export function validateOtModulationCardConfig(config: unknown): OtModulationCardConfig {
  return create(config, OtModulationCardConfigStruct);
}
