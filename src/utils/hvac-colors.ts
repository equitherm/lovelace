// src/utils/hvac-colors.ts
/**
 * HVAC-specific color and icon utilities.
 * Follows Mushroom pattern: simple CSS var lookups, consumers build styles.
 */

import type { HvacAction, HvacMode } from '../ha/data/climate';
import type { TemplateResult } from 'lit';

// ============================================================================
// HVAC Mode Colors (what the thermostat is set to)
// ============================================================================

export const HVAC_MODE_COLORS: Record<HvacMode, string> = {
  auto: 'var(--rgb-state-climate-auto)',
  cool: 'var(--rgb-state-climate-cool)',
  dry: 'var(--rgb-state-climate-dry)',
  fan_only: 'var(--rgb-state-climate-fan-only)',
  heat: 'var(--rgb-state-climate-heat)',
  heat_cool: 'var(--rgb-state-climate-heat-cool)',
  off: 'var(--rgb-state-climate-off)',
};

export function getHvacModeColor(mode: HvacMode | undefined): string {
  return HVAC_MODE_COLORS[mode ?? 'off'] ?? HVAC_MODE_COLORS.off;
}

// ============================================================================
// HVAC Action Colors (what's actually happening)
// ============================================================================

export const HVAC_ACTION_COLORS: Record<HvacAction, string> = {
  heating: 'var(--rgb-state-climate-heat)',
  cooling: 'var(--rgb-state-climate-cool)',
  drying: 'var(--rgb-state-climate-dry)',
  idle: 'var(--rgb-state-climate-idle)',
  off: 'var(--rgb-state-climate-off)',
};

export function getHvacActionColor(action: HvacAction | undefined): string {
  return HVAC_ACTION_COLORS[action ?? 'off'] ?? HVAC_ACTION_COLORS.off;
}

// ============================================================================
// HVAC Mode Icons
// ============================================================================

export const HVAC_MODE_ICONS: Record<HvacMode, string> = {
  auto: 'mdi:thermostat-auto',
  cool: 'mdi:snowflake',
  dry: 'mdi:water-percent',
  fan_only: 'mdi:fan',
  heat: 'mdi:fire',
  heat_cool: 'mdi:sun-snowflake-variant',
  off: 'mdi:power',
};

export function getHvacModeIcon(mode: HvacMode | undefined): string {
  return HVAC_MODE_ICONS[mode ?? 'off'] ?? 'mdi:thermostat';
}

// ============================================================================
// HVAC Action Icons
// ============================================================================

export const HVAC_ACTION_ICONS: Record<HvacAction, string | null> = {
  heating: 'mdi:fire',
  cooling: 'mdi:snowflake',
  drying: 'mdi:water-percent',
  idle: 'mdi:clock-outline',
  off: null,
};

export function getHvacActionIcon(action: HvacAction | undefined): string | null {
  return HVAC_ACTION_ICONS[action ?? 'off'] ?? null;
}

// ============================================================================
// Action Normalization
// ============================================================================

export function normalizeHvacAction(action: string | undefined): HvacAction {
  switch (action) {
    case 'heating':
    case 'heat':
      return 'heating';
    case 'cooling':
    case 'cool':
      return 'cooling';
    case 'drying':
    case 'dry':
      return 'drying';
    case 'off':
      return 'off';
    case 'idle':
    default:
      return 'idle';
  }
}

// ============================================================================
// HVAC Badge Builder (shared by status-card & curve-card)
// ============================================================================

const ACTIVE_ACTIONS = new Set<HvacAction>(['heating', 'cooling', 'drying']);

export interface HvacBadgeProps {
  label: string;
  color: string;
  icon?: string;
  active: boolean;
}

/**
 * Build eq-badge-action props for an HVAC action state.
 * Handles adjusting mode (shows trend icon + "Adjusting" label).
 */
export function getHvacBadgeProps(
  localize: (key: string) => string,
  action: HvacAction,
  adjusting = false,
  direction: 'rising' | 'falling' | null = null,
): HvacBadgeProps {
  if (adjusting) {
    const trendIcon =
      direction === 'rising' ? 'mdi:trending-up'
      : direction === 'falling' ? 'mdi:trending-down'
      : 'mdi:trending-neutral';
    return {
      label: localize('common.adjusting'),
      color: getHvacActionColor('heating'),
      icon: trendIcon,
      active: true,
    };
  }

  const actionLabels: Record<HvacAction, string> = {
    heating: 'common.heating',
    cooling: 'common.cooling',
    drying: 'common.drying',
    idle: 'common.idle',
    off: 'common.off',
  };

  return {
    label: localize(actionLabels[action]),
    color: getHvacActionColor(action),
    icon: getHvacActionIcon(action) ?? undefined,
    active: ACTIVE_ACTIONS.has(action),
  };
}

// ============================================================================
// Runtime Color Resolution (for ApexCharts)
// ============================================================================

/**
 * Resolve a CSS variable to its actual RGB value at runtime.
 * Used for ApexCharts which can't parse CSS variables.
 */
export function resolveRgbColor(element: Element, action: HvacAction): string {
  const cssVar = HVAC_ACTION_COLORS[action] ?? HVAC_ACTION_COLORS.idle;
  // Extract variable name from "var(--rgb-xxx)"
  const varMatch = cssVar.match(/var\((--[^)]+)\)/);
  if (!varMatch) return cssVar;

  const value = getComputedStyle(element).getPropertyValue(varMatch[1]).trim();
  return value ? `rgb(${value})` : cssVar;
}
