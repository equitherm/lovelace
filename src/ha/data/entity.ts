// @source home-assistant/frontend/src/data/entity/entity.ts
// @synced 2026-06-08 @ SHA 1cca5f3

export const UNAVAILABLE = "unavailable";
export const UNKNOWN = "unknown";

export const ON = "on";
export const OFF = "off";

export const OFF_STATES = [UNAVAILABLE, UNKNOWN, OFF] as const;

export const isOffState = (state: unknown): state is (typeof OFF_STATES)[number] =>
  (OFF_STATES as readonly string[]).includes(state as string);
