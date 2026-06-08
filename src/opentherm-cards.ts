import { OtHeatingCard } from './cards/opentherm/ot-heating-card/ot-heating-card';
import './cards/opentherm/ot-dhw-card/ot-dhw-card';
import './cards/opentherm/ot-efficiency-card/ot-efficiency-card';
import './cards/opentherm/ot-diagnostics-card/ot-diagnostics-card';

// Deprecated aliases
class OtStatusCardDeprecated extends OtHeatingCard {}
class OtModulationCardDeprecated extends OtHeatingCard {}
customElements.define('opentherm-status-card', OtStatusCardDeprecated);
customElements.define('opentherm-modulation-card', OtModulationCardDeprecated);

console.info(
  '%c OPENTHERM-CARDS %c __VERSION__ ',
  'color: white; background: #0ea5e9; font-weight: bold;',
  'color: #0ea5e9; background: white; font-weight: bold;'
);

export {};
