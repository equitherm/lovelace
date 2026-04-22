import { html, nothing, PropertyValues, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import type { LovelaceCard } from '../../ha/panels/lovelace/types';
import type { ClimateEntity } from '../../ha/data/climate';
import { formatNumber } from '../../ha';
import { BaseCard } from './abstract-base-card';
import { normalizeHvacAction, getHvacActionColor, getHvacBadgeProps } from '../hvac-colors';
import { isRateLimitingActive, isPidActive, getAdjustingDirection, getRateTargetEntity, type ClimateHelperConfig } from '../climate-helpers';
import setupCustomlocalize from '../../localize';
import '../../shared/eq-param-bar';
import { headerStyles } from './header-styles';

export { headerStyles };

/** Minimum config fields shared by all equitherm cards */
export interface EquithermCardConfig {
  climate_entity?: string;
  flow_entity?: string;
  outdoor_entity?: string;
  show_kpi_footer?: boolean;
  show_params_footer?: boolean;
  [key: string]: unknown;
}

/**
 * Base class for equitherm cards.
 * Extends BaseCard with equitherm-specific helpers.
 */
export abstract class EquithermBaseCard<TConfig extends EquithermCardConfig> extends BaseCard<TConfig> implements LovelaceCard {

  @state() protected _showTuningDialog = false;

  /** Get the climate entity state */
  protected get _climate(): ClimateEntity | undefined {
    return this._entityState(this._config.climate_entity) as ClimateEntity | undefined;
  }

  /** Whether climate preset_mode is "Manual" (curve bypassed) */
  protected get _isManualPreset(): boolean {
    return this._climate?.attributes.preset_mode === 'Manual';
  }

  protected override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('hass') && this.hass) {
      this.toggleAttribute('manual-override', this._isManualPreset);
    }
  }

  /** Formatted room temperature from climate entity */
  protected get _roomTemp(): string {
    const temp = this._climate?.attributes.current_temperature;
    return this._formatCalcTemp(temp);
  }

  /** Formatted outdoor temperature from outdoor_entity */
  protected get _outdoorTempFormatted(): string {
    return this._formatEntityTemp(this._config.outdoor_entity);
  }

  /** Formatted flow temperature from flow_entity */
  protected get _flowTempFormatted(): string {
    return this._formatEntityTemp(this._config.flow_entity);
  }

  /** Formatted curve output temp from rate target entity (for adjusting indicator) */
  protected get _curveOutputTempFormatted(): string {
    const entity = getRateTargetEntity(this._config as unknown as ClimateHelperConfig);
    if (!entity) return '';
    return this._formatEntityTemp(entity);
  }

  /** Whether outdoor temperature meets or exceeds room setpoint (Warm Weather Shutdown) */
  protected get _isWWSD(): boolean {
    if (!this._config?.climate_entity) return false;
    const tTarget = this._climate?.attributes.temperature;
    if (tTarget == null) return false;
    if (!this._config.outdoor_entity) return false;
    const s = this._entityState(this._config.outdoor_entity);
    if (!s) return false;
    const val = parseFloat(s.state);
    const tOutdoor = isNaN(val) ? NaN : this._fromDisplayTemp(val);
    return !isNaN(tOutdoor) && tOutdoor >= tTarget;
  }

  /** Formatted WWSD explanation with actual temperatures, e.g. "Outdoor 22.0°C ≥ 21.0°C" */
  protected _wwsdDescription(): string {
    const localize = setupCustomlocalize(this.hass);
    const tTarget = this._climate?.attributes.temperature;
    const outdoorEntity = this._config.outdoor_entity;
    const s = outdoorEntity ? this._entityState(outdoorEntity) : undefined;
    const tOutdoor = s ? this._fromDisplayTemp(parseFloat(s.state)) : NaN;
    if (!isNaN(tOutdoor) && tTarget != null) {
      return `${localize('common.outdoor')} ${this._formatEntityTemp(outdoorEntity)} ≥ ${this._formatCalcTemp(tTarget)}`;
    }
    return localize('common.wwsd_label');
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

  // === Header ===

  /** HVAC action color for header icon. */
  protected override _headerIconColor(): string {
    const rawAction = this._climate?.attributes.hvac_action ?? 'off';
    return getHvacActionColor(normalizeHvacAction(rawAction));
  }

  /** Render the title and optional climate target temp state line. */
  protected override _renderHeaderInfo(title: string, subtitle?: string | typeof nothing): ReturnType<typeof html> {
    const stateLine = subtitle !== undefined
      ? (subtitle === nothing ? nothing : html`<span class="state">${subtitle}</span>`)
      : (this._climate?.attributes.temperature != null
          ? html`<span class="state">· ${this._formatCalcTemp(this._climate!.attributes.temperature)}</span>`
          : nothing);
    return html`
      <div class="header-info">
        <span class="title">${title}</span>
        ${stateLine}
      </div>
    `;
  }

  /** Render PID status chip. */
  protected _renderPidBadge(): ReturnType<typeof html> | typeof nothing {
    const cfg = this._config as unknown as ClimateHelperConfig;
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
  protected _renderWwsdBadge(): ReturnType<typeof html> | typeof nothing {
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
      <ha-tooltip for="wwsd-badge" placement="top"><span style="white-space: nowrap">${this._wwsdDescription()}</span></ha-tooltip>
    `;
  }

  /** Render Manual preset badge when curve is bypassed. */
  protected _renderManualBadge(): ReturnType<typeof html> | typeof nothing {
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
  protected _renderHvacBadge(): ReturnType<typeof html> {
    const localize = setupCustomlocalize(this.hass);
    const rawAction = this._climate?.attributes.hvac_action ?? 'off';
    const hvacAction = normalizeHvacAction(rawAction);
    const lookup = (id: string) => this._entityState(id);
    const cfg = this._config as unknown as ClimateHelperConfig;
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

  /** Override to inject extra badges into the header. */
  protected _renderExtraBadges(): typeof nothing {
    return nothing;
  }

  /** Render the tune button when tunable mode is active. */
  protected _renderTuneButton(): typeof nothing | ReturnType<typeof html> {
    if (!this._config.tunable) return nothing;
    return html`
      <ha-icon-button
        @click=${this._openTuningDialog}
        style="--mdc-icon-button-size: 28px; --mdc-icon-size: 16px; color: var(--secondary-text-color)"
      ><ha-icon icon="mdi:tune-variant"></ha-icon></ha-icon-button>
    `;
  }

  private _openTuningDialog = (): void => {
    this._showTuningDialog = true;
  };

  /** Render the full badges row. */
  protected override _renderHeaderBadges(): ReturnType<typeof html> {
    const manual = this._isManualPreset;
    return html`
      <div class="badges">
        ${manual ? nothing : this._renderPidBadge()}
        ${manual ? nothing : this._renderWwsdBadge()}
        ${this._renderManualBadge()}
        ${this._renderExtraBadges()}
        ${this._renderHvacBadge()}
        ${this._renderTuneButton()}
      </div>
    `;
  }

  // ── KPI footer (shared) ──

  protected _renderKpiFooter(opts?: {
    adjustingDir?: string;
    curveOutput?: string;
    outdoorClickEntity?: string;
  }): TemplateResult | typeof nothing {
    if (this._config.show_kpi_footer === false) return nothing;
    if (!this._config || !this.hass) return nothing;
    const localize = setupCustomlocalize(this.hass);
    const outdoorEntity = opts?.outdoorClickEntity ?? this._config.outdoor_entity;
    const outdoorMissing = !this._entityExists(outdoorEntity);
    const flowMissing = !this._entityExists(this._config.flow_entity);
    const climateMissing = !this._entityExists(this._config.climate_entity);
    return html`
      <div class="kpi-footer">
        <div class="kpi-block${outdoorMissing ? ' missing' : ''}" @click=${outdoorMissing ? undefined : () => this._openMoreInfo(outdoorEntity)}>
          <div class="kpi-value">${this._outdoorTempFormatted}</div>
          <div class="kpi-label">${localize('common.outdoor')}</div>
        </div>
        <div class="kpi-divider"></div>
        <div class="kpi-block${flowMissing ? ' missing' : ''}" @click=${flowMissing ? undefined : () => this._openMoreInfo(this._config.flow_entity)}>
          ${opts?.adjustingDir && opts?.curveOutput ? html`
            <div class="kpi-dual">
              <div class="kpi-value flow">${this._flowTempFormatted}</div>
              <div class="kpi-target">
                <ha-icon .icon=${opts.adjustingDir === 'rising' ? 'mdi:arrow-up-thin' : 'mdi:arrow-down-thin'}></ha-icon>
                ${opts.curveOutput}
              </div>
            </div>
          ` : html`<div class="kpi-value flow">${this._flowTempFormatted}</div>`}
          <div class="kpi-label">${localize('common.flow')}</div>
        </div>
        <div class="kpi-divider"></div>
        <div class="kpi-block${climateMissing ? ' missing' : ''}" @click=${climateMissing ? undefined : () => this._openMoreInfo(this._config.climate_entity)}>
          <div class="kpi-value">${this._roomTemp}</div>
          <div class="kpi-label">${localize('common.room')}</div>
        </div>
      </div>
    `;
  }

  // ── Params footer (shared) ──

  protected _getEntityRange(entityId: string | undefined, defaultMin: number, defaultMax: number): [number, number] {
    if (!entityId) return [defaultMin, defaultMax];
    const min = this._entityAttr<number>(entityId, 'min');
    const max = this._entityAttr<number>(entityId, 'max');
    return [min ?? defaultMin, max ?? defaultMax];
  }

  private _formatParamNum(value: number, decimals: number, options?: Intl.NumberFormatOptions): string {
    return formatNumber(value, this.hass?.locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals, ...options });
  }

  protected _renderParamsFooter(params: {
    hc?: { entity: string; fallback: number; onClick?: () => void };
    n?: { entity: string; fallback: number; onClick?: () => void };
    shift?: { entity: string; fallback: number; onClick?: () => void };
    pid_correction?: { entity: string; fallback?: number };
  }): TemplateResult | typeof nothing {
    if (this._config.show_params_footer === false) return nothing;
    const items: TemplateResult[] = [];

    if (params.hc) {
      const value = this._resolveEntityNumber(params.hc.entity, params.hc.fallback);
      const [min, max] = this._getEntityRange(params.hc.entity, 0.5, 3.0);
      const hcClick = () => params.hc!.onClick ? params.hc!.onClick!() : this._openMoreInfo(params.hc!.entity);
      items.push(html`
        <div class="param-item" @click=${hcClick}>
          <span class="param-label">HC</span>
          <span class="param-value">${this._formatParamNum(value, 2)}</span>
          <eq-param-bar .min=${min} .max=${max} .value=${value} indicator></eq-param-bar>
        </div>
      `);
    }

    if (params.n) {
      const value = this._resolveEntityNumber(params.n.entity, params.n.fallback);
      const [min, max] = this._getEntityRange(params.n.entity, 1.0, 2.0);
      const nClick = () => params.n!.onClick ? params.n!.onClick!() : this._openMoreInfo(params.n!.entity);
      items.push(html`
        <div class="param-item" @click=${nClick}>
          <span class="param-label">n</span>
          <span class="param-value">${this._formatParamNum(value, 2)}</span>
          <eq-param-bar .min=${min} .max=${max} .value=${value} indicator></eq-param-bar>
        </div>
      `);
    }

    if (params.shift) {
      const rawValue = this._resolveEntityNumber(params.shift.entity, params.shift.fallback);
      const [rawMin, rawMax] = this._getEntityRange(params.shift.entity, -15, 15);
      const displayVal = this._toDisplayDelta(rawValue);
      const displayMin = this._toDisplayDelta(rawMin);
      const displayMax = this._toDisplayDelta(rawMax);
      const formatted = this._formatParamNum(displayVal, 1, { signDisplay: 'always' }) + (this.hass?.config?.unit_system?.temperature ?? '°C');
      const valClass = displayVal > 0 ? 'positive' : displayVal < 0 ? 'negative' : '';
      const color = displayVal >= 0 ? 'var(--success-color, #4caf50)' : 'var(--error-color, #e53935)';
      const shiftClick = () => params.shift!.onClick ? params.shift!.onClick!() : this._openMoreInfo(params.shift!.entity);
      items.push(html`
        <div class="param-item" @click=${shiftClick}>
          <span class="param-label">Shift</span>
          <span class="param-value ${valClass}">${formatted}</span>
          <eq-param-bar .min=${displayMin} .max=${displayMax} .value=${displayVal} centered .color=${color} indicator></eq-param-bar>
        </div>
      `);
    }

    if (params.pid_correction) {
      const rawValue = this._resolveEntityNumber(params.pid_correction.entity, params.pid_correction.fallback ?? 0);
      const [rawMin, rawMax] = this._getEntityRange(params.pid_correction.entity, -10, 10);
      const displayVal = this._toDisplayDelta(rawValue);
      const displayMin = this._toDisplayDelta(rawMin);
      const displayMax = this._toDisplayDelta(rawMax);
      const formatted = this._formatParamNum(displayVal, 1, { signDisplay: 'always' }) + (this.hass?.config?.unit_system?.temperature ?? '°C');
      const valClass = displayVal > 0 ? 'positive' : displayVal < 0 ? 'negative' : '';
      const color = displayVal >= 0 ? 'var(--success-color, #4caf50)' : 'var(--error-color, #e53935)';
      items.push(html`
        <div class="param-item" @click=${() => this._openMoreInfo(params.pid_correction!.entity)}>
          <span class="param-label">Σ</span>
          <span class="param-value ${valClass}">${formatted}</span>
          <eq-param-bar .min=${displayMin} .max=${displayMax} .value=${displayVal} centered .color=${color} indicator></eq-param-bar>
        </div>
      `);
    }

    if (items.length === 0) return nothing;
    return html`<div class="params-footer">${items}</div>`;
  }

  protected _renderTunableParamsFooter(
    params: Parameters<typeof this._renderParamsFooter>[0],
    onTune: () => void,
  ): TemplateResult | typeof nothing {
    const inner = this._renderParamsFooter(params);
    if (inner === nothing) return nothing;
    if (!this._config.tunable) return inner;
    return html`
      <div class="params-footer-tunable" @click=${onTune}>
        ${inner}
        <ha-icon class="pencil-icon" icon="mdi:pencil"></ha-icon>
      </div>
    `;
  }
}
