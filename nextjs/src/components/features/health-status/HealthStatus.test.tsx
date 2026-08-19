// HealthStatus.test.tsx — Unit tests for the HealthStatus feature component.
//
// Tests are co-located with the component file they cover. This keeps the
// test as close as possible to the code, making it easy to find and update
// both files together.
//
// Tools used:
//   - Vitest         — test runner (describe/it/expect)
//   - @testing-library/react — renders the component into a virtual DOM
//   - @testing-library/jest-dom — DOM-specific matchers (toBeInTheDocument)
//   - jsdom          — simulates the browser environment inside Node.js

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { HealthStatus } from './HealthStatus'

describe('HealthStatus', () => {
  it('renders the healthy indicator when status is "ok"', () => {
    render(<HealthStatus status="ok" />)

    // getByRole queries the accessible role — this verifies the component
    // is semantically correct for screen readers, not just visually correct.
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByText('● Healthy')).toBeInTheDocument()
  })

  it('renders the degraded indicator when status is "degraded"', () => {
    render(<HealthStatus status="degraded" />)

    expect(screen.getByText('● Degraded')).toBeInTheDocument()
  })

  it('provides a descriptive aria-label for each status', () => {
    const { rerender } = render(<HealthStatus status="ok" />)

    expect(screen.getByLabelText('Application status: ok')).toBeInTheDocument()

    rerender(<HealthStatus status="degraded" />)

    expect(screen.getByLabelText('Application status: degraded')).toBeInTheDocument()
  })
})
