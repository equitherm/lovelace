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
│   ├── cards/                 # Card implementations
│   ├── editors/               # HA visual editor configs
│   ├── components/            # Shared Lit components
│   ├── utils/                 # Helper functions
│   └── styles/                # Shared CSS/styles
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

## Tech Stack

| Layer | Technology |
|-------|------------|
| Package Manager | pnpm 10 |
| Language | TypeScript 5.9 (strict mode) |
| UI Framework | Lit 3 |
| Bundler | Rollup 4 |
| Charts | ApexCharts |
| Release | semantic-release |

## Implemented Cards

### Equitherm Status Card (`src/cards/status-card.ts`)

Compact tile showing heating status with temperature displays.

**Required config:**
- `climate_entity` - Climate entity with `current_temperature` attribute
- `outdoor_entity` - Outdoor temperature sensor
- `flow_entity` - Flow setpoint sensor

**Optional config:**
- `curve_output_entity` - When set, shows "ADJUSTING" indicator with target
- `rate_limiting_entity` - Binary sensor, enables ramping display
- `control_mode_entity` - Shows control mode text

**Features:**
- HVAC action badge (heating/idle/off) - click opens climate more-info
- Three-column layout: Outdoor → Flow | Room
- Temperature unit conversion (°C/°F) via HA's unit system
- Rate-limiting indicator with rising/falling direction

## Shared Utilities

### Editor Utilities (`src/utils/editor.ts`)

Provides `schemaHelpers` for building ha-form schemas:

```typescript
import { schemaHelpers, HaFormSchema } from '../utils/editor';

const schema: HaFormSchema[] = [
  schemaHelpers.entity('climate_entity', { domain: 'climate' }),
  schemaHelpers.expandable('Parameters', 'mdi:tune', [
    schemaHelpers.grid([
      schemaHelpers.number('hc', 0.5, 3.0, 0.1),
      schemaHelpers.number('n', 1.0, 2.0, 0.05),
    ]),
  ]),
];
```

### Action Utilities (`src/utils/actions.ts`)

- `executeAction(element, hass, action, entityId)` - Execute tap/hold actions
- `hasAction(action)` - Check if action is configured
- `DEFAULT_TAP_ACTION`, `DEFAULT_HOLD_ACTION` - Common action presets

### Base Class (`src/utils/base-card.ts`)

All cards extend `EquithermBaseCard<TConfig>` which provides:

- Entity access: `_entityState()`, `_entityAttr()`, `_entityExists()`
- Formatting: `_formatTemp()` with unit conversion
- Actions: `_openMoreInfo()`, `_handleAction()`, `_hasAction`
- Rendering: `_renderNotFound()`
- Lifecycle: `_watchedEntities()`, `_onHassUpdate()`

### Config Validation (`src/config/`)

Superstruct schemas for runtime config validation:
- `status-card-config.ts` - StatusCardConfig schema and defaults
- `curve-card-config.ts` - CurveCardConfig schema and defaults

### Shared Components (`src/components/`)

- `shape-icon.ts` - Icon with background shape (circle/square/pill)

## Key Conventions

1. **Lit components**: All cards are Lit elements
2. **TypeScript strict mode**: Full type safety
3. **HACS distribution**: Built bundle is attached to GitHub releases
4. **Card registration**: New cards must be registered in `src/equitherm-cards.ts`
5. **Custom card helpers**: Use `custom-card-helpers` for HA integration
6. **Entity change detection**: Use `entitiesChanged()` helper to gate re-renders

## Adding a New Card

1. Create card file in `src/cards/my-card.ts`
2. Create editor in `src/editors/my-card-editor.ts` (optional)
3. Register in `src/equitherm-cards.ts`:
   ```typescript
   window.customCards.push({
     type: 'equitherm-my-card',
     name: 'My Card',
     description: 'Description here',
     preview: true,
   });
   ```
4. Import and register the card class
5. Build and test

## Commit Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New card or feature (triggers release)
- `fix:` - Bug fix (triggers release)
- `docs:` - Documentation only
- `chore:` - Maintenance, deps, tooling
- `ci:` - CI/CD changes

## Release

Automated via semantic-release on push to `main`:
- Analyzes conventional commits
- Generates changelog
- Creates GitHub release with `dist/equitherm-cards.js` attached

Requires `APP_ID` and `APP_PRIVATE_KEY` secrets.
