import type { HomeAssistant } from '../types';

/**
 * Returns true only if any of the watched entity IDs changed state since last hass.
 * Use this in set hass() to gate expensive re-renders.
 */
export function entitiesChanged(
  prev: HomeAssistant | undefined,
  next: HomeAssistant,
  entityIds: (string | undefined)[]
): boolean {
  if (!prev) return true;
  return entityIds
    .filter((id): id is string => !!id)
    .some((id) => prev.states[id] !== next.states[id]);
}
