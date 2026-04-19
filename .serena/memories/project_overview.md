# Project Overview

**lovelace-equitherm-cards** - Home Assistant Lovelace custom cards for the ESPHome equitherm climate component.

## Purpose

Provides visual cards for monitoring and tuning heating curves in Home Assistant dashboards. Part of the equitherm organization ecosystem.

## Tech Stack

| Component | Technology |
|-----------|------------|
| Package Manager | pnpm 10.x |
| Language | TypeScript 5.9 (strict mode) |
| UI Framework | Lit 3 |
| Bundler | Rollup 4 |
| Charts | ApexCharts |
| Testing | Vitest |
| Release | semantic-release |

## Key Features

- **Status Card**: Compact tile showing heating status with temperature displays
- **Curve Card**: Heating curve visualization with ApexCharts

## Distribution

- Built bundle (`dist/equitherm-cards.js`) distributed via HACS
- Bundle attached to GitHub releases by semantic-release

## Related Repositories

- `@equitherm/core` - Pure calculation library (npm)
- `@equitherm/web` - React configuration app
