// src/ha/common/dom/fire_event.ts
// Polymer legacy event helper - vendored from Mushroom

// Note: HASSDomEvents is declared by custom-card-helpers for now.
// When we fully remove that dependency, we'll add the declaration in src/ha/types.ts.

export type ValidHassDomEvent = keyof HASSDomEvents;

export interface HASSDomEvent<T> extends Event {
  detail: T;
}

export const fireEvent = <HassEvent extends ValidHassDomEvent>(
  node: HTMLElement | Window,
  type: HassEvent,
  detail?: HASSDomEvents[HassEvent],
  options?: {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
  }
): Event => {
  options = options || {};
  detail = detail === null || detail === undefined ? {} : detail;
  const event = new Event(type, {
    bubbles: options.bubbles === undefined ? true : options.bubbles,
    cancelable: Boolean(options.cancelable),
    composed: options.composed === undefined ? true : options.composed,
  });
  (event as unknown as { detail: unknown }).detail = detail;
  node.dispatchEvent(event);
  return event;
};
