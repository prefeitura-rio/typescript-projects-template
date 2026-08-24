# library — npm Library Template

A minimal, production-ready starting point for a publishable TypeScript npm
package with dual CJS + ESM output, type declarations, and Vitest tests.

## Stack

| Tool         | Purpose                                                           |
| ------------ | ----------------------------------------------------------------- |
| **tsup**     | Build: dual CJS + ESM output + `.d.ts` declarations (via esbuild) |
| **Vitest**   | Test runner                                                       |
| **oxlint**   | Linting                                                           |
| **oxfmt**    | Formatting                                                        |
| **ast-grep** | Structural linting (org-wide rules)                               |
| **devenv**   | Reproducible development environment (Nix-based)                  |
| **git hooks** | `ripsecrets` + `no-commit-to-branch` + format/lint/strlint (pre-commit) + typecheck/test (pre-push) |

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

Copy this directory into a new, empty repository and run the bootstrap script:

```bash
cp -r typescript-projects-template/library/. my-library/
cd my-library
bash scripts/bootstrap.sh
```

The script prompts for the project name, updates `package.json` and `devenv.nix`,
installs the development environment, and trusts the project automatically. Open
a **new terminal** after the script finishes.

### Rename the package

The `name` field is initialized by the bootstrap script. It supports scoped npm
package names such as:

```json
{ "name": "@your-org/your-package-name" }
```

### 3. Run quality checks

```bash
devenv run app:format           # oxfmt (auto-fix)
devenv run app:format:check     # oxfmt --check
devenv run app:lint             # oxlint --fix
devenv run app:lint:check       # oxlint
devenv run app:strlint          # ast-grep scan
devenv run app:typecheck        # tsc --noEmit
devenv run app:test             # Vitest (all tests)
pnpm test:coverage              # Vitest with coverage report (no devenv task)
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

## CI pipeline

Five jobs run on every push and pull request to `main`:

```
format ──┐
lint   ──┤
strlint──┼──> test
typecheck┘
```

`format`, `lint`, `strlint`, and `typecheck` run in parallel. `test` runs only
after all four pass. `typecheck` runs `tsc --noEmit`.

## Why dual CJS + ESM?

Different consumers use different module systems:

- **Node.js CommonJS** projects use `require()` → they need `.cjs` output.
- **ESM** projects (Vite, modern Node.js) use `import` → they need `.js` output.
- **TypeScript** consumers need `.d.ts` declaration files for type safety.

The `"exports"` field in `package.json` tells the runtime and bundlers which
file to load for each case. tsup generates all three automatically.
