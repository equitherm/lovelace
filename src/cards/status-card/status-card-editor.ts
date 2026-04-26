// src/cards/status-card/status-card-editor.ts
import { customElement } from 'lit/decorators.js';
import memoizeOne from 'memoize-one';
import type { StatusCardConfig } from './status-card-config';
import { validateStatusCardConfig } from './status-card-config';
import type { LovelaceCardConfig } from '../../ha/data/lovelace';
import { EquithermBaseEditor } from '../../utils/base';
import { schemaHelpers } from '../../utils/form';
import type { HaFormSchema } from '../../utils/form';
import setupCustomLocalize from '../../localize';
import { STATUS_CARD_EDITOR_NAME } from './const';

@customElement(STATUS_CARD_EDITOR_NAME)
export class StatusCardEditor extends EquithermBaseEditor<StatusCardConfig> {
  setConfig(config: LovelaceCardConfig): void {
    this._config = { ...config } as StatusCardConfig;
  }

  protected _validate(config: StatusCardConfig): void {
    validateStatusCardConfig(config);
  }

  private _schemaMemo = memoizeOne((tunable: boolean): readonly HaFormSchema[] => {
    const localize = setupCustomLocalize(this.hass);
    return [
      // Required entities
      schemaHelpers.entity('climate_entity', { domain: 'climate' }),
      schemaHelpers.entityName('name', { entity: 'climate_entity' }),
      schemaHelpers.entity('outdoor_entity', { domain: ['sensor', 'input_number'], device_class: 'temperature' }),
      schemaHelpers.entity('flow_entity', { domain: ['sensor', 'number', 'input_number'], device_class: 'temperature' }),
      { name: 'show_last_updated', selector: { boolean: {} }, default: false },
      { name: 'show_params_footer', selector: { boolean: {} }, default: true },
      { name: 'tunable', selector: { boolean: {} }, default: false },
      ...(tunable
        ? [schemaHelpers.expandable(localize('editor.tuning'), 'mdi:tune-variant', [
            schemaHelpers.entity('hc_entity', { domain: ['number', 'input_number'] }),
            schemaHelpers.entity('shift_entity', { domain: ['number', 'input_number'] }),
            { name: 'recalculate_service', selector: { text: {} } },
          ])]
        : []),
      // Optional entities
      schemaHelpers.expandable(localize('editor.optional'), 'mdi:connection', [
        schemaHelpers.entity('curve_output_entity', { domain: ['sensor'], device_class: 'temperature', required: false }),
        schemaHelpers.entity('pid_output_entity', { domain: ['sensor'], device_class: 'temperature', required: false }),
        schemaHelpers.entity('rate_limiting_entity', { domain: ['binary_sensor'], required: false }),
        schemaHelpers.entity('pid_active_entity', { domain: ['binary_sensor'], required: false }),
        schemaHelpers.entity('wws_entity', { domain: ['binary_sensor'], required: false }),
        schemaHelpers.entity('pid_correction_entity', { domain: ['sensor', 'input_number'], device_class: 'temperature', required: false }),
      ]),
      schemaHelpers.expandable(localize('editor.curve_parameters'), 'mdi:chart-bell-curve-cumulative', [
        schemaHelpers.entity('hc_entity', { domain: ['number', 'input_number'], required: false }),
        schemaHelpers.entity('shift_entity', { domain: ['number', 'input_number'], required: false }),
        schemaHelpers.entity('n_entity', { domain: ['number', 'input_number'], required: false }),
      ]),
    ] as const satisfies readonly HaFormSchema[];
  });

  protected _getSchema(): readonly HaFormSchema[] {
    return this._schemaMemo(!!this._config.tunable);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'equitherm-status-card-editor': StatusCardEditor;
  }
}
