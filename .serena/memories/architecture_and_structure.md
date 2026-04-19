# Architecture and Structure

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
├── .hass_dev/                 # Local HA testing instance
├── .github/workflows/         # CI/CD
├── hacs.json                  # HACS configuration
├── .releaserc.json            # semantic-release config
├── rollup.config.mjs          # Rollup bundler config
└── tsconfig.json              # TypeScript config
```

## Key Directories

| Directory | Purpose |
|-----------|---------|
| `src/cards/` | Card implementations, co-located with editors and configs |
| `src/shared/` | Reusable Lit components (badge-icon, shape-icon, card, etc.) |
| `src/utils/` | Base classes, utilities, form helpers |
| `src/ha/` | Vendored Home Assistant types (avoids custom-card-helpers) |
| `src/translations/` | i18n JSON files (en.json, fr.json) |

## Card Structure Pattern

Each card in `src/cards/<name>/` contains:
- `<name>.ts` - Card Lit element
- `<name>-editor.ts` - Visual editor (optional)
- `<name>-config.ts` - Superstruct schema + defaults
- `const.ts` - Card name constants

## Vendored HA Types (`src/ha/`)

Backported from lovelace-mushroom:
- `types.ts` - HomeAssistant type
- `common/` - Constants, DOM utilities, entity helpers
- `data/` - Climate, entity, lovelace, translation types
- `panels/lovelace/` - Lovelace-specific types and handlers

## Adding a New Card

1. Create `src/cards/my-card/` directory
2. Create files: `my-card.ts`, `my-card-editor.ts`, `my-card-config.ts`, `const.ts`
3. Extend `EquithermBaseCard<TConfig>`
4. Register in `src/equitherm-cards.ts` with `registerCustomCard()`
5. Build and test
