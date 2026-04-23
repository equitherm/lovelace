import { css, CSSResultGroup, LitElement, PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { HomeAssistant } from "../../ha";
import { animations } from "../entity-styles";
import { defaultColorCss, defaultDarkColorCss } from "../colors";
import { themeColorCss, themeVariables } from "../theme";
import { isImperial as checkImperial, celsiusToDisplay, displayToCelsius, celsiusToDisplayDelta, displayDeltaToCelsius } from "../temperature";

export function computeDarkMode(hass?: HomeAssistant): boolean {
  if (!hass) return false;
  return hass.themes.darkMode;
}

export class EquithermBaseElement extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has("hass") && this.hass) {
      const currentDarkMode = computeDarkMode(changedProps.get("hass"));
      const newDarkMode = computeDarkMode(this.hass);
      if (currentDarkMode !== newDarkMode) {
        this.toggleAttribute("dark-mode", newDarkMode);
      }
    }
  }

  /** Whether HA is configured for °F */
  protected get _isImperial(): boolean {
    return checkImperial(this.hass);
  }

  /** Convert an absolute °C value to the user's display unit */
  protected _toDisplayTemp(celsius: number): number {
    return celsiusToDisplay(celsius, this._isImperial);
  }

  /** Convert a display-unit value (°F or °C) back to °C for calculations */
  protected _fromDisplayTemp(display: number): number {
    return displayToCelsius(display, this._isImperial);
  }

  /** Convert a °C delta to the user's display unit (scales only, no offset) */
  protected _toDisplayDelta(celsius: number): number {
    return celsiusToDisplayDelta(celsius, this._isImperial);
  }

  /** Convert a display-unit delta back to °C */
  protected _fromDisplayDelta(display: number): number {
    return displayDeltaToCelsius(display, this._isImperial);
  }

  static get styles(): CSSResultGroup {
    return [
      animations,
      css`
        :host {
          ${defaultColorCss}
        }
        :host([dark-mode]) {
          ${defaultDarkColorCss}
        }
        :host {
          ${themeColorCss}
          ${themeVariables}
        }
      `,
    ];
  }
}
