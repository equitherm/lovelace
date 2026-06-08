import { LitElement, html, css, nothing, type CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HomeAssistant } from '../ha';
import type { BinarySegment } from './eq-binary-timeline';
import './eq-binary-timeline';

export interface KpiItem {
  value: string;
  label: string;
}

/**
 * Reusable timeline section with an optional KPI footer.
 * Wraps eq-binary-timeline with a label and inline KPI stats.
 *
 * Usage:
 * ```html
 * <ot-timeline-section
 *   .hass=${hass}
 *   .label=${'FLAME'}
 *   .segments=${segments}
 *   .startTime=${startTime}
 *   .endTime=${endTime}
 *   .kpis=${[{ value: '4', label: 'cycles/h' }]}
 * ></ot-timeline-section>
 * ```
 */
@customElement('ot-timeline-section')
export class OtTimelineSection extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property() public label = '';
  @property({ attribute: false }) public segments: BinarySegment[] = [];
  @property({ attribute: false }) public startTime = 0;
  @property({ attribute: false }) public endTime = 0;
  @property({ attribute: false }) public kpis: KpiItem[] = [];

  static get styles(): CSSResultGroup {
    return css`
      :host { display: block; }
      .timeline-section {
        padding: 6px 12px 0;
        border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.08));
        margin-top: 2px;
      }
      .timeline-label {
        font-size: var(--ha-font-size-xs, 0.75rem);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--secondary-text-color);
        margin-bottom: 4px;
        opacity: 0.7;
      }
      .kpi-inline {
        display: flex;
        justify-content: center;
        gap: 6px;
        padding: 4px 0 8px;
        font-size: var(--ha-font-size-xs, 0.75rem);
        color: var(--secondary-text-color);
        font-variant-numeric: tabular-nums;
      }
      .kpi-sep { opacity: 0.4; }
    `;
  }

  protected render() {
    return html`
      <div class="timeline-section">
        <div class="timeline-label">${this.label}</div>
        <eq-binary-timeline
          .hass=${this.hass}
          .segments=${this.segments}
          .startTime=${this.startTime}
          .endTime=${this.endTime}
        ></eq-binary-timeline>
        ${this.kpis.length > 0
          ? html`
            <div class="kpi-inline">
              ${this.kpis.map((kpi, i) => html`
                ${i > 0 ? html`<span class="kpi-sep">&middot;</span>` : nothing}
                <span>${kpi.value} ${kpi.label}</span>
              `)}
            </div>
          `
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ot-timeline-section': OtTimelineSection;
  }
}
