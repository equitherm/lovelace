# Contributing to Equitherm Cards

Thank you for your interest in contributing! This guide covers the basics.

## Prerequisites

- Node.js 22+
- pnpm 10+ (`corepack enable` or `npm i -g pnpm`)
- Docker (for local Home Assistant testing)

## Setup

```bash
git clone https://github.com/equitherm/lovelace.git
cd lovelace
pnpm install
```

## Development

```bash
pnpm dev              # Start Rollup watch mode
pnpm build            # Production build
pnpm typecheck        # TypeScript check
pnpm test             # Run tests
```

### Local Home Assistant

A dev HA instance is configured in `.hass_dev/`:

```bash
ha -c .hass_dev start
# or with Docker:
pnpm start:hass
```

The card is served from `dist/` via `configuration.yaml`. Mock entities are in `.hass_dev/packages/mock_equitherm.yaml`.

## Code Style

- TypeScript strict mode
- Lit 3 web components
- Conventional Commits (`feat:`, `fix:`, `refactor:`, etc.)
- No comments unless the WHY is non-obvious

## Pull Request Process

1. Fork the repository
2. Create a feature branch (`feat/my-feature` or `fix/my-fix`)
3. Make your changes
4. Ensure `pnpm typecheck` and `pnpm build` pass
5. Test in the local HA instance
6. Submit a PR with a clear description

### PR Checklist

- Code builds (`pnpm build`)
- Types check (`pnpm typecheck`)
- Tested in Home Assistant
- Documentation updated if user-facing

## Architecture

Cards follow the Mushroom pattern — see [CLAUDE.md](CLAUDE.md) for full details.

```
LitElement
  └── EquithermBaseElement (dark mode, themes)
          └── EquithermBaseCard (entity helpers, formatting)
                  └── Individual cards (status, curve, forecast, tuning)
```

## Adding a New Card

1. Create `src/cards/my-card/` with `my-card.ts`, `my-card-editor.ts`, `my-card-config.ts`, `const.ts`
2. Register in `src/equitherm-cards.ts`
3. Add card docs in `docs/cards/my-card.md`
4. Build and test

## Release

Releases are automated via semantic-release on push to `main`. Conventional commits determine version bumps:

| Type | Bump |
|------|------|
| `feat:` | minor |
| `fix:` | patch |
| `feat!:` | major |
