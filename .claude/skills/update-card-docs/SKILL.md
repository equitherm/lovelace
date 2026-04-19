---
name: update-card-docs
description: Use when adding, modifying, or removing fields from Lovelace cards - ensures config, editor, translations, card code, docs, and README stay in sync
---

# Update Card Docs

Keep every file in sync when a card field changes.

## Touchpoints

When any field in `<name>-config.ts` changes, check ALL of these:

```
1.  src/cards/<name>/<name>-config.ts     Interface + Superstruct schema + defaults
2.  src/cards/<name>/<name>-editor.ts     ha-form selector for the field
3.  src/translations/en.json              editor.<field> label + any common strings
4.  src/translations/fr.json              Same keys as en.json
5.  src/cards/<name>/<name>.ts            Read field from config, render it
6.  docs/cards/<name>.md                  Options table, YAML examples, features, entity requirements
7.  README.md                             Card's YAML snippet + options table under ## Cards
8.  .hass_dev/packages/mock_equitherm.yaml  Mock entity (if new entity field)
9.  .hass_dev/lovelace/dev-dashboard.yaml   Add entity to card config
```

## The Trap

Agents reliably update files 1-6 and 8-9 but **skip README.md** (item 7). The README has a separate per-card YAML snippet and options table under `## Cards` that must reflect config changes.

## Quick Reference

| Change | Files |
|--------|-------|
| Add entity field | All 9 |
| Add non-entity option | 1-7 |
| Change default | 1, 5-7 (defaults object, render, docs tables) |
| Rename field | All 9 (grep for old name) |
| Remove field | All 9 (remove from each) |

## Editor Selector Patterns

```
entity (climate)   → selector: { entity: { domain: 'climate' } }
entity (temp)      → selector: { entity: { device_class: 'temperature' } }
entity (binary)    → selector: { entity: { domain: 'binary_sensor' } }
```

## Doc Table Columns

- `docs/cards/<name>.md` → Name | Type | Required | Default | Description
- `README.md` → Name | Type | Required | Description (no Default column — keep it concise)
