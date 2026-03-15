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

## Key Conventions

1. **Lit components**: All cards are Lit elements
2. **TypeScript strict mode**: Full type safety
3. **HACS distribution**: Built bundle is attached to GitHub releases
4. **Card registration**: New cards must be registered in `src/equitherm-cards.ts`
5. **Custom card helpers**: Use `custom-card-helpers` for HA integration

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
