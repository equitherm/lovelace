import { customElement } from 'lit/decorators.js';
import memoizeOne from 'memoize-one';
import type { OtDiagnosticsCardConfig } from './ot-diagnostics-card-config';
import { validateOtDiagnosticsCardConfig } from './ot-diagnostics-card-config';
import type { LovelaceCardConfig } from '../../../ha/data/lovelace';
import { EquithermBaseEditor } from '../../../utils/base';
import { schemaHelpers } from '../../../utils/form';
import type { HaFormSchema } from '../../../utils/form';
import setupCustomLocalize from '../../../localize';
import { OT_DIAGNOSTICS_CARD_EDITOR_NAME } from './const';

@customElement(OT_DIAGNOSTICS_CARD_EDITOR_NAME)
export class OtDiagnosticsCardEditor extends EquithermBaseEditor<OtDiagnosticsCardConfig> {
  setConfig(config: LovelaceCardConfig): void {
    this._config = { ...config } as OtDiagnosticsCardConfig;
  }

  protected _validate(config: OtDiagnosticsCardConfig): void {
    validateOtDiagnosticsCardConfig(config);
  }

  private _schemaMemo = memoizeOne((): readonly HaFormSchema[] => {
    const localize = setupCustomLocalize(this.hass);
    return [
      // Required entities
      schemaHelpers.entity('fault_entity', { domain: ['binary_sensor', 'input_boolean'] }),
      schemaHelpers.entityName('name', { entity: 'fault_entity' }),
      { name: 'show_last_updated', selector: { boolean: {} } },
      // Numeric sensors (optional)
      schemaHelpers.expandable(localize('editor.optional'), 'mdi:thermometer', [
        schemaHelpers.entity('pressure_entity', { domain: ['sensor', 'input_number'], required: false }),
        schemaHelpers.entity('exhaust_entity', { domain: ['sensor', 'input_number'], device_class: 'temperature', required: false }),
        schemaHelpers.entity('fault_code_entity', { domain: ['sensor', 'input_number'], required: false }),
        schemaHelpers.entity('diagnostic_code_entity', { domain: ['sensor', 'input_number'], required: false }),
      ]),
      // Fault binary sensors (optional)
      schemaHelpers.expandable(localize('opentherm.diagnostics_card.editor.fault_sensors'), 'mdi:alert-circle-outline', [
        schemaHelpers.entity('flame_fault_entity', { domain: ['binary_sensor', 'input_boolean'], required: false }),
        schemaHelpers.entity('low_pressure_entity', { domain: ['binary_sensor', 'input_boolean'], required: false }),
        schemaHelpers.entity('air_pressure_entity', { domain: ['binary_sensor', 'input_boolean'], required: false }),
        schemaHelpers.entity('water_overtemp_entity', { domain: ['binary_sensor', 'input_boolean'], required: false }),
      ]),
      // Diagnostic binary sensors (optional)
      schemaHelpers.expandable(localize('opentherm.diagnostics_card.editor.diagnostic_sensors'), 'mdi:wrench', [
        schemaHelpers.entity('lockout_entity', { domain: ['binary_sensor', 'input_boolean'], required: false }),
        schemaHelpers.entity('service_request_entity', { domain: ['binary_sensor', 'input_boolean'], required: false }),
        schemaHelpers.entity('diagnostic_entity', { domain: ['binary_sensor', 'input_boolean'], required: false }),
      ]),
    ] as const satisfies readonly HaFormSchema[];
  });

  protected _getSchema(): readonly HaFormSchema[] {
    return this._schemaMemo();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'opentherm-diagnostics-card-editor': OtDiagnosticsCardEditor;
  }
}
