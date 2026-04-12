import { LitElement, html, css, nothing, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * Generic status badge (pill-shaped chip).
 * Renders a colored label with an optional leading icon.
 *
 * Usage:
 * ```html
 * <eq-badge-info .label=${'Heating'} .color=${'249,115,22'} .active=${true}></eq-badge-info>
 * <eq-badge-info .label=${'PID'} .color=${'59,130,246'}></eq-badge-info>
 * ```
 */
@customElement('eq-badge-info')
export class BadgeInfo extends LitElement {
  /** Display text */
  @property() label = '';
  /** RGB color string, e.g. '249,115,22' */
  @property() color = '158,158,158';
  /** Optional mdi: icon name shown before label */
  @property() icon?: string;
  /** Enables pulse animation on the icon */
  @property({ type: Boolean }) active = false;

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: inline-flex;
        align-items: center;
      }
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
      .icon {
        --mdc-icon-size: 14px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
      }
      .active .icon {
        animation: pulse 1.5s ease-in-out infinite;
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
    `;
  }

  render() {
    const badgeStyle = styleMap({
      'color': `rgb(${this.color})`,
      'background-color': `rgba(${this.color}, 0.15)`,
    });

    const icon = this.icon
      ? html`<ha-icon class="icon" icon=${this.icon}></ha-icon>`
      : nothing;

    return html`
      <span class=${classMap({ badge: true, active: this.active })} style=${badgeStyle}>
        ${icon}${this.label}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eq-badge-info': BadgeInfo;
  }
}
