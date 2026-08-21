import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { secureHeaders } from 'hono/secure-headers'
import { registerRoutes } from '@/http/router'

export function createServer(): Hono {
  const app = new Hono()

  app.use('*', secureHeaders())
  app.use('*', cors())
  registerRoutes(app)

  return app
}
