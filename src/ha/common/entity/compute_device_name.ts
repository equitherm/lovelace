import type { DeviceRegistryEntry } from "../../types";

export const computeDeviceName = (
  device: DeviceRegistryEntry
): string | undefined => (device.name_by_user || device.name)?.trim();
