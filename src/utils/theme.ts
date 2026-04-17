import { css } from "lit";

export const themeVariables = css`
  /* Equitherm-specific colors (no HA equivalent) */
  --rgb-heating: var(--eq-rgb-heating, 249, 115, 22);
  --rgb-cold: var(--eq-rgb-cold, 59, 130, 246);
  --gradient-cold: var(--eq-gradient-cold, #3b82f6);
  --gradient-hot: var(--eq-gradient-hot, #f97316);
  --dot-glow: var(--eq-dot-glow, rgba(var(--rgb-heating), 0.4));

  /* Curve gradient */
  --curve-gradient-start: var(--eq-curve-gradient-start, 211, 47, 47);
  --curve-gradient-end: var(--eq-curve-gradient-end, var(--rgb-state-climate-cool));

  /* Badge colors */
  --badge-heating-bg: var(--eq-badge-heating-bg, #f97316);
  --badge-heating-color: var(--eq-badge-heating-color, #ffffff);
  --badge-cooling-bg: var(--eq-badge-cooling-bg, #3b82f6);
  --badge-cooling-color: var(--eq-badge-cooling-color, #ffffff);
  --badge-drying-bg: var(--eq-badge-drying-bg, #4caf50);
  --badge-drying-color: var(--eq-badge-drying-color, #ffffff);
  --badge-idle-bg: var(--eq-badge-idle-bg, var(--secondary-background-color, #e5e5e5));
  --badge-idle-color: var(--eq-badge-idle-color, var(--secondary-text-color, #666));

  /* Title */
  --title-padding: var(--eq-title-padding, 24px 12px 8px);
  --title-spacing: var(--eq-title-spacing, 8px);
  --title-font-size: var(--eq-title-font-size, 24px);
  --title-font-weight: var(--eq-title-font-weight, normal);
  --title-line-height: var(--eq-title-line-height, 32px);
  --title-color: var(--eq-title-color, var(--primary-text-color));
  --title-letter-spacing: var(--eq-title-letter-spacing, -0.288px);
  --subtitle-font-size: var(--eq-subtitle-font-size, 16px);
  --subtitle-font-weight: var(--eq-subtitle-font-weight, normal);
  --subtitle-line-height: var(--eq-subtitle-line-height, 24px);
  --subtitle-color: var(--eq-subtitle-color, var(--secondary-text-color));
  --subtitle-letter-spacing: var(--eq-subtitle-letter-spacing, 0px);
`;

export const themeColorCss = css`
  /* Equitherm-specific colors */
  --rgb-success: var(--eq-rgb-success, var(--default-green));
  --rgb-warning: var(--eq-rgb-warning, var(--default-orange));
  --rgb-danger: var(--eq-rgb-danger, var(--default-red));
  --rgb-disabled: var(--eq-rgb-disabled, var(--default-disabled));

  /* State climate colors — kept as RGB triples for eq-badge-info and ApexCharts */
  --rgb-state-climate-auto: var(--eq-rgb-state-climate-auto, 146, 107, 199);
  --rgb-state-climate-cool: var(--eq-rgb-state-climate-cool, 59, 130, 246);
  --rgb-state-climate-dry: var(--eq-rgb-state-climate-dry, 76, 175, 80);
  --rgb-state-climate-fan-only: var(--eq-rgb-state-climate-fan-only, 158, 158, 158);
  --rgb-state-climate-heat: var(--eq-rgb-state-climate-heat, 249, 115, 22);
  --rgb-state-climate-heat-cool: var(--eq-rgb-state-climate-heat-cool, 146, 107, 199);
  --rgb-state-climate-idle: var(--eq-rgb-state-climate-idle, 158, 158, 158);
  --rgb-state-climate-off: var(--eq-rgb-state-climate-off, 158, 158, 158);
`;
