// @source home-assistant/frontend/src/common/number/round.ts
// @synced 2026-06-08 @ SHA 1cca5f3

export const round = (value: number, precision = 2): number =>
  Math.round(value * 10 ** precision) / 10 ** precision;
