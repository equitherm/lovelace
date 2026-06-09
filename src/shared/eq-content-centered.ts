import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 * eq-content-centered — vertical centering wrapper for shell main slot.
 *
 * Place inside <eq-card-shell slot="main"> to vertically center content
 * within the 1fr grid row. Width fills the shell. No horizontal alignment.
 */
@customElement('eq-content-centered')
export class EqContentCentered extends LitElement {
  render() {
    return html`<slot></slot>`;
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        width: 100%;
      }
      ::slotted(*) {
        width: 100%;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eq-content-centered': EqContentCentered;
  }
}
