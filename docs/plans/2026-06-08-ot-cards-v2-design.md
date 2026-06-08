# OpenTherm Cards V2 — Architecture Redesign

**Date :** 2026-06-08
**Scope :** Restructurer les 5 cartes OT en 4 cartes cohérentes, 2 patterns clairs, 1 composant partagé.

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

## Vue d'ensemble

### Avant (5 cartes, patterns mélangés)

```
opentherm-status-card      OtBaseCard      temps + ΔT + modulation bar
opentherm-modulation-card  OtBaseCard      modulation slider + flame timeline + cycles/h
opentherm-dhw-card         OtBaseCard      hero temp + switch + slider
opentherm-efficiency-card  OtEChartCard    flow/return chart + condensing
opentherm-diagnostics-card OtBaseCard      fault codes
```

### Après (4 cartes, 2 patterns clairs)

```
opentherm-heating-card     OtBaseCard      temps + ΔT + modulation + flame timeline
opentherm-dhw-card         OtBaseCard      hero temp + switch + slider + dhw timeline
opentherm-efficiency-card  OtEChartCard    flow/return chart + DHW curves optionnelles
opentherm-diagnostics-card OtBaseCard      fault codes (inchangée)
```

## Décisions

| Sujet | Décision |
|-------|----------|
| Diagnostics card | Garder séparée, inchangée |
| Timeline mutualisée | Composant partagé `<ot-timeline-section>` |
| Migration status+modulation | Nouveau nom `opentherm-heating-card` + aliases dépréciés |
| Nommage | Seule la nouvelle carte change de nom |
| DHW efficiency | Pas de carte séparée, courbes ajoutées à efficiency card |

---

## Étape 1 : `ot-timeline-section` — Composant partagé

**Fichier :** `src/shared/ot-timeline-section.ts`

### Interface

```ts
interface KpiItem {
  value: string;
  label: string;
}

@customElement('ot-timeline-section')
class OtTimelineSection extends LitElement {
  @property() hass: HomeAssistant;
  @property() label: string;           // "FLAME", "TIMELINE"
  @property() segments: BinarySegment[];
  @property() startTime: number;
  @property() endTime: number;
  @property() kpis: KpiItem[];         // [{ value: "4", label: "cycles/h" }]
}
```

### Rendu

```
┌─────────────────────────────┐
│  FLAME                      │  ← .label (uppercase, xs, secondary color)
│  ▓▓░░▓▓▓░░▓▓░░▓▓▓▓░░░░    │  ← eq-binary-timeline
│  4 cycles/h · 23 min active │  ← KPI footer (si kpis.length > 0)
└─────────────────────────────┘
```

### CSS

Centralise les styles actuellement dupliqués :

```css
.timeline-section {
  padding: 6px 12px 0;
  border-top: 1px solid var(--divider-color);
  margin-top: 2px;
}
.timeline-label {
  font-size: var(--ha-font-size-xs, 0.75rem);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--secondary-text-color);
  margin-bottom: 4px;
  opacity: 0.7;
}
.kpi-inline {
  display: flex;
  justify-content: center;
  gap: 6px;
  padding: 4px 0 8px;
  font-size: var(--ha-font-size-xs, 0.75rem);
  color: var(--secondary-text-color);
  font-variant-numeric: tabular-nums;
}
.kpi-sep { opacity: 0.4; }
```

### Usage heating card

```html
<ot-timeline-section
  .hass=${this.hass}
  .label=${localize('opentherm.heating_card.flame')}
  .segments=${segments}
  .startTime=${startTime}
  .endTime=${endTime}
  .kpis=${[{ value: `${cycles}`, label: localize('...cycles_per_hour') }]}
></ot-timeline-section>
```

### Usage DHW card

```html
<ot-timeline-section
  .hass=${this.hass}
  .label=${localize('opentherm.dhw_card.timeline')}
  .segments=${segments}
  .startTime=${startTime}
  .endTime=${endTime}
  .kpis=${[
    { value: `${totalCycles}`, label: localize('...cycles') },
    { value: `${activeTime}`, label: localize('...active_time') },
  ]}
></ot-timeline-section>
```

### Tâches

- [ ] Créer `src/shared/ot-timeline-section.ts`
- [ ] Importer `eq-binary-timeline` + `BinarySegment`
- [ ] Props : `hass`, `label`, `segments`, `startTime`, `endTime`, `kpis`
- [ ] Template : section border-top + label + timeline + KPI footer
- [ ] CSS : `.timeline-section`, `.timeline-label`, `.kpi-inline`, `.kpi-sep`
- [ ] Gater KPI footer sur `kpis.length > 0`
- [ ] Refactor `ot-modulation-card` pour utiliser `ot-timeline-section` (remplacer le code inline)
- [ ] `pnpm typecheck` + `pnpm build`

---

## Étape 2 : `opentherm-heating-card` — Fusion status + modulation

**Fichiers :** `src/cards/opentherm/ot-heating-card/` (nouveau)

### Config

```ts
interface OtHeatingCardConfig {
  type: string;
  // contenu (ex-status) — toujours visible
  boiler_temp_entity: string;
  return_temp_entity: string;
  flame_entity: string;
  setpoint_entity?: string;
  // feature panel — visible si configuré
  max_modulation_entity?: string;
  modulation_entity?: string;       // bar dans contenu si présent
  // monitoring — visible si flame_entity + hours
  hours?: number;
  ch_active_entity?: string;        // filtre CH-only cycles
  // commun
  dhw_active_entity?: string;       // badge header
  fault_entity?: string;
  name?: unknown;
  show_last_updated?: boolean;
}
```

### Layout — 3 couches progressives

```
┌─────────────────────────────────────┐
│  Header: 🔥 Boiler    [fault][flame]│  badges: fault, flame, CH, DHW
│                                     │
│  CONTENU (toujours)                 │
│  [Boiler 48.5°C] → [Return 32.1°C] │ [ΔT 16.4°C]│  grid 3 blocs
│  MODULATION  ██████████░░░░  68%   │  ← si modulation_entity
│─────────────────────────────────────│
│  FEATURE PANEL (si max_modulation)  │
│  Max modulation      [=====slider=] │
│─────────────────────────────────────│
│  MONITORING (si flame + hours)      │
│  FLAME                              │  ← ot-timeline-section
│  ▓▓░░▓▓▓░░▓▓░░▓▓▓▓░░░░           │
│  4c/h                               │
└─────────────────────────────────────┘
```

### Gating (zéro régression)

| Section | Condition | Équivaut à |
|---------|-----------|------------|
| Contenu complet | toujours | status card actuel |
| Bar modulation | `modulation_entity` configuré | déjà optionnel dans status |
| Feature panel | `max_modulation_entity` configuré | modulation card |
| Timeline monitoring | `flame_entity` + `hours` | modulation card |
| Badge CH/DHW | `ch_active_entity` / `dhw_active_entity` | déjà optionnel dans status |

### Grid options

```ts
getGridOptions(): LovelaceGridOptions {
  const hasFeatures = !!this._config.max_modulation_entity;
  const hasMonitoring = !!this._config.hours;
  const rows = 3 + (hasFeatures ? 1 : 0) + (hasMonitoring ? 1 : 0)
    + (this._config.show_last_updated ? 1 : 0);
  return { columns: 12, rows, min_rows: 3 };
}
```

### Historique + lifecycle

- Copier le pattern `ot-modulation-card._fetchHistory()` :
  - `connectedCallback` → `_fetchHistory()` + `setInterval(30s)`
  - `OtHistoryHelper.fetch(hass, [flame_entity, ch_active_entity?], hours)`
  - `_countChOnlyCycles()` si `ch_active_entity`, sinon `countCycles()`
  - `_buildTimelineData()` → `BinarySegment[]`
- Déléguer le rendu timeline à `<ot-timeline-section>`

### Aliases dépréciés

Dans `src/equitherm-cards.ts` :

```ts
import './cards/opentherm/ot-heating-card/ot-heating-card';

// Deprecated aliases — redirect to OtHeatingCard
customElements.define('opentherm-status-card', OtHeatingCard);
customElements.define('opentherm-modulation-card', OtHeatingCard);
```

Dans `OtHeatingCard.setConfig()` :

```ts
setConfig(config: unknown) {
  const cfg = config as any;
  if (cfg.type?.includes('status-card') || cfg.type?.includes('modulation-card')) {
    console.warn(
      `[equitherm-cards] "${cfg.type}" is deprecated. Use "custom:opentherm-heating-card" instead.`
    );
  }
  this._config = validateOtHeatingCardConfig(config);
}
```

### Tâches

- [ ] Créer `src/cards/opentherm/ot-heating-card/` (const.ts, config.ts, editor.ts, card.ts)
- [ ] Config : merger OtStatusCardConfig + OtModulationCardConfig
- [ ] Editor : merger les deux schemas avec sections (Required: temps, Optional: modulation, Optional: monitoring)
- [ ] Card : contenu depuis ot-status-card (temps grid + modulation bar)
- [ ] Card : feature panel depuis ot-modulation-card (max modulation slider)
- [ ] Card : monitoring via `<ot-timeline-section>` avec données flame
- [ ] Card : badges depuis les deux (flame, CH, DHW, fault, cycles/h)
- [ ] Grid options dynamiques selon sections actives
- [ ] Ajouter aliases dépréciés dans `equitherm-cards.ts`
- [ ] Ajouter warning dépréciation dans `setConfig()`
- [ ] Ajouter clés localisation manquantes dans en.json + fr.json
- [ ] Supprimer `ot-status-card/` et `ot-modulation-card/`
- [ ] `pnpm typecheck` + `pnpm build`
- [ ] Vérifier qu'une config status existante affiche la même chose
- [ ] Vérifier qu'une config modulation existante affiche la même chose

---

## Étape 3 : `opentherm-dhw-card` — Ajout monitoring

**Fichiers :** `src/cards/opentherm/ot-dhw-card/` (modifié)

### Config — 3 ajouts

```ts
interface OtDhwCardConfig {
  // ...existant (inchangé)
  dhw_enable_entity: string;
  dhw_setpoint_entity: string;
  dhw_temp_entity?: string;
  // nouveau monitoring
  dhw_active_entity?: string;   // gate pour timeline + KPI + badge cycles
  hours?: number;               // 1-24, défaut 1
  // commun
  fault_entity?: string;
  name?: unknown;
  show_last_updated?: boolean;
}
```

### Layout

```
┌─────────────────────────────────────┐
│  Header: 🚿 Hot Water  [4c/h]      │  badge cycles/h (info blue)
│                                     │
│  CONTENU (toujours)                 │
│        48.5°C                       │  hero temp
│  Target 52.0°C · ΔT −3.5°C        │  ΔT inline si dhw_temp dispo
│                                     │
│─────────────────────────────────────│
│  FEATURE PANEL (toujours)           │
│  Enable            [=switch=]       │
│  ═════════════════════════════════  │  ha-control-slider
│─────────────────────────────────────│
│  MONITORING (si dhw_active_entity)  │
│  TIMELINE                           │  ← ot-timeline-section
│  ▓▓░░▓▓▓░░▓▓░░▓▓▓▓░░░░           │
│  4 cycles · 23 min active           │
└─────────────────────────────────────┘
```

### Données

- `connectedCallback` → `_fetchHistory()` + `setInterval(30s)`
- `disconnectedCallback` → `clearInterval`
- `OtHistoryHelper.fetch(hass, [dhw_active_entity], hours)`
- `_cyclesPerHour` : cycles sur la dernière heure
- `_totalCycles` : cycles sur la période complète
- `_totalActiveTime` : somme des durées "on" en minutes
- `_buildTimelineData()` → `BinarySegment[]` pour `ot-timeline-section`
- KPI : 2 items (cycles + temps actif)

### ΔT hero

- ΔT = `dhwTemp - setpointValue`
- Affiché dans `.hero-label` uniquement si `dhw_temp_entity` configuré et les deux valeurs valides
- Utilise `formatNumber` avec `signDisplay: 'always'`

### Badge cycles/h

- Dans `_renderHeaderBadges()`, après le badge DHW active
- Uniquement si `_cyclesPerHour > 0`
- Pas de `.active` pulse (cycles DHW sont normaux)
- Style : `--badge-info-color: var(--rgb-info, 3, 169, 244)`

### Grid options

- Avec timeline : `{ columns: 6, rows: show_last_updated ? 8 : 7, min_rows: 4 }`
- Sans timeline : `{ columns: 6, rows: show_last_updated ? 5 : 4, min_rows: 3 }` (inchangé)

### Localisation

| Clé | EN | FR |
|-----|----|----|
| `dhw_card.timeline` | `"Timeline"` | `"Chronologie"` |
| `dhw_card.cycles` | `"cycles"` | `"cycles"` |
| `dhw_card.active_time` | `"min active"` | `"min actif"` |

### Tâches

- [ ] Ajouter `dhw_active_entity` + `hours` au config + struct Superstruct
- [ ] Ajouter slider optionnel `hours` dans l'éditeur
- [ ] Ajouter 3 clés localisation dans en.json + fr.json
- [ ] Ajouter propriétés : `_dhwHistory`, `_cyclesPerHour`, `_totalCycles`, `_totalActiveTime`, `_fetchTimer`
- [ ] Implémenter `connectedCallback` / `disconnectedCallback` avec fetch + interval
- [ ] Implémenter `_fetchHistory()` + `_buildTimelineData()`
- [ ] Implémenter `_computeActiveTime()` — somme durées "on" → minutes
- [ ] Ajouter ΔT hero dans le template
- [ ] Ajouter badge cycles/h dans `_renderHeaderBadges()`
- [ ] Ajouter section monitoring avec `<ot-timeline-section>` (gated sur `dhw_active_entity`)
- [ ] Mettre à jour `getGridOptions()` selon timeline présente ou non
- [ ] `pnpm typecheck` + `pnpm build`
- [ ] Vérifier la carte sans `dhw_active_entity` (identique à aujourd'hui)
- [ ] Configurer `dhw_active_entity` → timeline + KPI + badge apparaissent

---

## Étape 4 : `opentherm-efficiency-card` — Courbes DHW optionnelles

**Fichiers :** `src/cards/opentherm/ot-efficiency-card/` (modifié)

### Config — 3 ajouts

```ts
interface OtEfficiencyCardConfig {
  // ...existant (inchangé)
  boiler_temp_entity: string;
  return_temp_entity: string;
  flame_entity?: string;
  ch_active_entity?: string;
  condensing_threshold?: number;
  hours?: number;
  // nouveau DHW
  dhw_temp_entity?: string;        // courbe DHW temperature
  dhw_setpoint_entity?: string;    // markLine setpoint
  dhw_active_entity?: string;      // zones ombrées actives
  // commun
  fault_entity?: string;
  name?: unknown;
  show_last_updated?: boolean;
}
```

### Chart — couches progressives

```
╭─────────────────────────────────────────╮
│  ─── DHW setpoint 52°C     (markLine)  │  ← si dhw_setpoint_entity
│  - - - DHW temp 48.5°C    (dashed)     │  ← si dhw_temp_entity
│       ╱╲  ╱╲                             │
│ Flow ╱  ╲╱  ╲  ← spike quand DHW       │  ← existant
│ ──────────     ╲                         │
│ Return  ──────────╲───                   │  ← existant
│ ▓▓▓░░░▓▓▓▓░░░░▓▓▓▓░░░░░░░░░░          │  ← si dhw_active (markArea)
│  ··· condensing threshold 55°C          │  ← existant
╰─────────────────────────────────────────╯
```

### Éléments ECharts

| Élément | Condition | Style |
|---------|-----------|-------|
| Flow line | toujours | existant, plein |
| Return line | toujours | existant, plein |
| Condensing markLine | toujours | existant, dashed vert |
| DHW temp line | `dhw_temp_entity` | dashed, couleur distincte (ex: teal) |
| DHW setpoint markLine | `dhw_setpoint_entity` | horizontal, style DHW |
| DHW active zones | `dhw_active_entity` | markArea, fond semi-transparent |

### _buildEChartOptions() modifications

```ts
// Ajouter à data[] si dhw_temp_entity configuré :
{
  type: 'line',
  name: 'DHW',
  data: this._toChartData(dhwHistory, cfg.dhw_temp_entity),
  smooth: true,
  showSymbol: false,
  lineStyle: { width: 1.5, type: 'dashed' },
  itemStyle: { color: tealColor },
}

// Ajouter markLine sur la série DHW si dhw_setpoint_entity configuré :
{
  markLine: {
    silent: true,
    symbol: 'none',
    lineStyle: { color: 'rgba(0,150,136,0.5)', type: 'dashed', width: 1 },
    data: [{ yAxis: setpoint, label: { formatter: `DHW ${fmt}`, fontSize: 10 } }],
  }
}

// Ajouter markArea sur la série DHW si dhw_active_entity configuré :
{
  markArea: {
    silent: true,
    itemStyle: { color: 'rgba(255,152,0,0.08)' },
    data: activeZones.map(([start, end]) => [{ xAxis: start }, { xAxis: end }]),
  }
}
```

### _fetchHistory() modifications

```ts
// Ajouter dhw entities au fetch :
const entityIds = [cfg.boiler_temp_entity, cfg.return_temp_entity];
if (cfg.dhw_temp_entity) entityIds.push(cfg.dhw_temp_entity);
if (cfg.dhw_active_entity) entityIds.push(cfg.dhw_active_entity);
const history = await OtHistoryHelper.fetch(this.hass, entityIds, hours);
this._dhwHistory = history[cfg.dhw_temp_entity] ?? [];
this._dhwActiveHistory = history[cfg.dhw_active_entity] ?? [];
```

### KPI footer — ajout conditionnel

```
// actuel (sans DHW)
  48.5°C  │  32.1°C  │  ΔT 16.4°C
  flow    │  return  │

// avec DHW
  48.5°C  │  32.1°C  │  48.5°C  │  ΔT 16.4°C
  flow    │  return  │  DHW     │
```

4e bloc KPI si `dhw_temp_entity` configuré. ΔT reste boiler - return (pas DHW).

### Tâches

- [ ] Ajouter `dhw_temp_entity`, `dhw_setpoint_entity`, `dhw_active_entity` au config + struct
- [ ] Ajouter les 3 entités optionnelles dans l'éditeur (section "DHW Sensors")
- [ ] Étendre `_fetchHistory()` pour fetch les entités DHW
- [ ] Ajouter `_dhwHistory`, `_dhwActiveHistory` properties
- [ ] Ajouter DHW temp line dans `_buildEChartOptions()` (gated)
- [ ] Ajouter DHW setpoint markLine (gated)
- [ ] Ajouter DHW active markArea (gated)
- [ ] Ajouter 4e bloc KPI footer pour DHW temp (gated)
- [ ] Ajouter clés localisation DHW dans en.json + fr.json
- [ ] `pnpm typecheck` + `pnpm build`
- [ ] Vérifier la carte sans entités DHW (identique à aujourd'hui)
- [ ] Configurer DHW entities → courbes + zones apparaissent

---

## Hiérarchie des classes (finale)

```
LitElement
└── EquithermBaseElement
      ├── BaseCard<TConfig>
      │     ├── OtBaseCard<TConfig>
      │     │     ├── OtHeatingCard      ← NOUVEAU (fusion status+modulation)
      │     │     ├── OtDhwCard          ← EXISTANT (+ monitoring)
      │     │     └── OtDiagnosticsCard  ← EXISTANT (inchangé)
      │     └── EquithermBaseCard        ← equitherm cards
      └── OtEChartCard<TConfig>
            └── OtEfficiencyCard         ← EXISTANT (+ DHW curves)
```

## Structure fichiers — changements

```
src/shared/
├── eq-badge-info.ts          ← existant
├── eq-binary-timeline.ts     ← existant
├── eq-param-bar.ts           ← existant
└── ot-timeline-section.ts    ← NOUVEAU

src/cards/opentherm/
├── ot-heating-card/                    ← NOUVEAU (remplace status + modulation)
│   ├── ot-heating-card.ts
│   ├── ot-heating-card-config.ts
│   ├── ot-heating-card-editor.ts
│   └── const.ts
├── ot-status-card/                     ← SUPPRIMÉ (alias déprécié)
├── ot-modulation-card/                 ← SUPPRIMÉ (alias déprécié)
├── ot-dhw-card/                        ← MODIFIÉ (+ monitoring)
├── ot-efficiency-card/                 ← MODIFIÉ (+ DHW curves)
└── ot-diagnostics-card/                ← INCHANGÉ

src/equitherm-cards.ts                  ← MODIFIÉ (registration + aliases)
```

## Ordre d'implémentation

| Étape | Quoi | Dépendance |
|-------|------|------------|
| **1** | `ot-timeline-section` | aucun |
| **2** | `ot-heating-card` (fusion) | étape 1 |
| **3** | `ot-dhw-card` monitoring | étape 1 |
| **4** | `ot-efficiency-card` DHW curves | aucun |

Étapes 2, 3, 4 sont indépendantes entre elles. Seul le composant timeline (étape 1) est un prérequis pour 2 et 3.
