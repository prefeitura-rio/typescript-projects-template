import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  // The React plugin transforms JSX and enables React Fast Refresh.
  // Without it, Vitest cannot process .tsx files.
  plugins: [react()],

  test: {
    // jsdom simulates a browser environment (window, document, etc.)
    // inside Node.js, which is required for React component tests.
    environment: 'jsdom',

    // Makes describe, it, expect etc. available globally without importing
    // them in every test file — matches Jest's behaviour.
    globals: true,

    // Runs before every test file. Used to configure @testing-library/jest-dom
    // matchers (toBeInTheDocument, toHaveTextContent, etc.).
    setupFiles: ['./tests/setup.ts'],

    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
    },
  },

  resolve: {
    alias: {
      // Mirrors the tsconfig.json path alias so imports like '@/components/...'
      // resolve correctly during tests.
      '@': path.resolve(__dirname, './src'),
    },
  },
})
