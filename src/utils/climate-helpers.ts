import type { HassEntity } from 'home-assistant-js-websocket';

/** Config fields needed for rate-limiting calculations */
export interface ClimateHelperConfig {
  rate_limiting_entity?: string;
  pid_active_entity?: string;
  pid_output_entity?: string;
  curve_output_entity?: string;
  flow_entity: string;
}

type EntityLookup = (id: string) => HassEntity | undefined;

export function isRateLimitingActive(config: ClimateHelperConfig, lookup: EntityLookup): boolean {
  if (!config.rate_limiting_entity) return false;
  return lookup(config.rate_limiting_entity)?.state === 'on';
}

export function isPidActive(config: ClimateHelperConfig, lookup: EntityLookup): boolean {
  if (!config.pid_active_entity) return false;
  return lookup(config.pid_active_entity)?.state === 'on';
}

export function getRateTargetEntity(config: ClimateHelperConfig): string | undefined {
  return config.pid_output_entity ?? config.curve_output_entity;
}

export function getAdjustingDirection(config: ClimateHelperConfig, lookup: EntityLookup): 'rising' | 'falling' | null {
  if (!isRateLimitingActive(config, lookup)) return null;
  const target = getRateTargetEntity(config);
  if (!target) return null;
  const flowState = lookup(config.flow_entity);
  const targetState = lookup(target);
  if (!flowState || !targetState) return null;
  const flow = parseFloat(flowState.state);
  const t = parseFloat(targetState.state);
  if (isNaN(flow) || isNaN(t)) return null;
  if (flow < t) return 'rising';
  if (flow > t) return 'falling';
  return null;
}
