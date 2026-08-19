import { createServer } from './app/server'
import { loadConfig } from './config'

// Wrap startup in an async function so we can use await throughout.
// This is compatible with both CJS (the build output format) and ESM.
async function main(): Promise<void> {
  const config = loadConfig()
  const app = await createServer()

  try {
    await app.listen({ port: config.port, host: '0.0.0.0' })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

main()
