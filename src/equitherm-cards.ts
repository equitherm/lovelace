import './cards/status-card';
import './cards/curve-card';

declare global {
  interface Window {
    customCards: Array<{ type: string; name: string; description: string; preview?: boolean }>;
  }
}

console.info(
  '%c EQUITHERM-CARDS %c __VERSION__ ',
  'color: white; background: #f97316; font-weight: bold;',
  'color: #f97316; background: white; font-weight: bold;'
);

// Register cards in HA picker UI
window.customCards = window.customCards || [];
window.customCards.push(
  {
    type: 'equitherm-status-card',
    name: 'Equitherm Status',
    description: 'Compact heating status tile with temperature displays',
    preview: true,
  },
  {
    type: 'equitherm-curve-card',
    name: 'Equitherm Curve',
    description: 'Heating curve visualization with current operating point',
    preview: true,
  }
);

export {};
