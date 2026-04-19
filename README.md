# Equitherm Cards

[![hacs][hacs-badge]][hacs-url]
[![release][release-badge]][release-url]
![downloads][downloads-badge]
![build][build-badge]
[![license][license-badge]][license-url]

<!-- Hero screenshot — layout: status full-width top + 3 charts below -->
![Equitherm Cards](docs/hero-screenshot.png)

A collection of Lovelace cards for the ESPHome equitherm climate component. Monitor heating status, visualize heating curves, forecast demand, and tune parameters — directly from your Home Assistant dashboard.

## Features

- **Status Card** — Live temperatures, HVAC state, rate-limiting indicators
- **Curve Card** — Interactive heating curve with operating point marker
- **Forecast Card** — Weather-based flow temperature prediction
- **Tuning Card** — Real-time curve tuning with hc/shift controls and preview
- Visual editor for all cards — no manual YAML required
- Light and dark theme support
- Automatic temperature unit conversion (°C/°F)

## Installation

### HACS (recommended)

Equitherm Cards is available in [HACS][hacs] as a Lovelace plugin.

1. Open HACS in Home Assistant
2. Search for "Equitherm Cards"
3. Click Download

### Manual

1. Download `equitherm-cards.js` from the [latest release][release-url]
2. Place it in your `config/www/` folder
3. Add as a dashboard resource:
   - **UI:** Settings → Dashboards → Resources → Add → `/local/equitherm-cards.js` (JavaScript Module)
   - **YAML:**
     ```yaml
     resources:
       - url: /local/equitherm-cards.js
         type: module
     ```

## Cards

| Card | Type | Description |
|------|------|-------------|
| Status | `equitherm-status-card` | Temperature readings with HVAC badge |
| Curve | `equitherm-curve-card` | Heating curve visualization |
| Forecast | `equitherm-forecast-card` | Weather-based flow prediction |
| Tuning | `equitherm-tuning-card` | Interactive parameter tuning |

See [docs/cards/](docs/cards/) for full configuration reference for each card.

## Quick Start

```yaml
type: custom:equitherm-status-card
climate_entity: climate.equitherm
outdoor_entity: sensor.outdoor_temperature
flow_entity: sensor.flow_setpoint
```

## Development

Prerequisites: Node.js 22+, pnpm 10+

```bash
pnpm install
pnpm dev              # Start Rollup watch mode
ha -c .hass_dev start # Start local Home Assistant instance
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT — see [LICENSE](LICENSE) for details.

<!-- Badge references -->
[hacs-url]: https://github.com/hacs/integration
[hacs-badge]: https://img.shields.io/badge/hacs-default-orange.svg?style=flat-square
[release-badge]: https://img.shields.io/github/v/release/equitherm/lovelace?style=flat-square
[release-url]: https://github.com/equitherm/lovelace/releases
[downloads-badge]: https://img.shields.io/github/downloads/equitherm/lovelace/total?style=flat-square
[build-badge]: https://img.shields.io/github/actions/workflow/status/equitherm/lovelace/ci.yml?branch=main&style=flat-square
[license-badge]: https://img.shields.io/github/license/equitherm/lovelace?style=flat-square
[license-url]: https://github.com/equitherm/lovelace/blob/main/LICENSE
[hacs]: https://hacs.xyz
