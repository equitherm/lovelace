import { html, nothing } from 'lit';
import { state } from 'lit/decorators.js';
import type { HassEntity } from 'home-assistant-js-websocket';
import type { ActionConfig } from '../../ha/data/lovelace';
import type { LovelaceGridOptions, LovelaceCard } from '../../ha/panels/lovelace/types';
import type { ClimateEntity } from '../../ha/data/climate';
import { EquithermBaseElement } from './base-element';
import { executeAction, hasAction } from '../actions';
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

    return `${displayValue.toFixed(1)}${haUnit}`;
  }

  // === Action Handling ===

  /** Check if an action is configured */
  protected _hasAction = hasAction;

  /** Execute an action on an entity */
  protected _handleAction(action: ActionConfig | undefined, entityId?: string): void {
    if (!this.hass) return;
    executeAction(this, this.hass, action, entityId);
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

  // === Render Helpers ===

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
