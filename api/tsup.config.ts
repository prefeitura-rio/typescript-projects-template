import { defineConfig } from 'tsup'

export default defineConfig({
  // Entry point: the server bootstrap file.
  entry: ['src/index.ts'],

  // CJS output is the conventional choice for a Node.js server application.
  // Unlike a library, the server is not consumed by other packages, so we
  // do not need a dual CJS + ESM build.
  format: ['cjs'],

  // Remove dist/ before each build to avoid stale artefacts.
  clean: true,

  // Emit source maps so stack traces in production point to TypeScript lines.
  sourcemap: true,

  // Use tsconfig.build.json, which excludes tests and enables emit.
  tsconfig: './tsconfig.build.json',
})
