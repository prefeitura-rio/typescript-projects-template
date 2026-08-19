// Domain types for the health-check endpoint.
// Domain types are pure TypeScript — no framework imports, no side effects.

export type HealthStatus = 'ok' | 'degraded'

export interface HealthResponse {
  status: HealthStatus
  // ISO 8601 timestamp of when the check was performed.
  timestamp: string
}
