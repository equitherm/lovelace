import { assert, type, string, optional, boolean, unknown } from 'superstruct';

export interface OtDiagnosticsCardConfig {
  type: string;
  fault_entity: string;
  name?: unknown;
  show_last_updated?: boolean;

  // Numeric sensors (optional)
  pressure_entity?: string;
  exhaust_entity?: string;
  fault_code_entity?: string;
  diagnostic_code_entity?: string;

  // Fault binary sensors (optional)
  flame_fault_entity?: string;
  low_pressure_entity?: string;
  air_pressure_entity?: string;
  water_overtemp_entity?: string;

  // Diagnostic binary sensors (optional)
  lockout_entity?: string;
  service_request_entity?: string;
  diagnostic_entity?: string;

  [key: string]: unknown;
}

export const OtDiagnosticsCardConfigStruct = type({
  type: string(),
  fault_entity: string(),
  name: optional(unknown()),
  show_last_updated: optional(boolean()),
  pressure_entity: optional(string()),
  exhaust_entity: optional(string()),
  fault_code_entity: optional(string()),
  diagnostic_code_entity: optional(string()),
  flame_fault_entity: optional(string()),
  low_pressure_entity: optional(string()),
  air_pressure_entity: optional(string()),
  water_overtemp_entity: optional(string()),
  lockout_entity: optional(string()),
  service_request_entity: optional(string()),
  diagnostic_entity: optional(string()),
});

export function validateOtDiagnosticsCardConfig(config: unknown): OtDiagnosticsCardConfig {
  assert(config, OtDiagnosticsCardConfigStruct);
  return config as OtDiagnosticsCardConfig;
}
