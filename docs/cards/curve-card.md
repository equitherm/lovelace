# Equitherm Curve Card

Interactive heating curve visualization with ApexCharts.

## Features

- Visual heating curve display (warm to cold, left to right)
- Current operating point marker
- Rate-limiting dual markers (target and current)
- HVAC action badge
- PID status badge (active/inactive with warning icon)
- Automatic dark mode support
- Responsive chart sizing

## Configuration

### Visual Editor

Add `Custom: Equitherm Curve Card` from the card picker.

### YAML

```yaml
type: custom:equitherm-curve-card
climate_entity: climate.equitherm
outdoor_entity: sensor.outdoor_temperature
curve_output_entity: sensor.heating_curve_output
flow_entity: sensor.flow_setpoint
# Optional:
rate_limiting_entity: binary_sensor.rate_limiting
pid_active_entity: binary_sensor.pid_active
name:  # entity name picker (recommended)
  type: entity

# Curve parameters — static (optional, defaults shown)
hc: 0.9
n: 1.25
shift: 0
min_flow: 20
max_flow: 70
t_out_min: -20
t_out_max: 20
```

## Options

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `climate_entity` | string | Yes | - | Climate entity with temperature setpoint |
| `outdoor_entity` | string | Yes | - | Outdoor temperature sensor |
| `curve_output_entity` | string | Yes | - | Curve output temperature sensor |
| `flow_entity` | string | Yes | - | Current flow setpoint sensor |
| `rate_limiting_entity` | string | No | - | Binary sensor for rate limiting |
| `pid_active_entity` | string | No | - | Binary sensor for PID correction status |
| `name` | entity | No | - | Entity name picker config (defaults to entity friendly name). Examples: `name: { type: entity }` or `name: [{ type: text, text: "Prefix" }, { type: device }]` |
| `title` | string | No | - | *Deprecated* — use `name` instead |
| `curve_from_entities` | boolean | No | false | Read curve parameters from entities instead of static values |
| `hc_entity` | string | No | - | Entity for live heat curve coefficient (requires `curve_from_entities`) |
| `n_entity` | string | No | - | Entity for live exponent (requires `curve_from_entities`) |
| `shift_entity` | string | No | - | Entity for live shift offset (requires `curve_from_entities`) |
| `hc` | number | No | 0.9 | Heat curve coefficient |
| `n` | number | No | 1.25 | Curve exponent |
| `shift` | number | No | 0 | Temperature offset |
| `min_flow` | number | No | 20 | Minimum flow temperature |
| `max_flow` | number | No | 70 | Maximum flow temperature |
| `t_out_min` | number | No | -20 | Outdoor temp range minimum |
| `t_out_max` | number | No | 20 | Outdoor temp range maximum |

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
| `t_out_min` | -30 to 5 | Outdoor temp range minimum |
| `t_out_max` | 0 - 30 | Outdoor temp range maximum |

### Live Parameters from Entities

When `curve_from_entities: true`, the curve reads `hc`, `n`, and `shift` from number/input_number entities in real time. This is useful when the ESPHome device exposes runtime-tunable parameters as entities.

```yaml
type: custom:equitherm-curve-card
climate_entity: climate.equitherm
outdoor_entity: sensor.outdoor_temperature
curve_output_entity: sensor.heating_curve_output
flow_entity: sensor.flow_setpoint
curve_from_entities: true
hc_entity: number.equitherm_hc
n_entity: number.equitherm_n
shift_entity: number.equitherm_shift
```

The static values (`hc`, `n`, `shift`) serve as fallbacks when entity state is unavailable.

## Visual Elements

### Chart Layout

- X-axis: Outdoor temperature (reversed: warm left, cold right)
- Y-axis: Flow temperature
- Gradient fill: Orange (hot) to Blue (cold)

### Operating Point Marker

Single marker showing current outdoor temp and calculated flow temp.

### Rate Limiting Markers

When rate limiting is active, two markers appear:

1. **Filled marker**: Target flow (from curve_output_entity)
2. **Hollow marker**: Current flow (from flow_entity)

This shows the ramping progress during rate-limited adjustments.

## Grid Options

- Columns: 12
- Rows: 5
- Min Rows: 5

## Theming

The chart automatically adapts to Home Assistant's dark/light mode.

Override gradient colors:

```yaml
equitherm_curve_card:
  eq-user-gradient-cold: '#3b82f6'
  eq-user-gradient-hot: '#f97316'
```

### Available Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `--eq-user-gradient-cold` | `#3b82f6` | Cold end of gradient |
| `--eq-user-gradient-hot` | `#f97316` | Hot end of gradient |
| `--eq-user-dot-glow` | `rgba(249,115,22,0.4)` | Marker glow color |

## Entity Requirements

### climate_entity

Must have:
- `attributes.temperature` - Room setpoint (used for curve calculation)
- `attributes.hvac_action` - Current action for badge

### outdoor_entity

- Sensor with numeric state (outdoor temperature)

### curve_output_entity

- Sensor with target flow temperature from curve calculation

### flow_entity

- Sensor with current flow setpoint

### rate_limiting_entity (optional)

- Binary sensor (`on`/`off`) indicating rate limiting is active

### pid_active_entity (optional)

- Binary sensor (`on`/`off`) indicating whether PID correction is active
- Shows green badge when active, dimmed badge with warning icon when inactive

## Examples

### Basic Configuration

```yaml
type: custom:equitherm-curve-card
climate_entity: climate.equitherm
outdoor_entity: sensor.outdoor_temperature
curve_output_entity: sensor.heating_curve_output
flow_entity: sensor.flow_setpoint
```

### With Custom Parameters

```yaml
type: custom:equitherm-curve-card
climate_entity: climate.equitherm
outdoor_entity: sensor.outdoor_temperature
curve_output_entity: sensor.heating_curve_output
flow_entity: sensor.flow_setpoint
name:
  - type: text
    text: Floor Heating
  - type: device
hc: 1.2
n: 1.3
min_flow: 25
max_flow: 55
```

### With Rate Limiting

```yaml
type: custom:equitherm-curve-card
climate_entity: climate.equitherm
outdoor_entity: sensor.outdoor_temperature
curve_output_entity: sensor.heating_curve_output
flow_entity: sensor.flow_setpoint
rate_limiting_entity: binary_sensor.equitherm_rate_limiting
```
