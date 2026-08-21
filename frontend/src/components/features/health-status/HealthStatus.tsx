import type { HealthStatus as HealthStatusType } from '@/domain/health'

interface HealthStatusProps {
  status: HealthStatusType
}

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
