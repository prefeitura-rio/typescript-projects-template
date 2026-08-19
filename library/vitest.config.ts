import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Library code targets Node.js. Tests run in a Node.js environment
    // with no DOM globals — keeping the test surface honest.
    environment: 'node',

    // globals: true lets Vitest inject describe/it/expect without explicit
    // imports — matching Jest's API so test files stay readable.
    globals: true,

    setupFiles: ['./tests/setup.ts'],

    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
