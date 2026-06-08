// @source home-assistant/frontend/src/managers/notification-manager.ts
// @synced 2026-06-08 @ SHA 1cca5f3
// TYPE DEFINITIONS ONLY — the NotificationManager LitElement class is excluded.
// @note Adapted: LocalizeKeys typed as string — upstream uses a deep generic chain
//   (FlattenObjectKeys<TranslationDict>) that we don't vendor.

export interface ShowToastParams {
  // Unique ID for the toast. If a new toast is shown with the same ID as the previous toast, it will be replaced to avoid flickering.
  id?: string;
  message:
    | string
    | { translationKey: string; args?: Record<string, string> };
  action?: ToastActionParams;
  duration?: number;
  dismissable?: boolean;
  bottomOffset?: number;
}

export interface ToastActionParams {
  action: () => void;
  text:
    | string
    | { translationKey: string; args?: Record<string, string> };
}
