import { html, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
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

  /** Override to control footer visibility. Defaults to checking config.show_last_updated. */
  protected _showFooterMeta(): boolean {
    return !!(this._config as Record<string, unknown>)?.show_last_updated;
  }

  /** Override to specify which entity's freshness the footer should track. */
  protected _lastUpdatedEntity(): string | undefined {
    return undefined;
  }

  /** Whether the tracked entity is stale (>5 min) or unavailable. */
  protected _isFooterVisible(): boolean {
    const entityId = this._lastUpdatedEntity();
    const state = this._entityState(entityId);
    if (!entityId || !state || !this.hass) return false;

    const isUnavailable = state.state === 'unavailable' || state.state === 'unknown';
    const age = Date.now() - new Date(state.last_updated).getTime();
    return isUnavailable || age > 5 * 60 * 1000;
  }

  /** Render the footer meta line — only visible when entity is stale (>5 min) or unavailable. */
  protected _renderFooterMeta(): typeof nothing | ReturnType<typeof html> {
    if (!this._showFooterMeta() || !this._isFooterVisible()) return nothing;

    const state = this._entityState(this._lastUpdatedEntity())!;
    const isUnavailable = state.state === 'unavailable' || state.state === 'unknown';

    return html`
      <div class="footer-meta${isUnavailable ? ' footer-meta--warn' : ''}">
        <ha-relative-time .hass=${this.hass} .datetime=${state.last_updated} capitalize></ha-relative-time>
      </div>
    `;
  }

  // === Shared Header ===

  /** Hook to customize header icon color. Return a CSS rgb() value or var() reference. */
  protected _headerIconColor(): string {
    return 'var(--rgb-disabled, 158,158,158)';
  }

  /** Render the header icon tile with customizable color via _headerIconColor(). */
  protected _renderHeaderIcon(iconName: string, clickEntity: string): ReturnType<typeof html> {
    return html`
      <ha-tile-icon
        .interactive=${true}
        style=${styleMap({ '--tile-icon-color': `rgb(${this._headerIconColor()})`, '--tile-icon-size': '42px' })}
        @click=${() => this._openMoreInfo(clickEntity)}
      >
        <ha-icon slot="icon" .icon=${iconName}></ha-icon>
      </ha-tile-icon>
    `;
  }

  /** Render the title and optional subtitle. */
  protected _renderHeaderInfo(title: string, subtitle?: string | typeof nothing): ReturnType<typeof html> {
    const stateLine = subtitle !== undefined && subtitle !== nothing
      ? html`<span class="state">${subtitle}</span>` : nothing;
    return html`
      <div class="header-info">
        <span class="title">${title}</span>
        ${stateLine}
      </div>
    `;
  }

  /** Override to add badges to the header. */
  protected _renderHeaderBadges(): ReturnType<typeof html> | typeof nothing {
    return nothing;
  }

  /** Shared header renderer for all cards. */
  protected _renderHeader(opts: {
    iconName: string;
    clickEntity: string;
    title: string;
    subtitle?: string | typeof nothing;
  }): ReturnType<typeof html> | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    return html`
      <div class="header">
        ${this._renderHeaderIcon(opts.iconName, opts.clickEntity)}
        ${this._renderHeaderInfo(opts.title, opts.subtitle)}
        ${this._renderHeaderBadges()}
      </div>
    `;
  }

  public getGridOptions(): LovelaceGridOptions {
    return { columns: 6, rows: 2, min_rows: 1 };
  }

  getCardSize(): number {
    return 2;
  }
}
