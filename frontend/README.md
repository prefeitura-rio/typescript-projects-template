# frontend — Next.js Frontend Template

A minimal, production-ready template for Next.js frontend projects.

## Stack

| Layer           | Tool                                                                                                |
| --------------- | --------------------------------------------------------------------------------------------------- |
| Framework       | Next.js 15 (App Router)                                                                             |
| Language        | TypeScript 5 (strict mode)                                                                          |
| Runtime         | Node.js 24                                                                                          |
| Package manager | pnpm                                                                                                |
| Formatting      | oxfmt                                                                                               |
| Linting         | oxlint                                                                                              |
| Testing         | Vitest + Testing Library                                                                            |
| Dev environment | devenv (Nix-based, reproducible)                                                                    |
| Git hooks       | `ripsecrets` + `no-commit-to-branch` + format/lint/strlint (pre-commit) + typecheck/test (pre-push) |

## Project Structure

```
.
├── src/
│   ├── app/                   # Next.js App Router — routing layer (thin)
│   │   ├── layout.tsx         # Root HTML shell and global providers
│   │   ├── page.tsx           # Root route (/)
│   │   └── globals.css        # Application-wide base styles
│   ├── components/
│   │   ├── ui/                # Generic primitive components (Button, Input…)
│   │   └── features/          # Domain-specific feature components
│   ├── domain/                # Pure TypeScript types — no React/Next.js deps
│   ├── lib/
│   │   ├── api/               # HTTP/fetch client utilities
│   │   └── utils/             # General-purpose helpers
│   ├── hooks/                 # Custom React hooks
│   └── services/              # Business logic and data fetching (no JSX)
├── tests/
│   └── setup.ts               # Vitest global setup (jest-dom matchers)
├── public/                    # Static assets served by Next.js
└── .github/
    └── workflows/
        └── quality-gate.yaml  # Quality gate CI pipeline
```

### Architecture layers

The project follows a layered architecture where each layer has a clear
responsibility and imports only from layers below it:

```
app/        ← routing, layout, page composition
components/ ← UI (ui/) and feature-specific (features/)
services/   ← business logic, data fetching
domain/     ← pure types and interfaces (no dependencies)
```

Test files are co-located next to the file they cover:
`HealthStatus.tsx` → `HealthStatus.test.tsx`.

## Getting Started

The Node.js toolchain and pnpm are declared in `devenv.nix`. You do not
install them manually.

### Copy the template into a new repository

```bash
cp -r typescript-projects-template/frontend/. my-nextjs-app/
cd my-nextjs-app
bash scripts/bootstrap.sh
```

The script prompts for the project name, updates `package.json` and
`devenv.nix`, installs the development environment, and trusts the project
automatically. Open a **new terminal** after the script finishes.

### Work normally

Entering the project directory activates the environment automatically.
Node.js 24, pnpm, and all node_modules are ready immediately.

```bash
pnpm dev   # start Next.js dev server
```

## Git Hooks

Installed automatically when the environment activates:

| Hook                  | Stage      | Behaviour                                                          |
| --------------------- | ---------- | ------------------------------------------------------------------ |
| `ripsecrets`          | pre-commit | Scans for accidentally committed secrets                           |
| `no-commit-to-branch` | pre-commit | Blocks direct commits to `master` and `main`                       |
| `app-format`          | pre-commit | Checks formatting (oxfmt); auto-fixes and re-stages, blocks commit |
| `app-lint`            | pre-commit | Checks linting (oxlint); auto-fixes and re-stages, blocks commit   |
| `app-strlint`         | pre-commit | Structural lint (ast-grep); check-only, blocks commit              |
| `app-typecheck`       | pre-push   | Runs `tsc --noEmit`                                                |
| `app-test`            | pre-push   | Runs Vitest                                                        |

## Running Quality Checks Locally

devenv tasks wrap the same tools CI uses. Run them with `devenv tasks run`:

```bash
devenv tasks run app:format           # oxfmt (auto-fix)
devenv tasks run app:format:check     # oxfmt --check
devenv tasks run app:lint             # oxlint --fix
devenv tasks run app:lint:check       # oxlint
devenv tasks run app:strlint           # ast-grep scan
devenv tasks run app:typecheck         # tsc --noEmit
devenv tasks run app:test              # Vitest (all tests)
pnpm test:coverage              # Vitest with coverage report (no devenv task)
```

## CI/CD

GitHub Actions runs automatically on every push and pull request to `main`.
The pipeline uses the `prefeitura-rio/actions/quality-gate` action:

```
push / PR to main
│
├── Format    (oxfmt)            ──┐
├── Lint      (oxlint)           ──┤  parallel
├── Strlint   (ast-grep)         ──┤
├── Typecheck (tsc --noEmit)     ──┘
│
└── Test      (Vitest)              gated — only runs when all above pass
```

## Customising This Template

1. The bootstrap script initializes `name` in `package.json` and `devenv.nix`.
2. Update the page `<title>` and `<meta description>` in `src/app/layout.tsx`.
3. Replace the `health-status` feature with your own domain components.
4. Add your domain types to `src/domain/`.
5. Add `output: 'standalone'` to `next.config.ts` when adding Docker support.
