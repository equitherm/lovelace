# Equitherm Status Card

Display heating system status with temperature readings.

## Features

- Three-column temperature display: Outdoor -> Flow | Room
- HVAC action badge (heating/idle/off)
- Rate-limiting indicator with direction (rising/falling)
- PID status badge (active/inactive with warning icon)
- Click entities for more-info dialogs
- Layout options (default/vertical/horizontal)
- Automatic temperature unit conversion

## Installation

Via HACS: Add repository `equitherm/lovelace` as a Lovelace plugin.

## Configuration

### Visual Editor

Add `Custom: Equitherm Status Card` from the card picker.

### YAML

```yaml
type: custom:equitherm-status-card
climate_entity: climate.equitherm
outdoor_entity: sensor.outdoor_temperature
flow_entity: sensor.flow_setpoint
# Optional:
curve_output_entity: sensor.heating_curve_output
rate_limiting_entity: binary_sensor.rate_limiting
pid_active_entity: binary_sensor.pid_active
name:  # entity name picker (recommended)
  type: entity
layout: default  # default, vertical, or horizontal
```

## Options

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `climate_entity` | string | Yes | Climate entity with `current_temperature` attribute |
| `outdoor_entity` | string | Yes | Outdoor temperature sensor |
| `flow_entity` | string | Yes | Flow setpoint sensor |
| `curve_output_entity` | string | No | Shows "Adjusting" indicator with target temperature |
| `rate_limiting_entity` | string | No | Binary sensor for rate limiting status |
| `pid_active_entity` | string | No | Binary sensor for PID correction status |
| `layout` | string | No | `default`, `vertical`, or `horizontal` |
| `name` | entity | No | Entity name picker config (defaults to entity friendly name). Examples: `name: { type: entity }` or `name: [{ type: text, text: "Prefix" }, { type: device }]` |
| `title` | string | No | *Deprecated* — use `name` instead |

## Layout Examples

### Default

Compact three-column layout with arrows and dividers.

```yaml
type: custom:equitherm-status-card
climate_entity: climate.equitherm
outdoor_entity: sensor.outdoor_temperature
flow_entity: sensor.flow_setpoint
```

### Vertical

Stacked layout for narrow columns.

```yaml
type: custom:equitherm-status-card
climate_entity: climate.equitherm
outdoor_entity: sensor.outdoor_temperature
flow_entity: sensor.flow_setpoint
layout: vertical
```

### Horizontal

Five-column layout for wide sections.

```yaml
type: custom:equitherm-status-card
climate_entity: climate.equitherm
outdoor_entity: sensor.outdoor_temperature
flow_entity: sensor.flow_setpoint
layout: horizontal
```

## Rate Limiting Display

When `rate_limiting_entity` is `on` and `curve_output_entity` is configured:

- Shows "ADJUSTING" badge with rising/falling icon
- Displays current flow temperature with target arrow

Example:

```
[HEATING] [ADJUSTING ^]  Auto
   5C ->  45C    |  21C
          -> 52C    Room
        Outdoor   Flow
```

## Theming

Override CSS variables in your theme:

```yaml
equitherm_status_card:
  eq-user-badge-heating-bg: '#ff6b35'
  eq-user-badge-heating-color: '#ffffff'
  eq-user-badge-idle-bg: '#e5e5e5'
  eq-user-badge-idle-color: '#666'
```

### Available Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `--eq-user-badge-heating-bg` | `#f97316` | Heating badge background |
| `--eq-user-badge-heating-color` | `#ffffff` | Heating badge text |
| `--eq-user-badge-idle-bg` | `var(--secondary-background-color)` | Idle badge background |
| `--eq-user-badge-idle-color` | `var(--secondary-text-color)` | Idle badge text |
| `--eq-user-badge-fault-bg` | `var(--error-color)` | Fault badge background |
| `--eq-user-badge-fault-color` | `#ffffff` | Fault badge text |

## Grid Options

| Layout | Columns | Rows | Min Rows |
|--------|---------|------|----------|
| default | 12 | 2 | 1 |
| vertical | 6 | 3 | 2 |
| horizontal | 12 | 1 | 1 |

## Entity Requirements

### climate_entity

Must have:
- `state` - HVAC mode (off, heat, auto, etc.)
- `attributes.hvac_action` - Current action (heating, idle, off)
- `attributes.current_temperature` - Room temperature

### outdoor_entity

- Any sensor with numeric state (temperature)

### flow_entity

- Any sensor with numeric state (flow setpoint temperature)

### curve_output_entity (optional)

- Sensor with target flow temperature from curve calculation

### rate_limiting_entity (optional)

- Binary sensor (`on`/`off`) indicating rate limiting is active

### pid_active_entity (optional)

- Binary sensor (`on`/`off`) indicating whether PID correction is active
- Shows green badge when active, dimmed badge with warning icon when inactive
