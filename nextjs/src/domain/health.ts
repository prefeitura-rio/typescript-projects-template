// health.ts — Core domain type for application health.
//
// This file belongs to the domain layer: it contains only pure TypeScript
// types and has zero dependencies on React, Next.js, or any framework.
// Domain types can be safely imported by any layer (services, handlers,
// components) without creating undesired coupling.

/** The possible operational states of the application. */
export type HealthStatus = 'ok' | 'degraded'

/** Shape of a health check response. */
export interface HealthResponse {
  status: HealthStatus
  /** ISO 8601 timestamp of when the check was performed. */
  timestamp: string
}
