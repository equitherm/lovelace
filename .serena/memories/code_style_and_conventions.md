# Code Style and Conventions

## TypeScript

- **Strict mode**: Enabled (`strict: true` in tsconfig.json)
- **Target**: ES2020
- **Module**: ESNext with node resolution
- **Decorators**: Experimental decorators enabled
- **No explicit linting**: No eslint or prettier config files present

## Component Pattern (Mushroom Pattern)

All cards follow the **Mushroom pattern** from lovelace-mushroom:

### Base Class Hierarchy

```
LitElement
    └── EquithermBaseElement (src/utils/base-element.ts)
            ├── Dark mode handling via :host([dark-mode])
            └── Theme CSS variables injection
            └── EquithermBaseCard<TConfig> (src/utils/base-card.ts)
                    ├── @state() _config
                    ├── Entity access helpers
                    ├── Temperature formatting
                    └── Action handling
```

## File Organization

Cards are **co-located**: card, editor, config, and const files in `src/cards/<card-name>/`

## Naming Conventions

- **Classes**: PascalCase (e.g., `EquithermStatusCard`)
- **Methods**: camelCase with underscore prefix for internal methods (e.g., `_entityState()`)
- **Properties**: camelCase with underscore prefix for Lit state properties (e.g., `_config`)
- **Files**: kebab-case (e.g., `status-card.ts`)

## Conventional Commits

| Type | Version Bump | Example |
|------|--------------|---------|
| `feat:` | minor | `feat(curve): add outdoor temperature clamping` |
| `fix:` | patch | `fix(status): correct temperature display` |
| `feat!:` | major | Breaking changes |
| `docs:` | none | Documentation |
| `chore:` | none | Maintenance |
| `refactor:` | none | Code restructuring |

## Import Style

- Use ESM imports
- Use `@state()` decorator from Lit for reactive properties
- Vendored HA types from `src/ha/` (no `custom-card-helpers` dependency)
