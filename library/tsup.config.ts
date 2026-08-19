import { defineConfig } from 'tsup'

export default defineConfig({
  // Entry point: the public API of the library.
  // Only what is exported from src/index.ts is part of the published package.
  entry: ['src/index.ts'],

  // Dual-format output: ESM (.js) and CJS (.cjs).
  // This allows consumers to use the library regardless of whether their
  // project is ESM or CommonJS.
  format: ['esm', 'cjs'],

  // Generate TypeScript declaration files (.d.ts, .d.cts) so consumers get
  // type safety and IDE completion without access to the source code.
  dts: true,

  // Remove dist/ before each build to avoid stale artefacts.
  clean: true,

  // Emit source maps so stack traces point to TypeScript lines.
  sourcemap: true,
})
