// src/utils/colors.ts
import { css } from 'lit';

export const defaultColorCss = css`
  /* Climate state colors (RGB triples for badge-info + ApexCharts) */
  --rgb-state-climate-auto: 146, 107, 199;
  --rgb-state-climate-cool: 59, 130, 246;
  --rgb-state-climate-dry: 76, 175, 80;
  --rgb-state-climate-fan-only: 158, 158, 158;
  --rgb-state-climate-heat: 249, 115, 22;
  --rgb-state-climate-heat-cool: 146, 107, 199;
  --rgb-state-climate-idle: 158, 158, 158;
  --rgb-state-climate-off: 158, 158, 158;
  --rgb-error-color: 219, 68, 55;
  --default-green: 76, 175, 80;
  --default-orange: 255, 152, 0;
  --default-red: 244, 67, 54;
  --default-disabled: 189, 189, 189;
`;

export const defaultDarkColorCss = css`
  --default-disabled: 111, 111, 111;
`;
