// src/components/shape-icon.ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type IconShape = 'circle' | 'square' | 'pill';

/**
 * Icon with a colored background shape.
 * Used for consistent entity icon presentation across cards.
 */
@customElement('eq-shape-icon')
export class ShapeIcon extends LitElement {
  @property() icon?: string;
  @property() color?: string;
  @property({ attribute: 'bg-color' }) bgColor?: string;
  @property() shape: IconShape = 'circle';
  @property({ type: Number }) size = 40;

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--eq-shape-radius, 50%);
      background: var(--eq-shape-bg, var(--card-background-color, #fff));
    }
    :host([shape="square"]) {
      --eq-shape-radius: 12px;
    }
    :host([shape="pill"]) {
      --eq-shape-radius: 4px;
    }
    ha-icon {
      --mdc-icon-size: var(--eq-icon-size, 24px);
      color: var(--eq-shape-color, var(--primary-text-color));
    }
  `;

  protected render() {
    const styles = `
      width: ${this.size}px;
      height: ${this.size}px;
      ${this.bgColor ? `--eq-shape-bg: ${this.bgColor};` : ''}
      ${this.color ? `--eq-shape-color: ${this.color};` : ''}
    `;

    return html`
      <div style=${styles}>
        <ha-icon .icon=${this.icon}></ha-icon>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eq-shape-icon': ShapeIcon;
  }
}
