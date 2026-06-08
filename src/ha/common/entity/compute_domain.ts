// @source home-assistant/frontend/src/common/entity/compute_domain.ts
// @synced 2026-06-08 @ SHA 1cca5f3

export const computeDomain = (entityId: string): string =>
  entityId.substring(0, entityId.indexOf("."));
