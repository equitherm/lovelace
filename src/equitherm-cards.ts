import './cards/status-card';
import './cards/curve-card';
import './components/shape-icon';
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
