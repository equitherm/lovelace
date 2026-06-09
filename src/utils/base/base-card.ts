import { html, nothing, PropertyValues, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import type { LovelaceCard } from '../../ha/panels/lovelace/types';
import type { ClimateEntity } from '../../ha/data/climate';
import { BaseCard } from './abstract-base-card';
import { normalizeHvacAction, getHvacActionColor } from '../hvac-colors';
import { getRateTargetEntity, type ClimateHelperConfig } from '../climate-helpers';
import setupCustomlocalize from '../../localize';
import '../../features/eq-hvac-badges';
import '../../features/eq-temp-kpis';
import { headerStyles } from './header-styles';
import type { TuningDialogConfig } from '../../shared/eq-tuning-dialog-config';
export { headerStyles };

/** Minimum config fields shared by all equitherm cards */
export interface EquithermCardConfig {
  climate_entity?: string;
  flow_entity?: string;
  outdoor_entity?: string;
  wws_entity?: string;
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
  @state() protected _dialogConfig?: TuningDialogConfig;

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

  /** Formatted outdoor temperature from outdoor_entity */
  protected get _outdoorTempFormatted(): string {
    return this._formatEntityTemp(this._config.outdoor_entity);
  }

  /** Formatted curve output temp from rate target entity (for adjusting indicator) */
  protected get _curveOutputTempFormatted(): string {
    const entity = getRateTargetEntity(this._config as unknown as ClimateHelperConfig);
    if (!entity) return '';
    return this._formatEntityTemp(entity);
  }

  /** Whether Warm Weather Shutdown is active.
   *  When wws_entity is configured, uses its state directly (authoritative).
   *  Otherwise falls back to inferring from outdoor >= target.
   *  Subclasses (e.g. forecast-card) may override with alternative logic. */
  protected get _isWWSD(): boolean {
    if (this._config?.wws_entity) {
      const s = this._entityState(this._config.wws_entity);
      return s?.state === 'on';
    }
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

  /** Formatted WWSD explanation with actual temperatures, e.g. "Outdoor 22.0°C >= 21.0°C".
   *  Subclasses (e.g. forecast-card) may override with alternative formatting. */
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

  protected override _titleEntity(): string | undefined {
    return this._config.climate_entity;
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

  /** Render the full badges row via the eq-hvac-badges feature element. */
  protected override _renderHeaderBadges(): ReturnType<typeof html> {
    return html`
      <eq-hvac-badges
        .hass=${this.hass}
        .config=${{
          climate_entity: this._config.climate_entity!,
          outdoor_entity: this._config.outdoor_entity,
          wws_entity: this._config.wws_entity,
          pid_active_entity: (this._config as unknown as ClimateHelperConfig).pid_active_entity,
          rate_limiting_entity: (this._config as unknown as ClimateHelperConfig).rate_limiting_entity,
          pid_output_entity: (this._config as unknown as ClimateHelperConfig).pid_output_entity,
          curve_output_entity: (this._config as unknown as ClimateHelperConfig).curve_output_entity,
          flow_entity: this._config.flow_entity,
          tunable: this._config.tunable,
        }}
        .extraBadges=${() => this._renderExtraBadges()}
        .tuneButton=${() => this._renderTuneButton()}
      ></eq-hvac-badges>
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
    return html`
      <eq-temp-kpis
        .hass=${this.hass}
        .config=${{
          outdoor_entity: this._config.outdoor_entity,
          flow_entity: this._config.flow_entity,
          climate_entity: this._config.climate_entity,
          adjusting_dir: opts?.adjustingDir,
          curve_output: opts?.curveOutput,
          outdoor_click_entity: opts?.outdoorClickEntity,
        }}
      ></eq-temp-kpis>
    `;
  }

}
