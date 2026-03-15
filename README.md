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

### Equitherm Status

Compact tile showing current heating status with fault indicators.

```yaml
type: custom:equitherm-status-card
climate_entity: climate.your_equitherm
outdoor_entity: sensor.outdoor_temperature
flow_entity: sensor.flow_setpoint
```

### Equitherm Curve

Heating curve visualization with live operating point.

```yaml
type: custom:equitherm-curve-card
climate_entity: climate.your_equitherm
outdoor_entity: sensor.outdoor_temperature
```

### Equitherm Forecast

Predicted flow temperatures based on weather forecast.

```yaml
type: custom:equitherm-forecast-card
climate_entity: climate.your_equitherm
weather_entity: weather.your_weather
```

### Equitherm Tuning

Compare heating curves and tune parameters live.

```yaml
type: custom:equitherm-tuning-card
climate_entity: climate.your_equitherm
```

## Requirements

- Home Assistant 2024.3.0 or later
- ESPHome equitherm climate component configured

## Related Projects

- [equitherm/core](https://github.com/equitherm/core) - Pure calculation library
- [equitherm/web](https://github.com/equitherm/web) - Web-based tuning tool

## License

MIT
