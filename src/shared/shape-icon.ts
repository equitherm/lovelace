// src/shared/shape-icon.ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type IconShape = 'circle' | 'square' | 'pill';

/**
 * Icon with a colored background shape.
 * Colors are controlled via CSS variables set on the parent:
 * - --icon-color: Icon color
 * - --shape-color: Background color
 *
 * Supports a badge slot for positioning small badges on the icon.
 */
@customElement('eq-shape-icon')
export class ShapeIcon extends LitElement {
  @property() icon?: string;
  @property() shape: IconShape = 'circle';
  @property({ type: Number }) size = 40;
  @property({ type: Boolean }) disabled = false;

  static styles = css`
    :host {
      --icon-color: var(--primary-text-color);
      --shape-color: var(--card-background-color, #fff);
      --icon-size: 24px;
      flex: none;
    }
    .shape {
      position: relative;
      width: var(--shape-size, 40px);
      height: var(--shape-size, 40px);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--shape-color);
      transition: background-color 280ms ease-in-out;
    }
    :host([shape="square"]) .shape {
      border-radius: 12px;
    }
    :host([shape="pill"]) .shape {
      border-radius: 4px;
    }
    .shape.disabled {
      opacity: 0.5;
    }
    ha-icon {
      color: var(--icon-color);
      --mdc-icon-size: var(--icon-size);
    }
    /* Badge positioning - matches mushroom */
    .shape ::slotted(*[slot="badge"]) {
      position: absolute;
      top: -3px;
      right: -3px;
    }
  `;

  protected render() {
    return html`
      <div
        class=${classMap({ shape: true, disabled: this.disabled })}
        style=${`--shape-size: ${this.size}px;`}
      >
        <ha-icon .icon=${this.icon}></ha-icon>
        <slot name="badge"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eq-shape-icon': ShapeIcon;
  }
}
