// src/config/status-card-config.ts
import { object, string, optional } from 'superstruct';
import { LayoutStruct, type Layout } from '../shared/config/appearance-config';

export interface StatusCardConfig {
  type: string;
  climate_entity: string;
  outdoor_entity: string;
  flow_entity: string;
  curve_output_entity?: string;
  rate_limiting_entity?: string;
  control_mode_entity?: string;
  layout?: Layout;
}

/** Runtime validation schema for StatusCardConfig */
export const StatusCardConfigStruct = object({
  type: string(),
  climate_entity: string(),
  outdoor_entity: string(),
  flow_entity: string(),
  curve_output_entity: optional(string()),
  rate_limiting_entity: optional(string()),
  control_mode_entity: optional(string()),
  layout: LayoutStruct,
});

/** Default values for optional fields */
export const STATUS_CARD_DEFAULTS: Partial<StatusCardConfig> = {
  layout: 'default',
};

/** Validate and apply defaults */
export function validateStatusCardConfig(config: unknown): StatusCardConfig {
  const validated = config as StatusCardConfig;
  // Superstruct assert would go here if we wanted runtime validation
  // For now, just spread defaults
  return { ...STATUS_CARD_DEFAULTS, ...validated };
}
