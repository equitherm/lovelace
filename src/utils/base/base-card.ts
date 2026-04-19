import { html, css, nothing } from 'lit';
import { state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { HassEntity } from 'home-assistant-js-websocket';
import type { LovelaceGridOptions, LovelaceCard } from '../../ha/panels/lovelace/types';
import type { ClimateEntity } from '../../ha/data/climate';
import { EquithermBaseElement } from './base-element';
import { executeAction } from '../actions';
import { normalizeHvacAction, getHvacActionColor, getHvacBadgeProps } from '../hvac-colors';
import { isRateLimitingActive, isPidActive, getAdjustingDirection, type ClimateHelperConfig } from '../climate-helpers';
import setupCustomlocalize from '../../localize';

/** Minimum config fields shared by all equitherm cards */
export interface EquithermCardConfig {
  climate_entity: string;
  flow_entity?: string;
  [key: string]: unknown;
}

/** Shared CSS for card headers (used by all equitherm cards) */
export const headerStyles = css`
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    gap: 12px;
    flex-shrink: 0;
  }
  ha-tile-icon {
    cursor: pointer;
    flex-shrink: 0;
  }
  .header-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .title {
    font-size: var(--ha-font-size-m, 1rem);
    font-weight: 600;
    color: var(--primary-text-color);
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .state {
    font-size: var(--ha-font-size-s, 12px);
    font-weight: var(--ha-font-weight-normal, 400);
    line-height: var(--ha-line-height-condensed, 1.2);
    letter-spacing: 0.4px;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .badges {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }
`;

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

  // === Shared Header ===

  /** Override to inject extra badges into the header. */
  protected _renderExtraBadges(): typeof nothing {
    return nothing;
  }

  /** Shared header renderer for all equitherm cards. */
  protected _renderHeader(opts: { iconName: string; clickEntity: string; title: string }): ReturnType<typeof html> | typeof nothing {
    if (!this._config || !this.hass) return nothing;

    const localize = setupCustomlocalize(this.hass);
    const rawAction = this._climate?.attributes.hvac_action ?? 'off';
    const hvacAction = normalizeHvacAction(rawAction);

    const color = getHvacActionColor(hvacAction);
    const iconStyles = styleMap({
      '--tile-icon-color': `rgb(${color})`,
      '--tile-icon-size': '42px',
    });

    const lookup = (id: string) => this._entityState(id)!;
    const cfg = this._config as unknown as ClimateHelperConfig;
    const pidActive = isPidActive(cfg, lookup);
    const pidChip = cfg.pid_active_entity
      ? html`<eq-badge-info
          .label=${'PID'}
          style=${`--badge-info-color: ${pidActive ? 'var(--rgb-success)' : 'var(--rgb-disabled)'}`}
          .icon=${pidActive ? undefined : 'mdi:alert-circle-outline'}
        ></eq-badge-info>`
      : nothing;

    const wwsdBadge = this._isWWSD ? html`
      <eq-badge-info
        id="wwsd-badge"
        .label=${localize('common.wwsd')}
        style=${`--badge-info-color: var(--rgb-warning, 255, 167, 38)`}
        .icon=${'mdi:weather-sunny-alert'}
        .active=${true}
      ></eq-badge-info>
      <ha-tooltip for="wwsd-badge" placement="top"><span style="white-space: nowrap">${this._wwsdDescription()}</span></ha-tooltip>
    ` : nothing;

    const rateLimiting = isRateLimitingActive(cfg, lookup);
    const adjustingDir = getAdjustingDirection(cfg, lookup);
    const hvacBadge = getHvacBadgeProps(localize, hvacAction, rateLimiting, adjustingDir);

    const stateLine = this._climate?.attributes.temperature != null
      ? html`<span class="state">· ${this._formatTemp(this._climate.attributes.temperature, this.hass?.config?.unit_system?.temperature)}</span>`
      : nothing;

    return html`
      <div class="header">
        <ha-tile-icon
          .interactive=${true}
          style=${iconStyles}
          @click=${() => this._openMoreInfo(opts.clickEntity)}
        >
          <ha-icon slot="icon" .icon=${opts.iconName}></ha-icon>
        </ha-tile-icon>
        <div class="header-info">
          <span class="title">${opts.title}</span>
          ${stateLine}
        </div>
        <div class="badges">
          ${pidChip}
          ${wwsdBadge}
          ${this._renderExtraBadges()}
          <eq-badge-info
            .label=${hvacBadge.label}
            style=${`--badge-info-color: ${hvacBadge.color}`}
            .icon=${hvacBadge.icon}
            .active=${hvacBadge.active}
          ></eq-badge-info>
        </div>
      </div>
    `;
  }
}
