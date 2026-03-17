import { css } from 'lit';

export const tokens = css`
  :host {
    /* Spacing */
    --eq-spacing: 10px;
    --eq-spacing-xs: 4px;
    --eq-spacing-sm: 8px;
    --eq-spacing-md: 12px;
    --eq-spacing-lg: 16px;

    /* Typography */
    --eq-font-size-xs: 0.7rem;
    --eq-font-size-sm: 0.8rem;
    --eq-font-size-md: 1rem;
    --eq-font-size-lg: 1.4rem;
    --eq-font-size-xl: 1.8rem;

    /* Backward-compatible aliases */
    --eq-card-padding: var(--eq-spacing-lg);
    --eq-font-size-large: var(--eq-font-size-xl);
    --eq-font-size-medium: var(--eq-font-size-md);
    --eq-font-size-small: var(--eq-font-size-sm);

    /* Icons */
    --eq-icon-size: 24px;
    --eq-icon-size-sm: 16px;
    --eq-icon-size-lg: 36px;

    /* Shapes */
    --eq-border-radius: 12px;
    --eq-border-radius-sm: 8px;
    --eq-border-radius-pill: 999px;

    /* Controls */
    --eq-control-height: 42px;

    /* Colors - RGB for alpha */
    --rgb-heating: 249, 115, 22;
    --rgb-cold: 59, 130, 246;

    /* Colors - with HA theme fallbacks */
    --eq-primary-text: var(--primary-text-color, #212121);
    --eq-secondary-text: var(--secondary-text-color, #727272);
    --eq-primary-bg: var(--primary-background-color, #fafafa);
    --eq-secondary-bg: var(--secondary-background-color, #e5e5e5);
    --eq-card-bg: var(--card-background-color, #ffffff);
    --eq-divider: var(--divider-color, #e0e0e0);
    --eq-error: var(--error-color, #db4437);

    /* Badge colors */
    --eq-badge-heating-bg: var(--eq-user-badge-heating-bg, #f97316);
    --eq-badge-heating-color: var(--eq-user-badge-heating-color, #ffffff);
    --eq-badge-idle-bg: var(--eq-user-badge-idle-bg, var(--secondary-background-color, #e5e5e5));
    --eq-badge-idle-color: var(--eq-user-badge-idle-color, var(--secondary-text-color, #666));
    --eq-badge-fault-bg: var(--eq-user-badge-fault-bg, var(--error-color, #db4437));
    --eq-badge-fault-color: var(--eq-user-badge-fault-color, #ffffff);

    /* Gradients */
    --eq-gradient-cold: var(--eq-user-gradient-cold, #3b82f6);
    --eq-gradient-hot: var(--eq-user-gradient-hot, #f97316);
    --eq-dot-glow: var(--eq-user-dot-glow, rgba(var(--rgb-heating), 0.4));
  }

  /* Dark mode overrides */
  :host([dark-mode]) {
    --eq-primary-bg: var(--primary-background-color, #1e1e1e);
    --eq-secondary-bg: var(--secondary-background-color, #333333);
    --eq-card-bg: var(--card-background-color, #2d2d2d);
    --eq-divider: var(--divider-color, #444444);
    --eq-badge-idle-bg: var(--eq-user-badge-idle-bg, rgba(255, 255, 255, 0.1));
    --eq-badge-idle-color: var(--eq-user-badge-idle-color, #aaa);
  }
`;

export const cardBase = css`
  ha-card {
    padding: var(--eq-spacing-lg);
    box-sizing: border-box;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .not-found {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--eq-spacing-xs);
    padding: var(--eq-spacing-lg);
    color: var(--eq-error);
    font-size: var(--eq-font-size-sm);
  }

  .not-found ha-icon {
    --mdc-icon-size: 20px;
  }
`;

/**
 * Apply dark mode attribute based on HA theme.
 */
export function applyDarkMode(element: HTMLElement, hass: unknown): boolean {
  const themes = (hass as { themes?: { darkMode?: boolean } })?.themes;
  const isDark = themes?.darkMode ?? false;

  if (isDark) {
    element.setAttribute('dark-mode', '');
  } else {
    element.removeAttribute('dark-mode');
  }

  return isDark;
}
