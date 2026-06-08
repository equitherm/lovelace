# OpenTherm Cards V2 Design

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Full sweep of OpenTherm cards — fix bugs, add fault awareness, extract clean EChart base, add diagnostics card, resolve all convention violations.

**Architecture:** Extract EChart lifecycle from EquithermEChartCard into a framework-agnostic base (EChartCardBase → OtEChartCard). Add fault awareness to OtBaseCard as a shared injection point. Introduce a new opentherm-diagnostics-card for the 12 uncovered ESPHome diagnostic entities.

**Tech Stack:** Lit 3, TypeScript 5.9 (strict), ECharts via ha-chart-base, Superstruct, Home Assistant frontend components

---

## Section 1: EChart Base Extraction

### Current (broken hierarchy)

```
BaseCard (abstract-base-card.ts)
├── EquithermBaseCard (base-card.ts) — climate, WWSD, PID, HVAC badges
│     └── EquithermEChartCard (echart-card.ts) — chart lifecycle + climate baggage
│           └── OtEfficiencyCard ← inherits _climate, _isWWSD, _renderPidBadge etc.
├── OtBaseCard (base-ot-card.ts)
│     ├── OtStatusCard
│     ├── OtDhwCard
│     └── OtModulationCard
```

### Target (clean hierarchy)

```
BaseCard (abstract-base-card.ts)
├── EquithermBaseCard (base-card.ts) — climate, WWSD, PID, HVAC badges
│     └── EquithermEChartCard (echart-card.ts) — UNCHANGED, re-exports from EChartCardBase
├── OtBaseCard (base-ot-card.ts) — fault awareness, _renderNotFound, _renderFaultBadge
│     ├── OtStatusCard
│     ├── OtDhwCard
│     ├── OtModulationCard
│     └── OtDiagnosticsCard (new)
└── EChartCardBase (echart-base.ts) — chart lifecycle ONLY, no domain specifics
      └── OtEChartCard (ot-echart-card.ts) — EChartCardBase + OtBaseCard composition
            └── OtEfficiencyCard
```

### New files

#### `src/utils/base/echart-base.ts`

```ts
// EChartCardBase<TConfig> extends BaseCard<TConfig>
// Contains ONLY chart lifecycle extracted from EquithermEChartCard:
//   - @state() _echartConfig
//   - _buildEChartOptions() (abstract)
//   - _updateChartConfig()
//   - _formatChartTime() / _formatChartDateTime()
//   - _renderChart()
//   - updated() with temp/time-format change detection
//   - _onChartReconnected() / _onChartDisconnecting() hooks
//   - connectedCallback / disconnectedCallback calling reconnected/disconnecting
//   - _hasFixedHeight getter
//   - getGridOptions() returning { columns: 12, rows: "auto", min_rows: 3 }
//   - getCardSize() returning 3
//   - Chart styles (chart-wrapper, has-fixed-height, manual-override opacity)
```

#### `src/utils/base/ot-echart-card.ts`

```ts
// OtEChartCard<TConfig extends OtCardConfig> extends EChartCardBase<TConfig>
// Applies OtBaseCard-like behavior:
//   - _renderNotFound() from OtBaseCard
//   - Fault awareness from OtBaseCard (_hasFault, _faultOverride, _renderFaultBadge)
//   - Uses OtCardConfig type constraint instead of EquithermCardConfig
//
// This is a thin composition layer — no new logic, just wires OtBaseCard capabilities
// into the EChart lifecycle path.
```

### Modified files

- `src/utils/base/echart-card.ts` — EquithermEChartCard now extends EquithermBaseCard AND imports chart methods from EChartCardBase mixin, or simply re-extends EquithermBaseCard + EChartCardBase via intermediate class. Behavioral no-op for existing equitherm cards.
- `src/utils/base/index.ts` — Add exports for `EChartCardBase`, `OtEChartCard`
- `src/cards/opentherm/ot-efficiency-card/ot-efficiency-card.ts` — Change `extends EquithermEChartCard` to `extends OtEChartCard`, update imports

---

## Section 2: Fault Awareness in OtBaseCard

### Changes to `src/utils/base/base-ot-card.ts`

**OtCardConfig** — add optional field:
```ts
export interface OtCardConfig {
  show_last_updated?: boolean;
  fault_entity?: string;          // NEW
  [key: string]: unknown;
}
```

**OtBaseCard** — add methods:
```ts
/** Whether a boiler fault is active */
protected _hasFault(): boolean {
  if (!this._config.fault_entity) return false;
  return this._entityState(this._config.fault_entity)?.state === 'on';
}

/** Override in per-card _headerIconColor() to check first */
protected _faultOverride(): string | null {
  return this._hasFault() ? 'var(--rgb-error, 229,57,53)' : null;
}

/** Shared fault badge for use in _renderHeaderBadges() */
protected _renderFaultBadge(): typeof nothing | ReturnType<typeof html> {
  if (!this._hasFault()) return nothing;
  const localize = setupCustomLocalize(this.hass);
  return html`
    <eq-badge-info
      .label=${localize('opentherm.common.fault')}
      .icon=${'mdi:alert-circle'}
      .active=${true}
      style="--badge-info-color: var(--rgb-error, 229,57,53)"
    ></eq-badge-info>
  `;
}
```

### Per-card changes

Each OT card's `_headerIconColor()` adds a one-liner guard:
```ts
protected override _headerIconColor(): string {
  const fault = this._faultOverride();
  if (fault) return fault;
  // ... existing per-card logic unchanged
}
```

Each OT card's `_renderHeaderBadges()` prepends `${this._renderFaultBadge()}` as first badge.

**Cards touched:** ot-status-card.ts, ot-dhw-card.ts, ot-modulation-card.ts, ot-efficiency-card.ts

---

## Section 3: Delta-T Fahrenheit Bug + `_formatCalcDelta()`

### New method in `src/utils/base/abstract-base-card.ts`

```ts
/** Format a computed temperature delta (always °C internally) for display.
 *  Uses _toDisplayDelta() for correct °F scaling (1.8×, no offset).
 *  signDisplay:'always' ensures explicit +/- in all locales. */
protected _formatCalcDelta(value: number | undefined | null): string {
  if (value == null || isNaN(value)) return '—';
  const display = this._toDisplayDelta(value);
  const unit = this.hass?.config?.unit_system?.temperature ?? '°C';
  return `${formatNumber(display, this.hass?.locale, {
    minimumFractionDigits: 1, maximumFractionDigits: 1, signDisplay: 'always'
  })} ${unit}`;
}
```

### Bug fixes

**`ot-status-card.ts:70-75`** — Replace `_formattedDeltaT` getter:
```ts
// BEFORE (buggy — raw °C delta shown as °F without scaling):
private get _formattedDeltaT(): string {
  const delta = this._deltaT;
  if (isNaN(delta)) return '—';
  const unit = this.hass?.config?.unit_system?.temperature ?? '°C';
  return `${formatNumber(delta, this.hass?.locale, { ... })} ${unit}`;
}

// AFTER (correct — uses _formatCalcDelta with _toDisplayDelta scaling):
private get _formattedDeltaT(): string {
  return this._formatCalcDelta(this._deltaT);
}
```

**`ot-efficiency-card.ts:83-90`** — Same replacement for its `_formattedDeltaT` getter.

**`eq-binary-timeline.ts:88`** — Fix missing `HassConfig` arg:
```ts
// BEFORE:
const timeStr = formatTime(new Date(startMs), this.hass.locale);
// AFTER:
const timeStr = formatTime(new Date(startMs), this.hass.locale, this.hass.config);
```

---

## Section 4: New `opentherm-diagnostics-card`

### File structure

```
src/cards/opentherm/ot-diagnostics-card/
├── const.ts
├── ot-diagnostics-card-config.ts
├── ot-diagnostics-card-editor.ts
└── ot-diagnostics-card.ts
```

### Config interface (`ot-diagnostics-card-config.ts`)

```ts
export interface OtDiagnosticsCardConfig {
  type: string;
  fault_entity: string;                    // required — primary fault indicator
  name?: unknown;
  show_last_updated?: boolean;

  // Numeric sensors
  pressure_entity?: string;                // sensor.*ch_pressure
  exhaust_entity?: string;                 // sensor.*t_exhaust
  fault_code_entity?: string;              // sensor.*oem_fault_code
  diagnostic_code_entity?: string;         // sensor.*oem_diagnostic_code

  // Fault binary sensors
  flame_fault_entity?: string;             // binary_sensor.*flame_fault
  low_pressure_entity?: string;            // binary_sensor.*low_water_pressure
  air_pressure_entity?: string;            // binary_sensor.*air_pressure_fault
  water_overtemp_entity?: string;          // binary_sensor.*water_over_temp
  lockout_entity?: string;                 // binary_sensor.*lockout_reset
  service_request_entity?: string;         // binary_sensor.*service_request
  diagnostic_entity?: string;              // binary_sensor.*diagnostic_indication

  [key: string]: unknown;
}
```

### Card layout

```
┌─────────────────────────────────────┐
│ [⚠] Boiler Diagnostics             │  ← red icon when fault active
├─────────────────────────────────────┤
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │ 1.5  │ │ 54.2 │ │  A05 │        │  ← KPI row: pressure, exhaust, code
│  │ bar  │ │  °C  │ │ code │        │
│  └──────┘ └──────┘ └──────┘        │
├─────────────────────────────────────┤
│  ✅ Flame Fault  ❌ Low Pressure   │  ← status grid
│  ✅ Air Pressure ✅ Water Temp     │
├─────────────────────────────────────┤
│  ⚠ Service Required               │  ← diagnostic info row
└─────────────────────────────────────┘
```

### Architecture

- Extends `OtBaseCard<OtDiagnosticsCardConfig>`
- Uses `_hasFault()` for header icon color
- KPI row: renders configured numeric sensors (pressure, exhaust, fault code) as 3-column grid
- Status grid: iterates configured fault binary sensors, renders each as a row with check/cross icon + localized label
- Diagnostic row: shows service_request, lockout, diagnostic_indication as info badges
- Pressure warning: red when <1.0 bar or >3.0 bar
- Editor: uses `schemaHelpers.expandable` groups for "Numeric Sensors", "Fault Sensors", "Diagnostic Sensors"

### Registration

Add to `src/opentherm-cards.ts`:
```ts
import './cards/opentherm/ot-diagnostics-card/ot-diagnostics-card';
```

---

## Section 5: Convention Fixes & Minor Improvements

### Font-size violations

Replace all 6 occurrences with `var(--ha-font-size-xs, 0.75rem)`:

| File | Selector | Line | Current |
|------|----------|------|---------|
| ot-status-card.ts | `.temp-setpoint` | 161 | 11px |
| ot-status-card.ts | `.temp-label` | 166 | 10px |
| ot-status-card.ts | `.mod-label` | 182 | 10px |
| ot-dhw-card.ts | `.control-label` | 147 | 11px |
| ot-modulation-card.ts | `.mod-label` | 183 | 10px |
| ot-modulation-card.ts | `.timeline-label` | 218 | 9px |

### Hardcoded domain arrays

`ot-efficiency-card-editor.ts` — replace inline `['sensor', 'input_number']` with `SENSOR_DOMAINS` import and `['binary_sensor', 'input_boolean']` with `BINARY_SENSOR_DOMAINS` import from `utils/domains.ts`.

### WRITABLE_BINARY_DOMAINS centralization

Move from `ot-dhw-card/const.ts` to `utils/domains.ts`:
```ts
export const WRITABLE_BINARY_DOMAINS: readonly string[] = ['switch', 'input_boolean'];
```
Re-export from const.ts for backward compat.

### ha-slider event typing

`ot-dhw-card.ts:117` and `ot-modulation-card.ts:120`:
```ts
// BEFORE:
const value = parseFloat((ev.target as HTMLInputElement).value);
// AFTER:
const value = parseFloat((ev.target as any).value);
```

### DHW slider fallback values

`ot-dhw-card.ts:66-68`:
```ts
// BEFORE:
min: this._entityAttr<number>(id, 'min') ?? 30,
max: this._entityAttr<number>(id, 'max') ?? 60,
step: this._entityAttr<number>(id, 'step') ?? 0.5,
// AFTER:
min: this._entityAttr<number>(id, 'min') ?? 40,
max: this._entityAttr<number>(id, 'max') ?? 65,
step: this._entityAttr<number>(id, 'step') ?? 1,
```

### Config defaulted() coercion

`ot-efficiency-card-config.ts` and `ot-modulation-card-config.ts`:
- Switch `assert()` → `coerce()` for the validation function
- Add `defaulted(number(), DEFAULT_HOURS)` for `hours` field
- Add `defaulted(number(), DEFAULT_CONDENSING_THRESHOLD)` for `condensing_threshold` in efficiency card

### Localize hardcoded 'Flame'

`ot-modulation-card.ts:279`:
```ts
// BEFORE:
<div class="timeline-label">Flame</div>
// AFTER:
<div class="timeline-label">${localize('opentherm.modulation_card.flame')}</div>
```

### Short-cycle CH-only filter

`ot-modulation-card` — add optional `ch_active_entity` to config and editor schema:
- In `_fetchHistory()`, also fetch `ch_active_entity` history alongside flame
- In cycle counting, only count flame OFF→ON transitions where `ch_active` was `'on'` at that timestamp
- Fallback: if `ch_active_entity` not configured, count all transitions (current behavior)

### Visibility-based polling pause

Both `ot-efficiency-card._fetchHistory()` and `ot-modulation-card._fetchHistory()`:
```ts
if (document.visibilityState !== 'visible') return;
```

---

## Implementation Order

1. **`_formatCalcDelta()` in abstract-base-card.ts** — foundational, no dependencies
2. **Font-size fixes** — mechanical, no dependencies
3. **EChart base extraction** — echart-base.ts + ot-echart-card.ts + index.ts update
4. **Efficiency card migration** — change extends to OtEChartCard
5. **Fault awareness in OtBaseCard** — _hasFault, _faultOverride, _renderFaultBadge
6. **Per-card fault integration** — one-liner guards in all 4 cards
7. **Convention fixes batch** — domain arrays, slider typing, DHW fallbacks, defaulted(), localize 'Flame'
8. **Diagnostics card** — new card (const, config, editor, card, registration)
9. **Short-cycle CH filter** — modulation card enhancement
10. **Visibility polling** — one-liner in efficiency + modulation
11. **eq-binary-timeline formatTime fix** — add missing HassConfig arg
12. **Build + verify** — `pnpm build`, `pnpm typecheck`
