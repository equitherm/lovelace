// src/utils/base/echart-card.ts
import { html, css, nothing, type CSSResultGroup, type PropertyValues, type TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import type { EChartsOption } from 'echarts/types/dist/shared';
import { EquithermBaseCard, type EquithermCardConfig } from './base-card';
import { formatTime } from '../../ha';
import type { LovelaceGridOptions } from '../../ha/panels/lovelace/types';
import type { HomeAssistant } from '../../ha/types';

export interface EChartConfig {
  options: EChartsOption;
  data: EChartsOption['series'];
}

export abstract class EquithermEChartCard<TConfig extends EquithermCardConfig> extends EquithermBaseCard<TConfig> {

  @state() protected _echartConfig?: EChartConfig;

  public override getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: 5, min_rows: 5 };
  }

  public override getCardSize(): number {
    return 3;
  }

  protected abstract _buildEChartOptions(): EChartConfig;

  protected _formatChartTime(timestampMs: number): string {
    return formatTime(new Date(timestampMs), this.hass!.locale);
  }

  protected _formatChartDateTime(timestampMs: number): string {
    const date = new Date(timestampMs);
    const weekday = date.toLocaleDateString(this.hass?.locale?.language, { weekday: 'short' });
    return `${weekday} ${formatTime(date, this.hass!.locale)}`;
  }

  protected _updateChartConfig(): void {
    if (this._config && this.hass) {
      this._echartConfig = this._buildEChartOptions();
    }
  }

  protected override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('hass')) {
      const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
      const tempChanged = oldHass &&
        this.hass?.config?.unit_system?.temperature !== oldHass.config?.unit_system?.temperature;
      const timeFormatChanged = oldHass &&
        this.hass?.locale?.time_format !== oldHass.locale?.time_format;
      if (tempChanged || timeFormatChanged) {
        this._updateChartConfig();
      }
    }
  }

  protected _onChartReconnected(): void {}

  protected _onChartDisconnecting(): void {}

  public override connectedCallback(): void {
    super.connectedCallback();
    if (this._config && this.hass) {
      this._onChartReconnected();
    }
  }

  public override disconnectedCallback(): void {
    this._onChartDisconnecting();
    super.disconnectedCallback();
  }

  protected _renderChart(): TemplateResult | typeof nothing {
    if (!this._echartConfig) return nothing;
    const { options, data } = this._echartConfig;
    return html`
      <div class="chart-wrapper">
        <ha-chart-base
          .hass=${this.hass}
          .options=${options}
          .data=${data}
          hide-reset-button
        ></ha-chart-base>
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    return [super.styles, css`
      :host([manual-override]) .chart-wrapper {
        opacity: 0.18;
        transition: opacity 400ms ease;
        pointer-events: none;
      }
      .chart-wrapper {
        flex: 1;
        min-height: 0;
        position: relative;
      }
    `];
  }
}
