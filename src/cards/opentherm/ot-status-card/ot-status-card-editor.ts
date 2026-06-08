// src/cards/opentherm/ot-status-card/ot-status-card-editor.ts
import { customElement } from 'lit/decorators.js';
import memoizeOne from 'memoize-one';
import type { OtStatusCardConfig } from './ot-status-card-config';
import { validateOtStatusCardConfig } from './ot-status-card-config';
import type { LovelaceCardConfig } from '../../../ha/data/lovelace';
import { EquithermBaseEditor } from '../../../utils/base';
import { schemaHelpers } from '../../../utils/form';
import type { HaFormSchema } from '../../../utils/form';
import setupCustomLocalize from '../../../localize';
import { OT_STATUS_CARD_EDITOR_NAME } from './const';

@customElement(OT_STATUS_CARD_EDITOR_NAME)
export class OtStatusCardEditor extends EquithermBaseEditor<OtStatusCardConfig> {
  setConfig(config: LovelaceCardConfig): void {
    this._config = { ...config } as OtStatusCardConfig;
  }

  protected _validate(config: OtStatusCardConfig): void {
    validateOtStatusCardConfig(config);
  }

  private _schemaMemo = memoizeOne((): readonly HaFormSchema[] => {
    const localize = setupCustomLocalize(this.hass);
    return [
      // Required entities
      schemaHelpers.entity('boiler_temp_entity', { domain: ['sensor', 'input_number'], device_class: 'temperature' }),
      schemaHelpers.entityName('name', { entity: 'boiler_temp_entity' }),
      schemaHelpers.entity('return_temp_entity', { domain: ['sensor', 'input_number'], device_class: 'temperature' }),
      schemaHelpers.entity('flame_entity', { domain: ['binary_sensor', 'input_boolean'] }),
      { name: 'show_last_updated', selector: { boolean: {} } },
      // Optional entities
      schemaHelpers.expandable(localize('editor.optional'), 'mdi:connection', [
        schemaHelpers.entity('setpoint_entity', { domain: ['sensor', 'number', 'input_number'], device_class: 'temperature', required: false }),
        schemaHelpers.entity('modulation_entity', { domain: ['sensor', 'input_number'], required: false }),
        schemaHelpers.entity('ch_active_entity', { domain: ['binary_sensor', 'input_boolean'], required: false }),
        schemaHelpers.entity('dhw_active_entity', { domain: ['binary_sensor', 'input_boolean'], required: false }),
      ]),
    ] as const satisfies readonly HaFormSchema[];
  });

  protected _getSchema(): readonly HaFormSchema[] {
    return this._schemaMemo();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'opentherm-status-card-editor': OtStatusCardEditor;
  }
}
