import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import memoizeOne from 'memoize-one';
import type { HomeAssistant, CurveCardConfig } from '../types';
import { fireEvent } from 'custom-card-helpers';

/** ha-form schema types (matches HA's internal types) */
interface HaFormSelector {
  entity?: { domain?: string | string[]; device_class?: string };
  number?: { min: number; max: number; step?: number; mode?: 'slider' | 'box' };
  text?: Record<string, never>;
  boolean?: Record<string, never>;
}

interface HaFormSchemaBase {
  name: string;
  required?: boolean;
  selector?: HaFormSelector;
}

interface HaFormGridSchema extends HaFormSchemaBase {
  type: 'grid';
  flatten?: boolean;
  schema: HaFormSchemaBase[];
}

interface HaFormExpandableSchema extends HaFormSchemaBase {
  type: 'expandable';
  title: string;
  icon?: string;
  schema: (HaFormSchemaBase | HaFormGridSchema)[];
}

type HaFormSchema = HaFormSchemaBase | HaFormGridSchema | HaFormExpandableSchema;

@customElement('equitherm-curve-card-editor')
export class EquithermCurveCardEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: CurveCardConfig;

  setConfig(config: CurveCardConfig) {
    this._config = { ...config };
  }

  protected _valueChanged(ev: CustomEvent): void {
    if (!this._config) return;
    const newConfig = { ...ev.detail.value } as CurveCardConfig;
    if (JSON.stringify(newConfig) !== JSON.stringify(this._config)) {
      fireEvent(this, 'config-changed', { config: newConfig });
    }
  }

  static styles = css`
    ha-form { display: block; }
    ha-expandable {
      margin: 8px 0;
      --ha-card-border-radius: 8px;
    }
  `;

  /** Memoized schema - recompute only when needed for dynamic behavior */
  private _getSchema = memoizeOne((): HaFormSchema[] => [
    // Title section
    {
      name: 'title',
      required: false,
      selector: { text: {} },
    },
    // Entities section (expandable)
    {
      type: 'expandable',
      title: 'Entities',
      icon: 'mdi:connection',
      name: '',
      schema: [
        { name: 'climate_entity', required: true, selector: { entity: { domain: ['climate'] } } },
        { name: 'outdoor_entity', required: true, selector: { entity: { domain: ['sensor', 'input_number'], device_class: 'temperature' } } },
        { name: 'curve_output_entity', required: true, selector: { entity: { domain: ['sensor'], device_class: 'temperature' } } },
        { name: 'flow_entity', required: true, selector: { entity: { domain: ['sensor', 'number', 'input_number'], device_class: 'temperature' } } },
        { name: 'rate_limiting_entity', required: false, selector: { entity: { domain: ['binary_sensor'] } } },
      ],
    },
    // Curve Parameters section (expandable with grid)
    {
      type: 'expandable',
      title: 'Curve Parameters',
      icon: 'mdi:chart-bell-curve',
      name: '',
      schema: [
        // Pair: hc + n
        {
          type: 'grid',
          name: '',
          schema: [
            { name: 'hc', required: true, selector: { number: { min: 0.5, max: 3.0, step: 0.1, mode: 'slider' } } },
            { name: 'n', required: true, selector: { number: { min: 1.0, max: 2.0, step: 0.05, mode: 'slider' } } },
          ],
        },
        // Shift (full width)
        { name: 'shift', required: true, selector: { number: { min: -15, max: 15, step: 1, mode: 'slider' } } },
        // Pair: min_flow + max_flow
        {
          type: 'grid',
          name: '',
          schema: [
            { name: 'min_flow', required: true, selector: { number: { min: 15, max: 35, step: 1, mode: 'slider' } } },
            { name: 'max_flow', required: true, selector: { number: { min: 50, max: 90, step: 1, mode: 'slider' } } },
          ],
        },
      ],
    },
    // Display Range section (expandable with grid)
    {
      type: 'expandable',
      title: 'Display Range',
      icon: 'mdi:arrow-expand-horizontal',
      name: '',
      schema: [
        {
          type: 'grid',
          name: '',
          schema: [
            { name: 't_out_min', required: true, selector: { number: { min: -30, max: 5, step: 1, mode: 'slider' } } },
            { name: 't_out_max', required: true, selector: { number: { min: 0, max: 30, step: 1, mode: 'slider' } } },
          ],
        },
      ],
    },
  ]);

  private _computeLabel = (schema: { name: string }): string => ({
    title: 'Title (optional)',
    climate_entity: 'Climate Entity',
    outdoor_entity: 'Outdoor Temperature',
    curve_output_entity: 'Curve Output',
    flow_entity: 'Flow Setpoint',
    rate_limiting_entity: 'Rate Limiting (optional)',
    hc: 'Heat Curve (hc)',
    n: 'Exponent (n)',
    shift: 'Shift (°C)',
    min_flow: 'Min Flow (°C)',
    max_flow: 'Max Flow (°C)',
    t_out_min: 'Min Outdoor (°C)',
    t_out_max: 'Max Outdoor (°C)',
  }[schema.name] ?? schema.name);

  render() {
    if (!this._config) return html``;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._getSchema()}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
}
