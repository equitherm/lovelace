// Cards
import './cards/status-card/status-card';
import './cards/curve-card/curve-card';

// Shared components (Mushroom pattern)
import './shared/badge-icon';
import './shared/card';
import './shared/shape-avatar';
import './shared/shape-icon';
import './shared/state-info';
import './shared/state-item';

import { registerCustomCard } from './utils/register-card';

console.info(
  '%c EQUITHERM-CARDS %c __VERSION__ ',
  'color: white; background: #f97316; font-weight: bold;',
  'color: #f97316; background: white; font-weight: bold;'
);

// Register cards in HA picker UI
registerCustomCard({
  type: 'equitherm-status-card',
  name: 'Equitherm Status',
  description: 'Compact heating status tile with temperature displays',
});

registerCustomCard({
  type: 'equitherm-curve-card',
  name: 'Equitherm Curve',
  description: 'Heating curve visualization with current operating point',
});

export {};
