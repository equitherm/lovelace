import { LitElement, html, css, nothing, type CSSResultGroup } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import setupCustomlocalize from '../localize';

@customElement('eq-manual-overlay')
export class EqManualOverlay extends LitElement {
  @state() private _active = false;
  private _hostEl?: Element;
  private _observer?: MutationObserver;

  connectedCallback(): void {
    super.connectedCallback();
    const root = this.getRootNode() as ShadowRoot;
    this._hostEl = root.host as Element;
    if (!this._hostEl) return;

    this._active = this._hostEl.hasAttribute('manual-override');
    this._observer = new MutationObserver(() => {
      this._active = this._hostEl!.hasAttribute('manual-override');
    });
    this._observer.observe(this._hostEl, {
      attributes: true,
      attributeFilter: ['manual-override'],
    });
  }

  disconnectedCallback(): void {
    this._observer?.disconnect();
    super.disconnectedCallback();
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        z-index: 10;
      }
      .chip {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 5px 10px;
        border-radius: 99px;
        background: color-mix(in srgb, var(--card-background-color, #fff) 80%, transparent);
        border: 1px solid color-mix(in srgb, var(--divider-color, rgba(0,0,0,0.12)) 60%, transparent);
        color: var(--secondary-text-color);
        font-size: 11px;
        font-weight: 500;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }
      .chip ha-icon {
        --mdc-icon-size: 14px;
        opacity: 0.7;
      }
    `;
  }

  protected render() {
    if (!this._active) return nothing;
    const localize = setupCustomlocalize(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((this.getRootNode() as ShadowRoot)?.host as any)?.hass
    );
    return html`
      <div class="chip">
        <ha-icon icon="mdi:hand-back-right"></ha-icon>
        ${localize('common.manual_override')}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eq-manual-overlay': EqManualOverlay;
  }
}
