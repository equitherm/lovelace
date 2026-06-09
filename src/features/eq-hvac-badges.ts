/**
 * eq-hvac-badges — self-contained badge row for equitherm cards.
 *
 * Renders PID, WWSD, Manual, HVAC action badges, plus optional
 * extra-badges and tune-button callback slots.
 *
 * Extracted from EquithermBaseCard to reduce base class size.
 */
import { LitElement, html, css, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HomeAssistant } from '../ha';
import type { HassEntity } from 'home-assistant-js-websocket';
import type { ClimateEntity } from '../ha/data/climate';
import type { EqHvacBadgesConfig } from './eq-feature-types';
import { normalizeHvacAction, getHvacBadgeProps } from '../utils/hvac-colors';
import {
  isRateLimitingActive,
  isPidActive,
  getAdjustingDirection,
  type ClimateHelperConfig,
} from '../utils/climate-helpers';
import { formatNumber } from '../ha';
import { isImperial, displayToCelsius } from '../utils/temperature';
import setupCustomlocalize from '../localize';
import '../shared/badge-info';

/** Callback type for rendering extra badges (card-level override hook). */
export type ExtraBadgesCallback = () => typeof nothing | TemplateResult;

/** Callback type for rendering the tune button (card-level override hook). */
export type TuneButtonCallback = () => typeof nothing | TemplateResult;

@customElement('eq-hvac-badges')
export class EqHvacBadges extends LitElement {

  @property({ attribute: false }) hass!: HomeAssistant;

  @property({ attribute: false }) config!: EqHvacBadgesConfig;

  /** Callback slot for card-specific extra badges. */
  @property({ attribute: false }) extraBadges?: ExtraBadgesCallback;

  /** Callback slot for the tune button. */
  @property({ attribute: false }) tuneButton?: TuneButtonCallback;

  // ── Entity helpers ──

  private _entityState(entityId: string | undefined): HassEntity | undefined {
    if (!entityId || !this.hass) return undefined;
    return this.hass.states[entityId] as HassEntity | undefined;
  }

  private get _climate(): ClimateEntity | undefined {
    return this._entityState(this.config.climate_entity) as ClimateEntity | undefined;
  }

  private get _isManualPreset(): boolean {
    return this._climate?.attributes.preset_mode === 'Manual';
  }

  // ── WWSD logic ──

  /** Whether Warm Weather Shutdown is active. */
  private get _isWWSD(): boolean {
    if (this.config?.wws_entity) {
      const s = this._entityState(this.config.wws_entity);
      return s?.state === 'on';
    }
    if (!this.config?.climate_entity) return false;
    const tTarget = this._climate?.attributes.temperature;
    if (tTarget == null) return false;
    if (!this.config.outdoor_entity) return false;
    const s = this._entityState(this.config.outdoor_entity);
    if (!s) return false;
    const imperial = isImperial(this.hass);
    const val = parseFloat(s.state);
    const tOutdoor = isNaN(val) ? NaN : displayToCelsius(val, imperial);
    return !isNaN(tOutdoor) && tOutdoor >= tTarget;
  }

  /** Formatted WWSD explanation with actual temperatures. */
  private _wwsdDescription(): string {
    const localize = setupCustomlocalize(this.hass);
    const tTarget = this._climate?.attributes.temperature;
    const outdoorEntity = this.config.outdoor_entity;
    const s = outdoorEntity ? this._entityState(outdoorEntity) : undefined;
    const imperial = isImperial(this.hass);
    const tOutdoor = s ? displayToCelsius(parseFloat(s.state), imperial) : NaN;
    if (!isNaN(tOutdoor) && tTarget != null) {
      const outdoorFormatted = this._formatEntityTemp(outdoorEntity);
      const targetFormatted = this._formatCalcTemp(tTarget);
      return `${localize('common.outdoor')} ${outdoorFormatted} ≥ ${targetFormatted}`;
    }
    return localize('common.wwsd_label');
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

  // ── Badge renderers (exact replicas from base-card.ts) ──

  /** Render PID status chip. */
  private _renderPidBadge(): ReturnType<typeof html> | typeof nothing {
    const cfg = this._climateHelperConfig;
    if (!cfg.pid_active_entity) return nothing;
    const lookup = (id: string) => this._entityState(id);
    const active = isPidActive(cfg, lookup);
    return html`
      <eq-badge-info
        .label=${'PID'}
        style=${`--badge-info-color: ${active ? 'var(--rgb-success)' : 'var(--rgb-disabled)'}`}
        .icon=${active ? undefined : 'mdi:alert-circle-outline'}
      ></eq-badge-info>
    `;
  }

  /** Render WWSD warning badge. */
  private _renderWwsdBadge(): ReturnType<typeof html> | typeof nothing {
    if (!this._isWWSD) return nothing;
    const localize = setupCustomlocalize(this.hass);
    return html`
      <eq-badge-info
        id="wwsd-badge"
        .label=${localize('common.wwsd')}
        style=${`--badge-info-color: var(--rgb-warning, 255, 167, 38)`}
        .icon=${'mdi:weather-sunny-alert'}
        .active=${true}
      ></eq-badge-info>
      <ha-tooltip for="wwsd-badge" placement="top" without-arrow>
        <span style="white-space: nowrap">${this._wwsdDescription()}</span>
      </ha-tooltip>
    `;
  }

  /** Render Manual preset badge when curve is bypassed. */
  private _renderManualBadge(): ReturnType<typeof html> | typeof nothing {
    if (!this._isManualPreset) return nothing;
    const localize = setupCustomlocalize(this.hass);
    return html`
      <eq-badge-info
        .label=${localize('common.manual')}
        style=${`--badge-info-color: var(--rgb-warning, 255, 167, 38)`}
        .icon=${'mdi:hand-back-right'}
      ></eq-badge-info>
    `;
  }

  /** Render HVAC action badge with optional rate-limiting indicator. */
  private _renderHvacBadge(): ReturnType<typeof html> {
    const localize = setupCustomlocalize(this.hass);
    const rawAction = this._climate?.attributes.hvac_action ?? 'off';
    const hvacAction = normalizeHvacAction(rawAction);
    const lookup = (id: string) => this._entityState(id);
    const cfg = this._climateHelperConfig;
    const badge = getHvacBadgeProps(
      localize, hvacAction,
      isRateLimitingActive(cfg, lookup),
      getAdjustingDirection(cfg, lookup),
    );
    return html`
      <eq-badge-info
        .label=${badge.label}
        style=${`--badge-info-color: ${badge.color}`}
        .icon=${badge.icon}
        .active=${badge.active}
      ></eq-badge-info>
    `;
  }

  // ── ClimateHelperConfig adapter ──

  /** Build a ClimateHelperConfig from the feature's config. */
  private get _climateHelperConfig(): ClimateHelperConfig {
    return {
      rate_limiting_entity: this.config.rate_limiting_entity,
      pid_active_entity: this.config.pid_active_entity,
      pid_output_entity: this.config.pid_output_entity,
      curve_output_entity: this.config.curve_output_entity,
      flow_entity: this.config.flow_entity ?? '',
    };
  }

  // ── Styles ──

  static get styles() {
    return css`
      :host { display: block; }
      .badges {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-shrink: 0;
      }
    `;
  }

  // ── Main render ──

  render(): ReturnType<typeof html> {
    const manual = this._isManualPreset;
    return html`
      <div class="badges">
        ${manual ? nothing : this._renderPidBadge()}
        ${manual ? nothing : this._renderWwsdBadge()}
        ${this._renderManualBadge()}
        ${this.extraBadges?.() ?? nothing}
        ${this._renderHvacBadge()}
        ${this.tuneButton?.() ?? nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eq-hvac-badges': EqHvacBadges;
  }
}
