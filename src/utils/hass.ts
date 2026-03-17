import type { HomeAssistant } from '../ha/types';

/**
 * Returns true only if any of the watched entity IDs changed state since last hass.
 * Use this in set hass() to gate expensive re-renders.
 *
 * HA replaces state objects on ANY change (state string OR attributes),
 * so reference comparison (!==) correctly detects attribute changes too.
 * This also handles the case where an entity might not exist in prev.
 */
export function entitiesChanged(
  prev: HomeAssistant | undefined,
  next: HomeAssistant,
  entityIds: (string | undefined)[]
): boolean {
  if (!prev) return true;
  return entityIds
    .filter((id): id is string => !!id)
    .some((id) => {
      const prevState = prev.states[id];
      const nextState = next.states[id];
      // Reference comparison catches both state and attribute changes
      // (HA replaces the entire state object on any change)
      return prevState !== nextState;
    });
}
