import { LitElement, html, css } from 'lit';
import { localize } from '../localize';
import { customElement, property } from 'lit/decorators.js';
import type { HvacAction } from '../types';

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
    .badge.idle {
      background: var(--eq-badge-idle-bg, #e5e5e5);
      color: var(--eq-badge-idle-color, #666);
    }
    .badge.idle .dot { background: currentColor; }
    .badge.off {
      background: var(--eq-badge-idle-bg, #e5e5e5);
      color: var(--eq-badge-idle-color, #666);
    }
    .badge.off .dot { background: currentColor; }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
  `;

  render() {
    const label = this.action === 'heating' ? localize('common.heating')
      : this.action === 'idle' ? localize('common.idle')
      : localize('common.off');
    return html`
      <span class="badge ${this.action}">
        <span class="dot"></span>
        ${label}
      </span>
    `;
  }
}
