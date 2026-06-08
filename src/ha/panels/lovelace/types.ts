// @source home-assistant/frontend/src/panels/lovelace/types.ts
// @synced 2026-06-08 @ SHA 1cca5f3
// @note Adapted: Extra HASSDomEvents (ll-badge-rebuild, hass-more-info, config-changed)
//   added for our card dispatches — upstream declares these in separate component files.
// @note Adapted: LovelaceCardFeatureContext, LovelaceCardFeaturePosition, LovelaceCardFeatureConfig
//   typed as any — from card-features/types.ts (364 lines importing AlarmMode, HvacMode, etc.).
//   LovelaceElementConfig typed as any — from elements/types.ts (needs HuiImage Lit component).
//   LovelaceRowConfig typed as any — from entity-rows/types.ts (needs evaluate-filter, components/types).
//   EntitiesCardEntityConfig typed as any — from cards/types.ts (739 lines, 15+ deep imports).

import type { HassEntity } from "home-assistant-js-websocket";
import type { LocalizeFunc } from "../../common/translations/localize";
import type { HaFormSchema } from "../../../utils/form/ha-form";
import type { LovelaceBadgeConfig } from "../../data/lovelace/config/badge";
import type { LovelaceCardConfig } from "../../data/lovelace/config/card";
import type {
  LovelaceConfig,
} from "../../data/lovelace/config/types";
import type { FrontendLocaleData } from "../../data/translation";
import type { ShowToastParams } from "../../managers/notification-manager";
import type { LovelaceHeaderFooterConfig } from "./header-footer/types";
import type { LovelaceHeadingBadgeConfig } from "./heading-badges/types";
import type { Constructor, HomeAssistant } from "../../types";

declare global {
  interface HASSDomEvents {
    "ll-rebuild": Record<string, unknown>;
    "ll-upgrade": Record<string, unknown>;
    "ll-badge-rebuild": Record<string, unknown>;
    "hass-more-info": { entityId?: string };
    "config-changed": { config: unknown };
  }
}

export interface Lovelace {
  config: LovelaceConfig;
  rawConfig: LovelaceConfig | undefined;
  editMode: boolean;
  urlPath: string | null;
  mode: "generated" | "yaml" | "storage";
  locale: FrontendLocaleData;
  enableFullEditMode: () => void;
  setEditMode: (editMode: boolean) => void;
  saveConfig: (newConfig: LovelaceConfig) => Promise<void>;
  deleteConfig: () => Promise<void>;
  showToast: (params: ShowToastParams) => void;
}

export interface LovelaceBadge extends HTMLElement {
  hass?: HomeAssistant;
  connectedWhileHidden?: boolean;
  setConfig(config: LovelaceBadgeConfig): void;
}

export interface LovelaceLayoutOptions {
  grid_columns?: number | "full";
  grid_rows?: number | "auto";
  grid_max_columns?: number;
  grid_min_columns?: number;
  grid_min_rows?: number;
  grid_max_rows?: number;
}

export interface LovelaceGridOptions {
  columns?: number | "full";
  rows?: number | "auto";
  max_columns?: number;
  min_columns?: number;
  min_rows?: number;
  max_rows?: number;
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  preview?: boolean;
  layout?: string;
  connectedWhileHidden?: boolean;
  getCardSize(): number | Promise<number>;
  /** @deprecated Use `getGridOptions` instead */
  getLayoutOptions?(): LovelaceLayoutOptions;
  getGridOptions?(): LovelaceGridOptions;
  setConfig(config: LovelaceCardConfig): void;
}

export interface LovelaceConfigForm {
  schema: HaFormSchema[];
  assertConfig?: (config: LovelaceCardConfig) => void;
  computeLabel?: (
    schema: HaFormSchema,
    localize: LocalizeFunc
  ) => string | undefined;
  computeHelper?: (
    schema: HaFormSchema,
    localize: LocalizeFunc
  ) => string | undefined;
}

export interface LovelaceCardConstructor extends Constructor<LovelaceCard> {
  getStubConfig?: (
    hass: HomeAssistant,
    entities: string[],
    entitiesFallback: string[]
  ) => LovelaceCardConfig;
  getConfigElement?: () => LovelaceCardEditor;
  getConfigForm?: () => LovelaceConfigForm;
}

export interface LovelaceBadgeConstructor extends Constructor<LovelaceBadge> {
  getStubConfig?: (
    hass: HomeAssistant,
    entities: string[],
    entitiesFallback: string[]
  ) => LovelaceBadgeConfig;
  getConfigElement?: () => LovelaceBadgeEditor;
  getConfigForm?: () => LovelaceConfigForm;
}

export interface LovelaceHeaderFooterConstructor extends Constructor<LovelaceHeaderFooter> {
  getStubConfig?: (
    hass: HomeAssistant,
    entities: string[],
    entitiesFallback: string[]
  ) => LovelaceHeaderFooterConfig;
  getConfigElement?: () => LovelaceHeaderFooterEditor;
}

export interface LovelaceRowConstructor extends Constructor<LovelaceRow> {
  getConfigElement?: () => LovelaceRowEditor;
}

export interface LovelaceElementConstructor extends Constructor<LovelaceElement> {
  getConfigElement?: () => LovelacePictureElementEditor;
  getStubConfig?: (
    hass: HomeAssistant,
    entities: string[],
    entitiesFallback: string[]
  ) => any; // LovelaceElementConfig — needs HuiImage Lit component
}

export interface LovelaceHeaderFooter extends HTMLElement {
  hass?: HomeAssistant;
  type: "header" | "footer";
  getCardSize(): number | Promise<number>;
  setConfig(config: LovelaceHeaderFooterConfig): void;
}

export interface LovelaceCardEditor extends LovelaceGenericElementEditor {
  setConfig(config: LovelaceCardConfig): void;
}

export interface LovelaceBadgeEditor extends LovelaceGenericElementEditor {
  setConfig(config: LovelaceBadgeConfig): void;
}

export interface LovelaceHeaderFooterEditor extends LovelaceGenericElementEditor {
  setConfig(config: LovelaceHeaderFooterConfig): void;
}

export interface LovelaceRowEditor extends LovelaceGenericElementEditor {
  setConfig(config: any): void; // LovelaceRowConfig — needs evaluate-filter, components/types
}

export interface LovelacePictureElementEditor extends LovelaceGenericElementEditor {
  setConfig(config: any): void; // LovelaceElementConfig — needs HuiImage Lit component
}

export interface LovelaceGenericElementEditor<C = any> extends HTMLElement {
  hass?: HomeAssistant;
  lovelace?: LovelaceConfig;
  context?: C;
  schema?: any;
  setConfig(config: any): void;
  focusYamlEditor?: () => void;
}

export interface LovelaceCardFeature extends HTMLElement {
  hass?: HomeAssistant;
  /** @deprecated Use `context` instead */
  stateObj?: HassEntity;
  context?: any; // LovelaceCardFeatureContext — from card-features/types.ts (364 lines)
  setConfig(config: any): void; // LovelaceCardFeatureConfig — same
  color?: string;
  position?: any; // LovelaceCardFeaturePosition — same
}

export interface LovelaceCardFeatureConstructor extends Constructor<LovelaceCardFeature> {
  getStubConfig?: (
    hass: HomeAssistant,
    context?: any // LovelaceCardFeatureContext
  ) => any; // LovelaceCardFeatureConfig
  getConfigElement?: () => LovelaceCardFeatureEditor;
  getConfigForm?: () => {
    schema: HaFormSchema[];
    assertConfig?: (config: LovelaceCardConfig) => void;
  };
  isSupported?: (stateObj?: HassEntity) => boolean;
}

export interface LovelaceCardFeatureEditor extends LovelaceGenericElementEditor {
  setConfig(config: any): void; // LovelaceCardFeatureConfig
}

export interface LovelaceHeadingBadge extends HTMLElement {
  hass?: HomeAssistant;
  preview?: boolean;
  setConfig(config: LovelaceHeadingBadgeConfig): void;
}

export interface LovelaceHeadingBadgeConstructor extends Constructor<LovelaceHeadingBadge> {
  getStubConfig?: (
    hass: HomeAssistant,
    stateObj?: HassEntity
  ) => LovelaceHeadingBadgeConfig;
  getConfigElement?: () => LovelaceHeadingBadgeEditor;
  getConfigForm?: () => {
    schema: HaFormSchema[];
    assertConfig?: (config: LovelaceCardConfig) => void;
  };
}

export interface LovelaceHeadingBadgeEditor extends LovelaceGenericElementEditor {
  setConfig(config: LovelaceHeadingBadgeConfig): void;
}

export interface LovelaceRow extends HTMLElement {
  hass?: HomeAssistant;
}

export interface LovelaceElement extends HTMLElement {
  hass?: HomeAssistant;
}
