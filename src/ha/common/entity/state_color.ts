// Backported from HA frontend src/common/entity/state_color.ts
// Simplified: only the climate domain path (no battery, no group, no brightness)

import type { HassEntity } from "home-assistant-js-websocket";
import type { ClimateEntity } from "../../data/climate";
import { computeCssVariable } from "../../resources/css-variables";
import { slugify } from "../string/slugify";
import { computeDomain } from "./compute_domain";

const STATE_COLORED_DOMAINS = new Set(["climate"]);

export const stateColorCss = (
  stateObj: HassEntity,
  state?: string
): string | undefined => {
  const compareState = state !== undefined ? state : stateObj?.state;
  if (compareState === "unavailable") {
    return `var(--state-unavailable-color)`;
  }
  const domain = computeDomain(stateObj.entity_id);
  if (!STATE_COLORED_DOMAINS.has(domain)) {
    return undefined;
  }

  const properties = stateColorProperties(domain, stateObj, compareState);
  return computeCssVariable(properties);
};

const stateColorProperties = (
  domain: string,
  stateObj: HassEntity,
  state: string
): string[] => {
  const stateKey = slugify(state, "_");
  const active = isActive(stateObj);

  const properties: string[] = [];
  if (stateObj.attributes.device_class) {
    properties.push(
      `--state-${domain}-${stateObj.attributes.device_class}-${stateKey}-color`
    );
  }
  properties.push(
    `--state-${domain}-${stateKey}-color`,
    `--state-${domain}-${active ? "active" : "inactive"}-color`,
    `--state-${active ? "active" : "inactive"}-color`
  );
  return properties;
};

/** Simplified active check for climate domain */
const isActive = (stateObj: HassEntity): boolean => {
  const action = (stateObj as ClimateEntity).attributes?.hvac_action;
  return action != null && action !== "off" && action !== "idle";
};;
