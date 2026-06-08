import './cards/status-card/status-card';
import './cards/curve-card/curve-card';
import './cards/forecast-card/forecast-card';

// OpenTherm cards
import { OtHeatingCard } from './cards/opentherm/ot-heating-card/ot-heating-card';
import './cards/opentherm/ot-dhw-card/ot-dhw-card';
import './cards/opentherm/ot-efficiency-card/ot-efficiency-card';
import './cards/opentherm/ot-diagnostics-card/ot-diagnostics-card';

// Deprecated aliases — ot-status-card and ot-modulation-card now resolve to OtHeatingCard
customElements.define('opentherm-status-card', OtHeatingCard);
customElements.define('opentherm-modulation-card', OtHeatingCard);

// Shared components
import './shared/eq-tuning-dialog';

console.info(
  '%c EQUITHERM-CARDS %c __VERSION__ ',
  'color: white; background: #f97316; font-weight: bold;',
  'color: #f97316; background: white; font-weight: bold;'
);

export {};
