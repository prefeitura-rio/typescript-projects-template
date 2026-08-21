import { createServer } from './app/server'
import { loadConfig } from './config'
import { serve } from '@hono/node-server'

function main(): void {
  const config = loadConfig()
  const app = createServer()
  const server = serve({
    fetch: app.fetch,
    hostname: '0.0.0.0',
    port: config.port,
  })

  process.on('SIGTERM', () => server.close())
  process.on('SIGINT', () => server.close())
}

main()
