import type { HomeAssistant } from '../ha';

export interface OtHistoryPoint {
  last_changed: string;
  state: string;
}

export class OtHistoryHelper {
  static async fetch(
    hass: HomeAssistant,
    entityIds: string[],
    hours: number,
  ): Promise<Record<string, OtHistoryPoint[]>> {
    const end = new Date();
    const start = new Date(end.getTime() - hours * 3600 * 1000);
    const ids = entityIds.join(',');
    const url = `history/period/${start.toISOString()}?filter_entity_id=${ids}&end_time=${end.toISOString()}&minimal_response=true&no_attributes=true`;

    try {
      const data = await (hass as any).callApi('GET', url) as OtHistoryPoint[][];
      const result: Record<string, OtHistoryPoint[]> = {};
      for (let i = 0; i < entityIds.length; i++) {
        result[entityIds[i]] = data[i] ?? [];
      }
      return result;
    } catch {
      return Object.fromEntries(entityIds.map(id => [id, []]));
    }
  }

  /** Count OFF→ON transitions (short-cycling) */
  static countCycles(history: OtHistoryPoint[]): number {
    let count = 0;
    for (let i = 1; i < history.length; i++) {
      if (history[i - 1].state === 'off' && history[i].state === 'on') count++;
    }
    return count;
  }

  /** Convert ON/OFF history to rangeBar data */
  static toRangeBarSeries(history: OtHistoryPoint[], nowMs: number): { x: string; y: [number, number] }[] {
    const result: { x: string; y: [number, number] }[] = [];
    for (let i = 0; i < history.length; i++) {
      const start = new Date(history[i].last_changed).getTime();
      const end = i + 1 < history.length
        ? new Date(history[i + 1].last_changed).getTime()
        : nowMs;
      result.push({ x: history[i].state === 'on' ? 'On' : 'Off', y: [start, end] });
    }
    return result;
  }
}
