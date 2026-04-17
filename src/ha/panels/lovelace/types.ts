import type { HassEntity } from "home-assistant-js-websocket";
import type { LocalizeFunc } from "../../common/translations/localize";
import type { HaFormSchema } from "../../../utils/form/ha-form";
import type {
  LovelaceBadgeConfig,
  LovelaceCardConfig,
  LovelaceConfig,
} from "../../data/lovelace";
import type { FrontendLocaleData } from "../../types";
import type { HomeAssistant, Constructor } from "../../types";

declare global {
  // eslint-disable-next-line
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

export interface LovelaceRow extends HTMLElement {
  hass?: HomeAssistant;
}

export interface LovelaceRowConstructor extends Constructor<LovelaceRow> {
  getConfigElement?: () => LovelaceRowEditor;
}

export interface LovelaceElement extends HTMLElement {
  hass?: HomeAssistant;
}

export interface LovelaceElementConstructor extends Constructor<LovelaceElement> {
  getConfigElement?: () => LovelacePictureElementEditor;
  getStubConfig?: (
    hass: HomeAssistant,
    entities: string[],
    entitiesFallback: string[]
  ) => any;
}

export interface LovelaceHeaderFooter extends HTMLElement {
  hass?: HomeAssistant;
  type: "header" | "footer";
  getCardSize(): number | Promise<number>;
  setConfig(config: any): void;
}

export interface LovelaceHeaderFooterConstructor extends Constructor<LovelaceHeaderFooter> {
  getStubConfig?: (
    hass: HomeAssistant,
    entities: string[],
    entitiesFallback: string[]
  ) => any;
  getConfigElement?: () => LovelaceHeaderFooterEditor;
}

export interface LovelaceCardFeature extends HTMLElement {
  hass?: HomeAssistant;
  /** @deprecated Use `context` instead */
  stateObj?: HassEntity;
  context?: any;
  setConfig(config: any): void;
  color?: string;
  position?: any;
}

export interface LovelaceCardFeatureConstructor extends Constructor<LovelaceCardFeature> {
  getStubConfig?: (
    hass: HomeAssistant,
    context?: any
  ) => any;
  getConfigElement?: () => LovelaceCardFeatureEditor;
  getConfigForm?: () => {
    schema: HaFormSchema[];
    assertConfig?: (config: LovelaceCardConfig) => void;
  };
  isSupported?: (stateObj?: HassEntity) => boolean;
}

export interface LovelaceHeadingBadge extends HTMLElement {
  hass?: HomeAssistant;
  preview?: boolean;
  setConfig(config: any): void;
}

export interface LovelaceHeadingBadgeConstructor extends Constructor<LovelaceHeadingBadge> {
  getStubConfig?: (
    hass: HomeAssistant,
    stateObj?: HassEntity
  ) => any;
  getConfigElement?: () => LovelaceHeadingBadgeEditor;
  getConfigForm?: () => {
    schema: HaFormSchema[];
    assertConfig?: (config: LovelaceCardConfig) => void;
  };
}

export interface LovelaceCardEditor extends LovelaceGenericElementEditor {
  setConfig(config: LovelaceCardConfig): void;
}

export interface LovelaceBadgeEditor extends LovelaceGenericElementEditor {
  setConfig(config: LovelaceBadgeConfig): void;
}

export interface LovelaceHeaderFooterEditor extends LovelaceGenericElementEditor {
  setConfig(config: any): void;
}

export interface LovelaceRowEditor extends LovelaceGenericElementEditor {
  setConfig(config: any): void;
}

export interface LovelacePictureElementEditor extends LovelaceGenericElementEditor {
  setConfig(config: any): void;
}

export interface LovelaceCardFeatureEditor extends LovelaceGenericElementEditor {
  setConfig(config: any): void;
}

export interface LovelaceHeadingBadgeEditor extends LovelaceGenericElementEditor {
  setConfig(config: any): void;
}

export interface LovelaceGenericElementEditor<C = any> extends HTMLElement {
  hass?: HomeAssistant;
  lovelace?: LovelaceConfig;
  context?: C;
  schema?: any;
  setConfig(config: any): void;
  focusYamlEditor?: () => void;
}
