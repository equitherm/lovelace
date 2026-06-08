import { customElement } from 'lit/decorators.js';
import memoizeOne from 'memoize-one';
import type { OtHeatingCardConfig } from './ot-heating-card-config';
import { validateOtHeatingCardConfig } from './ot-heating-card-config';
import type { LovelaceCardConfig } from '../../../ha/data/lovelace';
import { EquithermBaseEditor } from '../../../utils/base';
import { schemaHelpers } from '../../../utils/form';
import type { HaFormSchema } from '../../../utils/form';
import setupCustomLocalize from '../../../localize';
import { OT_HEATING_CARD_EDITOR_NAME } from './const';

@customElement(OT_HEATING_CARD_EDITOR_NAME)
export class OtHeatingCardEditor extends EquithermBaseEditor<OtHeatingCardConfig> {
  setConfig(config: LovelaceCardConfig): void {
    this._config = { ...config } as OtHeatingCardConfig;
  }

  protected _validate(config: OtHeatingCardConfig): void {
    validateOtHeatingCardConfig(config);
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
      // Modulation
      schemaHelpers.expandable(localize('opentherm.heating_card.editor.modulation'), 'mdi:sine-wave', [
        schemaHelpers.entity('modulation_entity', { domain: ['sensor', 'input_number'], required: false }),
        schemaHelpers.entity('max_modulation_entity', { domain: ['number', 'input_number'], required: false }),
      ]),
      // Monitoring
      schemaHelpers.expandable(localize('opentherm.heating_card.editor.monitoring'), 'mdi:chart-timeline-variant', [
        { name: 'hours', selector: { number: { min: 1, max: 24, step: 1, mode: 'box' as const } } },
        schemaHelpers.entity('ch_active_entity', { domain: ['binary_sensor', 'input_boolean'], required: false }),
        schemaHelpers.entity('dhw_active_entity', { domain: ['binary_sensor', 'input_boolean'], required: false }),
        schemaHelpers.entity('setpoint_entity', { domain: ['sensor', 'number', 'input_number'], device_class: 'temperature', required: false }),
        schemaHelpers.entity('fault_entity', { domain: ['binary_sensor', 'input_boolean'], required: false }),
      ]),
    ] as const satisfies readonly HaFormSchema[];
  });

  protected _getSchema(): readonly HaFormSchema[] {
    return this._schemaMemo();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'opentherm-heating-card-editor': OtHeatingCardEditor;
  }
}
