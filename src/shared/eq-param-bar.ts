import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
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
  @property({ type: Number }) step = 1;
  @property({ type: Boolean, reflect: true }) interactive = false;
  @property({ type: String }) ariaUnit?: string;

  @state() private _pressed = false;

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
    :host([interactive]) .track {
      cursor: pointer;
      touch-action: none;
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
    .pressed .fill,
    .pressed .dot {
      transition: none;
    }
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `;

  /** Cached track element reference from pointerdown, avoids null issues during drag */
  private _trackEl: HTMLElement | null = null;

  private _pct(v: number): number {
    const range = this.max - this.min;
    if (range === 0) return 0;
    return Math.max(0, Math.min(100, ((v - this.min) / range) * 100));
  }

  private _onRangeInput(e: Event) {
    const value = parseFloat((e.target as HTMLInputElement).value);
    if (value === this.value) return;
    this.value = value;
    this.dispatchEvent(
      new CustomEvent('value-changed', {
        detail: { value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _onPointerDown(e: PointerEvent) {
    if (!this.interactive) return;
    this._pressed = true;
    this._trackEl = e.currentTarget as HTMLElement;
    this._trackEl.setPointerCapture(e.pointerId);
    this._updateFromPointer(e, false);
  }

  private _onPointerMove(e: PointerEvent) {
    if (!this.interactive || !(e.buttons & 1)) return;
    this._updateFromPointer(e, false);
  }

  private _onPointerUp(e: PointerEvent) {
    if (!this.interactive) return;
    this._pressed = false;
    this._updateFromPointer(e, true);
    this._trackEl = null;
  }

  private _updateFromPointer(e: PointerEvent, final: boolean) {
    const track = this._trackEl ?? this.renderRoot.querySelector<HTMLElement>('.track');
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const raw = this.min + pct * (this.max - this.min);
    const effectiveStep = this.step || 1;
    const snapped = Math.round(raw / effectiveStep) * effectiveStep;
    const clamped = parseFloat(
      Math.max(this.min, Math.min(this.max, snapped)).toFixed(10),
    );

    if (clamped === this.value) return;

    this.value = clamped;
    this.dispatchEvent(
      new CustomEvent(final ? 'value-changed' : 'slider-moved', {
        detail: { value: clamped },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    if (this.value === null) return html`<div class="track"></div>`;

    const fillColor = this.color ?? 'var(--eq-bar-fill-color)';
    const dotColor = fillColor;
    const hiddenRange = this.interactive
      ? html`<input
          type="range"
          class="sr-only"
          min=${this.min}
          max=${this.max}
          step=${this.step}
          value=${this.value ?? 0}
          aria-valuetext="${this.value} ${this.ariaUnit ?? ''}"
          @input=${this._onRangeInput}
        />`
      : nothing;

    if (this.centered) {
      const centerPct = this._pct(0);
      const valPct = this._pct(this.value);
      const barLeft = Math.min(centerPct, valPct);
      const rawWidth = Math.abs(valPct - centerPct);
      return html`
        <div class="track${this._pressed ? ' pressed' : ''}"
          @pointerdown=${this._onPointerDown}
          @pointermove=${this._onPointerMove}
          @pointerup=${this._onPointerUp}
        >
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
          ${hiddenRange}
        </div>
      `;
    }

    const pct = this._pct(this.value);
    return html`
      <div class="track${this._pressed ? ' pressed' : ''}"
        @pointerdown=${this._onPointerDown}
        @pointermove=${this._onPointerMove}
        @pointerup=${this._onPointerUp}
      >
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
        ${hiddenRange}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eq-param-bar': EqParamBar;
  }
}
