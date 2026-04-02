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
  @property({ type: Boolean }) adjusting = false;
  @property({ attribute: false }) direction: 'rising' | 'falling' | null = null;

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
      .badge.adjusting {
        color: var(--primary-color);
        background-color: rgba(var(--rgb-primary-color, 98, 100, 167), 0.15);
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
      .trend-icon {
        --mdc-icon-size: 14px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
      }
    `;
  }

  render() {
    const localize = setupCustomlocalize();

    if (this.adjusting) {
      const trendIcon =
        this.direction === 'rising'
          ? 'mdi:trending-up'
          : this.direction === 'falling'
            ? 'mdi:trending-down'
            : 'mdi:trending-neutral';

      const label = localize('common.adjusting');

      return html`
        <span class=${classMap({ badge: true, adjusting: true })}>
          <ha-icon class="trend-icon" icon=${trendIcon}></ha-icon>
          ${label}
        </span>
      `;
    }

    const label = localize(ACTION_LABELS[this.action]);
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
