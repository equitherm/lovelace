import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

@customElement('eq-param-bar')
export class EqParamBar extends LitElement {
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number, reflect: true }) value: number | null = null;
  @property({ type: Boolean }) centered = false;
  @property({ type: Boolean }) indicator = false;
  @property({ type: String }) color?: string;
  @property({ type: Number }) minFill = 4;

  static styles = css`
    :host {
      display: block;
      width: 100%;
      --eq-bar-height: 4px;
      --eq-bar-track-color: var(--secondary-background-color, rgba(0,0,0,0.08));
      --eq-bar-fill-color: var(--primary-color);
      --eq-bar-radius: 2px;
    }
    .track {
      width: 100%;
      height: var(--eq-bar-height);
      border-radius: var(--eq-bar-radius);
      background: var(--eq-bar-track-color);
      position: relative;
    }
    .fill {
      height: 100%;
      border-radius: var(--eq-bar-radius);
      background: var(--eq-bar-fill-color);
      transition: width 0.3s ease, left 0.3s ease;
      position: absolute;
      top: 0;
    }
    .center-mark {
      position: absolute;
      top: -1px;
      left: 50%;
      width: 2px;
      height: calc(100% + 2px);
      border-radius: 1px;
      background: var(--divider-color, rgba(0,0,0,0.2));
      transform: translateX(-1px);
    }
    .dot {
      position: absolute;
      top: 50%;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--eq-bar-fill-color);
      border: 2px solid var(--card-background-color, #fff);
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
      transform: translate(-50%, -50%);
      transition: left 0.3s ease;
      z-index: 1;
    }
  `;

  private _pct(v: number): number {
    return Math.max(0, Math.min(100, ((v - this.min) / (this.max - this.min)) * 100));
  }

  render() {
    if (this.value === null) return html`<div class="track"></div>`;

    const fillColor = this.color ?? 'var(--eq-bar-fill-color)';
    const dotColor = fillColor;

    if (this.centered) {
      const centerPct = this._pct(0);
      const valPct = this._pct(this.value);
      const barLeft = Math.min(centerPct, valPct);
      const rawWidth = Math.abs(valPct - centerPct);
      return html`
        <div class="track">
          <div class="center-mark"></div>
          ${rawWidth > 0 ? html`
            <div class="fill" style=${styleMap({
              left: `${barLeft}%`,
              width: `${rawWidth}%`,
              background: fillColor,
              minWidth: `${this.minFill}px`,
            })}></div>
          ` : nothing}
          ${this.indicator ? html`
            <div class="dot" style=${styleMap({
              left: `${valPct}%`,
              background: dotColor,
            })}></div>
          ` : nothing}
        </div>
      `;
    }

    const pct = this._pct(this.value);
    return html`
      <div class="track">
        <div class="fill" style=${styleMap({
          width: `${pct}%`,
          left: '0',
          background: fillColor,
        })}></div>
        ${this.indicator ? html`
          <div class="dot" style=${styleMap({
            left: `${pct}%`,
            background: fillColor,
          })}></div>
        ` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eq-param-bar': EqParamBar;
  }
}
