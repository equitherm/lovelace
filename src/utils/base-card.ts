import { LitElement } from 'lit';
import { html, nothing } from 'lit';
import { state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceGridOptions, HassEntity, ActionConfig } from '../types';
import { entitiesChanged } from './hass';
import { applyDarkMode } from '../styles/tokens';
import { executeAction, hasAction } from './actions';
import { localize } from '../localize';

/**
 * Base class for equitherm cards.
 * Provides shared hass setter with change detection, entity access, and formatting.
 */
export abstract class EquithermBaseCard<TConfig> extends LitElement {
  @state() protected _hass?: HomeAssistant;
  @state() protected _config!: TConfig;

  get hass() { return this._hass!; }

  set hass(hass: HomeAssistant) {
    // Apply dark mode based on HA theme
    applyDarkMode(this, hass);

    // Only trigger re-render when watched entities change
    if (entitiesChanged(this._hass, hass, this._watchedEntities())) {
      this._hass = hass;
      this._onHassUpdate();
    }
  }

  /** Entities to watch for changes. Override in subclass. */
  protected _watchedEntities(): (string | undefined)[] {
    return [];
  }

  /** Called after hass updates (entity states changed). Override in subclass. */
  protected _onHassUpdate(): void {
    // Default: no-op
  }

  /** Safely access entity state by ID */
  protected _entityState(entityId: string | undefined): HassEntity | undefined {
    if (!entityId || !this._hass) return undefined;
    return this._hass.states[entityId] as HassEntity | undefined;
  }

  /** Get entity attribute value (typed) */
  protected _entityAttr<T = unknown>(entityId: string | undefined, key: string): T | undefined {
    return this._entityState(entityId)?.attributes?.[key] as T | undefined;
  }

  /** Format a temperature value using HA's unit system */
  protected _formatTemp(value: number | undefined | null, entityUnit?: string): string {
    if (value == null || isNaN(value)) return '—';

    const haUnit = this._hass?.config?.unit_system?.temperature ?? '°C';
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
    if (!this._hass) return;
    executeAction(this, this._hass, action, entityId);
  }

  /** Open more-info panel for an entity */
  protected _openMoreInfo(entityId: string | undefined): void {
    if (entityId && this._hass) {
      executeAction(this, this._hass, { action: 'more-info' }, entityId);
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
