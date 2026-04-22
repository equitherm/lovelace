import { html, css, nothing, type TemplateResult } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import type { HomeAssistant } from '../ha/types';
import type { HassEntity } from 'home-assistant-js-websocket';
import type { TuningDialogConfig } from './eq-tuning-dialog-config';
import { EquithermBaseElement } from '../utils/base';
import { buildCurveSeries, flowAtOutdoor } from '../utils/curve';
import { resolveRgbColor } from '../utils/hvac-colors';
import { formatNumber } from '../ha';
import setupCustomlocalize from '../localize';
import './eq-param-bar';
import type { EChartConfig } from '../utils/base/echart-card';

@customElement('eq-tuning-dialog')
export class EqTuningDialog extends EquithermBaseElement {
  @property({ attribute: false }) override hass!: HomeAssistant;
  @property({ attribute: false }) config?: TuningDialogConfig;
  @property({ type: Boolean }) open = false;

  @state() private _proposedHc = 0.9;
  @state() private _proposedShift = 0;
  @state() private _applying = false;
  @state() private _applySuccess = false;
  @state() private _chartConfig?: EChartConfig;
  private _lastHcState: number | null = null;
  private _lastShiftState: number | null = null;
  private _successTimer?: ReturnType<typeof setTimeout>;

  // --- Dirty state ---

  private get _hcChanged(): boolean {
    return Math.abs(this._proposedHc - this._currentHc) > this._hcStep / 2;
  }
  private get _shiftChanged(): boolean {
    return Math.abs(this._proposedShift - this._currentShift) > this._shiftStep / 2;
  }
  private get _isDirty(): boolean {
    return this._hcChanged || this._shiftChanged;
  }

  // --- Lifecycle ---

  override disconnectedCallback(): void {
    clearTimeout(this._successTimer);
    super.disconnectedCallback();
  }

  protected override willUpdate(changedProps: Map<string, unknown>): void {
    super.willUpdate(changedProps);

    // Sync proposed values when source data changes
    if (changedProps.has('config') && this.config) {
      this._lastHcState = null;
      this._lastShiftState = null;
      this._syncProposedValues();
    } else if (changedProps.has('open') && this.open) {
      this._syncProposedValues();
    } else if (changedProps.has('hass') && this.hass && this.config) {
      this._syncProposedValues();
    }

    // Rebuild chart in the same update cycle to avoid double-render flash
    if (this.config && this.hass && this.open) {
      const chartNeedsUpdate =
        changedProps.has('config') ||
        changedProps.has('open') ||
        changedProps.has('_proposedHc') ||
        changedProps.has('_proposedShift') ||
        (changedProps.has('hass') && this._hassRelevantChange(changedProps));

      if (chartNeedsUpdate) {
        this._chartConfig = this._buildChart();
      }
    }
  }

  private _hassRelevantChange(changedProps: Map<string, unknown>): boolean {
    const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
    return !oldHass || this._relevantStateChanged(oldHass);
  }

  private _relevantStateChanged(oldHass: HomeAssistant): boolean {
    const cfg = this.config!;
    const entities = [
      cfg.outdoor_entity, cfg.climate_entity, cfg.hc_entity, cfg.shift_entity,
      cfg.n_entity, cfg.min_flow_entity, cfg.max_flow_entity,
    ].filter(Boolean) as string[];
    return entities.some(id =>
      this.hass!.states[id]?.state !== oldHass.states[id]?.state
    );
  }

  // --- Entity helpers ---

  private _entityState(entityId: string | undefined): HassEntity | undefined {
    if (!entityId || !this.hass) return undefined;
    return this.hass.states[entityId] as HassEntity | undefined;
  }

  private _entityAttr<T = unknown>(entityId: string | undefined, key: string): T | undefined {
    return this._entityState(entityId)?.attributes?.[key] as T | undefined;
  }

  private _resolveEntityNumber(entityId: string | undefined, fallback: number): number {
    const s = this._entityState(entityId);
    if (!s) return fallback;
    const val = parseFloat(s.state);
    return isNaN(val) ? fallback : val;
  }

  private _openMoreInfo(entityId: string | undefined): void {
    if (entityId && this.hass) {
      const event = new CustomEvent('hass-more-info', {
        bubbles: true,
        composed: true,
        detail: { entityId },
      });
      this.dispatchEvent(event);
    }
  }

  // --- Entity getters ---

  private get _climateState(): HassEntity | undefined {
    return this._entityState(this.config!.climate_entity);
  }
  private get _tTarget(): number {
    return this._climateState?.attributes?.temperature ?? 21;
  }
  private get _currentN(): number {
    const cfg = this.config!;
    return cfg.curve_from_entities
      ? this._resolveEntityNumber(cfg.n_entity, cfg.n)
      : cfg.n;
  }
  private get _currentHc(): number {
    return this._resolveEntityNumber(this.config!.hc_entity, 0.9);
  }
  private get _currentShift(): number {
    return this._resolveEntityNumber(this.config!.shift_entity, 0);
  }
  private get _tOutdoor(): number | null {
    const s = this._entityState(this.config!.outdoor_entity);
    if (!s) return null;
    const v = parseFloat(s.state);
    return isNaN(v) ? null : this._fromDisplayTemp(v);
  }
  private get _hcMin(): number { return this._entityAttr<number>(this.config!.hc_entity, 'min') ?? 0.5; }
  private get _hcMax(): number { return this._entityAttr<number>(this.config!.hc_entity, 'max') ?? 3.0; }
  private get _hcStep(): number { return this._entityAttr<number>(this.config!.hc_entity, 'step') ?? 0.1; }
  private get _shiftMin(): number { return this._entityAttr<number>(this.config!.shift_entity, 'min') ?? -15; }
  private get _shiftMax(): number { return this._entityAttr<number>(this.config!.shift_entity, 'max') ?? 15; }
  private get _shiftStep(): number { return this._entityAttr<number>(this.config!.shift_entity, 'step') ?? 1; }
  private get _isWWSD(): boolean {
    if (!this.config?.climate_entity) return false;
    const tOutdoor = this._tOutdoor;
    return tOutdoor !== null && tOutdoor >= this._tTarget;
  }

  private _syncProposedValues(): void {
    if (!this.hass || !this.config) return;
    const hc = this._currentHc;
    const shift = this._currentShift;
    if (this._lastHcState !== hc) { this._proposedHc = hc; this._lastHcState = hc; }
    if (this._lastShiftState !== shift) { this._proposedShift = shift; this._lastShiftState = shift; }
  }

  // --- Chart ---

  private _buildChart(): EChartConfig {
    const localize = setupCustomlocalize(this.hass);
    const cfg = this.config!;
    const minFlow = cfg.curve_from_entities ? this._resolveEntityNumber(cfg.min_flow_entity, cfg.min_flow) : cfg.min_flow;
    const maxFlow = cfg.curve_from_entities ? this._resolveEntityNumber(cfg.max_flow_entity, cfg.max_flow) : cfg.max_flow;

    const currentParams = { tTarget: this._tTarget, hc: this._currentHc, n: this._currentN, shift: this._currentShift, minFlow, maxFlow };
    const proposedParams = { tTarget: this._tTarget, hc: this._proposedHc ?? this._currentHc, n: this._currentN, shift: this._proposedShift ?? this._currentShift, minFlow, maxFlow };

    const heatingColor = resolveRgbColor(this, 'heating');
    const rawProposed = getComputedStyle(this).getPropertyValue('--rgb-state-climate-cool').trim()
      || getComputedStyle(this).getPropertyValue('--rgb-primary-color').trim()
      || '33, 150, 243';
    const proposedColor = `rgb(${rawProposed})`;
    const wwsdFill = `rgba(${getComputedStyle(this).getPropertyValue('--rgb-warning').trim() || '255, 167, 38'}, 0.08)`;

    const currentSeries = buildCurveSeries(currentParams, cfg.t_out_min, cfg.t_out_max);
    const proposedSeries = buildCurveSeries(proposedParams, cfg.t_out_min, cfg.t_out_max);

    // Convert curve data from °C to display units for the chart
    const currentDisplaySeries = currentSeries.map(p => ({
      x: this._toDisplayTemp(p.x),
      y: this._toDisplayTemp(p.y),
    }));
    const proposedDisplaySeries = proposedSeries.map(p => ({
      x: this._toDisplayTemp(p.x),
      y: this._toDisplayTemp(p.y),
    }));

    const tOutdoor = this._tOutdoor;

    const operatingPointSeries: Record<string, unknown>[] = [];
    if (tOutdoor !== null) {
      const currentFlow = flowAtOutdoor(currentParams, tOutdoor);
      operatingPointSeries.push({
        type: 'line' as const,
        name: 'operating-point',
        data: [{
          value: [this._toDisplayTemp(tOutdoor), this._toDisplayTemp(currentFlow)] as [number, number],
          symbolSize: 9,
          itemStyle: { color: heatingColor, borderColor: '#ffffff', borderWidth: 2 },
        }],
        showSymbol: true,
        symbol: 'circle',
        lineStyle: { width: 0 },
        tooltip: { show: false },
      });
    }

    const wwsdSeries: Record<string, unknown>[] = [];
    if (this._isWWSD) {
      wwsdSeries.push({
        type: 'line' as const,
        name: 'wwsd',
        data: [
          [this._toDisplayTemp(cfg.t_out_max), this._toDisplayTemp(maxFlow + 5)] as [number, number],
          [this._toDisplayTemp(this._tTarget), this._toDisplayTemp(maxFlow + 5)] as [number, number],
        ],
        showSymbol: false,
        lineStyle: { width: 0 },
        areaStyle: { color: wwsdFill },
        tooltip: { show: false },
      });
    }

    const tempUnit = this.hass?.config?.unit_system?.temperature ?? '°C';

    return {
      options: {
        animation: false,
        xAxis: {
          type: 'value' as const,
          min: this._toDisplayTemp(cfg.t_out_min),
          max: this._toDisplayTemp(cfg.t_out_max),
          inverse: true,
          axisLabel: { fontSize: 10, formatter: (val: number) => `${val.toFixed(0)}`, hideOverlap: true },
          axisTick: { show: false },
          axisLine: { show: false },
        },
        yAxis: {
          type: 'value' as const,
          min: this._toDisplayTemp(minFlow - 5),
          max: this._toDisplayTemp(maxFlow + 5),
          axisLabel: { fontSize: 10 },
        },
        grid: { top: 10, right: 15, bottom: 25, left: 35 },
        tooltip: {
          trigger: 'axis' as const,
          backgroundColor: 'rgba(var(--rgb-card-background-color, 255, 255, 255), 0.95)',
          borderColor: 'var(--divider-color, rgba(0,0,0,0.12))',
          borderWidth: 1,
          padding: [8, 12],
          textStyle: { color: 'var(--primary-text-color)', fontSize: 12 },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter: (params: any) => {
            const arr = Array.isArray(params) ? params : [params];
            const curveParam = arr.find(
              (p: any) => p.seriesName === localize('tuning_dialog.current') || p.seriesName === localize('tuning_dialog.proposed'),
            );
            if (!curveParam) return '';
            const outdoorVal = curveParam.value[0] as number;
            let out = '';
            for (const p of arr) {
              if (p.seriesName === 'operating-point' || p.seriesName === 'wwsd') continue;
              const marker = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${p.color};"></span>`;
              const dashLabel = p.lineStyle?.type === 'dashed' ? ` (${localize('tuning_dialog.proposed')})` : '';
              out += `${marker}${p.seriesName}${dashLabel}: <b>${(p.value[1] as number).toFixed(1)}${tempUnit}</b><br/>`;
            }
            out += `<span style="opacity:0.6">${outdoorVal.toFixed(1)}${tempUnit} ${localize('tuning_dialog.outdoor_axis_suffix')}</span>`;
            return out;
          },
        },
        legend: { show: false },
      },
      data: [
        {
          type: 'line' as const,
          name: localize('tuning_dialog.current'),
          data: currentDisplaySeries.map(p => [p.x, p.y] as [number, number]),
          showSymbol: false,
          lineStyle: { width: 2 },
          itemStyle: { color: heatingColor },
        },
        {
          type: 'line' as const,
          name: localize('tuning_dialog.proposed'),
          data: proposedDisplaySeries.map(p => [p.x, p.y] as [number, number]),
          showSymbol: false,
          lineStyle: { width: 2, type: 'dashed' as const },
          itemStyle: { color: proposedColor },
        },
        ...operatingPointSeries,
        ...wwsdSeries,
      ],
    };
  }

  // --- Service calls ---

  private async _recalculate(): Promise<void> {
    const svc = this.config!.recalculate_service;
    if (!svc || !this.hass) return;
    const [domain, service] = svc.split('.', 2);
    if (!domain || !service) return;
    if (!this.hass.services[domain]?.[service]) return;
    await this.hass.callService(domain, service, {});
  }

  private async _applyAll(): Promise<void> {
    if (!this.hass || !this.config) return;
    this._applying = true;
    try {
      const hcChanged = this._hcChanged;
      const shiftChanged = this._shiftChanged;
      if (hcChanged) await this.hass.callService('number', 'set_value', { entity_id: this.config.hc_entity, value: this._proposedHc });
      if (shiftChanged) await this.hass.callService('number', 'set_value', { entity_id: this.config.shift_entity, value: this._proposedShift });
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

  private _resetAll(): void {
    this._proposedHc = this._currentHc;
    this._proposedShift = this._currentShift;
  }

  private _stepHc(dir: number): void {
    this._proposedHc = Math.min(this._hcMax, Math.max(this._hcMin, parseFloat((this._proposedHc + dir * this._hcStep).toFixed(4))));
  }

  /** Step shift in °C — conversion to display unit happens only at render. */
  private _stepShift(dir: number): void {
    this._proposedShift = Math.min(this._shiftMax, Math.max(this._shiftMin, parseFloat((this._proposedShift + dir * this._shiftStep).toFixed(4))));
  }

  // --- Render ---

  override render() {
    if (!this.open || !this.config || !this.hass) return nothing;
    const localize = setupCustomlocalize(this.hass);
    const hcDecimals = this._hcStep < 1 ? Math.ceil(-Math.log10(this._hcStep)) : 0;
    const shiftDecimals = this._shiftStep < 1 ? Math.ceil(-Math.log10(this._shiftStep)) : 0;
    const dirty = this._isDirty;
    const hcDelta = this._proposedHc - this._currentHc;
    const shiftDelta = this._proposedShift - this._currentShift;

    return html`
      <ha-dialog
        .open=${true}
        .headerTitle=${localize('tuning_dialog.default_title')}
        @closed=${() => { this.open = false; this.dispatchEvent(new CustomEvent('closed')); }}
        flexcontent
      >
        <div class="dialog-chart">
          ${this._chartConfig ? html`
            <ha-chart-base .hass=${this.hass} .options=${this._chartConfig.options} .data=${this._chartConfig.data} height="100%" hide-reset-button></ha-chart-base>
          ` : nothing}
        </div>

        <div class="controls">
          <!-- HC panel -->
          <div class="ctrl-panel">
            <span class="ctrl-label">${localize('tuning_dialog.hc_short')}</span>
            <div class="hero-row">
              <span class="hero-value">${this._proposedHc.toFixed(hcDecimals)}</span>
              ${Math.abs(hcDelta) > this._hcStep / 2 ? html`
                <span class="ctrl-delta ${hcDelta > 0 ? 'pos' : 'neg'}">${formatNumber(hcDelta, this.hass?.locale, { minimumFractionDigits: hcDecimals, maximumFractionDigits: hcDecimals, signDisplay: 'always' })}</span>
              ` : nothing}
            </div>
            <div class="step-row">
              <ha-icon-button @click=${() => this._stepHc(-1)}><ha-icon icon="mdi:minus"></ha-icon></ha-icon-button>
              <ha-icon-button @click=${() => this._stepHc(1)}><ha-icon icon="mdi:plus"></ha-icon></ha-icon-button>
            </div>
            <eq-param-bar .min=${this._hcMin} .max=${this._hcMax} .value=${this._proposedHc} indicator></eq-param-bar>
          </div>
          <div class="ctrl-divider"></div>
          <!-- Shift panel -->
          <div class="ctrl-panel">
            <span class="ctrl-label">${localize('tuning_dialog.shift_short')}</span>
            <div class="hero-row">
              <span class="hero-value">${this._toDisplayDelta(this._proposedShift).toFixed(shiftDecimals)}${this.hass?.config?.unit_system?.temperature ?? '°C'}</span>
              ${Math.abs(shiftDelta) > this._shiftStep / 2 ? html`
                <span class="ctrl-delta ${shiftDelta > 0 ? 'pos' : 'neg'}">${formatNumber(this._toDisplayDelta(shiftDelta), this.hass?.locale, { minimumFractionDigits: shiftDecimals, maximumFractionDigits: shiftDecimals, signDisplay: 'always' })}${this.hass?.config?.unit_system?.temperature ?? '°C'}</span>
              ` : nothing}
            </div>
            <div class="step-row">
              <ha-icon-button @click=${() => this._stepShift(-1)}><ha-icon icon="mdi:minus"></ha-icon></ha-icon-button>
              <ha-icon-button @click=${() => this._stepShift(1)}><ha-icon icon="mdi:plus"></ha-icon></ha-icon-button>
            </div>
            <eq-param-bar .min=${this._toDisplayDelta(this._shiftMin)} .max=${this._toDisplayDelta(this._shiftMax)} .value=${this._toDisplayDelta(this._proposedShift)} centered indicator></eq-param-bar>
          </div>
        </div>

        ${this._renderKpi()}

        <div slot="footer">
          <ha-button size="small" @click=${this._resetAll} .disabled=${!dirty}>${localize('tuning_dialog.reset')}</ha-button>
          <ha-button variant="brand" appearance="filled" size="small"
            .disabled=${!dirty || this._applying} .loading=${this._applying}
            @click=${async () => { await this._applyAll(); if (this._applySuccess) { this.open = false; this.dispatchEvent(new CustomEvent('closed')); } }}
          >${this._applySuccess ? html`<ha-icon icon="mdi:check" slot="start"></ha-icon>` : nothing}${localize('tuning_dialog.apply')}</ha-button>
        </div>
      </ha-dialog>
    `;
  }

  private _renderKpi(): TemplateResult | typeof nothing {
    if (!this.config || !this.hass) return nothing;
    const localize = setupCustomlocalize(this.hass);
    const unit = this.hass?.config?.unit_system?.temperature ?? '°C';
    const fmtNum = (v: number) => `${formatNumber(v, this.hass?.locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} ${unit}`;
    const outdoorState = this._entityState(this.config.outdoor_entity);
    const outdoorVal = outdoorState ? parseFloat(outdoorState.state) : NaN;
    const outdoor = isNaN(outdoorVal) ? '—' : fmtNum(outdoorVal);
    const flowState = this._entityState(this.config.flow_entity);
    const flowVal = flowState ? parseFloat(flowState.state) : NaN;
    const flow = isNaN(flowVal) ? '—' : fmtNum(flowVal);
    const roomTemp = this._climateState?.attributes?.current_temperature;
    const room = roomTemp != null && !isNaN(roomTemp) ? fmtNum(roomTemp) : '—';

    return html`
      <div class="kpi-footer">
        <div class="kpi-block" @click=${() => this._openMoreInfo(this.config!.outdoor_entity)}>
          <div class="kpi-value">${outdoor}</div>
          <div class="kpi-label">${localize('common.outdoor')}</div>
        </div>
        <div class="kpi-divider"></div>
        <div class="kpi-block" @click=${() => this._openMoreInfo(this.config!.flow_entity)}>
          <div class="kpi-value flow">${flow}</div>
          <div class="kpi-label">${localize('common.flow')}</div>
        </div>
        <div class="kpi-divider"></div>
        <div class="kpi-block" @click=${() => this._openMoreInfo(this.config!.climate_entity)}>
          <div class="kpi-value">${room}</div>
          <div class="kpi-label">${localize('common.room')}</div>
        </div>
      </div>
    `;
  }

  static override get styles() {
    return [
      super.styles,
      css`
        .dialog-chart { height: 250px; padding: 0 4px; }
        .dialog-chart ha-chart-base { height: 100%; }
        .controls {
          display: flex; flex-shrink: 0;
          border-top: 1px solid var(--divider-color);
          margin-top: 4px;
        }
        .ctrl-panel {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; padding: 10px 4px 6px; gap: 4px;
        }
        .ctrl-divider {
          width: 1px; background: var(--divider-color);
          margin: 6px 0; flex-shrink: 0;
        }
        .ctrl-label {
          font-size: 10px; font-weight: var(--ha-font-weight-medium, 500);
          text-transform: uppercase; letter-spacing: 0.07em;
          color: var(--secondary-text-color);
        }
        .hero-row { display: flex; align-items: baseline; gap: 6px; }
        .hero-value {
          font-size: 1.5rem; font-weight: 600;
          font-variant-numeric: tabular-nums;
          color: var(--primary-text-color); line-height: 1;
        }
        .step-row { display: flex; gap: 8px; }
        .step-row ha-icon-button {
          --mdc-icon-button-size: 36px; --mdc-icon-size: 20px;
          color: rgb(var(--rgb-primary, 33, 150, 243));
        }
        .ctrl-delta {
          font-size: 10px; font-weight: var(--ha-font-weight-medium, 500);
          font-variant-numeric: tabular-nums; line-height: 1;
        }
        .ctrl-delta.pos { color: var(--success-color, #4caf50); }
        .ctrl-delta.neg { color: var(--error-color, #e53935); }
        .ctrl-panel eq-param-bar {
          width: 100%; padding: 4px 8px 0; box-sizing: border-box;
        }
        .kpi-footer {
          display: flex; align-items: center; padding: 8px 12px;
          gap: 0; flex-shrink: 0;
        }
        .kpi-block {
          flex: 1; text-align: center; cursor: pointer;
          padding: 4px 0;
        }
        .kpi-value {
          font-size: var(--ha-font-size-l, 1.1rem);
          font-weight: 600; font-variant-numeric: tabular-nums;
          color: var(--primary-text-color);
        }
        .kpi-label {
          font-size: 10px; color: var(--secondary-text-color);
          text-transform: uppercase; letter-spacing: 0.05em;
        }
        .kpi-divider {
          width: 1px; height: 28px;
          background: var(--divider-color); flex-shrink: 0;
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eq-tuning-dialog': EqTuningDialog;
  }
}
