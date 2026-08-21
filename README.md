# TypeScript Project Templates

A collection of minimal, production-ready TypeScript project starters. Each
template is an independent, self-contained repository — copy the contents of
the relevant subdirectory into a new repository root and start building.

## Available templates

| Template | Description | Framework |
|---|---|---|
| [`frontend/`](./frontend/) | Frontend web application | Next.js 15, React 19 |
| [`backend/`](./backend/) | HTTP REST API | Hono, Node.js 24 |
| [`library/`](./library/) | Publishable npm package | tsup (dual CJS + ESM) |

## What every template shares

All three templates use the same conventions so patterns learned in one apply
to the others:

| Concern | Choice |
|---|---|
| Language | TypeScript 5 with `strict`, `noUncheckedIndexedAccess`, `noImplicitOverride` |
| Runtime | Node.js 24 LTS |
| Package manager | pnpm 10 |
| Dev environment | devenv (Nix-based, reproducible) |
| Git hooks | `ripsecrets` + `no-commit-to-branch` |
| Formatting | oxfmt |
| Linting | oxlint |
| Structural linting | ast-grep (org-wide rules via `quality-gate`) |
| Tests | Vitest 3 |
| CI | GitHub Actions → `prefeitura-rio/actions/quality-gate@master` |

## CI pipeline structure

Every template ships an identical `.github/workflows/quality-gate.yaml` with five jobs:

```
format ──┐
lint   ──┤
strlint──┼──> test
typecheck┘
```

The four checks run in parallel. `test` runs only after all four pass. This
keeps feedback fast: a formatting error does not block linting, and tests only
run on code that has already passed static analysis.

The `backend/` template additionally ships `.github/workflows/sast.yaml` — security
scanning (opengrep, grype/SBOM, checkov, SonarQube) via the org reusable
workflow `prefeitura-rio/actions/.github/workflows/sast.yml`. See
[backend/README.md](./backend/README.md) for the required secrets and variables.

## How to use a template

Copy the desired template subdirectory into a new, empty repository and run its
bootstrap script. For example:

```bash
cp -r typescript-projects-template/backend/. my-new-backend/
cd my-new-backend
bash scripts/bootstrap.sh
```

The script prompts for the project name, performs the package metadata
substitutions, installs the development environment, and trusts the project
automatically. Open a **new terminal** after the script finishes.

Follow the template-specific README for verification commands.

## Template-specific docs

Each template contains its own `README.md` with detailed usage instructions,
stack choices, and testing guidance:

- [frontend/README.md](./frontend/README.md)
- [backend/README.md](./backend/README.md)
- [library/README.md](./library/README.md)
