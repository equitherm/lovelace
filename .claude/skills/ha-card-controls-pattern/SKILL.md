---
name: ha-card-controls-pattern
description: Use when building or restyling Lovelace card controls — sliders, buttons, feature panels. Triggers when using raw HTML inputs, custom CSS for controls, negative margins on card sections, or hardcoded pixel values instead of HA design tokens.
---

# HA Card Controls Pattern

**Core principle:** Use HA's built-in web components and design tokens for card controls instead of building custom UI. Produces cards that look native, respect themes, and need ~75% less CSS.

## When to Use

- Adding sliders, buttons, or interactive controls to any Lovelace card
- Restyling cards that use raw `<input type="range">` or custom `<button>` elements
- Card sections using negative margins or tinted backgrounds to reach card edges

## Card Layout Structure

### Per-Section Padding

```css
/* BAD: card-level padding forces negative margins on edge-to-edge sections */
ha-card { padding: 16px; }
.controls { margin: 16px -16px -16px -16px; }  /* fragile */

/* GOOD: each section owns its padding */
ha-card { padding: 0; }
.header { padding: 16px; }
.content { padding: 0 16px; }
.features { padding: 12px 16px 16px; }
```

### Feature Panel (Controls Section)

Mirrors HA's `hui-card-features` pattern:

```css
.features {
  --feature-color: rgb(var(--rgb-primary, 249, 115, 22));
  --feature-height: 42px;
  --feature-border-radius: var(--ha-card-features-border-radius, var(--ha-border-radius-lg, 12px));
  display: flex;
  flex-direction: column;
  gap: var(--ha-card-feature-gap, 12px);
  border-top: 1px solid var(--divider-color);
  padding: 12px 16px 16px;
  flex-shrink: 0;
}
```

**Rules:**
- Transparent background — no `rgba(primary, 0.05)` tint
- `border-top` separator only
- No negative margins — ever
- No custom `border-radius` on bottom corners

## HA Components

### Slider: `<ha-control-slider>`

```html
<ha-control-slider
  .value=${value}
  .min=${0} .max=${100} .step=${1}
  mode="start"
  .label=${"Label"}
  .locale=${this.hass.locale}
  @slider-moved=${this._onSliderMoved}
></ha-control-slider>
```

**Events:**
- `@slider-moved` — fires during drag `{ value: number }` and on release `{ value: undefined }`
- `@value-changed` — fires on commit only `{ value: number }`

**CSS variables:**
```css
ha-control-slider {
  --control-slider-color: var(--feature-color);
  --control-slider-background: var(--feature-color);
  --control-slider-background-opacity: 0.2;
  --control-slider-thickness: 32px;  /* track height, NOT the row height */
  --control-slider-border-radius: var(--feature-border-radius);
}
```

**Handler:**
```typescript
private _onSliderMoved(ev: CustomEvent<{ value?: number }>): void {
  const val = ev.detail.value;
  if (val === undefined) return;  // skip pan-end signal
  this._proposed = val;
}
```

### Button: `<ha-button>`

```html
<ha-button variant="brand" appearance="filled" size="small"
  .disabled=${!hasChanges} .loading=${isApplying}
  @click=${this._apply}
>
  <ha-icon icon="mdi:check" slot="start"></ha-icon>
  Apply
</ha-button>
```

| Property | Values | Notes |
|----------|--------|-------|
| `variant` | `brand` \| `neutral` \| `success` \| `warning` \| `danger` | Color scheme |
| `appearance` | `filled` \| `outlined` \| `plain` \| `accent` | Visual style |
| `size` | `small` \| `medium` \| `large` | `small` = 32px, `medium` = 40px |
| `.loading` | boolean | Shows spinner, disables click |
| `.disabled` | boolean | Greyed out |
| Slots | `start`, default, `end` | For icons and label |

### Icon Button: `<ha-icon-button>`

```html
<ha-icon-button .label=${"Reset"} @click=${this._reset}>
  <ha-icon icon="mdi:undo"></ha-icon>
</ha-icon-button>
```
```css
.reset-btn {
  --mdc-icon-button-size: 32px;
  --mdc-icon-size: 18px;
  color: var(--secondary-text-color);
}
```

## Design Tokens Reference

| Hardcoded | Token | Default |
|-----------|-------|---------|
| `12px` | `var(--ha-font-size-s, 12px)` | 12px |
| `14px` | `var(--ha-font-size-m, 14px)` | 14px |
| `16px` | `var(--ha-font-size-l, 16px)` | 16px |
| `500` weight | `var(--ha-font-weight-medium, 500)` | 500 |
| `4/8/12/16/24px` | `var(--ha-space-{1..6})` | 4/8/12/16/24px |
| `12px` radius | `var(--ha-border-radius-lg, 12px)` | 12px |
| `9999px` pill | `var(--ha-border-radius-pill)` | 9999px |
| `40px` button | `var(--ha-button-height, 40px)` | 40px |

## Async State Guard

Entity values arrive asynchronously. Guard against undefined/NaN flash:

```typescript
@state() private _value?: number;

render() {
  if (this._value === undefined) {
    return html`<ha-card>...</ha-card>`;  // skeleton/header only
  }
  // full render with controls
}
```

Chart/ResizeObserver init also needs null guards:

```typescript
protected _initChart(): void {
  if (this._chartInitialized || !this._chartEl) return;
  this._chart = new ApexCharts(this._chartEl, this._buildChartOptions());
  this._chart.render();
  this._chartInitialized = true;
}

protected _setupResizeObserver(): void {
  this._resizeObserver?.disconnect();
  if (!this._chartWrapper) return;
  // ... observe
}
```

## Anti-Patterns

| Pattern | Why It Breaks | Fix |
|---------|---------------|-----|
| `margin: X -Xpx -Xpx -Xpx` | Breaks if card padding changes | `ha-card { padding: 0 }` + per-section padding |
| `rgba(primary, 0.05)` bg on controls | Non-standard, fights theme | Transparent bg + `border-top` |
| `<input type="range">` + 40 lines CSS | Duplicates `ha-control-slider` | Use HA component |
| Custom `<button>` + 35 lines CSS | Duplicates `ha-button` | Use HA component |
| `11px` hardcoded font | Ignores theme | `var(--ha-font-size-s)` |
| `_value: number = NaN` or `= 0` or `= 50` | Shows stale/wrong value before entity loads | `undefined` + early return |
| `@keyframes spin` for loading state | Unnecessary CSS animation | `<ha-button .loading=${true}>` handles spinner |
| `_value: number = 0` default | Shows stale value before entity loads | `undefined` + early return |
| `ResizeObserver.observe(null)` | TypeError crash | `if (!el) return` guard |

## Checklist

Before finishing a card with controls:
- [ ] `ha-card` has `padding: 0`, sections own their padding
- [ ] No negative margins
- [ ] No tinted backgrounds on control sections
- [ ] Sliders use `<ha-control-slider>`, not `<input type="range">`
- [ ] Buttons use `<ha-button>`, not `<button class="...">`
- [ ] No custom spinner/loading animations — use `ha-button .loading`
- [ ] Font sizes use `var(--ha-font-size-*)` tokens
- [ ] Spacing uses HA design tokens
- [ ] Entity-dependent state starts as `undefined`, not `NaN`
- [ ] Chart/ResizeObserver init guards null DOM
