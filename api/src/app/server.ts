import Fastify, { type FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import { registerRoutes } from '@/http/router'

// createServer is a factory function that returns a fully configured Fastify
// instance WITHOUT calling app.listen(). This separation is intentional:
//
//   - In production (src/index.ts): call createServer(), then app.listen().
//   - In tests: call createServer(), then app.inject() — no real TCP port.
//
// This pattern is sometimes called "application factory" and is the idiomatic
// Fastify way to write testable server code.
export async function createServer(): Promise<FastifyInstance> {
  const app = Fastify({
    logger: {
      level: process.env['LOG_LEVEL'] ?? 'info',
    },
  })

  // @fastify/helmet sets security-relevant HTTP response headers (CSP,
  // X-Frame-Options, etc.) with safe defaults.
  await app.register(helmet)

  // @fastify/cors handles CORS preflight and response headers.
  // Configure the `origin` option to restrict allowed origins in production.
  await app.register(cors)

  // Register all application routes.
  await app.register(registerRoutes)

  return app
}
