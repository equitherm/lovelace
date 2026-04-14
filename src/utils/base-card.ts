import { html, nothing } from 'lit';
import { state } from 'lit/decorators.js';
import type { HassEntity } from 'home-assistant-js-websocket';
import type { ActionConfig } from '../ha/data/lovelace';
import type { LovelaceGridOptions } from '../ha/panels/lovelace/types';
import { EquithermBaseElement } from './base-element';
import { executeAction, hasAction } from './actions';
import setupCustomlocalize from '../localize';

/**
 * Base class for equitherm cards.
 * Extends EquithermBaseElement with card-specific helpers.
 */
export abstract class EquithermBaseCard<TConfig> extends EquithermBaseElement {
  @state() protected _config!: TConfig;

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
