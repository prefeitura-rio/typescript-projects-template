# api — Fastify REST API Template

A minimal, production-ready starting point for a Node.js HTTP API using
Fastify 5, TypeScript, and Vitest.

## Stack

| Tool | Purpose |
|---|---|
| **Fastify 5** | HTTP framework — fast, schema-driven, TypeScript-first |
| **tsup** | Build: compiles TypeScript → CJS (via esbuild) |
| **tsx** | Development: runs TypeScript directly, with file watching |
| **Vitest** | Test runner — uses Fastify's `inject()`, no real port needed |
| **oxlint** | Linting |
| **Prettier** | Formatting |
| **ast-grep** | Structural linting (org-wide rules) |
| **devenv** | Reproducible development environment (Nix-based) |

## Project structure

```
src/
  index.ts          # Entry point: bootstrap and start the server
  app/
    server.ts       # Fastify factory (createServer) — used by index & tests
  config/
    index.ts        # Read environment variables into a typed Config object
  domain/
    health.ts       # Pure domain types — no framework imports
  http/
    router.ts       # Register all routes with the Fastify instance
    handler/        # One file per route handler
    middleware/     # Custom Fastify hooks and middleware
  repository/       # Data access layer (database queries, external calls)
  service/          # Business logic that orchestrates domain + repository
tests/
  setup.ts          # Global Vitest setup (runs before each test file)
  health.test.ts    # Integration tests for the /health endpoint
```

## Getting started

### 1. Bootstrap the dev environment (first time only)

```bash
bash scripts/bootstrap.sh
# Then open a new terminal and run:
devenv allow
```

### 2. Start the development server

```bash
pnpm dev
# Starts the server with hot reload via tsx watch.
# Listening on http://localhost:8080
```

### 3. Run quality checks

```bash
pnpm typecheck      # tsc --noEmit
pnpm test           # Vitest (all tests)
pnpm test:coverage  # Vitest with coverage report
```

## Environment variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `8080` | Port the server listens on |
| `LOG_LEVEL` | `info` | Pino log level (`trace`, `debug`, `info`, `warn`, `error`) |

## Testing approach

Tests use Fastify's `app.inject()` — no real TCP socket is opened. This means
tests are fast, require no available ports, and work identically on any
developer machine and in CI.

The `createServer()` factory (in `src/app/server.ts`) is the key: it
configures and returns a Fastify instance without calling `app.listen()`. Tests
call `createServer()` directly, `inject()` requests, and `app.close()` in
`afterAll`.
