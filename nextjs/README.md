# TypeScript Project Template

A minimal, production-ready template for Next.js frontend projects.

## Stack

| Layer           | Tool                             |
| --------------- | -------------------------------- |
| Framework       | Next.js 15 (App Router)          |
| Language        | TypeScript 5 (strict mode)       |
| Runtime         | Node.js 22                       |
| Package manager | pnpm                             |
| Formatting      | oxfmt                            |
| Linting         | oxlint                           |
| Testing         | Vitest + Testing Library         |
| Dev environment | devenv (Nix-based, reproducible) |

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

### Step 1 — Bootstrap (one time, per machine)

```bash
git clone git@github.com:prefeitura-rio/typescript-projects-template.git
cd typescript-projects-template
bash scripts/bootstrap.sh
```

### Step 2 — Trust the project (one time, per clone)

```bash
devenv allow
```

### Step 3 — Work normally

Entering the project directory activates the environment automatically.
Node.js 22, pnpm, and all node_modules are ready immediately.

```bash
cd typescript-projects-template   # environment activates + pnpm install runs
pnpm dev                          # start Next.js dev server
```

## Git Hooks

Installed automatically when the environment activates:

| Hook                  | Behaviour                                                            |
| --------------------- | -------------------------------------------------------------------- |
| `ripsecrets`          | Scans for accidentally committed secrets; aborts the commit if found |
| `no-commit-to-branch` | Blocks direct commits to `main`; use a branch and open a PR          |

## Running Quality Checks Locally

All checks mirror what CI runs. Use `devenv tasks run <name>`:

| Task                             | What it does                 |
| -------------------------------- | ---------------------------- |
| `devenv tasks run app:format`    | Check formatting with oxfmt  |
| `devenv tasks run app:lint`      | Lint with oxlint             |
| `devenv tasks run app:typecheck` | Type-check with tsc --noEmit |
| `devenv tasks run app:test`      | Run tests with Vitest        |

To fix formatting automatically:

```bash
pnpm format
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

1. Update `name` in `package.json`
2. Update `name` in `devenv.nix`
3. Update the module path in `go.mod` — not applicable here; update page
   `<title>` and `<meta description>` in `src/app/layout.tsx`
4. Replace the `health-status` feature with your own domain components
5. Add your domain types to `src/domain/`
6. When adding Docker support, uncomment `output: 'standalone'` in `next.config.ts`
