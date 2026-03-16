declare global {
  interface Window {
    customCards: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
      documentationURL?: string;
    }>;
  }
}

interface RegisterCardParams {
  type: string;
  name: string;
  description: string;
}

/**
 * Register a custom card with Home Assistant's Lovelace UI.
 * Ensures consistent structure and type safety.
 */
export function registerCustomCard(params: RegisterCardParams): void {
  window.customCards = window.customCards || [];
  window.customCards.push({
    ...params,
    preview: true,
  });
}
