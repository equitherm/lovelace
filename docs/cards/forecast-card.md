# Equitherm Forecast Card

Weather-based heating flow temperature forecast with dual series visualization.

## Features

- Heating flow temperature forecast from weather predictions
- Dual series: predicted flow temp + outdoor temperature
- Peak demand annotation on highest predicted flow
- HVAC action badge (heating/idle/off)
- PID status badge (active/inactive with warning icon)
- Manual preset indicator (badge + chart dimming when curve is bypassed)
- Configurable forecast hours (1-48)
- Click entities for more-info dialogs
- Automatic temperature unit conversion
- Dark mode support

## Configuration

### YAML

```yaml
type: custom:equitherm-forecast-card
weather_entity: weather.home
climate_entity: climate.equitherm
flow_entity: sensor.flow_setpoint
# Optional:
hours: 24
pid_active_entity: binary_sensor.pid_active
name:  # entity name picker (recommended)
  type: entity
show_last_updated: true

# Curve parameters — static (defaults shown)
hc: 0.9
n: 1.25
shift: 0
min_flow: 20
max_flow: 70
```

## Options

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `weather_entity` | string | Yes | - | Weather entity with forecast data |
| `climate_entity` | string | Yes | - | Climate entity with temperature setpoint |
| `flow_entity` | string | Yes | - | Current flow setpoint sensor |
| `hours` | number | No | 24 | Forecast hours to display (1-48) |
| `pid_active_entity` | string | No | - | Binary sensor for PID correction status |
| `name` | entity | No | - | Entity name picker config (defaults to entity friendly name). Examples: `name: { type: entity }` or `name: [{ type: text, text: "Prefix" }, { type: device }]` |
| `show_last_updated` | boolean | No | false | Show "last updated" timestamp in card footer |
| `curve_from_entities` | boolean | No | false | Read curve parameters from entities instead of static values |
| `hc_entity` | string | No | - | Entity for live heat curve coefficient (requires `curve_from_entities`) |
| `n_entity` | string | No | - | Entity for live exponent (requires `curve_from_entities`) |
| `shift_entity` | string | No | - | Entity for live shift offset (requires `curve_from_entities`) |
| `min_flow_entity` | string | No | - | Sensor or number entity for live min flow temperature (requires `curve_from_entities`) |
| `max_flow_entity` | string | No | - | Sensor or number entity for live max flow temperature (requires `curve_from_entities`) |
| `hc` | number | No | 0.9 | Heat curve coefficient |
| `n` | number | No | 1.25 | Curve exponent |
| `shift` | number | No | 0 | Temperature offset |
| `min_flow` | number | No | 20 | Minimum flow temperature |
| `max_flow` | number | No | 70 | Maximum flow temperature |

## Curve Parameters

The heating curve formula:

```
t_flow = t_target + shift + hc x (t_target - t_outdoor)^(1/n)
```

Clamped to `[min_flow, max_flow]`.

Parameters can be provided as **static values** (via `hc`, `n`, `shift`) or read **live from entities** (set `curve_from_entities: true` and provide `hc_entity`, `n_entity`, `shift_entity`).

| Parameter | Range | Description |
|-----------|-------|-------------|
| `hc` | 0.5 - 3.0 | Heat curve coefficient (steepness) |
| `n` | 1.0 - 2.0 | Curve exponent (non-linearity) |
| `shift` | -15 to +15 | Constant temperature offset |
| `min_flow` | 15 - 35 | Minimum flow temperature |
| `max_flow` | 50 - 90 | Maximum flow temperature |

### Live Parameters from Entities

When `curve_from_entities: true`, the curve reads `hc`, `n`, `shift`, `min_flow`, and `max_flow` from number/input_number entities in real time. This is useful when the ESPHome device exposes runtime-tunable parameters as entities.

```yaml
type: custom:equitherm-forecast-card
weather_entity: weather.home
climate_entity: climate.equitherm
flow_entity: sensor.flow_setpoint
curve_from_entities: true
hc_entity: number.equitherm_hc
n_entity: number.equitherm_n
shift_entity: number.equitherm_shift
min_flow_entity: sensor.equitherm_min_flow
max_flow_entity: sensor.equitherm_max_flow
```

The static values (`hc`, `n`, `shift`, `min_flow`, `max_flow`) serve as fallbacks when entity state is unavailable.

## Visual Elements

### Chart Layout

- X-axis: Time (forecast hours ahead)
- Y-axis (left): Flow temperature
- Y-axis (right): Outdoor temperature
- Dual series: predicted flow temp and predicted outdoor temp

### Peak Demand Annotation

An annotation marks the hour with the highest predicted flow temperature, helping identify peak heating demand.

## Grid Options

- Columns: 12
- Rows: 5
- Min Rows: 5

## Theming

The chart automatically adapts to Home Assistant's dark/light mode.

Override gradient colors:

```yaml
equitherm_forecast_card:
  eq-user-gradient-cold: '#3b82f6'
  eq-user-gradient-hot: '#f97316'
```

### Available Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `--eq-user-gradient-cold` | `#3b82f6` | Cold end of gradient |
| `--eq-user-gradient-hot` | `#f97316` | Hot end of gradient |

## Entity Requirements

### weather_entity

Must have:
- `attributes.forecast` - Array of forecast data with `temperature` and `datetime` fields

### climate_entity

Must have:
- `attributes.temperature` - Room setpoint (used for curve calculation)
- `attributes.hvac_action` - Current action for badge
- `attributes.preset_mode` - Optional; shows "Manual" badge + dims chart when `"Manual"`

### flow_entity

- Sensor with current flow setpoint

### pid_active_entity (optional)

- Binary sensor (`on`/`off`) indicating whether PID correction is active
- Shows green badge when active, dimmed badge with warning icon when inactive

## Examples

### Basic Configuration

```yaml
type: custom:equitherm-forecast-card
weather_entity: weather.home
climate_entity: climate.equitherm
flow_entity: sensor.flow_setpoint
```

### Extended Forecast

```yaml
type: custom:equitherm-forecast-card
weather_entity: weather.home
climate_entity: climate.equitherm
flow_entity: sensor.flow_setpoint
hours: 48
pid_active_entity: binary_sensor.pid_active
show_last_updated: true
hc: 1.1
n: 1.3
shift: 2
min_flow: 25
max_flow: 55
```

### With Live Entity Parameters

```yaml
type: custom:equitherm-forecast-card
weather_entity: weather.home
climate_entity: climate.equitherm
flow_entity: sensor.flow_setpoint
curve_from_entities: true
hc_entity: number.equitherm_hc
n_entity: number.equitherm_n
shift_entity: number.equitherm_shift
min_flow_entity: sensor.equitherm_min_flow
max_flow_entity: sensor.equitherm_max_flow
```
