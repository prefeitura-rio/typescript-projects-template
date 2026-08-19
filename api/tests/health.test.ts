import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import type { FastifyInstance } from 'fastify'
import { createServer } from '../src/app/server'
import type { HealthResponse } from '../src/domain/health'

// These tests use Fastify's built-in `inject()` method to send HTTP requests
// without binding to a real TCP port. No network is needed; tests are fast,
// isolated, and suitable for CI environments with no ports available.
describe('GET /health', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    app = await createServer()
  })

  afterAll(async () => {
    await app.close()
  })

  it('returns 200 with status ok', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/health',
    })

    expect(response.statusCode).toBe(200)

    const body = response.json<HealthResponse>()
    expect(body.status).toBe('ok')
  })

  it('returns a valid ISO 8601 timestamp', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/health',
    })

    const body = response.json<HealthResponse>()
    // ISO 8601: YYYY-MM-DDTHH:mm:ss.sssZ
    expect(body.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
  })
})
