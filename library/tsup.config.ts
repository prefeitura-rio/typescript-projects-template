import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  // tsconfig.json keeps `incremental` for `tsc --noEmit`; the declaration
  // build emits files, where TypeScript rejects it (TS5074).
  dts: { compilerOptions: { incremental: false } },
  clean: true,
  sourcemap: true,
})
