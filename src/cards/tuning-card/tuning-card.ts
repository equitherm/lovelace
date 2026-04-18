// src/cards/tuning-card/tuning-card.ts
import { html, css, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { TuningCardConfig } from './tuning-card-config';
import type { HomeAssistant } from '../../ha';
import { computeDomain } from '../../ha/common/entity/compute_domain';
import { actionHandler } from '../../ha';
import { computeEntityNameDisplay } from '../../ha/common/entity/compute_entity_name_display';
import { cardStyle } from '../../utils/card-styles';
import { registerCustomCard } from '../../utils/register-card';
import { TUNING_CARD_NAME, TUNING_CARD_EDITOR_NAME, CLIMATE_ENTITY_DOMAINS, SENSOR_ENTITY_DOMAINS, NUMBER_ENTITY_DOMAINS } from './const';
import { validateTuningCardConfig } from './tuning-card-config';
import { resolveRgbColor, normalizeHvacAction, getHvacActionColor, getHvacBadgeProps } from '../../utils/hvac-colors';
import { buildCurveSeries, flowAtOutdoor } from '../../utils/curve';
import { EquithermChartCard } from '../../utils/base';
import setupCustomLocalize from '../../localize';
import '../../shared/badge-info';

registerCustomCard({
  type: TUNING_CARD_NAME,
  name: 'Equitherm Tuning',
  description: 'Interactive curve tuning with hc/shift sliders',
});

/** Series data point for ApexCharts */
interface ChartDataPoint {
  x: number;
  y: number;
}

@customElement(TUNING_CARD_NAME)
export class EquithermTuningCard extends EquithermChartCard<TuningCardConfig> {
  @state() private _proposedHc: number = NaN;
  @state() private _proposedShift: number = NaN;
  @state() private _applying = false;
  @state() private _applySuccess = false;
  private _lastHcState: number | null = null;
  private _lastShiftState: number | null = null;
  private _successTimer?: ReturnType<typeof setTimeout>;

  public override disconnectedCallback(): void {
    clearTimeout(this._successTimer);
    super.disconnectedCallback();
  }

  protected updated(changedProps: Map<string, unknown>): void {
    super.updated(changedProps);
    if (!this._chart) return;

    // Handle hass changes (entity states + dark mode)
    if (changedProps.has('hass') && this.hass) {
      // Sync proposed values only when entity state actually changed
      this._syncProposedValues();

      const isDark = this._isDark;
      const darkChanged = this._prevDarkMode !== undefined && this._prevDarkMode !== isDark;
      this._prevDarkMode = isDark;

      if (darkChanged) {
        this._updateChartOptions();
      } else {
        this._updateChartSeries();
      }
    }
    // Handle config changes
    if (changedProps.has('_config')) {
      this._lastHcState = null;
      this._lastShiftState = null;
      this._syncProposedValues();
      this._updateChartOptions();
    }
  }

  static async getStubConfig(hass: HomeAssistant): Promise<TuningCardConfig> {
    const states = hass.states;
    const entityIds = Object.keys(states);

    // Find climate entity
    const climateEntity = entityIds.find(e =>
      CLIMATE_ENTITY_DOMAINS.includes(computeDomain(e))
    );

    // Find temperature sensors
    const tempSensors = entityIds.filter(e => {
      const state = states[e];
      return SENSOR_ENTITY_DOMAINS.includes(computeDomain(e))
        && state?.attributes?.device_class === 'temperature';
    });

    const outdoorEntity = tempSensors.find(e =>
      e.includes('outdoor') || e.includes('outside') || e.includes('exterior')
    ) ?? tempSensors[0];

    // Find number entities for hc/shift
    const numberEntities = entityIds.filter(e =>
      NUMBER_ENTITY_DOMAINS.includes(computeDomain(e))
    );

    const hcEntity = numberEntities.find(e => e.includes('hc')) ?? numberEntities[0] ?? '';
    const shiftEntity = numberEntities.find(e => e.includes('shift')) ?? numberEntities[1] ?? '';

    return {
      type: `custom:${TUNING_CARD_NAME}`,
      climate_entity: climateEntity ?? '',
      outdoor_entity: outdoorEntity ?? '',
      hc_entity: hcEntity,
      shift_entity: shiftEntity,
    } as TuningCardConfig;
  }

  static async getConfigElement() {
    await import('./tuning-card-editor');
    return document.createElement(TUNING_CARD_EDITOR_NAME);
  }

  setConfig(config: unknown) {
    this._config = validateTuningCardConfig(config);
  }

  // --- Entity value getters ---

  private get _tTarget(): number {
    return this._climate?.attributes.temperature ?? 21;
  }

  private get _currentN(): number {
    return this._config.curve_from_entities
      ? this._resolveEntityNumber(this._config.n_entity, this._config.n)
      : this._config.n;
  }

  private get _currentHc(): number {
    return this._resolveEntityNumber(this._config.hc_entity, 0.9);
  }

  private get _currentShift(): number {
    return this._resolveEntityNumber(this._config.shift_entity, 0);
  }

  private get _tOutdoor(): number | null {
    const s = this._entityState(this._config.outdoor_entity);
    if (!s) return null;
    const v = parseFloat(s.state);
    return isNaN(v) ? null : v;
  }

  // --- Entity attribute getters for slider bounds ---

  private get _hcMin(): number {
    return this._entityAttr<number>(this._config.hc_entity, 'min') ?? 0.5;
  }

  private get _hcMax(): number {
    return this._entityAttr<number>(this._config.hc_entity, 'max') ?? 3.0;
  }

  private get _hcStep(): number {
    return this._entityAttr<number>(this._config.hc_entity, 'step') ?? 0.1;
  }

  private get _shiftMin(): number {
    return this._entityAttr<number>(this._config.shift_entity, 'min') ?? -15;
  }

  private get _shiftMax(): number {
    return this._entityAttr<number>(this._config.shift_entity, 'max') ?? 15;
  }

  private get _shiftStep(): number {
    return this._entityAttr<number>(this._config.shift_entity, 'step') ?? 1;
  }

  // --- Sync proposed values to current entity state ---

  private _syncProposedValues(): void {
    if (!this.hass) return;
    const hc = this._currentHc;
    const shift = this._currentShift;
    // Only overwrite proposed values when the entity state actually changed
    if (this._lastHcState !== hc) {
      this._proposedHc = hc;
      this._lastHcState = hc;
    }
    if (this._lastShiftState !== shift) {
      this._proposedShift = shift;
      this._lastShiftState = shift;
    }
  }

  // --- Chart ---

  protected _buildChartOptions() {
    const localize = setupCustomLocalize(this.hass);
    const cfg = this._config;

    const minFlow = cfg.curve_from_entities ? this._resolveEntityNumber(cfg.min_flow_entity, cfg.min_flow) : cfg.min_flow;
    const maxFlow = cfg.curve_from_entities ? this._resolveEntityNumber(cfg.max_flow_entity, cfg.max_flow) : cfg.max_flow;

    // Current curve
    const currentParams = {
      tTarget: this._tTarget,
      hc: this._currentHc,
      n: this._currentN,
      shift: this._currentShift,
      minFlow,
      maxFlow,
    };

    // Proposed curve
    const proposedParams = {
      tTarget: this._tTarget,
      hc: this._proposedHc,
      n: this._currentN,
      shift: this._proposedShift,
      minFlow,
      maxFlow,
    };

    // Resolve colors
    const style = getComputedStyle(this);
    const heatingColor = resolveRgbColor(this, 'heating');
    const proposedColor = 'rgb(var(--rgb-state-climate-cool, 38, 142, 213))';

    const currentSeries = buildCurveSeries(currentParams, cfg.t_out_min, cfg.t_out_max);
    const proposedSeries = buildCurveSeries(proposedParams, cfg.t_out_min, cfg.t_out_max);

    // Operating point annotation on current curve
    const tOutdoor = this._tOutdoor;
    const annotationPoints: ApexCharts.PointAnnotations[] = [];
    if (tOutdoor !== null) {
      const currentFlow = flowAtOutdoor(currentParams, tOutdoor);
      annotationPoints.push({
        x: -tOutdoor,
        y: currentFlow,
        marker: { size: 7, fillColor: heatingColor, strokeColor: '#ffffff', strokeWidth: 2 },
      });
    }

    return {
      chart: {
        type: 'line' as const,
        width: '100%',
        height: '100%',
        toolbar: { show: false },
        zoom: { enabled: false },
        animations: { enabled: true, speed: 400 },
        background: 'transparent',
      },
      theme: { mode: this._isDark ? 'dark' as const : 'light' as const },
      series: [
        {
          name: localize('tuning_card.current'),
          data: currentSeries.map((p): ChartDataPoint => ({ x: -p.x, y: p.y })),
        },
        {
          name: localize('tuning_card.proposed'),
          data: proposedSeries.map((p): ChartDataPoint => ({ x: -p.x, y: p.y })),
        },
      ],
      stroke: {
        curve: 'straight' as const,
        width: [2, 2],
        dashArray: [0, 5],
      },
      colors: [heatingColor, proposedColor],
      fill: { type: 'solid' },
      markers: {
        size: 0,
        hover: { size: 4 },
      },
      xaxis: {
        type: 'numeric' as const,
        min: -cfg.t_out_max,
        max: -cfg.t_out_min,
        forceNiceScale: false,
        title: { text: localize('tuning_card.outdoor_axis'), style: { color: 'var(--secondary-text-color)', fontWeight: 400 } },
        labels: {
          style: { colors: 'var(--secondary-text-color)', fontWeight: 400 },
          formatter: (val: number) => `${(-val).toFixed(1)}`,
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        title: { text: localize('tuning_card.flow_axis'), style: { color: 'var(--secondary-text-color)', fontWeight: 400 } },
        labels: { style: { colors: 'var(--secondary-text-color)', fontWeight: 400 } },
        min: minFlow - 5,
        max: maxFlow + 5,
        forceNiceScale: false,
      },
      grid: { show: false },
      legend: {
        show: true,
        position: 'top' as const,
        horizontalAlign: 'right' as const,
        floating: true,
        fontSize: '11px',
        markers: { size: 10, strokeWidth: 0 },
        labels: { colors: 'var(--secondary-text-color)' },
      },
      dataLabels: { enabled: false },
      annotations: { points: annotationPoints },
      tooltip: {
        theme: this._isDark ? 'dark' : 'light',
        x: { formatter: (v: number) => `${(-v).toFixed(1)} ${localize('tuning_card.outdoor_axis')}` },
        y: { formatter: (v: number) => `${v.toFixed(1)} ${localize('tuning_card.flow_axis')}` },
      },
    };
  }

  private _updateChartSeries(): void {
    if (!this._chart) return;
    const opts = this._buildChartOptions();
    this._chart.updateSeries(opts.series, false);
    this._chart.updateOptions({ annotations: opts.annotations }, false, false);
  }

  // --- Service calls ---

  /** Call the optional recalculate service if configured and available */
  private async _recalculate(): Promise<void> {
    const svc = this._config.recalculate_service;
    if (!svc || !this.hass) return;
    const [domain, service] = svc.split('.', 2);
    if (!domain || !service) return;
    // Skip if the service doesn't exist (user hasn't configured it in ESPHome)
    if (!this.hass.services[domain]?.[service]) return;
    await this.hass.callService(domain, service, {});
  }

  private async _applyAll(): Promise<void> {
    if (!this.hass) return;
    this._applying = true;
    try {
      const hcChanged = Math.abs(this._proposedHc - this._currentHc) > this._hcStep / 2;
      const shiftChanged = Math.abs(this._proposedShift - this._currentShift) > this._shiftStep / 2;
      if (hcChanged) {
        await this.hass.callService('number', 'set_value', {
          entity_id: this._config.hc_entity,
          value: this._proposedHc,
        });
      }
      if (shiftChanged) {
        await this.hass.callService('number', 'set_value', {
          entity_id: this._config.shift_entity,
          value: this._proposedShift,
        });
      }
      if (hcChanged || shiftChanged) {
        await this._recalculate();
      }
      this._applySuccess = true;
      clearTimeout(this._successTimer);
      this._successTimer = setTimeout(() => { this._applySuccess = false; }, 1500);
    } catch (err) {
      console.warn('Failed to apply tuning:', err);
    } finally {
      this._applying = false;
    }
  }

  private _resetHc(): void {
    this._proposedHc = this._currentHc;
    this._updateChartSeries();
  }

  private _resetShift(): void {
    this._proposedShift = this._currentShift;
    this._updateChartSeries();
  }

  // --- Slider handlers ---

  private _onHcSlider(ev: Event): void {
    const val = parseFloat((ev.target as HTMLInputElement).value);
    if (isNaN(val)) return;
    this._proposedHc = val;
    this._updateChartSeries();
  }

  private _onShiftSlider(ev: Event): void {
    const val = parseFloat((ev.target as HTMLInputElement).value);
    if (isNaN(val)) return;
    this._proposedShift = val;
    this._updateChartSeries();
  }

  // --- Styles ---

  static get styles() {
    return [
      super.styles,
      cardStyle,
      css`
        ha-card {
          height: 100%;
          overflow: hidden;
        }
        .header {
          display: flex;
          justify-content: space-between;
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
        .badges {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }
        .title {
          font-size: var(--ha-font-size-m, 1rem);
          font-weight: 600;
          color: var(--primary-text-color);
        }
        .chart-wrapper { flex: 1; min-height: 120px; }
        #chart { width: 100%; height: 100%; }
        .controls {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex-shrink: 0;
          background: rgba(var(--rgb-primary, 249, 115, 22), 0.05);
          border-top: 1px solid var(--divider-color, rgba(0,0,0,0.08));
          border-radius: 0 0 var(--ha-card-border-radius, 12px) var(--ha-card-border-radius, 12px);
          margin: 16px -16px -16px -16px;
          padding: 14px 16px 24px;
        }
        .slider-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .slider-label {
          font-size: var(--ha-font-size-s, 12px);
          font-weight: var(--ha-font-weight-medium, 500);
          color: var(--secondary-text-color);
          min-width: 80px;
          white-space: nowrap;
        }
        .slider-value {
          font-size: var(--ha-font-size-s, 12px);
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          color: var(--primary-text-color);
          min-width: 44px;
          text-align: right;
          white-space: nowrap;
        }
        .delta {
          font-size: 11px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          min-width: 36px;
        }
        .delta.positive { color: var(--success-color, #4caf50); }
        .delta.negative { color: var(--error-color, #e53935); }
        .slider-actions {
          display: flex;
          align-items: center;
          gap: 2px;
          min-width: 72px;
          height: 32px;
          justify-content: flex-end;
          flex-shrink: 0;
        }
        .reset-btn {
          --mdc-icon-button-size: 32px;
          --mdc-icon-size: 18px;
          color: var(--secondary-text-color);
          flex-shrink: 0;
          opacity: 0.7;
          transition: opacity 150ms ease;
        }
        .reset-btn:hover { opacity: 1; }
        input[type="range"] {
          --slider-fill: 50%;
          flex: 1;
          min-width: 0;
          height: 4px;
          -webkit-appearance: none;
          appearance: none;
          background: linear-gradient(to right,
            rgb(var(--rgb-primary, 249, 115, 22)) 0%,
            rgb(var(--rgb-primary, 249, 115, 22)) var(--slider-fill),
            var(--divider-color, rgba(0,0,0,0.12)) var(--slider-fill),
            var(--divider-color, rgba(0,0,0,0.12)) 100%
          );
          border-radius: 2px;
          outline: none;
          cursor: pointer;
        }
        input[type="range"]:focus-visible {
          outline: 3px solid rgba(var(--rgb-primary, 249, 115, 22), 0.5);
          outline-offset: 4px;
          border-radius: 2px;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgb(var(--rgb-primary, 249, 115, 22));
          border: 2px solid var(--card-background-color, #fff);
          box-shadow: 0 0 0 10px transparent, 0 1px 3px rgba(0,0,0,0.2);
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgb(var(--rgb-primary, 249, 115, 22));
          border: 2px solid var(--card-background-color, #fff);
          box-shadow: 0 0 0 10px transparent, 0 1px 3px rgba(0,0,0,0.2);
          cursor: pointer;
        }
        .controls-footer {
          display: flex;
          justify-content: flex-end;
          padding-top: 6px;
        }
        .apply-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          height: 36px;
          padding: 0 16px;
          border: none;
          border-radius: 18px;
          background: rgb(var(--rgb-primary, 249, 115, 22));
          color: var(--text-primary-color, #fff);
          font-size: var(--ha-font-size-s, 14px);
          font-weight: var(--ha-font-weight-medium, 500);
          font-family: inherit;
          cursor: pointer;
          transition: background 200ms ease, opacity 200ms ease;
        }
        .apply-btn:hover:not(:disabled) {
          filter: brightness(1.1);
        }
        .apply-btn:active:not(:disabled) {
          filter: brightness(0.95);
        }
        .apply-btn:focus-visible {
          outline: 2px solid rgb(var(--rgb-primary, 249, 115, 22));
          outline-offset: 2px;
        }
        .apply-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .apply-btn.success {
          background: var(--success-color, #4caf50);
        }
        .apply-btn ha-icon {
          --mdc-icon-size: 18px;
        }
        .footer-meta {
          display: flex;
          justify-content: center;
          padding: 4px 0 0;
          font-size: var(--ha-font-size-xs, 0.68rem);
          color: var(--secondary-text-color);
          opacity: 0.7;
        }
      `,
    ];
  }

  // --- Render ---

  render() {
    if (!this._config || !this.hass) return nothing;
    const localize = setupCustomLocalize(this.hass);
    const rawAction = this._climate?.attributes.hvac_action ?? 'off';
    const hvacAction = normalizeHvacAction(rawAction);
    const climateState = this.hass.states[this._config.climate_entity];
    const title = climateState
      ? computeEntityNameDisplay(climateState, this._config.name, this.hass) || localize('tuning_card.default_title')
      : localize('tuning_card.default_title');

    // Icon style from HVAC action
    const color = getHvacActionColor(hvacAction);
    const iconStyles = styleMap({
      '--tile-icon-color': `rgb(${color})`,
      '--tile-icon-size': '42px',
    });

    const hvacBadge = getHvacBadgeProps(localize, hvacAction);

    // Proposed differs from current?
    const hcChanged = Math.abs(this._proposedHc - this._currentHc) > this._hcStep / 2;
    const shiftChanged = Math.abs(this._proposedShift - this._currentShift) > this._shiftStep / 2;
    const hasChanges = hcChanged || shiftChanged;

    // Slider step decimals
    const hcDecimals = this._hcStep < 1 ? Math.ceil(-Math.log10(this._hcStep)) : 0;
    const shiftDecimals = this._shiftStep < 1 ? Math.ceil(-Math.log10(this._shiftStep)) : 0;

    // Slider fill percentages (guard against equal min/max)
    const hcFill = this._hcMax !== this._hcMin ? ((this._proposedHc - this._hcMin) / (this._hcMax - this._hcMin)) * 100 : 50;
    const shiftFill = this._shiftMax !== this._shiftMin ? ((this._proposedShift - this._shiftMin) / (this._shiftMax - this._shiftMin)) * 100 : 50;

    // Delta values
    const hcDelta = this._proposedHc - this._currentHc;
    const shiftDelta = this._proposedShift - this._currentShift;

    const deltaLabel = (d: number, decimals: number) => {
      const sign = d > 0 ? '+' : '';
      return `${sign}${d.toFixed(decimals)}`;
    };

    return html`
      <ha-card>
        <div class="header">
          <ha-tile-icon
            .interactive=${true}
            style=${iconStyles}
            .actionHandler=${actionHandler(this._actionHandlerOptions(this._config.climate_entity))}
            @action=${this._onAction(this._config.climate_entity)}
          >
            <ha-icon slot="icon" .icon=${'mdi:tune-vertical'}></ha-icon>
          </ha-tile-icon>
          <div class="header-info">
            <span class="title">${title}</span>
          </div>
          <div class="badges">
            <eq-badge-info
              .label=${hvacBadge.label}
              style=${`--badge-info-color: ${hvacBadge.color}`}
              .icon=${hvacBadge.icon}
              .active=${hvacBadge.active}
            ></eq-badge-info>
          </div>
        </div>
        <div class="chart-wrapper">
          <div id="chart"></div>
        </div>
        <div class="controls">
          <div class="slider-row">
            <span class="slider-label">${localize('editor.hc')}</span>
            <input
              type="range"
              style=${`--slider-fill: ${hcFill}%`}
              .min=${this._hcMin}
              .max=${this._hcMax}
              .step=${this._hcStep}
              .value=${String(this._proposedHc)}
              @input=${this._onHcSlider}
            />
            <span class="slider-value">${this._proposedHc.toFixed(hcDecimals)}</span>
            <span class="slider-actions">
              ${hcChanged ? html`
                <span class="delta ${hcDelta > 0 ? 'positive' : 'negative'}">${deltaLabel(hcDelta, hcDecimals)}</span>
                <ha-icon-button
                  class="reset-btn"
                  .label=${localize('tuning_card.reset')}
                  @click=${this._resetHc}
                ><ha-icon icon="mdi:undo"></ha-icon></ha-icon-button>
              ` : nothing}
            </span>
          </div>
          <div class="slider-row">
            <span class="slider-label">${localize('editor.shift')}</span>
            <input
              type="range"
              style=${`--slider-fill: ${shiftFill}%`}
              .min=${this._shiftMin}
              .max=${this._shiftMax}
              .step=${this._shiftStep}
              .value=${String(this._proposedShift)}
              @input=${this._onShiftSlider}
            />
            <span class="slider-value">${this._proposedShift.toFixed(shiftDecimals)}</span>
            <span class="slider-actions">
              ${shiftChanged ? html`
                <span class="delta ${shiftDelta > 0 ? 'positive' : 'negative'}">${deltaLabel(shiftDelta, shiftDecimals)}</span>
                <ha-icon-button
                  class="reset-btn"
                  .label=${localize('tuning_card.reset')}
                  @click=${this._resetShift}
                ><ha-icon icon="mdi:undo"></ha-icon></ha-icon-button>
              ` : nothing}
            </span>
          </div>
          <div class="controls-footer">
            <button
              class="apply-btn${this._applySuccess ? ' success' : ''}"
              ?disabled=${!hasChanges || this._applying}
              @click=${this._applyAll}
            >${this._applySuccess
              ? html`<ha-icon icon="mdi:check"></ha-icon>`
              : this._applying
                ? localize('tuning_card.applying')
                : localize('tuning_card.apply')
            }</button>
          </div>
        </div>
        ${this._config.show_last_updated ? html`
          <div class="footer-meta">
            ${this._renderLastUpdated(this._config.outdoor_entity)}
          </div>
        ` : nothing}
      </ha-card>
    `;
  }
}
