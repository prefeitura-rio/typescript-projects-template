import type { FastifyInstance } from 'fastify'
import { healthHandler } from './handler/health'

// registerRoutes plugs into Fastify's plugin system via app.register().
// Declaring routes here (rather than directly in server.ts) keeps the factory
// focused on middleware setup and makes routes easy to group and version later.
export async function registerRoutes(app: FastifyInstance): Promise<void> {
  app.get('/health', healthHandler)
}
