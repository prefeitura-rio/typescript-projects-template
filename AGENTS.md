# AGENTS.md

This repository is a collection of TypeScript project templates. Each template
directory is an independent, self-contained project meant to be copied to the
root of a new repository:

| Directory   | Template                                  |
| ----------- | ----------------------------------------- |
| `frontend/` | Next.js 15 + React 19 web application     |
| `backend/`  | Hono HTTP API on Node.js 24               |
| `library/`  | Publishable npm package (tsup, CJS + ESM) |

There is no root `package.json` and no workspace: install, build, test and lint
each template from inside its own directory. The commands for each one are in
its `AGENTS.md` (`frontend/AGENTS.md`, `backend/AGENTS.md`,
`library/AGENTS.md`).

## CI

The root workflow `.github/workflows/quality-gate.yaml` runs on pull requests
and pushes to `main`. It calls `prefeitura-rio/actions/quality-gate@master` in
a matrix over the three templates (`backend`, `frontend`, `library`):
`app:format`, `app:lint`, `app:strlint` and `app:typecheck` run first, then
`app:test`. Checks are named `<template> / <check>`.

The workflows inside each template (`<template>/.github/workflows/`) only run
after the template is copied to its own repository.

## Rules

- A change to a template must pass that template's checks; a change that
  touches shared conventions should be applied to all three templates.
- Keep the README of the template (and the root `README.md`) in sync with any
  change to commands, tooling or CI.
