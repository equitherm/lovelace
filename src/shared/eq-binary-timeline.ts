// src/shared/eq-binary-timeline.ts
import { LitElement, html, css, type CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const DEFAULT_BAR_HEIGHT = 16;
const DEFAULT_ON_COLOR = '#f97316';
const DEFAULT_OFF_COLOR = 'rgba(128,128,128,0.15)';

export interface BinarySegment {
  start: number;
  end: number;
  state: 'on' | 'off';
}

@customElement('eq-binary-timeline')
export class EqBinaryTimeline extends LitElement {
  @property({ attribute: false }) public hass!: any;
  @property({ attribute: false }) public segments: BinarySegment[] = [];
  @property({ attribute: false }) public startTime: number = 0;
  @property({ attribute: false }) public endTime: number = 0;
  @property({ attribute: false }) public onColor: string = DEFAULT_ON_COLOR;
  @property({ attribute: false }) public offColor: string = DEFAULT_OFF_COLOR;
  @property({ type: Number }) public barHeight: number = DEFAULT_BAR_HEIGHT;

  static get styles(): CSSResultGroup {
    return css`
      :host { display: block; }
      ha-chart-base {
        display: block;
        --chart-max-height: 55px;
        height: 55px;
      }
    `;
  }

  protected render() {
    const seriesData = this.segments.map(seg => ([
      0,
      seg.start,
      seg.end,
      seg.state === 'on' ? this.onColor : this.offColor,
    ]));

    const onColor = this.onColor;
    const barHeight = this.barHeight;
    const locale = this.hass?.locale?.language;

    const chartOptions = {
      xAxis: {
        type: 'time' as const,
        min: this.startTime,
        max: this.endTime,
        axisTick: { show: false },
        axisLine: { show: false },
        splitLine: { show: false },
        axisLabel: {
          fontSize: 10,
          hideOverlap: true,
        },
      },
      yAxis: {
        type: 'category' as const,
        show: false,
        data: ['flame'],
      },
      grid: {
        top: 5,
        bottom: 20,
        left: 0,
        right: 0,
      },
      tooltip: {
        show: true,
        trigger: 'item' as const,
        confine: true,
        position: 'bottom' as const,
        formatter: (params: any) => {
          const val = params.value;
          const startMs = val[1] as number;
          const endMs = val[2] as number;
          const color = val[3] as string;
          const state = color === onColor ? 'ON' : 'OFF';
          const duration = Math.round((endMs - startMs) / 1000);
          const durStr = duration >= 60
            ? `${Math.floor(duration / 60)}m ${duration % 60}s`
            : `${duration}s`;
          const marker = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${color};"></span>`;
          const timeStr = new Date(startMs).toLocaleTimeString(
            locale,
            { hour: '2-digit', minute: '2-digit' },
          );
          return `${marker}<b>${state}</b> &nbsp;${durStr}<br/><span style="opacity:0.6">${timeStr}</span>`;
        },
      },
      toolbox: { show: false },
      dataZoom: [],
      legend: { show: false },
    };

    const chartData = [
      {
        type: 'custom' as const,
        renderItem: (_params: any, api: any): any => {
          const categoryIndex = api.value(0);
          const start = api.coord([api.value(1), categoryIndex]);
          const end = api.coord([api.value(2), categoryIndex]);
          const coordSys = _params.coordSys;

          let x = start[0];
          let y = start[1] - barHeight / 2;
          let width = end[0] - start[0];

          if (width < 2) width = 2;

          if (x < coordSys.x) {
            width -= coordSys.x - x;
            x = coordSys.x;
          }
          if (x + width > coordSys.x + coordSys.width) {
            width = coordSys.x + coordSys.width - x;
          }
          if (width <= 0) return null;

          return {
            type: 'rect' as const,
            shape: { x, y, width: Math.max(width, 1), height: barHeight, r: 3 },
            style: { fill: api.value(3) },
          };
        },
        data: seriesData,
        dimensions: ['id', 'start', 'end', 'color'],
        encode: { x: [1, 2], y: 0 },
        progressive: 0,
      },
    ];

    return html`
      <ha-chart-base
        .hass=${this.hass}
        .data=${chartData}
        .options=${chartOptions}
        hide-reset-button
      ></ha-chart-base>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eq-binary-timeline': EqBinaryTimeline;
  }
}
