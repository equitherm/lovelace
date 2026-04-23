# CLAUDE.md

Guidance for Claude Code when working with this project.

## Project Overview

**lovelace-equitherm-cards** — Home Assistant Lovelace custom cards for the ESPHome
equitherm climate component. Visual cards for monitoring and tuning heating curves,
plus OpenTherm boiler diagnostics.

## Commands

```bash
pnpm dev          # Start Rollup watch mode
pnpm build        # Build bundle to dist/equitherm-cards.js
pnpm typecheck    # TypeScript type check
```

Using Taskfile:
```bash
task dev          # Start watch mode
task build        # Build
task ci           # Run full CI locally
```

## Development

A local Home Assistant instance is configured in `.hass_dev/` for testing:

```bash
ha -c .hass_dev start
# Card served from dist/ via configuration.yaml
# Mock entities: .hass_dev/packages/mock_equitherm.yaml
# Dev dashboard: .hass_dev/lovelace/dev-dashboard.yaml
```

## Project Structure

```
lovelace/
├── src/
│   ├── equitherm-cards.ts         # Entry point, card registration
│   ├── cards/
│   │   ├── status-card/           # Equitherm status + editor + config + const
│   │   ├── curve-card/            # Curve + tuning mode
│   │   ├── forecast-card/         # Weather-based flow forecast
│   │   └── opentherm/
│   │       ├── ot-status-card/    # OT boiler temps + delta
│   │       ├── ot-dhw-card/       # DHW enable + setpoint
│   │       ├── ot-efficiency-card/# Flow/return scatter chart
│   │       └── ot-modulation-card/# Modulation + flame timeline
│   ├── shared/                    # Shared Lit components (eq-param-bar, etc.)
│   ├── utils/
│   │   ├── base/                  # Base classes (see Architecture)
│   │   ├── domains.ts             # Centralized domain constant arrays
│   │   ├── register-card.ts       # registerCustomCard() + editorName()
│   │   ├── card-styles.ts         # Shared card CSS (footer-meta, etc.)
│   │   ├── ot-history.ts          # OtHistoryHelper (fetch + countCycles)
│   │   └── ...
│   └── ha/                        # Vendored HA types (from Mushroom)
├── dist/
│   └── equitherm-cards.js         # Built bundle (committed for HACS)
└── .github/workflows/
    ├── ci.yml
    └── release.yml
```

## Architecture

### Base Class Hierarchy

```
LitElement
  └── EquithermBaseElement          utils/base/base-element.ts
        ├── dark mode (:host([dark-mode]))
        └── BaseCard<TConfig>       utils/base/abstract-base-card.ts
              ├── @state() _config
              ├── entity helpers (_entityState, _entityAttr, _resolveEntityNumber)
              ├── temperature formatting (_formatEntityTemp, _formatCalcTemp)
              ├── _openMoreInfo(), _renderNotFound(), _renderLastUpdated()
              ├── EquithermBaseCard  utils/base/base-card.ts
              │     ├── climate/HVAC helpers (_climate, _isWWSD, _isManualPreset)
              │     ├── badge rendering (_renderPidBadge, _renderWwsdBadge)
              │     └── EquithermEChartCard  utils/base/echart-card.ts
              │           └── ECharts lifecycle (init, destroy, resize)
              └── OtBaseCard        utils/base/base-ot-card.ts
                    ├── _headerIconColor() hook — override to set icon color
                    └── _renderHeaderIcon() — centralized template
```

**Editor hierarchy:**
```
LitElement
  └── EquithermBaseEditor<TConfig>  utils/base/base-editor.ts
        ├── setConfig, _validate (hook), _getSchema (abstract)
        ├── _valueChanged, _computeLabel, _computeHelper, render()
        └── All 7 editors (3 Equitherm + 4 OT) extend this
```

### `utils/base/index.ts` exports

```ts
export { EquithermBaseElement, computeDarkMode }  // base-element
export { BaseCard }                                // abstract-base-card
export { EquithermBaseCard, headerStyles }         // base-card
export { EquithermEChartCard, type EChartConfig }  // echart-card
export { OtBaseCard, type OtCardConfig }           // base-ot-card
export { EquithermBaseEditor }                     // base-editor
```

## Tech Stack

| Layer | Technology |
|---|---|
| Package Manager | pnpm 10 |
| Language | TypeScript 5.9 (strict mode) |
| UI Framework | Lit 3 |
| Bundler | Rollup 4 |
| Charts | ECharts (OT cards) / ApexCharts (Equitherm cards) |
| Config validation | Superstruct |
| HA Connection | home-assistant-js-websocket |
| Release | semantic-release |

## Code Conventions

### Controls & HA Frontend patterns

- **Always use HA Frontend controls** — never native HTML equivalents:
  - `<ha-slider>` not `<input type="range">`
  - `<ha-switch>` not `<input type="checkbox">`
  - `<ha-form>` for editor forms
  - `<ha-tile-icon>`, `<ha-relative-time>`, etc.
- **`callService`**: always `callService(domain, service, { entity_id })`
  — never `service.split('.')`, never hardcode domain+service as one string
- **`computeDomain(entityId)`** from `src/ha/` to extract domain dynamically
- **Graceful degradation**: `_renderNotFound()` + reduced opacity on missing entity,
  never `throw` inside `render()`

### Reactivity (Lit)

- `@state()` only on data that triggers a **meaningful** re-render
  — plain class fields for caches and intermediary data
- **Stable binding references**: any function passed as a Lit binding
  (`.computeLabel`, `.formatter`, `.schema`) must be a stable reference:
  - Class arrow function: `private _fn = (x) => ...`
  - Or `memoizeOne(...)` for functions that depend on changing inputs
  - **Never** inline arrow functions in the template — creates a new reference
    on every render and forces Lit to rebind
- **Dynamic styles**: `styleMap({})` always — never template string interpolation
  (`style="color: ${x}"` is XSS-prone and bypasses Lit's sanitization)

### Config & Validation

- **Superstruct** in each `*-config.ts`:
  - `assert(config, Struct)` in `setConfig()` — throws, visible in the editor UI
  - `coerce(config, Struct)` to apply `defaulted()` values
  - Never `validate()` — errors are silent
- **Editors**: always extend `EquithermBaseEditor<TConfig>`:
  - Implement: `setConfig`, `_validate(config)` hook, `_getSchema()` via `memoizeOne`
  - Base provides everything else: `_valueChanged`, `_computeLabel`,
    `_computeHelper`, `render()`
- **`editorName(cardName)`** from `register-card.ts` — never inline
  `` `${CARD_NAME}-editor` ``

### Temperature & Number Formatting

- **Entity values** → `_formatEntityTemp(entityId)`: uses HA's native formatter,
  respects locale + display unit. Use for raw sensor/state display.
- **Computed values** (always stored as °C internally) → `_formatCalcTemp(value)`:
  converts °C → display unit, then formats with `formatNumber()`.
- **All numbers** → `formatNumber(value, hass.locale, options)` from `src/ha/`
  — never `Number.toFixed()`, never `Intl.NumberFormat` directly.
- **Deltas / offsets** → always pass `{ signDisplay: 'always' }` to `formatNumber`:
  ensures explicit `+`/`−` in all locales including RTL, removes ambiguity.

### Layout & Responsive

- **Container queries** (`@container (max-width: 260px)`) in `card-styles.ts`
  — never media queries. Cards can be in any column width.
- **`_renderFooterMeta()`** (last-updated footer): only visible when entity is
  **stale (>5 min)** or **unavailable** — never unconditionally. Shows warning
  color when unavailable.
- `font-size` floor: `var(--ha-font-size-xs, 0.75rem)` — never below 12px.

### Architecture (SOLID / KISS)

- **Single hook override > full method override**: if only the color/value changes,
  expose a hook (`_headerIconColor()`) and keep the template in the base.
  `OtBaseCard._renderHeaderIcon()` is the canonical example.
- **Group related getters** when always consumed together:
  `_sliderProps` (`min`/`max`/`step`) instead of three separate getters.
- **Template logic → private getter or private method**, never inline in `render()`.
  Complex expressions in the template make render() unreadable and untestable.
- **`memoizeOne`** for schema getters and stable callback methods in editors.
- **Client-side filtering** preferred over a second network fetch when the full
  dataset is already in memory (see `ot-modulation-card._fetchHistory`).
- **Timer lifecycle**: use `connectedCallback`/`disconnectedCallback` for
  `setInterval` management — not framework-specific hooks. Both chart and
  non-chart cards use the same pattern.

### Domain Constants

Centralized in `src/utils/domains.ts`:

```ts
export const BINARY_SENSOR_DOMAINS = ['binary_sensor', 'input_boolean'];
export const SENSOR_DOMAINS        = ['sensor', 'input_number'];
export const NUMBER_DOMAINS        = ['number', 'input_number'];
```

Never redeclare these locally in `const.ts` or schema files.

## Adding a New Card

1. Create `src/cards/my-card/` with:
   - `my-card.ts` — extends `EquithermBaseCard` or `OtBaseCard`
   - `my-card-editor.ts` — extends `EquithermBaseEditor<MyCardConfig>`
   - `my-card-config.ts` — Superstruct struct + `assert` + `defaulted`
   - `const.ts` — `MY_CARD_NAME` + `MY_CARD_EDITOR_NAME = editorName(MY_CARD_NAME)`
2. Register in `src/equitherm-cards.ts`
3. For OT cards: override `_headerIconColor()` only — never `_renderHeaderIcon()`
4. For Editors: implement `setConfig`, `_validate`, `_getSchema` only

## Implemented Cards

### Equitherm cards (`src/cards/`)

| Card | Key entities | Notes |
|---|---|---|
| `status-card` | climate, outdoor, flow | HVAC badge, rate-limit, PID, WWSD |
| `curve-card` | climate, outdoor, flow | ApexCharts, tuning dialog |
| `forecast-card` | weather, climate, flow | 24h forecast, WebSocket subscription |

### OpenTherm cards (`src/cards/opentherm/`)

| Card | Key entities | Notes |
|---|---|---|
| `ot-status-card` | boiler_temp, return_temp, flame | ΔT, modulation bar via `eq-param-bar` |
| `ot-dhw-card` | dhw_enable, dhw_setpoint | `ha-switch` + `ha-slider` |
| `ot-efficiency-card` | boiler_temp, return_temp | ECharts scatter, condensing threshold |
| `ot-modulation-card` | modulation, max_modulation, flame | `ha-slider`, flame timeline, short-cycle |

## Commit Convention

[Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Effect | Use for |
|---|---|---|
| `feat:` | Minor release | New card, new config option |
| `fix:` | Patch release | Bug fix |
| `refactor:` | No release | Code restructuring, no behavior change |
| `chore:` | No release | Deps, tooling, cleanup |
| `docs:` | No release | Documentation |
| `ci:` | No release | CI/CD |

Scopes: `(status)`, `(curve)`, `(forecast)`, `(dhw)`, `(modulation)`,
`(efficiency)`, `(ot-status)`, `(base)`, `(editor)`, `(const)`.

## Release

Automated via semantic-release on push to `main`.
Requires `APP_ID` + `APP_PRIVATE_KEY` secrets (GitHub App).
Built bundle `dist/equitherm-cards.js` is attached to each release.
