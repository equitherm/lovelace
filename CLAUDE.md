# CLAUDE.md

Guidance for Claude Code when working with this project.

## Project Overview

**lovelace-equitherm-cards** - Home Assistant Lovelace custom cards for the ESPHome equitherm climate component. Provides visual cards for monitoring and tuning heating curves.

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
# Start HA with the card loaded
ha -c .hass_dev start

# The card is served from dist/ via configuration.yaml
# Mock entities are defined in .hass_dev/packages/mock_equitherm.yaml
```

The dev dashboard is at `.hass_dev/lovelace/dev-dashboard.yaml`.

## Project Structure

```
lovelace/
├── src/
│   ├── equitherm-cards.ts    # Entry point, card registration
│   ├── cards/                 # Card implementations (co-located)
│   │   ├── status-card/       # Status card + editor + config + const
│   │   ├── curve-card/        # Curve card + editor + config + const
│   │   ├── forecast-card/     # Forecast card + editor + config + const
│   │   └── tuning-card/       # Tuning card + editor + config + const
│   ├── shared/                # Shared Lit components
│   ├── utils/                 # Helper functions and base classes
│   ├── ha/                    # Vendored HA types (from Mushroom)
│   └── localize.ts            # i18n setup
├── dist/
│   └── equitherm-cards.js    # Built bundle (committed for HACS)
├── .github/workflows/
│   ├── ci.yml                 # CI: build + typecheck
│   └── release.yml            # Semantic release with GitHub App
├── hacs.json                  # HACS configuration
├── .releaserc.json            # semantic-release config
├── rollup.config.mjs          # Rollup bundler config
└── tsconfig.json              # TypeScript config
```

## Architecture

This project follows the **Mushroom pattern** from [lovelace-mushroom](https://github.com/piitaya/lovelace-mushroom).

### Base Class Hierarchy

```
LitElement
    └── EquithermBaseElement (src/utils/base-element.ts)
            ├── Dark mode handling via :host([dark-mode])
            ├── Theme CSS variables injection
            └── EquithermBaseCard<TConfig> (src/utils/base-card.ts)
                    ├── @state() _config
                    ├── Entity access helpers
                    ├── Temperature formatting
                    └── Action handling
```

**EquithermBaseElement** provides:
- `computeDarkMode(hass)` - Detects dark mode from HA themes
- Auto-toggles `dark-mode` attribute on theme change
- Default color CSS variables

**EquithermBaseCard<TConfig>** provides:
- `@state() _config` - Card configuration
- Entity access: `_entityState()`, `_entityAttr()`, `_entityExists()`
- Formatting: `_formatTemp()` with locale-aware formatting and unit conversion
- Actions: `_openMoreInfo()`, `_handleAction()`, `_hasAction`
- Rendering: `_renderNotFound()`, `_renderLastUpdated()` (optional ha-relative-time footer)
- Entity number resolution: `_resolveEntityNumber(entityId, fallback)`
- Grid options: `getGridOptions()`, `getCardSize()`

**EquithermChartCard<TConfig>** (`src/utils/base/chart-card.ts`) extends EquithermBaseCard:
- ApexCharts lifecycle management (init, update, destroy)
- Dark mode chart option updates
- Connection/disconnect handling for chart subscriptions

### Vendored HA Types (`src/ha/`)

Backported from lovelace-mushroom to avoid `custom-card-helpers` dependency:

```
src/ha/
├── index.ts                    # Barrel export
├── types.ts                    # HomeAssistant, registry types
├── common/
│   ├── const.ts                # Domain constants
│   ├── dom/fire_event.ts       # Event firing
│   ├── array/ensure-array.ts   # Array wrapping utility
│   ├── entity/
│   │   ├── compute_domain.ts
│   │   ├── compute_entity_name.ts         # Entity name from registry
│   │   ├── compute_entity_name_display.ts # HA-native name display with picker support
│   │   ├── compute_object_id.ts
│   │   ├── compute_state_name.ts
│   │   ├── compute_area_name.ts
│   │   ├── compute_device_name.ts
│   │   ├── compute_floor_name.ts
│   │   ├── strip_prefix_from_entity_name.ts
│   │   └── context/get_entity_context.ts  # Entity→device→area→floor lookup
│   ├── translations/localize.ts
│   └── util/                   # debounce, deep-equal, compute_rtl
├── data/
│   ├── climate.ts              # ClimateEntity, HvacAction types
│   ├── entity.ts               # HassEntity helpers
│   ├── lovelace.ts             # Lovelace badge config types
│   ├── translation.ts
│   └── ws-themes.ts
└── panels/lovelace/
    ├── types.ts                # LovelaceCard, LovelaceCardConfig, grid options
    └── common/                 # handle-actions, has-action
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Package Manager | pnpm 10 |
| Language | TypeScript 5.9 (strict mode) |
| UI Framework | Lit 3 |
| Bundler | Rollup 4 |
| Charts | ApexCharts 5.x |
| HA Connection | home-assistant-js-websocket |
| Release | semantic-release |

## Implemented Cards

### Equitherm Status Card (`src/cards/status-card/`)

Compact tile showing heating status with temperature displays.

**Required config:**
- `climate_entity` - Climate entity with `current_temperature` attribute
- `outdoor_entity` - Outdoor temperature sensor
- `flow_entity` - Flow setpoint sensor

**Optional config:**
- `name` - Entity name picker object/array (e.g. `{ type: entity }` or `[{ type: text, text: "..." }, { type: device }]`)
- `title` - *Deprecated* — use `name` instead
- `curve_output_entity` - When set, shows "ADJUSTING" indicator with target
- `pid_output_entity` - PID output sensor, used for rate-limit direction
- `rate_limiting_entity` - Binary sensor, enables ramping display
- `pid_active_entity` - Binary sensor, shows whether PID correction is active
- `layout` - `'default'` | `'vertical'` | `'horizontal'`
- `show_last_updated` - Boolean, show "last updated" timestamp in footer

**Features:**
- HVAC action badge (heating/idle/off) - click opens climate more-info
- Three-column layout: Outdoor → Flow | Room
- Temperature unit conversion (°C/°F) via HA's unit system
- Rate-limiting indicator with rising/falling direction
- Manual preset indicator (badge when `preset_mode === "Manual"`)

### Equitherm Curve Card (`src/cards/curve-card/`)

Heating curve visualization with ApexCharts.

**Required config:**
- `climate_entity` - Climate entity with curve parameters
- `outdoor_entity` - Outdoor temperature sensor
- `flow_entity` - Flow setpoint sensor
- `curve_output_entity` - Curve output temperature sensor

**Optional config:**
- `name` - Entity name picker object/array (same format as status card)
- `title` - *Deprecated* — use `name` instead
- `pid_output_entity` - PID output sensor for rate-limit direction
- `rate_limiting_entity` - Binary sensor for rate limiting
- `pid_active_entity` - Binary sensor, shows PID correction status
- `curve_from_entities` - Read curve params from entities instead of static values
- `hc_entity` - Entity for live heat curve coefficient
- `n_entity` - Entity for live exponent
- `shift_entity` - Entity for live shift offset
- `min_flow_entity` - Sensor/number entity for live min flow temperature
- `max_flow_entity` - Sensor/number entity for live max flow temperature
- `show_last_updated` - Boolean, show "last updated" timestamp in footer

**Features:**
- Line chart with horizontal gradient (customizable via `--curve-gradient-start` / `--curve-gradient-end` CSS vars)
- Discrete data points along the curve
- Interactive 3-column footer (outdoor · flow · room) with click-to-more-info
- Current operating point marker with rate-limiting indicators
- Manual preset indicator (badge + chart dimming when `preset_mode === "Manual"`)
- Dark mode support

### Equitherm Forecast Card (`src/cards/forecast-card/`)

Weather-based heating flow temperature forecast with ApexCharts.

**Required config:**
- `weather_entity` - Weather entity for forecast data
- `climate_entity` - Climate entity with temperature setpoint
- `flow_entity` - Flow setpoint sensor

**Optional config:**
- `name` - Entity name picker
- `pid_active_entity` - Binary sensor, shows PID correction status
- `show_last_updated` - Boolean, show "last updated" timestamp in footer
- `hours` - Number of forecast hours (1-48, default 24)
- `curve_from_entities` - Read curve params from entities
- `hc_entity`, `n_entity`, `shift_entity` - Live curve parameter entities
- `min_flow_entity`, `max_flow_entity` - Sensor/number entities for live flow limits
- Static curve params: `hc`, `n`, `shift`, `min_flow`, `max_flow`

**Features:**
- Dual series chart: predicted flow temp + outdoor temperature
- Peak demand annotation
- Weather forecast via HA WebSocket subscription
- HVAC/PID badges in header
- Manual preset indicator (badge + chart dimming when `preset_mode === "Manual"`)

### Equitherm Tuning Card (`src/cards/tuning-card/`)

Interactive curve tuning with sliders for hc and shift parameters.

**Required config:**
- `climate_entity` - Climate entity with temperature setpoint
- `outdoor_entity` - Outdoor temperature sensor
- `hc_entity` - Writable number entity for heat curve coefficient
- `shift_entity` - Writable number entity for shift offset

**Optional config:**
- `name` - Entity name picker
- `show_last_updated` - Boolean, show "last updated" timestamp in footer
- `curve_from_entities` - Read additional params from entities
- `n_entity` - Entity for live exponent
- `min_flow_entity`, `max_flow_entity` - Sensor/number entities for live flow limits
- Static params: `n`, `min_flow`, `max_flow`, `t_out_min`, `t_out_max`
- `recalculate_service` - Service to call after applying values

**Features:**
- Interactive hc/shift sliders with real-time chart preview
- Current (orange) vs proposed (blue) curve comparison
- Operating point marker on current curve
- Delta indicators and per-slider reset buttons
- Apply All button with success feedback
- Calls `recalculate_service` after apply (if configured)
- Manual preset indicator (badge + chart dimming when `preset_mode === "Manual"`)

## Utilities (`src/utils/`)

| File | Purpose |
|------|---------|
| `base-element.ts` | Base Lit class with dark mode + theme CSS |
| `base-card.ts` | Card base class with entity/action helpers |
| `theme.ts` | Theme CSS variables (`--rgb-primary`, etc.) |
| `colors.ts` | Default color definitions |
| `hvac-colors.ts` | HVAC action colors and icons |
| `card-styles.ts` | Shared card CSS |
| `entity-styles.ts` | Entity animations + styles |
| `curve.ts` | Curve calculation (`buildCurveSeries`, `flowAtOutdoor`) |
| `register-card.ts` | `registerCustomCard()` helper |
| `actions.ts` | Action execution (`executeAction`, `hasAction`) |
| `appearance.ts` | Appearance config helpers |
| `layout.ts` | Layout utilities |
| `info.ts` | Info utilities |

### Shared Components (`src/shared/`)

| Component | Purpose |
|-----------|---------|
| `shape-icon.ts` | Icon with colored background shape |
| `badge-icon.ts` | Small badge overlay (e.g., HVAC action indicator) |
| `badge-info.ts` | Info badge with label, color, icon, and active state |
| `card.ts` | Card wrapper component |
| `state-info.ts` | State value display |
| `state-item.ts` | State item container |
| `shape-avatar.ts` | Avatar with shape background |

## Key Conventions

1. **Lit components**: All cards are Lit elements
2. **TypeScript strict mode**: Full type safety
3. **HACS distribution**: Built bundle is attached to GitHub releases
4. **Card registration**: Use `registerCustomCard()` from `src/utils/register-card.ts`
5. **Co-located files**: Card, editor, config, and const files in `src/cards/<card-name>/`
6. **Theme support**: All cards get dark mode via `:host([dark-mode])` CSS
7. **No custom-card-helpers**: Use vendored types from `src/ha/`

## Adding a New Card

1. Create directory `src/cards/my-card/`
2. Create files:
   - `my-card.ts` - Card implementation extending `EquithermBaseCard`
   - `my-card-editor.ts` - Visual editor (optional)
   - `my-card-config.ts` - Superstruct schema + defaults
   - `const.ts` - Card name constants
3. Register in `src/equitherm-cards.ts`:
   ```typescript
   import './cards/my-card/my-card';

   registerCustomCard({
     type: 'equitherm-my-card',
     name: 'My Card',
     description: 'Description here',
   });
   ```
4. Build and test

## Commit Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New card or feature (triggers release)
- `fix:` - Bug fix (triggers release)
- `docs:` - Documentation only
- `chore:` - Maintenance, deps, tooling
- `refactor:` - Code restructuring without behavior change
- `ci:` - CI/CD changes

## Release

Automated via semantic-release on push to `main`:
- Analyzes conventional commits
- Generates changelog
- Creates GitHub release with `dist/equitherm-cards.js` attached

Requires `APP_ID` and `APP_PRIVATE_KEY` secrets.
