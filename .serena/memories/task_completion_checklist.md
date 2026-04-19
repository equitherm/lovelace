# Task Completion Checklist

## After Making Code Changes

1. **Type Check**
   ```bash
   pnpm typecheck
   ```
   Ensure no TypeScript errors.

2. **Build**
   ```bash
   pnpm build
   ```
   Verify build succeeds without errors.

3. **Test** (if tests exist)
   ```bash
   pnpm test
   ```
   All tests must pass.

4. **Manual Testing** (for cards)
   - Start local HA: `ha -c .hass_dev start`
   - Verify card renders correctly in dashboard
   - Test dark mode support
   - Check entity interactions

## Before Committing

1. **Stage appropriate files**
   ```bash
   git add src/<relevant-files>
   ```
   Don't commit dist files separately (they're built in CI).

2. **Write conventional commit message**
   ```
   feat(card): description of feature
   fix(component): description of fix
   refactor(module): description of refactor
   ```

3. **Verify CI will pass**
   ```bash
   task ci
   ```

## Release Notes

- Releases are automated via semantic-release
- Only `feat:` and `fix:` commits trigger releases
- Bundle is automatically attached to GitHub releases
