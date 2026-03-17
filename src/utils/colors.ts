// src/utils/colors.ts
/**
 * Color utilities for HVAC states.
 * Uses Home Assistant's built-in CSS variables with fallbacks.
 */

import { css } from 'lit';
import type { HvacAction } from '../types';

// CSS variable names for HA state colors (RGB format)
const HA_RGB_VARS: Record<HvacAction, string> = {
  heating: '--rgb-state-climate-heat',
  cooling: '--rgb-state-climate-cool',
  idle: '--rgb-state-climate-idle',
  off: '--rgb-state-climate-off',
  fault: '--rgb-error-color',
};

// Default RGB fallback values
const DEFAULT_RGB: Record<HvacAction, string> = {
  heating: '249, 115, 22',
  cooling: '59, 130, 246',
  idle: '158, 158, 158',
  off: '158, 158, 158',
  fault: '219, 68, 55',
};

/**
 * Get CSS variable expression with fallback.
 * Returns "var(--rgb-state-climate-heat, 249, 115, 22)"
 */
export function getHvacRgbVar(action: HvacAction): string {
  const cssVar = HA_RGB_VARS[action] ?? HA_RGB_VARS.idle;
  const fallback = DEFAULT_RGB[action] ?? DEFAULT_RGB.idle;
  return `var(${cssVar}, ${fallback})`;
}

/**
 * Resolve a CSS variable to its actual RGB value at runtime.
 * Used for ApexCharts which can't parse CSS variables.
 */
export function resolveRgbColor(element: Element, action: HvacAction): string {
  const cssVar = HA_RGB_VARS[action] ?? HA_RGB_VARS.idle;
  const fallback = DEFAULT_RGB[action] ?? DEFAULT_RGB.idle;
  const value = getComputedStyle(element).getPropertyValue(cssVar).trim();
  return `rgb(${value || fallback})`;
}

/**
 * Get CSS variables for icon styling based on HVAC action.
 */
export function getIconStyleVars(action: HvacAction): Record<string, string> {
  if (action === 'heating' || action === 'cooling' || action === 'fault') {
    const rgbVar = getHvacRgbVar(action);
    return {
      '--icon-color': `rgb(${rgbVar})`,
      '--shape-color': `rgba(${rgbVar}, 0.15)`,
      '--badge-color': `rgb(${rgbVar})`,
      '--badge-bg': `rgba(${rgbVar}, 0.2)`,
    };
  }
  return {
    '--icon-color': 'var(--secondary-text-color)',
    '--shape-color': 'var(--secondary-background-color, rgba(0,0,0,0.05))',
  };
}

/**
 * Badge icon for each HVAC action.
 */
export const ACTION_ICONS: Record<HvacAction, string | null> = {
  heating: 'mdi:fire',
  cooling: 'mdi:snowflake',
  idle: null,
  off: null,
  fault: 'mdi:alert',
};

export function getActionBadgeIcon(action: HvacAction): string | null {
  return ACTION_ICONS[action];
}

/**
 * Normalize HVAC action string to our standard types.
 */
export function normalizeHvacAction(action: string | undefined): HvacAction {
  switch (action) {
    case 'heating':
    case 'heat':
      return 'heating';
    case 'cooling':
    case 'cool':
      return 'cooling';
    case 'off':
      return 'off';
    case 'fault':
      return 'fault';
    case 'idle':
    default:
      return 'idle';
  }
}

// Default color CSS for theme fallbacks - inject into :host
export const defaultColorCss = css`
  --rgb-state-climate-heat: 249, 115, 22;
  --rgb-state-climate-cool: 59, 130, 246;
  --rgb-state-climate-idle: 158, 158, 158;
  --rgb-state-climate-off: 158, 158, 158;
  --rgb-error-color: 219, 68, 55;
`;
