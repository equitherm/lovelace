// @source home-assistant/frontend/src/common/util/compute_rtl.ts
// @synced 2026-06-08 @ SHA 1cca5f3
// @note Adapted: computeDirectionStyles, setDirectionStyles, emitRTLDirection,
//   computeRTLDirection excluded — they require LitElement and are only used by
//   upstream's layout system, not by our cards.

import type { Translation } from "../../types";

export function computeRTL(
  language = "en",
  translations: Record<string, Translation>
) {
  if (translations[language]) {
    return translations[language].isRTL || false;
  }
  return false;
}
