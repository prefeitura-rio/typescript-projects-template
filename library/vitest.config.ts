import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,

    setupFiles: ['./tests/setup.ts'],

    coverage: {
      provider: 'v8',
      // Vitest 4 only reports files loaded by tests unless include is set.
      include: ['src/**/*.ts'],
      reporter: ['text', 'lcov'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
