// src/cards/status-card/status-card-config.ts
import { assert, type, string, optional, any } from 'superstruct';
import { layoutStruct, type Layout } from '../../utils/layout';
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
  layout?: Layout;
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
  layout: optional(layoutStruct),
  name: optional(any()),
  title: optional(any()),
});

/** Default values for optional fields */
export const STATUS_CARD_DEFAULTS: Partial<StatusCardConfig> = {
  layout: 'default',
};

/** Validate and apply defaults */
export function validateStatusCardConfig(config: unknown): StatusCardConfig {
  assert(config, StatusCardConfigStruct);
  return { ...STATUS_CARD_DEFAULTS, ...config };
}
