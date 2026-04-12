// src/utils/colors.ts
/**
 * Generic color utilities and theme defaults.
 * For HVAC-specific colors, see ./hvac-colors.ts
 */

import { css } from 'lit';

// ============================================================================
// Default Theme Colors (fallbacks when HA vars not defined)
// ============================================================================

export const defaultColorCss = css`
  /* Climate state colors */
  --rgb-state-climate-auto: 146, 107, 199;
  --rgb-state-climate-cool: 59, 130, 246;
  --rgb-state-climate-dry: 76, 175, 80;
  --rgb-state-climate-fan-only: 158, 158, 158;
  --rgb-state-climate-heat: 249, 115, 22;
  --rgb-state-climate-heat-cool: 146, 107, 199;
  --rgb-state-climate-idle: 158, 158, 158;
  --rgb-state-climate-off: 158, 158, 158;
  --rgb-error-color: 219, 68, 55;
  /* Mushroom-compatible default colors */
  --default-red: 244, 67, 54;
  --default-pink: 233, 30, 99;
  --default-purple: 146, 107, 199;
  --default-deep-purple: 110, 65, 171;
  --default-indigo: 63, 81, 181;
  --default-blue: 33, 150, 243;
  --default-light-blue: 3, 169, 244;
  --default-cyan: 0, 188, 212;
  --default-teal: 0, 150, 136;
  --default-green: 76, 175, 80;
  --default-light-green: 139, 195, 74;
  --default-lime: 205, 220, 57;
  --default-yellow: 255, 235, 59;
  --default-amber: 255, 193, 7;
  --default-orange: 255, 152, 0;
  --default-deep-orange: 255, 111, 34;
  --default-brown: 121, 85, 72;
  --default-light-grey: 189, 189, 189;
  --default-grey: 158, 158, 158;
  --default-dark-grey: 96, 96, 96;
  --default-blue-grey: 96, 125, 139;
  --default-black: 0, 0, 0;
  --default-white: 255, 255, 255;
  --default-disabled: 189, 189, 189;
`;

export const defaultDarkColorCss = css`
  --default-disabled: 111, 111, 111;
`;
