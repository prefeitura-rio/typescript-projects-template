# library — npm Library Template

A minimal, production-ready starting point for a publishable TypeScript npm
package with dual CJS + ESM output, type declarations, and Vitest tests.

## Stack

| Tool | Purpose |
|---|---|
| **tsup** | Build: dual CJS + ESM output + `.d.ts` declarations (via esbuild) |
| **Vitest** | Test runner |
| **oxlint** | Linting |
| **Prettier** | Formatting |
| **ast-grep** | Structural linting (org-wide rules) |
| **devenv** | Reproducible development environment (Nix-based) |

## Project structure

```
src/
  index.ts       # Public API — only re-export what consumers should see
  lib/
    example.ts   # Implementation — replace with your actual code
tests/
  setup.ts       # Global Vitest setup (runs before each test file)
  example.test.ts
dist/            # Build output (git-ignored; published to npm)
  index.js       # ESM output
  index.cjs      # CJS output
  index.d.ts     # TypeScript declarations (ESM)
  index.d.cts    # TypeScript declarations (CJS)
```

## Getting started

### 1. Bootstrap the dev environment (first time only)

```bash
bash scripts/bootstrap.sh
# Then open a new terminal and run:
devenv allow
```

### 2. Rename the package

Update the `name` field in `package.json`:

```json
{ "name": "@your-org/your-package-name" }
```

### 3. Run quality checks

```bash
pnpm typecheck      # tsc --noEmit
pnpm test           # Vitest (all tests)
pnpm test:coverage  # Vitest with coverage report
```

### 4. Build

```bash
pnpm build
# Produces dist/ with ESM, CJS, and .d.ts files.
```

## Publishing

Before publishing, ensure:

1. `name`, `version`, and `description` are set in `package.json`.
2. The `dist/` directory is populated: `pnpm build`.
3. All CI checks pass.

Then:

```bash
pnpm publish --access public   # for a public scoped package
pnpm publish                   # for an unscoped or private registry package
```

## Why dual CJS + ESM?

Different consumers use different module systems:

- **Node.js CommonJS** projects use `require()` → they need `.cjs` output.
- **ESM** projects (Vite, modern Node.js) use `import` → they need `.js` output.
- **TypeScript** consumers need `.d.ts` declaration files for type safety.

The `"exports"` field in `package.json` tells the runtime and bundlers which
file to load for each case. tsup generates all three automatically.
