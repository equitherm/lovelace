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
│   │   └── curve-card/        # Curve card + editor + config + const
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
- Formatting: `_formatTemp()` with unit conversion
- Actions: `_openMoreInfo()`, `_handleAction()`, `_hasAction`
- Rendering: `_renderNotFound()`
- Grid options: `getGridOptions()`, `getCardSize()`

### Vendored HA Types (`src/ha/`)

Backported from lovelace-mushroom to avoid `custom-card-helpers` dependency:

```
src/ha/
├── index.ts                    # Barrel export
├── types.ts                    # HomeAssistant type
├── common/
│   ├── const.ts                # Domain constants
│   ├── dom/fire_event.ts       # Event firing
│   ├── entity/compute_domain.ts
│   ├── translations/localize.ts
│   └── util/                   # debounce, deep-equal, compute_rtl
├── data/
│   ├── climate.ts              # ClimateEntity types
│   ├── entity.ts               # HassEntity helpers
│   ├── lovelace.ts             # Lovelace types
│   ├── translation.ts
│   └── ws-themes.ts
└── panels/lovelace/
    ├── types.ts
    └── common/                 # handle-actions, has-action
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Package Manager | pnpm 10 |
| Language | TypeScript 5.9 (strict mode) |
| UI Framework | Lit 3 |
| Bundler | Rollup 4 |
| Charts | ApexCharts |
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
- `curve_output_entity` - When set, shows "ADJUSTING" indicator with target
- `rate_limiting_entity` - Binary sensor, enables ramping display
- `pid_active_entity` - Binary sensor, shows whether PID correction is active
- `layout` - `'default'` | `'vertical'` | `'horizontal'`

**Features:**
- HVAC action badge (heating/idle/off) - click opens climate more-info
- Three-column layout: Outdoor → Flow | Room
- Temperature unit conversion (°C/°F) via HA's unit system
- Rate-limiting indicator with rising/falling direction

### Equitherm Curve Card (`src/cards/curve-card/`)

Heating curve visualization with ApexCharts.

**Required config:**
- `climate_entity` - Climate entity with curve parameters
- `outdoor_entity` - Outdoor temperature sensor
- `flow_entity` - Flow setpoint sensor

**Features:**
- Interactive ApexCharts visualization
- Current operating point marker
- Dark mode support
- Rate-limiting indicator

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
