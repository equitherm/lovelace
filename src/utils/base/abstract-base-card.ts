import { html, nothing } from 'lit';
import { state } from 'lit/decorators.js';
import type { HassEntity } from 'home-assistant-js-websocket';
import type { LovelaceCard, LovelaceGridOptions } from '../../ha/panels/lovelace/types';
import { formatNumber } from '../../ha';
import { EquithermBaseElement } from './base-element';
import { executeAction } from '../actions';

export abstract class BaseCard<TConfig extends Record<string, unknown>>
  extends EquithermBaseElement implements LovelaceCard {

  @state() protected _config!: TConfig;

  abstract setConfig(config: unknown): void;

  protected _entityState(entityId: string | undefined): HassEntity | undefined {
    if (!entityId || !this.hass) return undefined;
    return this.hass.states[entityId] as HassEntity | undefined;
  }

  protected _entityAttr<T = unknown>(entityId: string | undefined, key: string): T | undefined {
    return this._entityState(entityId)?.attributes?.[key] as T | undefined;
  }

  protected _resolveEntityNumber(entityId: string | undefined, fallback: number): number {
    const s = this._entityState(entityId);
    if (!s) return fallback;
    const val = parseFloat(s.state);
    return isNaN(val) ? fallback : val;
  }

  /** Resolve an entity's numeric state, converting from display unit to °C. */
  protected _resolveEntityTemp(entityId: string | undefined, fallback: number): number {
    const s = this._entityState(entityId);
    if (!s) return fallback;
    const val = parseFloat(s.state);
    return isNaN(val) ? fallback : this._fromDisplayTemp(val);
  }

  protected _entityExists(entityId: string | undefined): boolean {
    return !!this._entityState(entityId);
  }

  /** Format a temperature from an entity's state using HA's native formatter. */
  protected _formatEntityTemp(entityId: string | undefined): string {
    const stateObj = this._entityState(entityId);
    if (!stateObj) return '—';
    return this.hass!.formatEntityState(stateObj);
  }

  /** Format a computed temperature value (always °C) for display. Converts to the user's unit via _toDisplayTemp. */
  protected _formatCalcTemp(value: number | undefined | null): string {
    if (value == null || isNaN(value)) return '—';
    const display = this._toDisplayTemp(value);
    const unit = this.hass?.config?.unit_system?.temperature ?? '°C';
    return `${formatNumber(display, this.hass?.locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} ${unit}`;
  }

  protected _openMoreInfo(entityId: string | undefined): void {
    if (entityId && this.hass) {
      executeAction(this, this.hass, { action: 'more-info' }, entityId);
    }
  }

  protected _renderLastUpdated(entityId: string | undefined): typeof nothing | ReturnType<typeof html> {
    if (!entityId || !this.hass) return nothing;
    const state = this._entityState(entityId);
    if (!state) return nothing;
    return html`
      <span class="last-updated">
        <ha-relative-time .hass=${this.hass} .datetime=${state.last_updated} capitalize></ha-relative-time>
      </span>
    `;
  }

  public getGridOptions(): LovelaceGridOptions {
    return { columns: 6, rows: 2, min_rows: 1 };
  }

  getCardSize(): number {
    return 2;
  }
}
