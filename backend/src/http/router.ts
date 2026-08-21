import type { Hono } from 'hono'
import { healthHandler } from './handler/health'

export function registerRoutes(app: Hono): void {
  app.get('/health', healthHandler)
}
