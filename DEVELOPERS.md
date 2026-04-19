# Developer Guide

## Dev Environment

### Home Assistant Instance

The `.hass_dev/` directory contains a minimal HA configuration for local testing:

```
.hass_dev/
├── configuration.yaml   # Loads card from dist/, includes mock packages
├── packages/
│   └── mock_equitherm.yaml  # Mock entities for all 4 cards
└── lovelace/
    └── dev-dashboard.yaml   # Dev dashboard with all cards
```

Start with:

```bash
pnpm dev              # Terminal 1: Rollup watch (rebuilds on changes)
ha -c .hass_dev start # Terminal 2: Home Assistant
```

Or with Docker:

```bash
pnpm start:hass       # Stable HA
pnpm start:hass-dev   # Dev HA (latest)
```

### Mock Entities

Mock entities in `.hass_dev/packages/mock_equitherm.yaml` simulate:
- `climate.equitherm` — Climate entity with temperature, hvac_action
- `sensor.outdoor_temperature` — Outdoor temp
- `sensor.flow_setpoint` — Flow setpoint
- `sensor.heating_curve_output` — Curve output
- `number.equitherm_hc` / `number.equitherm_shift` — Writable tuning params

## Project Structure

```
src/
├── equitherm-cards.ts    # Entry point — registers all cards
├── cards/                 # Card implementations (co-located)
│   ├── status-card/       # Card + editor + config + const
│   ├── curve-card/
│   ├── forecast-card/
│   └── tuning-card/
├── shared/                # Shared Lit components (badge-icon, state-info, etc.)
├── utils/                 # Base classes, helpers, curve calculations
├── ha/                    # Vendored HA types (from Mushroom)
└── localize.ts            # i18n
```

## Adding a New Card

1. Create directory: `src/cards/my-card/`

2. **`const.ts`** — Card name constants:
   ```typescript
   import { PREFIX_NAME } from '../../const';
   export const MY_CARD_NAME = `${PREFIX_NAME}-my-card`;
   export const MY_CARD_EDITOR_NAME = `${MY_CARD_NAME}-editor`;
   ```

3. **`my-card-config.ts`** — Superstruct schema + defaults (see existing cards for pattern)

4. **`my-card.ts`** — Card class extending `EquithermBaseCard` or `EquithermChartCard`

5. **`my-card-editor.ts`** — Visual editor (optional)

6. Register in `src/equitherm-cards.ts`:
   ```typescript
   import './cards/my-card/my-card';
   import { registerCustomCard } from './utils/register-card';
   registerCustomCard({
     type: 'equitherm-my-card',
     name: 'My Card',
     description: 'Description',
   });
   ```

7. Add mock entities in `.hass_dev/packages/mock_equitherm.yaml`

8. Add card to `.hass_dev/lovelace/dev-dashboard.yaml`

9. Add docs in `docs/cards/my-card.md`

## Debugging

### Browser DevTools

Cards are custom elements — inspect them in Chrome DevTools:
- Elements panel: Find `<equitherm-xxx-card>` in the DOM
- Console: `customElements.get('equitherm-status-card')` to verify registration

### HA Card Picker

Cards appear in the card picker as "Custom: Equitherm XXX Card". If a card doesn't appear:
1. Check `pnpm build` succeeded
2. Check `dist/equitherm-cards.js` is loaded (Network tab)
3. Check browser console for registration errors

### Common Issues

- **Card not updating on save**: Rollup watch may not trigger. Restart `pnpm dev`.
- **Entity not found**: Check mock entity IDs match config in dev-dashboard.yaml.
- **Build fails after adding card**: Check imports and TypeScript types.

## Build & Release

### Build

```bash
pnpm build  # Output: dist/equitherm-cards.js
```

### Release

Automated on push to `main` via semantic-release:
1. Analyzes conventional commits since last release
2. Bumps version in `package.json`
3. Updates `CHANGELOG.md`
4. Creates GitHub release with `dist/equitherm-cards.js` attached

Manual test of release logic:
```bash
npx semantic-release --dry-run
```

## Vendored HA Types

The `src/ha/` directory contains types backported from Mushroom (not `custom-card-helpers`). This avoids dependency conflicts. Key types:

- `HomeAssistant` — Main hass object
- `LovelaceCard`, `LovelaceCardConfig` — Card interfaces
- `ClimateEntity` — Climate entity with HVAC actions
- Entity helpers: `computeDomain()`, `computeEntityName()`, etc.
