import { css } from 'lit';

export const tokens = css`
  :host {
    /* RGB values for alpha compositing */
    --rgb-heating: 249, 115, 22;      /* #f97316 */
    --rgb-cold: 59, 130, 246;         /* #3b82f6 */

    /* Two-tier CSS variables: inner var for user override, outer with fallback */
    --eq-gradient-cold: var(--eq-user-gradient-cold, #3b82f6);
    --eq-gradient-hot: var(--eq-user-gradient-hot, #f97316);
    --eq-dot-glow: var(--eq-user-dot-glow, rgba(var(--rgb-heating), 0.4));

    /* Badge colors */
    --eq-badge-heating-bg: var(--eq-user-badge-heating-bg, #f97316);
    --eq-badge-heating-color: var(--eq-user-badge-heating-color, #ffffff);
    --eq-badge-idle-bg: var(--eq-user-badge-idle-bg, var(--secondary-background-color, #e5e5e5));
    --eq-badge-idle-color: var(--eq-user-badge-idle-color, var(--secondary-text-color, #666));
    --eq-badge-fault-bg: var(--eq-user-badge-fault-bg, var(--error-color, #db4437));
    --eq-badge-fault-color: var(--eq-user-badge-fault-color, #ffffff);

    /* Layout tokens */
    --eq-card-padding: 16px;
    --eq-control-height: 42px;

    /* Typography */
    --eq-font-size-large: 1.8rem;
    --eq-font-size-medium: 1rem;
    --eq-font-size-small: 0.8rem;
  }

  /* Dark mode support - apply when [dark-mode] attribute present */
  :host([dark-mode]) {
    --eq-badge-idle-bg: var(--eq-user-badge-idle-bg, rgba(255, 255, 255, 0.1));
    --eq-badge-idle-color: var(--eq-user-badge-idle-color, var(--secondary-text-color, #aaa));
  }
`;

export const cardBase = css`
  ha-card {
    padding: var(--eq-card-padding);
    box-sizing: border-box;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
`;

/**
 * Detect dark mode from HA theme and apply [dark-mode] attribute.
 * Call from hass setter. Returns the dark mode state for use in ApexCharts.
 */
export function applyDarkMode(element: HTMLElement, hass: unknown): boolean {
  // HA adds darkMode to themes object at runtime (not in custom-card-helpers types)
  const themes = (hass as { themes?: { darkMode?: boolean } })?.themes;
  const isDark = themes?.darkMode ?? false;
  if (isDark) {
    element.setAttribute('dark-mode', '');
  } else {
    element.removeAttribute('dark-mode');
  }
  return isDark;
}

/** Heating orange - primary accent color */
export const COLOR_HEATING = '#f97316';

/** Cold blue - secondary accent color */
export const COLOR_COLD = '#3b82f6';
