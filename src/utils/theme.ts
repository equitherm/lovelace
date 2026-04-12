import { css } from "lit";

export const themeVariables = css`
  /* Spacing scale */
  --spacing: var(--eq-spacing, 10px);
  --spacing-xs: var(--eq-spacing-xs, 4px);
  --spacing-sm: var(--eq-spacing-sm, 8px);
  --spacing-md: var(--eq-spacing-md, 12px);
  --spacing-lg: var(--eq-spacing-lg, 16px);

  /* Typography scale */
  --font-size-xs: var(--eq-font-size-xs, 0.7rem);
  --font-size-sm: var(--eq-font-size-sm, 0.8rem);
  --font-size-md: var(--eq-font-size-md, 1rem);
  --font-size-lg: var(--eq-font-size-lg, 1.4rem);
  --font-size-xl: var(--eq-font-size-xl, 1.8rem);

  /* Icons */
  --icon-size-sm: var(--eq-icon-size-sm, 16px);
  --icon-size-lg: var(--eq-icon-size-lg, 36px);

  /* Shapes */
  --border-radius: var(--eq-border-radius, 12px);
  --border-radius-sm: var(--eq-border-radius-sm, 8px);
  --border-radius-pill: var(--eq-border-radius-pill, 999px);

  /* Equitherm-specific colors */
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

  /* Card */
  --card-primary-font-size: var(--eq-card-primary-font-size, 14px);
  --card-secondary-font-size: var(--eq-card-secondary-font-size, 12px);
  --card-primary-font-weight: var(--eq-card-primary-font-weight, 500);
  --card-secondary-font-weight: var(--eq-card-secondary-font-weight, 400);
  --card-primary-line-height: var(--eq-card-primary-line-height, 20px);
  --card-secondary-line-height: var(--eq-card-secondary-line-height, 16px);
  --card-primary-color: var(
    --eq-card-primary-color,
    var(--primary-text-color)
  );
  --card-secondary-color: var(
    --eq-card-secondary-color,
    var(--primary-text-color)
  );
  --card-primary-letter-spacing: var(--eq-card-primary-letter-spacing, 0.1px);
  --card-secondary-letter-spacing: var(
    --eq-card-secondary-letter-spacing,
    0.4px
  );

  /* Chips */
  --chip-spacing: var(--eq-chip-spacing, 8px);
  --chip-padding: var(--eq-chip-padding, 0 0.25em);
  --chip-height: var(--eq-chip-height, 36px);
  --chip-border-radius: var(--eq-chip-border-radius, 19px);
  --chip-border-width: var(
    --eq-chip-border-width,
    var(--ha-card-border-width, 1px)
  );
  --chip-border-color: var(
    --eq-chip-border-color,
    var(--ha-card-border-color, var(--divider-color))
  );
  --chip-box-shadow: var(
    --eq-chip-box-shadow,
    var(--ha-card-box-shadow, "none")
  );
  --chip-font-size: var(--eq-chip-font-size, 0.3em);
  --chip-font-weight: var(--eq-chip-font-weight, bold);
  --chip-icon-size: var(--eq-chip-icon-size, 0.5em);
  --chip-avatar-padding: var(--eq-chip-avatar-padding, 0.1em);
  --chip-avatar-border-radius: var(--eq-chip-avatar-border-radius, 50%);
  --chip-background: var(
    --eq-chip-background,
    var(--ha-card-background, var(--card-background-color, white))
  );
  /* Controls */
  --control-border-radius: var(--eq-control-border-radius, 12px);
  --control-height: var(--eq-control-height, 42px);
  --control-button-ratio: var(--eq-control-button-ratio, 1);
  --control-icon-size: var(--eq-control-icon-size, 0.5em);
  --control-spacing: var(--eq-control-spacing, 12px);

  /* Slider */
  --slider-threshold: var(--eq-slider-threshold);

  /* Input Number */
  --input-number-debounce: var(--eq-input-number-debounce);

  /* Layout */
  --layout-align: var(--eq-layout-align, center);

  /* Badge */
  --badge-size: var(--eq-badge-size, 16px);
  --badge-icon-size: var(--eq-badge-icon-size, 0.75em);
  --badge-border-radius: var(--eq-badge-border-radius, 50%);

  /* Icon */
  --icon-border-radius: var(--eq-icon-border-radius, 50%);
  --icon-size: var(--eq-icon-size, 36px);
  --icon-symbol-size: var(--eq-icon-symbol-size, 0.667em);
`;

export const themeColorCss = css`
  /* RGB */
  /* Standard colors */
  --rgb-red: var(--eq-rgb-red, var(--default-red));
  --rgb-pink: var(--eq-rgb-pink, var(--default-pink));
  --rgb-purple: var(--eq-rgb-purple, var(--default-purple));
  --rgb-deep-purple: var(--eq-rgb-deep-purple, var(--default-deep-purple));
  --rgb-indigo: var(--eq-rgb-indigo, var(--default-indigo));
  --rgb-blue: var(--eq-rgb-blue, var(--default-blue));
  --rgb-light-blue: var(--eq-rgb-light-blue, var(--default-light-blue));
  --rgb-cyan: var(--eq-rgb-cyan, var(--default-cyan));
  --rgb-teal: var(--eq-rgb-teal, var(--default-teal));
  --rgb-green: var(--eq-rgb-green, var(--default-green));
  --rgb-light-green: var(--eq-rgb-light-green, var(--default-light-green));
  --rgb-lime: var(--eq-rgb-lime, var(--default-lime));
  --rgb-yellow: var(--eq-rgb-yellow, var(--default-yellow));
  --rgb-amber: var(--eq-rgb-amber, var(--default-amber));
  --rgb-orange: var(--eq-rgb-orange, var(--default-orange));
  --rgb-deep-orange: var(--eq-rgb-deep-orange, var(--default-deep-orange));
  --rgb-brown: var(--eq-rgb-brown, var(--default-brown));
  --rgb-light-grey: var(--eq-rgb-light-grey, var(--default-light-grey));
  --rgb-grey: var(--eq-rgb-grey, var(--default-grey));
  --rgb-dark-grey: var(--eq-rgb-dark-grey, var(--default-dark-grey));
  --rgb-blue-grey: var(--eq-rgb-blue-grey, var(--default-blue-grey));
  --rgb-black: var(--eq-rgb-black, var(--default-black));
  --rgb-white: var(--eq-rgb-white, var(--default-white));
  --rgb-disabled: var(--eq-rgb-disabled, var(--default-disabled));

  /* Action colors */
  --rgb-info: var(--eq-rgb-info, var(--rgb-blue));
  --rgb-success: var(--eq-rgb-success, var(--rgb-green));
  --rgb-warning: var(--eq-rgb-warning, var(--rgb-orange));
  --rgb-danger: var(--eq-rgb-danger, var(--rgb-red));

  /* State climate colors */
  --rgb-state-climate-auto: var(
    --eq-rgb-state-climate-auto,
    var(--rgb-green)
  );
  --rgb-state-climate-cool: var(--eq-rgb-state-climate-cool, var(--rgb-blue));
  --rgb-state-climate-dry: var(--eq-rgb-state-climate-dry, var(--rgb-orange));
  --rgb-state-climate-fan-only: var(
    --eq-rgb-state-climate-fan-only,
    var(--rgb-teal)
  );
  --rgb-state-climate-heat: var(
    --eq-rgb-state-climate-heat,
    var(--rgb-deep-orange)
  );
  --rgb-state-climate-heat-cool: var(
    --eq-rgb-state-climate-heat-cool,
    var(--rgb-green)
  );
  --rgb-state-climate-idle: var(
    --eq-rgb-state-climate-idle,
    var(--rgb-disabled)
  );
  --rgb-state-climate-off: var(
    --eq-rgb-state-climate-off,
    var(--rgb-disabled)
  );
`;
