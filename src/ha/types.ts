// src/ha/types.ts
// Home Assistant frontend types - vendored from HA frontend
// Based on Mushroom's src/ha/types.ts

import type {
  HassConfig,
  HassEntities,
  HassEntity,
  HassServices,
  HassServiceTarget,
} from 'home-assistant-js-websocket';

// Note: HASSDomEvents is declared by custom-card-helpers for now.
// When we fully remove that dependency, we'll add the declaration here.

export interface HomeAssistant {
  states: HassEntities;
  entities: Record<string, { entity_id: string; name?: string }>;
  services: HassServices;
  config: HassConfig;
  language: string;
  locale: { language: string; number_format: string };
  themes: { darkMode: boolean };
  callService(
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: HassServiceTarget
  ): Promise<unknown>;
}

export type { HassEntity, HassEntities };
