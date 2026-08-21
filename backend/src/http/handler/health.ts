import type { Context } from 'hono'
import type { HealthResponse } from '@/domain/health'

export function healthHandler(c: Context): Response {
  const body: HealthResponse = {
    status: 'ok',
    timestamp: new Date().toISOString(),
  }
  return c.json(body, 200)
}
