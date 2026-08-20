# nextjs — Next.js Frontend Template

A minimal, production-ready template for Next.js frontend projects.

## Stack

| Layer           | Tool                             |
| --------------- | -------------------------------- |
| Framework       | Next.js 15 (App Router)          |
| Language        | TypeScript 5 (strict mode)       |
| Runtime         | Node.js 24                       |
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

### Step 1 — Copy the template into a new repository

```bash
cp -r typescript-projects-template/nextjs/. my-nextjs-app/
cd my-nextjs-app
```

### Step 2 — Bootstrap (one time, per machine)

```bash
bash scripts/bootstrap.sh
```

### Step 3 — Trust the project (one time, per clone)

```bash
devenv allow
```

### Step 4 — Work normally

Entering the project directory activates the environment automatically.
Node.js 24, pnpm, and all node_modules are ready immediately.

```bash
pnpm dev   # start Next.js dev server
```

## Git Hooks

Installed automatically when the environment activates:

| Hook                  | Behaviour                                                            |
| --------------------- | -------------------------------------------------------------------- |
| `ripsecrets`          | Scans for accidentally committed secrets; aborts the commit if found |
| `no-commit-to-branch` | Blocks direct commits to `main`; use a branch and open a PR          |

## Running Quality Checks Locally

The `quality-gate` CI action is the authoritative enforcer — every push and
pull request is validated there. The pnpm scripts below mirror what CI runs and
are useful for fast local feedback during development:

```bash
pnpm typecheck      # tsc --noEmit
pnpm test           # Vitest (all tests)
pnpm test:coverage  # Vitest with coverage report
pnpm format:check   # oxfmt --check (reports problems)
pnpm format         # oxfmt (auto-fixes formatting)
pnpm lint           # oxlint .
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
3. Update the page `<title>` and `<meta description>` in `src/app/layout.tsx`
4. Replace the `health-status` feature with your own domain components
5. Add your domain types to `src/domain/`
6. When adding Docker support, uncomment `output: 'standalone'` in `next.config.ts`
