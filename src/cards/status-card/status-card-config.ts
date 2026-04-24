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
  pid_correction_entity?: string;
  wws_entity?: string;
  hc_entity?: string;
  shift_entity?: string;
  n_entity?: string;
  show_last_updated?: boolean;
  show_params_footer?: boolean;
  tunable?: boolean;
  recalculate_service?: string;
  name?: string | EntityNameItem | EntityNameItem[];
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
  pid_correction_entity: optional(string()),
  wws_entity: optional(string()),
  hc_entity: optional(string()),
  shift_entity: optional(string()),
  n_entity: optional(string()),
  show_last_updated: optional(boolean()),
  show_params_footer: optional(boolean()),
  tunable: optional(boolean()),
  recalculate_service: optional(string()),
  name: optional(any()),
});

/** Validate and apply defaults */
export function validateStatusCardConfig(config: unknown): StatusCardConfig {
  const c = { ...(config as Record<string, unknown>) };
  if ('title' in c && !('name' in c)) c.name = c.title;
  delete c.title;
  assert(c, StatusCardConfigStruct);
  return c as StatusCardConfig;
}
