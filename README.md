# Equitherm Cards

Home Assistant Lovelace cards for the [ESPHome equitherm climate component](https://github.com/equitherm/core).

![Status Card Preview](docs/status-card.png) ![Curve Card Preview](docs/curve-card.png)

## Features

- Visual editor for all cards
- Monitor heating status at a glance
- Heating curve visualization with customizable gradient
- Weather-based heating flow temperature forecast
- Interactive curve tuning with live preview
- Manual preset indicator (shows when heating curve is bypassed)
- Discrete data points along the curve
- Light and dark theme support
- Temperature unit conversion (C/F)

## Installation

**Home Assistant minimum version:** 2026.3.1

### HACS (Recommended)

[![Open Equitherm Cards on Home Assistant Community Store (HACS).](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=equitherm&repository=lovelace&category=Dashboard)

_or_

1. Open HACS in Home Assistant
2. Go to "Dashboards"
3. Click the three dots -> "Custom repositories"
4. Add `https://github.com/equitherm/lovelace` as type "Dashboard"
5. Click "Install" on "Equitherm Cards"

<details>
<summary>Manual Installation</summary>

1. Download `equitherm-cards.js` from the [latest release][release-url]
2. Copy to `www/equitherm-cards.js` in your Home Assistant config directory
3. Add to your Dashboard resources:
   - **Using UI:** Settings -> Dashboards -> More Options -> Resources -> Add Resource
   - Set URL as `/local/equitherm-cards.js` and type as `JavaScript Module`
4. Refresh your browser

</details>

## Cards

### Status Card

Compact tile showing current heating status with temperature displays and optional rate-limiting indicators.

```yaml
type: custom:equitherm-status-card
climate_entity: climate.your_equitherm
outdoor_entity: sensor.outdoor_temperature
flow_entity: sensor.flow_setpoint
# Optional:
curve_output_entity: sensor.heating_curve_output
rate_limiting_entity: binary_sensor.rate_limiting_active
pid_active_entity: binary_sensor.pid_active
name:  # entity name picker
  type: entity
layout: default  # default, vertical, or horizontal
show_last_updated: true
```

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `climate_entity` | string | Yes | Climate entity with `current_temperature` attribute |
| `outdoor_entity` | string | Yes | Outdoor temperature sensor |
| `flow_entity` | string | Yes | Flow setpoint sensor |
| `curve_output_entity` | string | | Shows "ADJUSTING" indicator with target |
| `pid_output_entity` | string | | PID output sensor for rate-limit direction |
| `rate_limiting_entity` | string | | Binary sensor for ramping display |
| `pid_active_entity` | string | | Shows whether PID correction is active |
| `name` | entity | | Entity name picker (defaults to entity friendly name) |
| `layout` | string | | `default`, `vertical`, or `horizontal` |
| `show_last_updated` | boolean | | Show "last updated" timestamp in card footer |
| `title` | string | | *Deprecated* -- use `name` instead |

### Curve Card

Heating curve line chart with horizontal gradient, discrete data points, live operating point, and interactive footer.

```yaml
type: custom:equitherm-curve-card
climate_entity: climate.your_equitherm
outdoor_entity: sensor.outdoor_temperature
curve_output_entity: sensor.heating_curve_output
flow_entity: sensor.flow_setpoint
# Optional:
pid_output_entity: sensor.pid_output
rate_limiting_entity: binary_sensor.rate_limiting_active
pid_active_entity: binary_sensor.pid_active
name:  # entity name picker
  type: entity
show_last_updated: true
# Curve parameters (defaults shown):
hc: 0.9
n: 1.25
shift: 0
min_flow: 20
max_flow: 70
t_out_min: -20
t_out_max: 20
# Live parameters from device entities (alternative to static values above):
# curve_from_entities: true
# hc_entity: number.equitherm_hc
# n_entity: number.equitherm_n
# shift_entity: number.equitherm_shift
# min_flow_entity: sensor.equitherm_min_flow
# max_flow_entity: sensor.equitherm_max_flow
```

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `climate_entity` | string | Yes | Climate entity with temperature setpoint |
| `outdoor_entity` | string | Yes | Outdoor temperature sensor |
| `curve_output_entity` | string | Yes | Curve output temperature sensor |
| `flow_entity` | string | Yes | Current flow setpoint sensor |
| `pid_output_entity` | string | | PID output sensor for rate-limit direction |
| `rate_limiting_entity` | string | | Binary sensor for rate limiting |
| `pid_active_entity` | string | | Shows whether PID correction is active |
| `name` | entity | | Entity name picker (defaults to entity friendly name) |
| `title` | string | | *Deprecated* -- use `name` instead |
| `show_last_updated` | boolean | | Show "last updated" timestamp in card footer |
| `curve_from_entities` | boolean | | Read curve params from entities instead of static values |
| `hc_entity` | string | | Entity for live heat curve coefficient |
| `n_entity` | string | | Entity for live exponent |
| `shift_entity` | string | | Entity for live shift offset |
| `min_flow_entity` | string | | Sensor or number entity for live min flow temperature |
| `max_flow_entity` | string | | Sensor or number entity for live max flow temperature |
| `hc` | number | | Heat curve coefficient (default: 0.9) |
| `n` | number | | Curve exponent (default: 1.25) |
| `shift` | number | | Temperature offset in C (default: 0) |
| `min_flow` | number | | Minimum flow temperature (default: 20) |
| `max_flow` | number | | Maximum flow temperature (default: 70) |
| `t_out_min` | number | | Outdoor temp range minimum (default: -20) |
| `t_out_max` | number | | Outdoor temp range maximum (default: 20) |

### Forecast Card

Weather-based heating flow temperature forecast with dual series, peak demand annotation, and configurable forecast window.

```yaml
type: custom:equitherm-forecast-card
weather_entity: weather.home
climate_entity: climate.your_equitherm
flow_entity: sensor.flow_setpoint
# Optional:
hours: 24
pid_active_entity: binary_sensor.pid_active
name:  # entity name picker
  type: entity
show_last_updated: true
# Curve parameters (defaults shown):
hc: 0.9
n: 1.25
shift: 0
min_flow: 20
max_flow: 70
# Live parameters from device entities:
# curve_from_entities: true
# hc_entity: number.equitherm_hc
# n_entity: number.equitherm_n
# shift_entity: number.equitherm_shift
# min_flow_entity: sensor.equitherm_min_flow
# max_flow_entity: sensor.equitherm_max_flow
```

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `weather_entity` | string | Yes | Weather entity with forecast data |
| `climate_entity` | string | Yes | Climate entity with temperature setpoint |
| `flow_entity` | string | Yes | Current flow setpoint sensor |
| `hours` | number | | Forecast hours to display, 1-48 (default: 24) |
| `pid_active_entity` | string | | Shows whether PID correction is active |
| `name` | entity | | Entity name picker (defaults to entity friendly name) |
| `show_last_updated` | boolean | | Show "last updated" timestamp in card footer |
| `curve_from_entities` | boolean | | Read curve params from entities instead of static values |
| `hc_entity` | string | | Entity for live heat curve coefficient |
| `n_entity` | string | | Entity for live exponent |
| `shift_entity` | string | | Entity for live shift offset |
| `min_flow_entity` | string | | Sensor or number entity for live min flow temperature |
| `max_flow_entity` | string | | Sensor or number entity for live max flow temperature |
| `hc` | number | | Heat curve coefficient (default: 0.9) |
| `n` | number | | Curve exponent (default: 1.25) |
| `shift` | number | | Temperature offset in C (default: 0) |
| `min_flow` | number | | Minimum flow temperature (default: 20) |
| `max_flow` | number | | Maximum flow temperature (default: 70) |

### Tuning Card

Interactive curve tuning with hc/shift sliders, live chart preview showing current vs proposed curves, and apply/reset controls.

```yaml
type: custom:equitherm-tuning-card
climate_entity: climate.your_equitherm
outdoor_entity: sensor.outdoor_temperature
hc_entity: number.equitherm_hc
shift_entity: number.equitherm_shift
# Optional:
name:  # entity name picker
  type: entity
show_last_updated: true
curve_from_entities: true
n_entity: number.equitherm_n
min_flow_entity: sensor.equitherm_min_flow
max_flow_entity: sensor.equitherm_max_flow
n: 1.25
min_flow: 20
max_flow: 70
t_out_min: -20
t_out_max: 20
recalculate_service: climate.equitherm_force_recalculate
```

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `climate_entity` | string | Yes | Climate entity with temperature setpoint |
| `outdoor_entity` | string | Yes | Outdoor temperature sensor |
| `hc_entity` | string | Yes | Writable number entity for heat curve coefficient |
| `shift_entity` | string | Yes | Writable number entity for shift offset |
| `name` | entity | | Entity name picker (defaults to entity friendly name) |
| `show_last_updated` | boolean | | Show "last updated" timestamp in card footer |
| `curve_from_entities` | boolean | | Read curve params from entities instead of static values |
| `n_entity` | string | | Entity for live exponent |
| `min_flow_entity` | string | | Sensor or number entity for live min flow temperature |
| `max_flow_entity` | string | | Sensor or number entity for live max flow temperature |
| `n` | number | | Curve exponent (default: 1.25) |
| `min_flow` | number | | Minimum flow temperature (default: 20) |
| `max_flow` | number | | Maximum flow temperature (default: 70) |
| `t_out_min` | number | | Outdoor temp range minimum (default: -20) |
| `t_out_max` | number | | Outdoor temp range maximum (default: 20) |
| `recalculate_service` | string | | Service to call after applying values |

## Requirements

- Home Assistant 2026.3.1 or later
- [ESPHome equitherm climate component](https://github.com/equitherm/core) configured

## Related Projects

- [equitherm/core](https://github.com/equitherm/core) - Pure calculation library
- [equitherm/web](https://github.com/equitherm/web) - Web-based tuning tool

## Development

```bash
pnpm install     # Install dependencies
pnpm dev         # Start Rollup watch mode
pnpm build       # Build bundle to dist/
```

See [CLAUDE.md](CLAUDE.md) for development guidelines.

## License

MIT
