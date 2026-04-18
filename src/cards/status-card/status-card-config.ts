// src/cards/status-card/status-card-config.ts
import { assert, type, string, optional, any, boolean } from 'superstruct';
import type { EntityNameItem } from '../../ha';

export interface StatusCardConfig {
  type: string;
  climate_entity: string;
  outdoor_entity: string;
  flow_entity: string;
  curve_output_entity?: string;
  pid_output_entity?: string;
  rate_limiting_entity?: string;
  pid_active_entity?: string;
  vertical?: boolean;
  show_last_updated?: boolean;
  name?: string | EntityNameItem | EntityNameItem[];
  /** @deprecated Use `name` instead */
  title?: string;
  [key: string]: unknown;
}

/** Runtime validation schema for StatusCardConfig */
export const StatusCardConfigStruct = type({
  type: string(),
  climate_entity: string(),
  outdoor_entity: string(),
  flow_entity: string(),
  curve_output_entity: optional(string()),
  pid_output_entity: optional(string()),
  rate_limiting_entity: optional(string()),
  pid_active_entity: optional(string()),
  vertical: optional(boolean()),
  show_last_updated: optional(boolean()),
  name: optional(any()),
  title: optional(any()),
});

/** Validate and apply defaults */
export function validateStatusCardConfig(config: unknown): StatusCardConfig {
  assert(config, StatusCardConfigStruct);
  return config as StatusCardConfig;
}
