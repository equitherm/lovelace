// src/utils/base/base-editor.ts
import { LitElement, html, css, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import type { HomeAssistant } from '../../ha/types';
import type { LovelaceCardConfig } from '../../ha/data/lovelace';
import type { LovelaceCardEditor } from '../../ha/panels/lovelace/types';
import { fireEvent } from '../../ha/common/dom/fire_event';
import type { HaFormSchema } from '../form/ha-form';
import setupCustomLocalize from '../../localize';

/**
 * Abstract base class for all equitherm card editors.
 *
 * Extracts the shared boilerplate from every editor in this project:
 *   - `hass` property
 *   - `_config` / `_error` reactive state
 *   - `setConfig()` spread pattern
 *   - `_valueChanged()` (spread → transform → validate → fireEvent)
 *   - `_computeLabel` / `_computeHelper` localization helpers
 *   - Shared `static styles`
 *   - `render()` with `<ha-form>` template
 *
 * Subclasses must implement:
 *   - `setConfig(config)` — assign config (usually `{ ...config }`)
 *   - `_getSchema()` — return the ha-form schema array
 *   - `_validate(config)` — throw on invalid config
 *
 * Subclasses may override:
 *   - `_transformConfig(raw)` — pre-validation transform hook (default: identity)
 *   - `_getDisplayConfig()` — transform config for display in ha-form (default: identity)
 */
export abstract class EquithermBaseEditor<TConfig extends Record<string, unknown>>
  extends LitElement
  implements LovelaceCardEditor
{
  @property({ attribute: false }) hass!: HomeAssistant;

  @state() protected _config!: TConfig;

  @state() protected _error?: Record<string, string>;

  /**
   * Assign the editor config. Subclasses typically do:
   * ```
   * setConfig(config: LovelaceCardConfig) { this._config = { ...config } as TConfig; }
   * ```
   */
  abstract setConfig(config: LovelaceCardConfig): void;

  /** Return the ha-form schema for this editor. */
  protected abstract _getSchema(): readonly HaFormSchema[];

  /** Validate config — throw an Error if invalid. */
  protected abstract _validate(config: TConfig): void;

  /**
   * Pre-validation transform hook.
   * Called in `_valueChanged` after merging user input but before `_validate`.
   * Use this for unit conversions (e.g. imperial → °C) or other transforms.
   * Default: identity (no-op).
   */
  protected _transformConfig(raw: TConfig): TConfig {
    return raw;
  }

  /**
   * Transform config for display in ha-form.
   * Called in `render()` before passing `.data` to `<ha-form>`.
   * Use this for unit conversions (e.g. °C → imperial) for display.
   * Default: identity (returns `_config` as-is).
   */
  protected _getDisplayConfig(): TConfig {
    return this._config;
  }

  protected _valueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    if (!this._config) return;
    const merged = { ...this._config, ...ev.detail.value } as TConfig;
    const transformed = this._transformConfig(merged);
    try {
      this._validate(transformed);
      this._error = undefined;
      fireEvent(this, 'config-changed', { config: transformed });
    } catch (err) {
      this._error = { base: (err as Error).message };
    }
  }

  protected _computeLabel = (schema: { name: string; required?: boolean }): string => {
    const localize = setupCustomLocalize(this.hass);
    const key = `editor.${schema.name}`;
    const localized = localize(key);
    const label = localized !== key ? localized : schema.name;
    return schema.required === false
      ? `${label} (${localize('editor.optional')})`
      : label;
  };

  protected _computeHelper = (schema: { name: string }): string => {
    const localize = setupCustomLocalize(this.hass);
    const key = `editor.helper.${schema.name}`;
    const localized = localize(key);
    return localized !== key ? localized : '';
  };

  static override styles = css`
    ha-form {
      display: block;
    }
    ha-expandable {
      margin: 8px 0;
      --ha-card-border-radius: 8px;
    }
  `;

  override render() {
    if (!this.hass || !this._config) return nothing;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._getDisplayConfig()}
        .schema=${this._getSchema()}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        .error=${this._error}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
}
