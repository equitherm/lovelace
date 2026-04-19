# Suggested Commands

## Development

```bash
pnpm dev          # Start Rollup watch mode with dev server on port 4000
pnpm build        # Build bundle to dist/equitherm-cards.js
pnpm typecheck    # TypeScript type check
pnpm test         # Run tests (Vitest)
```

## Using Taskfile

```bash
task dev          # Start watch mode
task build        # Build
task typecheck    # Type check
task ci           # Run full CI locally (install, build, typecheck)
task clean        # Remove build artifacts and node_modules
```

## Local Home Assistant Testing

```bash
ha -c .hass_dev start    # Start local HA with card loaded
```

## Git Commands

```bash
git status
git add <files>
git commit -m "type: message"
git push
```

## System Commands

Standard Linux commands available (ls, cd, grep, find, etc.)
