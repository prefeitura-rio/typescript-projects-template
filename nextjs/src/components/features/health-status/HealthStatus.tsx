// HealthStatus.tsx — Feature component that displays the application health.
//
// This component lives in features/ because it is domain-specific (it knows
// about the HealthStatus type). Contrast with components/ui/, which holds
// generic, reusable primitives with no domain knowledge (e.g. Button, Badge).

import type { HealthStatus as HealthStatusType } from '@/domain/health'

interface HealthStatusProps {
  status: HealthStatusType
}

/**
 * Renders a labelled indicator showing whether the application is healthy
 * or degraded. Accessible via role="status" and a descriptive aria-label.
 */
export function HealthStatus({ status }: HealthStatusProps) {
  const isOk = status === 'ok'

  return (
    <div role="status" aria-label={`Application status: ${status}`} data-testid="health-status">
      <span
        style={{
          color: isOk ? 'green' : 'red',
          fontWeight: 'bold',
        }}
      >
        {isOk ? '● Healthy' : '● Degraded'}
      </span>
    </div>
  )
}
