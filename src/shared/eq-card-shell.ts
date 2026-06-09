import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 * eq-card-shell — pure CSS Grid layout container for equitherm cards.
 *
 * The host IS the grid. Slotted elements ARE the grid items.
 * No <ha-card> wrapper — the card renders that separately.
 *
 * Slots:
 *   header — natural height (auto row)
 *   main   — fills remaining space (1fr row), min-height 0 for overflow
 *   footer — natural height (auto row), multiple footer slots stack naturally
 */
@customElement('eq-card-shell')
export class EqCardShell extends LitElement {
  render() {
    return html`
      <slot name="header"></slot>
      <slot name="main"></slot>
      <slot name="footer"></slot>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: grid;
        grid-template-rows: auto 1fr auto;
        height: 100%;
      }
      ::slotted([slot="main"]) {
        min-height: 0;
        overflow: hidden;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eq-card-shell': EqCardShell;
  }
}
