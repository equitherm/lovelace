/** Temperature unit conversion utilities. */

const FACTOR = 9 / 5;

export function isImperial(
  hass: { config?: { unit_system?: { temperature?: string } } } | undefined,
): boolean {
  return hass?.config?.unit_system?.temperature === '°F';
}

/** Convert an absolute °C value to the user's display unit (°F: × 9/5 + 32). */
export function celsiusToDisplay(celsius: number, imperial: boolean): number {
  return imperial ? celsius * FACTOR + 32 : celsius;
}

/** Convert a display-unit value back to °C. */
export function displayToCelsius(display: number, imperial: boolean): number {
  return imperial ? (display - 32) / FACTOR : display;
}

/** Convert a °C delta to the user's display unit (°F: × 9/5, no offset). */
export function celsiusToDisplayDelta(celsius: number, imperial: boolean): number {
  return imperial ? celsius * FACTOR : celsius;
}

/** Convert a display-unit delta back to °C. */
export function displayDeltaToCelsius(display: number, imperial: boolean): number {
  return imperial ? display / FACTOR : display;
}
