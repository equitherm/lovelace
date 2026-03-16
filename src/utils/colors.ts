// src/utils/colors.ts
/**
 * Color utilities for HVAC states.
 * Simplified from mushroom's colors.ts.
 */

// RGB values for alpha compositing
export const STATE_COLORS = {
  heating: { r: 249, g: 115, b: 22 }, // Orange
  cooling: { r: 59, g: 130, b: 246 }, // Blue
  idle: { r: 158, g: 158, b: 158 }, // Gray
  off: { r: 158, g: 158, b: 158 }, // Gray
  fault: { r: 219, g: 68, b: 55 }, // Red
} as const;

export type HvacAction = keyof typeof STATE_COLORS;

export function getStateColor(
  action: HvacAction
): { r: number; g: number; b: number } {
  return STATE_COLORS[action] ?? STATE_COLORS.idle;
}

export function getStateColorRgb(action: HvacAction, alpha = 1): string {
  const { r, g, b } = getStateColor(action);
  return alpha === 1
    ? `rgb(${r}, ${g}, ${b})`
    : `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

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
    case 'idle':
    default:
      return 'idle';
  }
}

// Preset colors for the project
export const COLOR_HEATING = getStateColorRgb('heating');
export const COLOR_COLD = getStateColorRgb('cooling');
