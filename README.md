# Equitherm Cards

Home Assistant Lovelace cards for the [ESPHome equitherm climate component](https://github.com/equitherm/core).

## Installation

### HACS (Recommended)

1. Open HACS in Home Assistant
2. Go to "Dashboards"
3. Click the three dots → "Custom repositories"
4. Add `https://github.com/equitherm/lovelace` as type "Dashboard"
5. Click "Install" on "Equitherm Cards"

### Manual

1. Download `equitherm-cards.js` from the [latest release](https://github.com/equitherm/lovelace/releases/latest)
2. Copy to `www/equitherm-cards.js` in your Home Assistant config directory
3. Add to your `configuration.yaml`:
   ```yaml
   lovelace:
     resources:
       - url: /local/equitherm-cards.js
         type: module
   ```
4. Restart Home Assistant

## Cards

### Equitherm Status (Available)

Compact tile showing current heating status with temperature flow and optional rate-limiting indicators.

```yaml
type: custom:equitherm-status-card
climate_entity: climate.your_equitherm
outdoor_entity: sensor.outdoor_temperature
flow_entity: sensor.flow_setpoint
# Optional:
curve_output_entity: sensor.heating_curve_output  # Enables ramping indicator
rate_limiting_entity: binary_sensor.rate_limiting_active
control_mode_entity: sensor.control_mode
```

**Features:**
- Displays outdoor, flow, and room temperatures
- HVAC action badge (heating/idle/off)
- Optional "ADJUSTING" indicator when rate-limiting is active
- Temperature unit conversion (°C/°F)
- Click any value to open more-info dialog

### Planned Cards

- **Equitherm Curve** - Heating curve visualization with live operating point
- **Equitherm Forecast** - Predicted flow temperatures based on weather forecast
- **Equitherm Tuning** - Compare heating curves and tune parameters live

## Requirements

- Home Assistant 2024.3.0 or later
- ESPHome equitherm climate component configured

## Related Projects

- [equitherm/core](https://github.com/equitherm/core) - Pure calculation library
- [equitherm/web](https://github.com/equitherm/web) - Web-based tuning tool

## License

MIT
