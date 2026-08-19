import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Server code runs in Node.js, not a browser. The 'node' environment
    // reflects the real runtime and avoids unnecessary DOM globals.
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
    // Mirror the path alias in tsconfig.json so @/* resolves in tests too.
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
