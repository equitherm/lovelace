import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import setupCustomlocalize from '../localize';
import type { HvacAction } from '../ha/data/climate';
import { getHvacActionColor } from '../utils/hvac-colors';

const ACTION_LABELS: Record<HvacAction, string> = {
  heating: 'common.heating',
  cooling: 'common.cooling',
  drying: 'common.drying',
  idle: 'common.idle',
  off: 'common.off',
};

const ACTIVE_ACTIONS = new Set(['heating', 'cooling', 'drying']);

/**
 * HVAC action status badge.
 * Follows Mushroom pattern: uses getHvacActionColor() utility for colors.
 *
 * Usage:
 * ```html
 * <eq-badge-action .action=${'heating'}></eq-badge-action>
 * ```
 */
@customElement('eq-badge-action')
export class BadgeAction extends LitElement {
  @property() action: HvacAction = 'idle';

  static get styles(): CSSResultGroup {
    return css`
      .badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 3px 10px;
        border-radius: 999px;
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        transition: background-color 280ms ease-in-out;
      }
      .dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        flex-shrink: 0;
      }
      .active .dot {
        animation: pulse 1.5s ease-in-out infinite;
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
    `;
  }

  render() {
    const localize = setupCustomlocalize();
    const label = localize(ACTION_LABELS[this.action] ?? ACTION_LABELS.off);
    const color = getHvacActionColor(this.action); // "var(--rgb-state-climate-heat)"
    const isActive = ACTIVE_ACTIONS.has(this.action);

    // Mushroom pattern: use rgb(${color}) directly
    const badgeStyle = styleMap({
      'color': `rgb(${color})`,
      'background-color': `rgba(${color}, 0.15)`,
    });

    const dotStyle = styleMap({
      'background-color': `rgb(${color})`,
    });

    return html`
      <span class=${classMap({ badge: true, active: isActive })} style=${badgeStyle}>
        <span class="dot" style=${dotStyle}></span>
        ${label}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eq-badge-action': BadgeAction;
  }
}
