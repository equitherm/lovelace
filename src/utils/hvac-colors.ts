// src/utils/hvac-colors.ts
/**
 * HVAC-specific utilities for equitherm cards.
 * Colors are resolved via HA's --rgb-state-climate-* CSS variables.
 * Icon/color mappings are backported from HA frontend.
 */
import type { HvacAction } from '../ha/data/climate';
import { CLIMATE_HVAC_ACTION_TO_MODE } from '../ha/data/climate';

// ============================================================================
// HVAC Action Icons (no HA equivalent — HA uses async attribute-icon lookup)
// ============================================================================

export const HVAC_ACTION_ICONS: Record<HvacAction, string | null> = {
  heating: 'mdi:fire',
  cooling: 'mdi:snowflake',
  drying: 'mdi:water-percent',
  idle: 'mdi:clock-outline',
  off: null,
  fan: 'mdi:fan',
  defrosting: 'mdi:snowflake-melt',
  preheating: 'mdi:fire',
};

export function getHvacActionIcon(action: HvacAction | undefined): string | null {
  return HVAC_ACTION_ICONS[action ?? 'off'] ?? null;
}

// ============================================================================
// Action Normalization (equitherm-specific)
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
    case 'fan':
    case 'fan_only':
      return 'fan';
    case 'defrosting':
      return 'defrosting';
    case 'preheating':
      return 'preheating';
    case 'off':
      return 'off';
    case 'idle':
    default:
      return 'idle';
  }
}

// ============================================================================
// Color Helpers (bridge between stateColorCss and RGB triple consumers)
// ============================================================================

/**
 * Get RGB triple CSS var for an HVAC action.
 * Maps action → mode → --rgb-state-climate-{mode} CSS variable.
 * Used by eq-badge-info and ECharts which need RGB triples.
 */
export function getHvacActionColor(action: HvacAction): string {
  const mode = CLIMATE_HVAC_ACTION_TO_MODE[action] ?? 'off';
  return `var(--rgb-state-climate-${mode === 'heat_cool' ? 'heat-cool' : mode})`;
}

// ============================================================================
// HVAC Badge Builder (shared by all 3 cards)
// ============================================================================

const ACTIVE_ACTIONS = new Set<HvacAction>(['heating', 'cooling', 'drying', 'defrosting', 'preheating']);

export interface HvacBadgeProps {
  label: string;
  /** CSS var value for --badge-info-color, e.g. 'var(--rgb-state-climate-heat)' */
  color: string;
  icon?: string;
  active: boolean;
}

/**
 * Build eq-badge-info props for an HVAC action state.
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
    fan: 'common.fan',
    defrosting: 'common.defrosting',
    preheating: 'common.preheating',
  };

  return {
    label: localize(actionLabels[action]),
    color: getHvacActionColor(action),
    icon: getHvacActionIcon(action) ?? undefined,
    active: ACTIVE_ACTIONS.has(action),
  };
}

// ============================================================================
// Runtime Color Resolution (for ECharts)
// ============================================================================

/**
 * Resolve a CSS variable to its actual RGB value at runtime.
 * Used for ECharts which can't parse CSS variables.
 */
export function resolveRgbColor(element: Element, action: HvacAction): string {
  const cssVar = getHvacActionColor(action);
  const varMatch = cssVar.match(/var\((--[^)]+)\)/);
  if (!varMatch) return cssVar;
  const value = getComputedStyle(element).getPropertyValue(varMatch[1]).trim();
  return value ? `rgb(${value})` : cssVar;
}
