import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'],
  // Always emit dist/index.cjs, the file the start script runs, whatever
  // "type" package.json declares.
  outExtension: () => ({ js: '.cjs' }),
  clean: true,
  sourcemap: true,
  tsconfig: './tsconfig.build.json',
})
