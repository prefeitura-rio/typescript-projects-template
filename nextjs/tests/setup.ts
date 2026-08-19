// tests/setup.ts — Global test setup for Vitest.
//
// This file runs before every test file (configured in vitest.config.ts).
// It imports @testing-library/jest-dom, which extends Vitest's expect with
// DOM-specific matchers such as:
//   - toBeInTheDocument()
//   - toHaveTextContent()
//   - toBeVisible()
//   - toHaveAttribute()
// Without this import, those matchers would throw "not a function" errors.
import '@testing-library/jest-dom'
