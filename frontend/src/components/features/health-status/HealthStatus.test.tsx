import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { HealthStatus } from './HealthStatus'

describe('HealthStatus', () => {
  it('renders the healthy indicator when status is "ok"', () => {
    render(<HealthStatus status="ok" />)

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
