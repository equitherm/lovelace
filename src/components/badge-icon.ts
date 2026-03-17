// src/components/badge-icon.ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Small icon badge for status indicators.
 * Positioned on top of shape-icon to show action status.
 * Colors are inherited from parent via CSS variables.
 */
@customElement('eq-badge-icon')
export class BadgeIcon extends LitElement {
  @property() icon: string = '';

  static styles = css`
    :host {
      --badge-size: 16px;
      --badge-icon-size: 10px;
      --badge-color: var(--primary-text-color);
      --badge-bg: var(--primary-background-color, #fff);
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--badge-size);
      height: var(--badge-size);
      border-radius: 50%;
      background: var(--badge-bg);
      line-height: 0;
    }
    ha-icon {
      --mdc-icon-size: var(--badge-icon-size);
      color: var(--badge-color);
    }
  `;

  render() {
    return html`<ha-icon .icon=${this.icon}></ha-icon>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eq-badge-icon': BadgeIcon;
  }
}
