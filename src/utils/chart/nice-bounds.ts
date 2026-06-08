/** Y-axis floor in °C — ensures charts always include the freezing point. */
export const Y_AXIS_FLOOR_C = 0;

/** Round axis bounds to "nice" multiples of a step value. */
export function niceBounds(
  min: number,
  max: number,
  step = 10,
  padding = 1,
): { min: number; max: number } {
  return {
    min: Math.floor((min - padding) / step) * step,
    max: Math.ceil((max + padding) / step) * step,
  };
}
