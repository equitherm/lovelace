import { LitElement, html, css } from 'lit';
import setupCustomlocalize from '../localize';
import { customElement, property } from 'lit/decorators.js';
import type { HvacAction } from '../ha/data/climate';

@customElement('eq-action-badge')
export class ActionBadge extends LitElement {
  @property() action: HvacAction = 'idle';

  static styles = css`
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
    }
    .dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
    }
    .badge.heating {
      background: var(--eq-badge-heating-bg, #f97316);
      color: var(--eq-badge-heating-color, #fff);
    }
    .badge.heating .dot {
      background: #fff;
      box-shadow: 0 0 6px rgba(255,255,255,0.8);
      animation: pulse 1.5s ease-in-out infinite;
    }
    .badge.cooling {
      background: var(--eq-badge-cooling-bg, #3b82f6);
      color: var(--eq-badge-cooling-color, #fff);
    }
    .badge.cooling .dot {
      background: #fff;
      box-shadow: 0 0 6px rgba(255,255,255,0.8);
      animation: pulse 1.5s ease-in-out infinite;
    }
    .badge.drying {
      background: var(--eq-badge-drying-bg, #4caf50);
      color: var(--eq-badge-drying-color, #fff);
    }
    .badge.drying .dot {
      background: #fff;
      box-shadow: 0 0 6px rgba(255,255,255,0.8);
      animation: pulse 1.5s ease-in-out infinite;
    }
    .badge.idle, .badge.off {
      background: var(--eq-badge-idle-bg, #e5e5e5);
      color: var(--eq-badge-idle-color, #666);
    }
    .badge.idle .dot, .badge.off .dot {
      background: currentColor;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
  `;

  render() {
    const localize = setupCustomlocalize();
    let label: string;
    switch (this.action) {
      case 'heating':
        label = localize('common.heating');
        break;
      case 'cooling':
        label = localize('common.cooling');
        break;
      case 'drying':
        label = localize('common.drying');
        break;
      case 'idle':
        label = localize('common.idle');
        break;
      case 'off':
      default:
        label = localize('common.off');
        break;
    }
    return html`
      <span class="badge ${this.action}">
        <span class="dot"></span>
        ${label}
      </span>
    `;
  }
}
