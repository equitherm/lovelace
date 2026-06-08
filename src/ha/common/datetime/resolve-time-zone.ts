// @source home-assistant/frontend/src/common/datetime/resolve-time-zone.ts
// @synced 2026-06-08 @ SHA 1cca5f3
// @note Adapted: IANA timezone validation via google-timezones-json omitted.
//   Lovelace cards run in HA's browser where Intl returns valid IANA zones.
//   Upstream validates to handle Android emulators returning offset strings like "+00:00".

import { TimeZone } from "../../data/translation";

const RESOLVED_TIME_ZONE = Intl.DateTimeFormat?.().resolvedOptions?.().timeZone;
export const LOCAL_TIME_ZONE = RESOLVED_TIME_ZONE ?? "UTC";

// Resolve user's timezone preference. Falls back to server timezone when local cannot be determined.
export const resolveTimeZone = (option: string, serverTimeZone: string) =>
  option === TimeZone.local && RESOLVED_TIME_ZONE
    ? LOCAL_TIME_ZONE
    : serverTimeZone;
