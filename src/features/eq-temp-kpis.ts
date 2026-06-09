/**
 * eq-temp-kpis — self-contained KPI footer for equitherm cards.
 *
 * Renders a 3-column temperature display (outdoor, flow, room)
 * with optional adjusting-direction indicator on the flow column.
 *
 * Extracted from EquithermBaseCard to reduce base class size.
 */
import { LitElement, html, nothing, css, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HomeAssistant } from '../ha';
import type { HassEntity } from 'home-assistant-js-websocket';
import type { ClimateEntity } from '../ha/data/climate';
import type { EqTempKpisConfig } from './eq-feature-types';
import { formatNumber } from '../ha';
import { isImperial } from '../utils/temperature';
import { fireEvent } from '../ha/common/dom/fire_event';
import setupCustomlocalize from '../localize';

@customElement('eq-temp-kpis')
export class EqTempKpis extends LitElement {

  @property({ attribute: false }) hass!: HomeAssistant;

  @property({ attribute: false }) config!: EqTempKpisConfig;

  // ── Entity helpers ──

  private _entityState(entityId: string | undefined): HassEntity | undefined {
    if (!entityId || !this.hass) return undefined;
    return this.hass.states[entityId] as HassEntity | undefined;
  }

  private _entityExists(entityId: string | undefined): boolean {
    return !!this._entityState(entityId);
  }

  // ── Temperature formatting ──

  /** Format a temperature from an entity's state using HA's native formatter. */
  private _formatEntityTemp(entityId: string | undefined): string {
    const stateObj = this._entityState(entityId);
    if (!stateObj) return '—';
    return this.hass.formatEntityState(stateObj);
  }

  /** Format a computed temperature value (always in °C) for display. */
  private _formatCalcTemp(value: number | undefined | null): string {
    if (value == null || isNaN(value)) return '—';
    const imperial = isImperial(this.hass);
    const display = imperial ? value * 9 / 5 + 32 : value;
    const unit = this.hass?.config?.unit_system?.temperature ?? '°C';
    return `${formatNumber(display, this.hass?.locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} ${unit}`;
  }

  // ── More-info ──

  private _openMoreInfo(entityId: string | undefined): void {
    if (entityId && this.hass) {
      fireEvent(this, 'hass-more-info', { entityId });
    }
  }

  // ── Computed display values ──

  private get _outdoorTempFormatted(): string {
    return this._formatEntityTemp(this.config.outdoor_entity);
  }

  private get _flowTempFormatted(): string {
    return this._formatEntityTemp(this.config.flow_entity);
  }

  private get _roomTemp(): string {
    const climate = this._entityState(this.config.climate_entity) as ClimateEntity | undefined;
    const temp = climate?.attributes.current_temperature;
    return this._formatCalcTemp(temp);
  }

  // ── Main render ──

  render(): TemplateResult | typeof nothing {
    if (!this.config || !this.hass) return nothing;

    const localize = setupCustomlocalize(this.hass);
    const outdoorEntity = this.config.outdoor_click_entity ?? this.config.outdoor_entity;
    const outdoorMissing = !this._entityExists(outdoorEntity);
    const flowMissing = !this._entityExists(this.config.flow_entity);
    const climateMissing = !this._entityExists(this.config.climate_entity);

    return html`
      <div class="kpi-footer">
        <div class="kpi-block${outdoorMissing ? ' missing' : ''}" @click=${outdoorMissing ? undefined : () => this._openMoreInfo(outdoorEntity)}>
          <div class="kpi-value">${this._outdoorTempFormatted}</div>
          <div class="kpi-label">${localize('common.outdoor')}</div>
        </div>
        <div class="kpi-divider"></div>
        <div class="kpi-block${flowMissing ? ' missing' : ''}" @click=${flowMissing ? undefined : () => this._openMoreInfo(this.config.flow_entity)}>
          ${this.config.adjusting_dir && this.config.curve_output ? html`
            <div class="kpi-dual">
              <div class="kpi-value flow">${this._flowTempFormatted}</div>
              <div class="kpi-target">
                <ha-icon .icon=${this.config.adjusting_dir === 'rising' ? 'mdi:arrow-up-thin' : 'mdi:arrow-down-thin'}></ha-icon>
                ${this.config.curve_output}
              </div>
            </div>
          ` : html`<div class="kpi-value flow">${this._flowTempFormatted}</div>`}
          <div class="kpi-label">${localize('common.flow')}</div>
        </div>
        <div class="kpi-divider"></div>
        <div class="kpi-block${climateMissing ? ' missing' : ''}" @click=${climateMissing ? undefined : () => this._openMoreInfo(this.config.climate_entity)}>
          <div class="kpi-value">${this._roomTemp}</div>
          <div class="kpi-label">${localize('common.room')}</div>
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      .kpi-footer {
        display: grid;
        grid-template-columns: 1fr auto 1fr auto 1fr;
        align-items: center;
        gap: 8px;
        padding: 0 10px var(--eq-kpi-padding-bottom, 8px);
        flex-shrink: 0;
      }
      .kpi-block {
        text-align: center;
        cursor: pointer;
        padding: 4px;
        border-radius: 8px;
        transition: background 0.2s;
      }
      .kpi-block:hover { background: var(--secondary-background-color, rgba(0,0,0,0.04)); }
      .kpi-block.missing { opacity: 0.4; cursor: default; }
      .kpi-block.missing:hover { background: transparent; }
      .kpi-value {
        font-size: var(--eq-kpi-font-size, var(--ha-font-size-xl, 1.4rem));
        font-weight: 600;
        font-variant-numeric: tabular-nums;
        line-height: 1;
        color: var(--primary-text-color);
        white-space: nowrap;
      }
      .kpi-value.flow { color: var(--eq-flow-color); }
      .kpi-label {
        font-size: 0.68rem;
        font-weight: 500;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--secondary-text-color);
        margin-top: 4px;
        white-space: nowrap;
      }
      .kpi-divider { width: 1px; background: var(--divider-color, rgba(0,0,0,0.12)); height: 32px; }
      .kpi-dual { display: flex; flex-direction: column; align-items: center; gap: 2px; }
      .kpi-target {
        font-size: 0.75rem;
        color: var(--secondary-text-color);
        display: flex;
        align-items: center;
        gap: 2px;
      }
      .kpi-target ha-icon {
        --mdc-icon-size: 12px;
        color: var(--eq-flow-color);
      }
      @container (max-width: 260px) {
        .kpi-footer {
          grid-template-columns: 1fr;
          gap: 12px;
        }
        .kpi-footer .kpi-divider {
          display: none;
        }
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eq-temp-kpis': EqTempKpis;
  }
}
