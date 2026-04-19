// src/cards/tuning-card/tuning-card.ts
import { html, css, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import type { TuningCardConfig } from './tuning-card-config';
import type { HomeAssistant } from '../../ha';
import type { LovelaceGridOptions } from '../../ha/panels/lovelace/types';
import { computeDomain } from '../../ha/common/entity/compute_domain';
import { computeEntityNameDisplay } from '../../ha/common/entity/compute_entity_name_display';
import { cardStyle } from '../../utils/card-styles';
import { registerCustomCard } from '../../utils/register-card';
import { TUNING_CARD_NAME, TUNING_CARD_EDITOR_NAME, CLIMATE_ENTITY_DOMAINS, SENSOR_ENTITY_DOMAINS, NUMBER_ENTITY_DOMAINS } from './const';
import { validateTuningCardConfig } from './tuning-card-config';
import { resolveRgbColor } from '../../utils/hvac-colors';
import type { ApexAnnotations, PointAnnotations } from 'apexcharts';
import { buildCurveSeries, flowAtOutdoor } from '../../utils/curve';
import { EquithermChartCard, headerStyles } from '../../utils/base';
import setupCustomLocalize from '../../localize';
import '../../shared/badge-info';

registerCustomCard({
  type: TUNING_CARD_NAME,
  name: 'Equitherm Tuning',
  description: 'Interactive curve tuning with hc/shift sliders',
});

interface ChartDataPoint { x: number; y: number; }

@customElement(TUNING_CARD_NAME)
export class EquithermTuningCard extends EquithermChartCard<TuningCardConfig> {
  @state() private _proposedHc?: number;
  @state() private _proposedShift?: number;
  @state() private _applying = false;
  @state() private _applySuccess = false;
  private _lastHcState: number | null = null;
  private _lastShiftState: number | null = null;
  private _successTimer?: ReturnType<typeof setTimeout>;

  public override getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: 5, min_rows: 4 };
  }

  public override disconnectedCallback(): void {
    clearTimeout(this._successTimer);
    super.disconnectedCallback();
  }

  protected updated(changedProps: Map<string, unknown>): void {
    super.updated(changedProps);

    if (changedProps.has('hass') && this.hass) {
      this._syncProposedValues();
      if (!this._chart && this._chartEl) {
        this._initChart();
        this._setupResizeObserver();
      }
    }

    if (!this._chart) return;

    if (changedProps.has('_config')) {
      this._lastHcState = null;
      this._lastShiftState = null;
      this._syncProposedValues();
      this._updateChartOptions();
    }

    if (changedProps.has('hass') && this.hass) {
      const isDark = this._isDark;
      const darkChanged = this._prevDarkMode !== undefined && this._prevDarkMode !== isDark;
      this._prevDarkMode = isDark;
      if (darkChanged) {
        this._updateChartOptions();
      } else {
        this._updateChartSeries();
      }
    }
  }

  static async getStubConfig(hass: HomeAssistant): Promise<TuningCardConfig> {
    const states = hass.states;
    const entityIds = Object.keys(states);
    const climateEntity = entityIds.find(e => CLIMATE_ENTITY_DOMAINS.includes(computeDomain(e)));
    const tempSensors = entityIds.filter(e => {
      const state = states[e];
      return SENSOR_ENTITY_DOMAINS.includes(computeDomain(e)) && state?.attributes?.device_class === 'temperature';
    });
    const outdoorEntity = tempSensors.find(e => e.includes('outdoor') || e.includes('outside') || e.includes('exterior')) ?? tempSensors[0];
    const numberEntities = entityIds.filter(e => NUMBER_ENTITY_DOMAINS.includes(computeDomain(e)));
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

  // --- Entity getters ---

  private get _tTarget(): number { return this._climate?.attributes.temperature ?? 21; }
  private get _currentN(): number {
    return this._config.curve_from_entities
      ? this._resolveEntityNumber(this._config.n_entity, this._config.n)
      : this._config.n;
  }
  private get _currentHc(): number { return this._resolveEntityNumber(this._config.hc_entity, 0.9); }
  private get _currentShift(): number { return this._resolveEntityNumber(this._config.shift_entity, 0); }
  private get _tOutdoor(): number | null {
    const s = this._entityState(this._config.outdoor_entity);
    if (!s) return null;
    const v = parseFloat(s.state);
    return isNaN(v) ? null : v;
  }
  private get _hcMin(): number { return this._entityAttr<number>(this._config.hc_entity, 'min') ?? 0.5; }
  private get _hcMax(): number { return this._entityAttr<number>(this._config.hc_entity, 'max') ?? 3.0; }
  private get _hcStep(): number { return this._entityAttr<number>(this._config.hc_entity, 'step') ?? 0.1; }
  private get _shiftMin(): number { return this._entityAttr<number>(this._config.shift_entity, 'min') ?? -15; }
  private get _shiftMax(): number { return this._entityAttr<number>(this._config.shift_entity, 'max') ?? 15; }
  private get _shiftStep(): number { return this._entityAttr<number>(this._config.shift_entity, 'step') ?? 1; }

  private _syncProposedValues(): void {
    if (!this.hass) return;
    const hc = this._currentHc;
    const shift = this._currentShift;
    if (this._lastHcState !== hc) { this._proposedHc = hc; this._lastHcState = hc; }
    if (this._lastShiftState !== shift) { this._proposedShift = shift; this._lastShiftState = shift; }
  }

  // --- Chart ---

  protected _buildChartOptions() {
    const localize = setupCustomLocalize(this.hass);
    const cfg = this._config;
    const minFlow = cfg.curve_from_entities ? this._resolveEntityNumber(cfg.min_flow_entity, cfg.min_flow) : cfg.min_flow;
    const maxFlow = cfg.curve_from_entities ? this._resolveEntityNumber(cfg.max_flow_entity, cfg.max_flow) : cfg.max_flow;

    const currentParams = { tTarget: this._tTarget, hc: this._currentHc, n: this._currentN, shift: this._currentShift, minFlow, maxFlow };
    const proposedParams = { tTarget: this._tTarget, hc: this._proposedHc ?? this._currentHc, n: this._currentN, shift: this._proposedShift ?? this._currentShift, minFlow, maxFlow };

    const heatingColor = resolveRgbColor(this, 'heating');
    const rawProposed = getComputedStyle(this).getPropertyValue('--rgb-state-climate-cool').trim();
    const proposedColor = rawProposed ? `rgb(${rawProposed})` : 'rgb(38, 142, 213)';

    const currentSeries = buildCurveSeries(currentParams, cfg.t_out_min, cfg.t_out_max);
    const proposedSeries = buildCurveSeries(proposedParams, cfg.t_out_min, cfg.t_out_max);

    const tOutdoor = this._tOutdoor;
    const annotationPoints: PointAnnotations[] = [];
    if (tOutdoor !== null) {
      const currentFlow = flowAtOutdoor(currentParams, tOutdoor);
      annotationPoints.push({
        x: -tOutdoor, y: currentFlow,
        marker: { size: 7, fillColor: heatingColor, strokeColor: '#ffffff', strokeWidth: 2 },
      });
    }

    const annotations: ApexAnnotations = { points: annotationPoints };
    if (this._isWWSD) {
      const tTarget = this._tTarget;
      annotations.xaxis = [
        { x: -cfg.t_out_max, x2: -tTarget, borderColor: 'transparent', fillColor: 'rgba(var(--rgb-warning, 255, 167, 38), 0.08)' },
        {
          x: -tTarget, borderColor: 'rgba(var(--rgb-warning, 255, 167, 38), 0.4)', strokeDashArray: 4,
          label: { text: localize('common.wwsd'), borderWidth: 0, style: { color: 'var(--secondary-text-color)', fontSize: '10px', background: 'var(--card-background-color, #fff)' } },
        },
      ];
    }

    return {
      chart: {
        type: 'line' as const, width: '100%', height: '100%',
        toolbar: { show: false }, zoom: { enabled: false },
        animations: { enabled: true, speed: 400 }, background: 'transparent',
      },
      theme: { mode: this._isDark ? 'dark' as const : 'light' as const },
      series: [
        { name: localize('tuning_card.current'), data: currentSeries.map((p): ChartDataPoint => ({ x: -p.x, y: p.y })) },
        { name: localize('tuning_card.proposed'), data: proposedSeries.map((p): ChartDataPoint => ({ x: -p.x, y: p.y })) },
      ],
      stroke: { curve: 'straight' as const, width: [2, 2], dashArray: [0, 5] },
      colors: [heatingColor, proposedColor],
      fill: { type: 'solid' },
      markers: { size: 0, hover: { size: 4 } },
      xaxis: {
        type: 'numeric' as const, min: -cfg.t_out_max, max: -cfg.t_out_min, forceNiceScale: false,
        labels: { style: { colors: 'var(--secondary-text-color)', fontWeight: 400, fontSize: '10px' }, formatter: (val: number) => `${(-val).toFixed(0)}` },
        axisBorder: { show: false }, axisTicks: { show: false },
      },
      yaxis: {
        labels: { style: { colors: 'var(--secondary-text-color)', fontWeight: 400, fontSize: '10px' } },
        min: minFlow - 5, max: maxFlow + 5, forceNiceScale: false,
      },
      grid: { show: false },
      legend: { show: false },
      dataLabels: { enabled: false },
      annotations,
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

  private async _recalculate(): Promise<void> {
    const svc = this._config.recalculate_service;
    if (!svc || !this.hass) return;
    const [domain, service] = svc.split('.', 2);
    if (!domain || !service) return;
    if (!this.hass.services[domain]?.[service]) return;
    await this.hass.callService(domain, service, {});
  }

  private async _applyAll(): Promise<void> {
    if (!this.hass) return;
    this._applying = true;
    try {
      const hcChanged = Math.abs((this._proposedHc ?? 0) - this._currentHc) > this._hcStep / 2;
      const shiftChanged = Math.abs((this._proposedShift ?? 0) - this._currentShift) > this._shiftStep / 2;
      if (hcChanged) await this.hass.callService('number', 'set_value', { entity_id: this._config.hc_entity, value: this._proposedHc });
      if (shiftChanged) await this.hass.callService('number', 'set_value', { entity_id: this._config.shift_entity, value: this._proposedShift });
      if (hcChanged || shiftChanged) await this._recalculate();
      this._applySuccess = true;
      clearTimeout(this._successTimer);
      this._successTimer = setTimeout(() => { this._applySuccess = false; }, 1500);
    } catch (err) {
      console.warn('Failed to apply tuning:', err);
    } finally {
      this._applying = false;
    }
  }

  private _resetHc(): void { this._proposedHc = this._currentHc; this._updateChartSeries(); }
  private _resetShift(): void { this._proposedShift = this._currentShift; this._updateChartSeries(); }

  private _adjustHc(delta: number): void {
    const cur = this._proposedHc ?? this._currentHc;
    const raw = cur + delta;
    const clamped = Math.max(this._hcMin, Math.min(this._hcMax, raw));
    const decimals = this._hcStep < 1 ? Math.ceil(-Math.log10(this._hcStep)) : 0;
    this._proposedHc = parseFloat(clamped.toFixed(decimals));
    this._updateChartSeries();
  }

  private _adjustShift(delta: number): void {
    const cur = this._proposedShift ?? this._currentShift;
    const raw = cur + delta;
    const clamped = Math.max(this._shiftMin, Math.min(this._shiftMax, raw));
    const decimals = this._shiftStep < 1 ? Math.ceil(-Math.log10(this._shiftStep)) : 0;
    this._proposedShift = parseFloat(clamped.toFixed(decimals));
    this._updateChartSeries();
  }

  // --- Styles ---

  static get styles() {
    return [
      super.styles,
      cardStyle,
      headerStyles,
      css`
        :host { --tc-proposed: rgb(var(--rgb-state-climate-cool, 38, 142, 213)); }
        ha-card {
          height: 100%;
          overflow: hidden;
          padding: 0;
          display: flex;
          flex-direction: column;
        }
        .header { padding: 10px 10px 0; margin-bottom: 0; }

        /* ── Chart ── */
        .chart-area {
          flex: 1;
          min-height: 0;
          padding: 4px 4px 0;
          position: relative;
        }
        #chart { width: 100%; height: 100%; }
        .chart-legend {
          position: absolute;
          top: 8px;
          left: 14px;
          display: flex;
          gap: 10px;
          z-index: 1;
          pointer-events: none;
        }
        .legend-item {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 10px;
          color: var(--secondary-text-color);
        }
        .legend-line { width: 14px; height: 2px; flex-shrink: 0; }
        .legend-line.dashed {
          background: repeating-linear-gradient(90deg, var(--tc-proposed) 0 4px, transparent 4px 7px);
        }

        /* ── Controls strip ── */
        .controls {
          display: flex;
          flex-shrink: 0;
          border-top: 1px solid var(--divider-color);
          margin-top: 4px;
        }
        .ctrl-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 8px 0 8px;
          gap: 1px;
          position: relative;
        }
        .ctrl-divider {
          width: 1px;
          background: var(--divider-color);
          margin: 6px 0;
          flex-shrink: 0;
        }
        .ctrl-label {
          font-size: 10px;
          font-weight: var(--ha-font-weight-medium, 500);
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: var(--secondary-text-color);
        }
        .ctrl-stepper {
          display: flex;
          align-items: center;
          gap: 0;
        }
        .step-btn {
          --ha-icon-button-size: 32px;
          --ha-icon-button-padding-inline: 2px;
          --mdc-icon-size: 16px;
          color: var(--primary-text-color);
        }
        .ctrl-value {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 52px;
          gap: 1px;
        }
        .ctrl-num {
          font-size: 20px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          line-height: 1.1;
          color: var(--primary-text-color);
        }
        .ctrl-delta {
          font-size: 10px;
          font-weight: var(--ha-font-weight-medium, 500);
          font-variant-numeric: tabular-nums;
          min-height: 13px;
          line-height: 1;
        }
        .ctrl-delta.pos { color: var(--success-color, #4caf50); }
        .ctrl-delta.neg { color: var(--error-color, #e53935); }
        .reset-btn {
          position: absolute;
          top: 4px;
          right: 4px;
          --ha-icon-button-size: 24px;
          --ha-icon-button-padding-inline: 2px;
          --mdc-icon-size: 12px;
          color: var(--disabled-text-color);
        }
        .reset-btn:hover { color: var(--secondary-text-color); }

        /* ── Apply ── */
        .apply-row {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding: 0 10px 0;
          flex-shrink: 0;
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.15s ease, padding-bottom 0.15s ease;
        }
        .apply-row.visible {
          max-height: 48px;
          padding-bottom: 10px;
        }


      `,
    ];
  }

  // --- Render ---

  render() {
    if (!this._config || !this.hass) return nothing;
    const localize = setupCustomLocalize(this.hass);
    const climateState = this.hass.states[this._config.climate_entity];
    const title = climateState
      ? computeEntityNameDisplay(climateState, this._config.name, this.hass) || localize('tuning_card.default_title')
      : localize('tuning_card.default_title');

    if (this._proposedHc === undefined || this._proposedShift === undefined) {
      return html`<ha-card>
        ${this._renderHeader({
          iconName: 'mdi:tune-vertical',
          clickEntity: this._config.climate_entity,
          title,
        })}
      </ha-card>`;
    }

    const hcChanged = Math.abs(this._proposedHc - this._currentHc) > this._hcStep / 2;
    const shiftChanged = Math.abs(this._proposedShift - this._currentShift) > this._shiftStep / 2;
    const hasChanges = hcChanged || shiftChanged;
    const hcDecimals = this._hcStep < 1 ? Math.ceil(-Math.log10(this._hcStep)) : 0;
    const shiftDecimals = this._shiftStep < 1 ? Math.ceil(-Math.log10(this._shiftStep)) : 0;
    const hcDelta = this._proposedHc - this._currentHc;
    const shiftDelta = this._proposedShift - this._currentShift;
    const dl = (d: number, dec: number) => `${d > 0 ? '+' : ''}${d.toFixed(dec)}`;
    const heatingColor = resolveRgbColor(this, 'heating');
    const currentLineStyle = styleMap({ background: heatingColor });

    return html`
      <ha-card>
        ${this._renderHeader({
          iconName: 'mdi:tune-vertical',
          clickEntity: this._config.climate_entity,
          title,
        })}

        <!-- Chart (primary visual) -->
        <div class="chart-area">
          <div class="chart-legend">
            <span class="legend-item"><span class="legend-line" style=${currentLineStyle}></span>${localize('tuning_card.current')}</span>
            <span class="legend-item"><span class="legend-line dashed"></span>${localize('tuning_card.proposed')}</span>
          </div>
          <div id="chart"></div>
          ${this._renderManualOverlay()}
        </div>

        <!-- Controls: HC and Shift steppers -->
        <div class="controls">
          <div class="ctrl-panel">
            <span class="ctrl-label">${localize('editor.hc')}</span>
            <div class="ctrl-stepper">
              <ha-icon-button class="step-btn" .label=${'-'} @click=${() => this._adjustHc(-this._hcStep)}>
                <ha-icon icon="mdi:minus"></ha-icon>
              </ha-icon-button>
              <div class="ctrl-value">
                <span class="ctrl-num">${this._proposedHc.toFixed(hcDecimals)}</span>
                <span class="ctrl-delta ${hcChanged ? (hcDelta > 0 ? 'pos' : 'neg') : ''}">${hcChanged ? dl(hcDelta, hcDecimals) : ''}</span>
              </div>
              <ha-icon-button class="step-btn" .label=${'+'} @click=${() => this._adjustHc(this._hcStep)}>
                <ha-icon icon="mdi:plus"></ha-icon>
              </ha-icon-button>
            </div>
            ${hcChanged ? html`<ha-icon-button class="reset-btn" .label=${localize('tuning_card.reset')} @click=${this._resetHc}><ha-icon icon="mdi:undo"></ha-icon></ha-icon-button>` : nothing}
          </div>
          <div class="ctrl-divider"></div>
          <div class="ctrl-panel">
            <span class="ctrl-label">${localize('editor.shift')}</span>
            <div class="ctrl-stepper">
              <ha-icon-button class="step-btn" .label=${'-'} @click=${() => this._adjustShift(-this._shiftStep)}>
                <ha-icon icon="mdi:minus"></ha-icon>
              </ha-icon-button>
              <div class="ctrl-value">
                <span class="ctrl-num">${this._proposedShift.toFixed(shiftDecimals)}°</span>
                <span class="ctrl-delta ${shiftChanged ? (shiftDelta > 0 ? 'pos' : 'neg') : ''}">${shiftChanged ? dl(shiftDelta, shiftDecimals) : ''}</span>
              </div>
              <ha-icon-button class="step-btn" .label=${'+'} @click=${() => this._adjustShift(this._shiftStep)}>
                <ha-icon icon="mdi:plus"></ha-icon>
              </ha-icon-button>
            </div>
            ${shiftChanged ? html`<ha-icon-button class="reset-btn" .label=${localize('tuning_card.reset')} @click=${this._resetShift}><ha-icon icon="mdi:undo"></ha-icon></ha-icon-button>` : nothing}
          </div>
        </div>

        <!-- Apply row (max-height collapse, no layout shift) -->
        <div class=${classMap({ 'apply-row': true, visible: hasChanges })}>
          <ha-button variant="brand" appearance="filled" size="small"
            .disabled=${this._applying} .loading=${this._applying}
            @click=${this._applyAll}
          >${this._applySuccess ? html`<ha-icon icon="mdi:check" slot="start"></ha-icon>` : nothing}${localize('tuning_card.apply')}</ha-button>
        </div>

        ${this._config.show_last_updated ? html`
          <div class="footer-meta">${this._renderLastUpdated(this._config.outdoor_entity)}</div>
        ` : nothing}
      </ha-card>
    `;
  }
}
