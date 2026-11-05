# AGENTS.md

Hono HTTP API template for Node.js 24 (TypeScript, tsup, Vitest, oxlint,
oxfmt). Start the dev server with `pnpm dev` (port 8080).

When this template still lives in `typescript-projects-template/backend/`, run
every command below from inside that directory; once copied to its own
repository, run them from the repository root.

## Setup

Node.js 24 (`.node-version`) and pnpm 10 (`packageManager` in `package.json`).
`devenv shell` provides both, plus `ast-grep`; without devenv, install them and
run:

```bash
pnpm install --frozen-lockfile
```

## Commands

| Check           | Command                                              | devenv task         |
| --------------- | ---------------------------------------------------- | ------------------- |
| Tests           | `pnpm test`                                          | `app:test`          |
| Formatting      | `pnpm run format:check`                              | `app:format:check`  |
| Linting         | `pnpm run lint`                                      | `app:lint:check`    |
| Type check      | `pnpm run typecheck`                                 | `app:typecheck`     |
| Structural lint | `ast-grep scan --config .quality-gate/sgconfig.yaml` | `app:strlint:check` |
| Build           | `pnpm run build`                                     | —                   |

Auto-fix: `pnpm run format` (`app:format`) and `pnpm run lint:fix`
(`app:lint`). Coverage: `pnpm test:coverage`. Run a devenv task with
`devenv tasks run <task>`.

A change is ready when tests, formatting, linting, type check and structural
lint all pass: the same checks the CI (`.github/workflows/quality-gate.yaml`,
via `prefeitura-rio/actions/quality-gate@master`) and the git hooks run.

See `README.md` for the stack, the project structure and the testing approach.
