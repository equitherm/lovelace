// @source home-assistant/frontend/src/types.ts
// @synced 2026-06-08 @ SHA 1cca5f3
//
// @note Adapted: EntityRegistryDisplayEntry, Themes defined locally instead of
//   importing from data/entity_registry and data/ws-themes (not vendored).
// @note Adapted: DeviceRegistryEntry, AreaRegistryEntry, FloorRegistryEntry kept
//   for internal ha/ entity utilities (compute_entity_name etc.).
// @note Adapted: EntityNameItem, EntityNameOptions typed as `any` in
//   HomeAssistantFormatters.formatEntityName — our code never calls it.
// @note Adapted: CoreFrontendUserData, CoreFrontendSystemData, ExternalMessaging
//   typed as `any` in HomeAssistantConfig — we don't vendor those modules.
// @note Adapted: loadBackendTranslation params simplified to avoid importing
//   getHassTranslations (which pulls in saveFrontendUserData, subscribeFrontendUserData).

import type {
  Auth,
  Connection,
  HassConfig,
  HassEntities,
  HassEntity,
  HassServices,
  HassServiceTarget,
  MessageBase,
} from "home-assistant-js-websocket";
import type { LocalizeFunc } from "./common/translations/localize";

// Enums and FrontendLocaleData — verbatim from data/translation.ts
import type { FrontendLocaleData } from "./data/translation";
export {
  type FrontendLocaleData,
  NumberFormat,
  TimeFormat,
  TimeZone,
  DateFormat,
  FirstWeekday,
} from "./data/translation";

// ---------------------------------------------------------------------------
// Global declarations
// ---------------------------------------------------------------------------

declare global {
  /* eslint-disable no-var, no-redeclare */
  var __DEV__: boolean;
  var __DEMO__: boolean;
  var __BUILD__: "modern" | "legacy";
  var __VERSION__: string;
  var __STATIC_PATH__: string;
  var __BACKWARDS_COMPAT__: boolean;
  var __HASS_URL__: string;
  /* eslint-enable no-var, no-redeclare */

  interface Window {
    // Custom panel entry point url
    customPanelJS: string;
    ShadyCSS: {
      nativeCss: boolean;
      nativeShadow: boolean;
      prepareTemplate(
        templateElement: unknown,
        elementName: string,
        elementExtension?: string
      ): void;
      styleElement(element: unknown): void;
      styleSubtree(
        element: unknown,
        overrideProperties: Record<string, string>
      ): void;
      styleDocument(overrideProperties: Record<string, string>): void;
      getComputedStyleValue(element: unknown, propertyName: string): string;
    };
  }
  // for fire event
  interface HASSDomEvents {
    "value-changed": {
      value: unknown;
    };
    change: undefined;
    "hass-logout": undefined;
    "config-refresh": undefined;
    "hass-api-called": {
      success: boolean;
      response: unknown;
    };
  }

  // For loading workers in webpack
  interface ImportMeta {
    url: string;
  }
}

// ---------------------------------------------------------------------------
// Registry entries (kept for internal ha/ entity utilities)
// ---------------------------------------------------------------------------

export interface EntityRegistryDisplayEntry {
  entity_id: string;
  name?: string;
  device_id?: string;
  area_id?: string;
  hidden?: boolean;
  entity_category?: "config" | "diagnostic";
  translation_key?: string;
  platform?: string;
  display_precision?: number;
}

export interface DeviceRegistryEntry {
  id: string;
  config_entries: string[];
  connections: Array<[string, string]>;
  identifiers: Array<[string, string]>;
  manufacturer: string | null;
  model: string | null;
  name: string | null;
  sw_version: string | null;
  hw_version: string | null;
  via_device_id: string | null;
  area_id: string | null;
  name_by_user: string | null;
  entry_type: "service" | null;
  disabled_by: "user" | "integration" | "config_entry" | null;
  configuration_url: string | null;
}

export interface AreaRegistryEntry {
  area_id: string;
  floor_id: string | null;
  name: string;
  picture: string | null;
}

export interface FloorRegistryEntry {
  floor_id: string;
  name: string;
  level: number | null;
  icon: string | null;
}

// ---------------------------------------------------------------------------
// Themes (simplified — only fields used by our codebase)
// ---------------------------------------------------------------------------

export interface Themes {
  default_theme: string;
  default_dark_theme: string | null;
  themes: Record<string, any>;
  darkMode: boolean;
  theme: string;
}

// ---------------------------------------------------------------------------
// Theme settings, panels, translations
// ---------------------------------------------------------------------------

// Currently selected theme and its settings. These are the values stored in local storage.
// Note: These values are not meant to be used at runtime to check whether dark mode is active
// or which theme name to use, as this interface represents the config data for the theme picker.
// The actually active dark mode and theme name can be read from hass.themes.
export interface ThemeSettings {
  theme: string;
  // Radio box selection for theme picker. Do not use in Lovelace rendering as
  // it can be undefined == auto.
  // Property hass.themes.darkMode carries effective current mode.
  dark?: boolean;
  primaryColor?: string;
  accentColor?: string;
}

export interface PanelInfo<T = Record<string, any> | null> {
  component_name: string;
  config: T;
  icon: string | null;
  title: string | null;
  url_path: string;
  config_panel_domain?: string;
  default_visible?: boolean;
  require_admin?: boolean;
  show_in_sidebar?: boolean;
}

export type Panels = Record<string, PanelInfo>;

export interface Resources {
  [language: string]: Record<string, string>;
}

export interface Translation {
  nativeName: string;
  isRTL: boolean;
  hash: string;
}

export interface TranslationMetadata {
  fragments: string[];
  translations: Record<string, Translation>;
}

// ---------------------------------------------------------------------------
// Auth / user types
// ---------------------------------------------------------------------------

export interface Credential {
  auth_provider_type: string;
  auth_provider_id: string;
}

export interface MFAModule {
  id: string;
  name: string;
  enabled: boolean;
}

export interface CurrentUser {
  id: string;
  is_owner: boolean;
  is_admin: boolean;
  name: string;
  credentials: Credential[];
  mfa_modules: MFAModule[];
}

// ---------------------------------------------------------------------------
// Service call types
// ---------------------------------------------------------------------------

export interface ServiceCallRequest {
  domain: string;
  service: string;
  serviceData?: Record<string, any>;
  target?: HassServiceTarget;
}

export interface Context {
  id: string;
  parent_id?: string;
  user_id?: string | null;
}

export interface ServiceCallResponse<T = any> {
  context: Context;
  response?: T;
}

// ---------------------------------------------------------------------------
// Value formatting
// ---------------------------------------------------------------------------

export interface ValuePart {
  type: "value" | "literal" | "unit";
  value: string;
}

// ---------------------------------------------------------------------------
// HomeAssistant decomposed into sub-interfaces
// ---------------------------------------------------------------------------

export interface HomeAssistantRegistries {
  entities: Record<string, EntityRegistryDisplayEntry>;
  devices: Record<string, DeviceRegistryEntry>;
  areas: Record<string, AreaRegistryEntry>;
  floors: Record<string, FloorRegistryEntry>;
}

export interface HomeAssistantInternationalization {
  // i18n
  // current effective language in that order:
  //   - backend saved user selected language
  //   - language in local app storage
  //   - browser language
  //   - english (en)
  language: string;
  // local stored language, keep that name for backward compatibility
  selectedLanguage: string | null;
  locale: FrontendLocaleData;
  localize: LocalizeFunc;
  translationMetadata: TranslationMetadata;
  loadBackendTranslation(
    category: string,
    integration?: string | string[],
    configFlow?: boolean
  ): Promise<LocalizeFunc>;
  loadFragmentTranslation(fragment: string): Promise<LocalizeFunc | undefined>;
}

export interface HomeAssistantApi {
  callService<T = any>(
    domain: ServiceCallRequest["domain"],
    service: ServiceCallRequest["service"],
    serviceData?: ServiceCallRequest["serviceData"],
    target?: ServiceCallRequest["target"],
    notifyOnError?: boolean,
    returnResponse?: boolean
  ): Promise<ServiceCallResponse<T>>;
  callApi<T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    parameters?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<T>;
  callApiRaw(
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    parameters?: Record<string, any>,
    headers?: Record<string, string>,
    signal?: AbortSignal
  ): Promise<Response>;
  fetchWithAuth(path: string, init?: Record<string, any>): Promise<Response>;
  sendWS(msg: MessageBase): void;
  callWS<T>(msg: MessageBase): Promise<T>;
}

export interface HomeAssistantFormatters {
  formatEntityState(stateObj: HassEntity, state?: string): string;
  formatEntityStateToParts(stateObj: HassEntity, state?: string): ValuePart[];
  formatEntityAttributeValue(
    stateObj: HassEntity,
    attribute: string,
    value?: any
  ): string;
  formatEntityAttributeValueToParts(
    stateObj: HassEntity,
    attribute: string,
    value?: any
  ): ValuePart[];
  formatEntityAttributeName(stateObj: HassEntity, attribute: string): string;
  formatEntityName(
    stateObj: HassEntity,
    type: string | any | any[] | undefined,
    separator?: any
  ): string;
}

export interface HomeAssistantConnection {
  connection: Connection;
  connected: boolean;
  debugConnection: boolean;
  hassUrl(path?: string): string;
}

export interface HomeAssistantUI {
  themes: Themes;
  selectedTheme: ThemeSettings | null;
  panels: Panels;
  panelUrl: string;
  dockedSidebar: "docked" | "always_hidden" | "auto";
  kioskMode: boolean;
  enableShortcuts: boolean;
  vibrate: boolean;
  suspendWhenHidden: boolean;
}

export interface HomeAssistantConfig {
  auth: Auth & { external?: any };
  config: HassConfig;
  user?: CurrentUser;
  userData?: any;
  systemData?: any;
}

export interface HomeAssistant
  extends
    HomeAssistantRegistries,
    HomeAssistantInternationalization,
    HomeAssistantApi,
    HomeAssistantFormatters,
    HomeAssistantConnection,
    HomeAssistantUI,
    HomeAssistantConfig {
  states: HassEntities;
  services: HassServices;
}

// ---------------------------------------------------------------------------
// Utility types
// ---------------------------------------------------------------------------

export type Constructor<T = any> = new (...args: any[]) => T;

export interface ClassElement {
  kind: "field" | "method";
  key: PropertyKey;
  placement: "static" | "prototype" | "own";
  initializer?: (...args: any[]) => unknown;
  extras?: ClassElement[];
  finisher?: <T>(cls: Constructor<T>) => undefined | Constructor<T>;
  descriptor?: PropertyDescriptor;
}

export interface ValueChangedEvent<T> extends CustomEvent {
  detail: {
    value: T;
  };
}

export interface Route {
  prefix: string;
  path: string;
}

export interface PanelElement extends HTMLElement {
  hass?: HomeAssistant;
  narrow?: boolean;
  route?: Route | null;
  panel?: PanelInfo;
}

export interface LocalizeMixin {
  hass?: HomeAssistant;
  localize: LocalizeFunc;
}

// https://www.jpwilliams.dev/how-to-unpack-the-return-type-of-a-promise-in-typescript
export type AsyncReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => Promise<infer U>
  ? U
  : T extends (...args: any) => infer U
    ? U
    : never;

export type Entries<T> = [keyof T, T[keyof T]][];
