// Card imports will be registered here as cards are implemented

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
    description: 'Compact heating status tile with fault indicators',
    preview: true,
  },
  {
    type: 'equitherm-curve-card',
    name: 'Equitherm Curve',
    description: 'Heating curve visualization with live operating point',
    preview: true,
  },
  {
    type: 'equitherm-forecast-card',
    name: 'Equitherm Forecast',
    description: 'Predicted flow temperatures from weather forecast',
    preview: false,
  },
  {
    type: 'equitherm-tuning-card',
    name: 'Equitherm Tuning',
    description: 'Compare heating curves and tune parameters live',
    preview: false,
  }
);

export {};
