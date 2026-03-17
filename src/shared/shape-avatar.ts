import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { property, customElement } from "lit/decorators.js";

@customElement("eq-shape-avatar")
export class ShapeAvatar extends LitElement {
  @property() public picture_url?: string;

  protected render(): TemplateResult {
    return html`
      <div class="shape">
        ${this.picture_url
          ? html`<img src=${this.picture_url} />`
          : html`<slot></slot>`}
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        flex: none;
      }
      .shape {
        position: relative;
        width: var(--icon-size);
        height: var(--icon-size);
        border-radius: var(--icon-border-radius);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "eq-shape-avatar": ShapeAvatar;
  }
}
