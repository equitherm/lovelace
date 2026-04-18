import { html, nothing } from 'lit';
import { state } from 'lit/decorators.js';
import type { HassEntity } from 'home-assistant-js-websocket';
import type { LovelaceGridOptions, LovelaceCard } from '../../ha/panels/lovelace/types';
import type { ClimateEntity } from '../../ha/data/climate';
import { EquithermBaseElement } from './base-element';
import { executeAction } from '../actions';
import setupCustomlocalize from '../../localize';

/** Minimum config fields shared by all equitherm cards */
export interface EquithermCardConfig {
  climate_entity: string;
  flow_entity?: string;
  [key: string]: unknown;
}

/**
 * Base class for equitherm cards.
 * Extends EquithermBaseElement with card-specific helpers.
 */
export abstract class EquithermBaseCard<TConfig extends EquithermCardConfig> extends EquithermBaseElement implements LovelaceCard {
  @state() protected _config!: TConfig;

  abstract setConfig(config: unknown): void;

  /** Get the climate entity state */
  protected get _climate(): ClimateEntity | undefined {
    return this._entityState(this._config.climate_entity) as ClimateEntity | undefined;
  }

  /** Read a number from an entity state, falling back to a config default */
  protected _resolveEntityNumber(entityId: string | undefined, fallback: number): number {
    const s = this._entityState(entityId);
    if (!s) return fallback;
    const val = parseFloat(s.state);
    return isNaN(val) ? fallback : val;
  }

  /** Formatted room temperature from climate entity */
  protected get _roomTemp(): string {
    const temp = this._climate?.attributes.current_temperature;
    return this._formatTemp(temp, this.hass?.config?.unit_system?.temperature);
  }

  /** Get entity state by ID */
  protected _entityState(entityId: string | undefined): HassEntity | undefined {
    if (!entityId || !this.hass) return undefined;
    return this.hass.states[entityId] as HassEntity | undefined;
  }

  /** Get entity attribute value (typed) */
  protected _entityAttr<T = unknown>(entityId: string | undefined, key: string): T | undefined {
    return this._entityState(entityId)?.attributes?.[key] as T | undefined;
  }

  /** Format a temperature value using HA's unit system */
  protected _formatTemp(value: number | undefined | null, entityUnit?: string): string {
    if (value == null || isNaN(value)) return '—';

    const haUnit = this.hass?.config?.unit_system?.temperature ?? '°C';
    const sourceUnit = entityUnit ?? '°C';

    let displayValue = value;

    if (sourceUnit === '°C' && haUnit === '°F') {
      displayValue = value * 9 / 5 + 32;
    } else if (sourceUnit === '°F' && haUnit === '°C') {
      displayValue = (value - 32) * 5 / 9;
    }

    const locale = this.hass?.locale?.language;
    const formatted = locale
      ? displayValue.toLocaleString(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 })
      : displayValue.toFixed(1);

    return `${formatted}${haUnit}`;
  }

  /** Open more-info panel for an entity */
  protected _openMoreInfo(entityId: string | undefined): void {
    if (entityId && this.hass) {
      executeAction(this, this.hass, { action: 'more-info' }, entityId);
    }
  }

  // === Entity Helpers ===

  /** Check if an entity exists */
  protected _entityExists(entityId: string | undefined): boolean {
    return !!this._entityState(entityId);
  }

  /** Whether outdoor temperature meets or exceeds room setpoint (Warm Weather Shutdown) */
  protected get _isWWSD(): boolean {
    if (!this._config?.climate_entity) return false;
    const tTarget = this._climate?.attributes.temperature;
    if (tTarget == null) return false;
    const outdoorEntity = (this._config as Record<string, unknown>).outdoor_entity as string | undefined;
    if (!outdoorEntity) return false;
    const s = this._entityState(outdoorEntity);
    if (!s) return false;
    const tOutdoor = parseFloat(s.state);
    return !isNaN(tOutdoor) && tOutdoor >= tTarget;
  }

  /** Formatted WWSD explanation with actual temperatures, e.g. "Outdoor 22.0°C ≥ 21.0°C" */
  protected _wwsdDescription(): string {
    const localize = setupCustomlocalize(this.hass);
    const tTarget = this._climate?.attributes.temperature;
    const outdoorEntity = (this._config as Record<string, unknown>).outdoor_entity as string | undefined;
    const s = outdoorEntity ? this._entityState(outdoorEntity) : undefined;
    const tOutdoor = s ? parseFloat(s.state) : NaN;
    if (!isNaN(tOutdoor) && tTarget != null) {
      return `${localize('common.outdoor')} ${this._formatTemp(tOutdoor)} ≥ ${this._formatTemp(tTarget)}`;
    }
    return localize('common.wwsd_label');
  }

  // === Render Helpers ===

  /** Render a relative timestamp for an entity's last update */
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

  /** Render a not-found state for missing entity */
  protected _renderNotFound(entityId: string | undefined, label?: string): typeof nothing | ReturnType<typeof html> {
    if (!entityId || this._entityExists(entityId)) return nothing;

    const localize = setupCustomlocalize(this.hass);
    const display = label ?? entityId;
    return html`
      <div class="not-found">
        <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
        <span>${localize('common.not_found', { entity: display })}</span>
      </div>
    `;
  }

  /** Default grid options. Override in subclass. */
  public getGridOptions(): LovelaceGridOptions {
    return { columns: 6, rows: 2, min_rows: 1 };
  }

  getCardSize(): number {
    return 2;
  }
}
