# Equitherm Tuning Card

Interactive heating curve tuning with real-time chart preview and apply/reset controls.

## Features

- Interactive hc and shift sliders with real-time chart preview
- Current vs proposed curve comparison (orange vs blue)
- Operating point marker on current curve
- Delta indicators showing change from current value
- Apply All button with success feedback
- Per-slider reset buttons
- HVAC action badge
- Click entities for more-info dialogs
- Dark mode support

## Installation

Via HACS: Add repository `equitherm/lovelace` as a Lovelace plugin.

## Configuration

### Visual Editor

Add `Custom: Equitherm Tuning Card` from the card picker.

### YAML

```yaml
type: custom:equitherm-tuning-card
climate_entity: climate.equitherm
outdoor_entity: sensor.outdoor_temperature
hc_entity: number.equitherm_hc
shift_entity: number.equitherm_shift
# Optional:
name:  # entity name picker (recommended)
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

## Options

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `climate_entity` | string | Yes | - | Climate entity with temperature setpoint |
| `outdoor_entity` | string | Yes | - | Outdoor temperature sensor |
| `hc_entity` | string | Yes | - | Writable number entity for heat curve coefficient |
| `shift_entity` | string | Yes | - | Writable number entity for shift offset |
| `name` | entity | No | - | Entity name picker config (defaults to entity friendly name). Examples: `name: { type: entity }` or `name: [{ type: text, text: "Prefix" }, { type: device }]` |
| `show_last_updated` | boolean | No | false | Show "last updated" timestamp in card footer |
| `curve_from_entities` | boolean | No | false | Read curve parameters from entities instead of static values |
| `n_entity` | string | No | - | Entity for live exponent (requires `curve_from_entities`) |
| `min_flow_entity` | string | No | - | Sensor or number entity for live min flow temperature (requires `curve_from_entities`) |
| `max_flow_entity` | string | No | - | Sensor or number entity for live max flow temperature (requires `curve_from_entities`) |
| `n` | number | No | 1.25 | Curve exponent |
| `min_flow` | number | No | 20 | Minimum flow temperature |
| `max_flow` | number | No | 70 | Maximum flow temperature |
| `t_out_min` | number | No | -20 | Outdoor temp range minimum |
| `t_out_max` | number | No | 20 | Outdoor temp range maximum |
| `recalculate_service` | string | No | - | Service to call after applying values (e.g. `climate.equitherm_force_recalculate`) |

## Curve Parameters

The heating curve formula:

```
t_flow = t_target + shift + hc x (t_target - t_outdoor)^(1/n)
```

Clamped to `[min_flow, max_flow]`.

The tuning card adjusts `hc` and `shift` via writable number entities. Parameters `n`, `min_flow`, and `max_flow` can be provided as **static values** or read **live from entities** (set `curve_from_entities: true`).

| Parameter | Range | Description |
|-----------|-------|-------------|
| `hc` | 0.5 - 3.0 | Heat curve coefficient (steepness) |
| `shift` | -15 to +15 | Constant temperature offset |
| `n` | 1.0 - 2.0 | Curve exponent (non-linearity) |
| `min_flow` | 15 - 35 | Minimum flow temperature |
| `max_flow` | 50 - 90 | Maximum flow temperature |
| `t_out_min` | -30 to 5 | Outdoor temp range minimum |
| `t_out_max` | 0 - 30 | Outdoor temp range maximum |

### Live Parameters from Entities

When `curve_from_entities: true`, the card reads `n`, `min_flow`, and `max_flow` from entities in real time. The `hc` and `shift` are always read from their respective required entities.

```yaml
type: custom:equitherm-tuning-card
climate_entity: climate.equitherm
outdoor_entity: sensor.outdoor_temperature
hc_entity: number.equitherm_hc
shift_entity: number.equitherm_shift
curve_from_entities: true
n_entity: number.equitherm_n
min_flow_entity: sensor.equitherm_min_flow
max_flow_entity: sensor.equitherm_max_flow
```

The static values (`n`, `min_flow`, `max_flow`) serve as fallbacks when entity state is unavailable.

## Visual Elements

### Chart Layout

- X-axis: Outdoor temperature (reversed: warm left, cold right)
- Y-axis: Flow temperature
- Orange curve: Current heating curve (from live entity values)
- Blue curve: Proposed curve (from slider positions)
- Marker: Current operating point on the current curve

### Sliders

- **hc slider**: Adjusts heat curve coefficient with delta indicator showing change from current value
- **shift slider**: Adjusts temperature offset with delta indicator showing change from current value
- Each slider has a reset button to restore the current entity value

### Apply Controls

- **Apply All**: Writes both `hc` and `shift` values to their entities simultaneously
- Success feedback shown after values are applied
- If `recalculate_service` is configured, the service is called after applying

## Grid Options

- Columns: 12
- Rows: 6
- Min Rows: 6

## Theming

The chart automatically adapts to Home Assistant's dark/light mode.

## Entity Requirements

### climate_entity

Must have:
- `attributes.temperature` - Room setpoint (used for curve calculation)
- `attributes.hvac_action` - Current action for badge

### outdoor_entity

- Sensor with numeric state (outdoor temperature)

### hc_entity

- Writable number or input_number entity for heat curve coefficient
- Must support `set_value` service call

### shift_entity

- Writable number or input_number entity for shift offset
- Must support `set_value` service call

### n_entity (optional)

- Number or input_number entity for curve exponent (requires `curve_from_entities`)

### min_flow_entity (optional)

- Diagnostic sensor entity for minimum flow temperature (requires `curve_from_entities`)

### max_flow_entity (optional)

- Diagnostic sensor entity for maximum flow temperature (requires `curve_from_entities`)

## Examples

### Basic Configuration

```yaml
type: custom:equitherm-tuning-card
climate_entity: climate.equitherm
outdoor_entity: sensor.outdoor_temperature
hc_entity: number.equitherm_hc
shift_entity: number.equitherm_shift
```

### With All Options

```yaml
type: custom:equitherm-tuning-card
climate_entity: climate.equitherm
outdoor_entity: sensor.outdoor_temperature
hc_entity: number.equitherm_hc
shift_entity: number.equitherm_shift
curve_from_entities: true
n_entity: number.equitherm_n
min_flow_entity: sensor.equitherm_min_flow
max_flow_entity: sensor.equitherm_max_flow
recalculate_service: climate.equitherm_force_recalculate
show_last_updated: true
name:
  type: entity
```

### With Static Fallback Parameters

```yaml
type: custom:equitherm-tuning-card
climate_entity: climate.equitherm
outdoor_entity: sensor.outdoor_temperature
hc_entity: number.equitherm_hc
shift_entity: number.equitherm_shift
n: 1.3
min_flow: 25
max_flow: 55
t_out_min: -15
t_out_max: 15
```
