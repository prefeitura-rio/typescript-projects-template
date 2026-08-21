import { describe, it, expect, beforeAll } from 'vitest'
import type { Hono } from 'hono'
import { createServer } from '../src/app/server'
import type { HealthResponse } from '../src/domain/health'

describe('GET /health', () => {
  let app: Hono

  beforeAll(() => {
    app = createServer()
  })

  it('returns 200 with status ok', async () => {
    const response = await app.request('/health')

    expect(response.status).toBe(200)

    const body = (await response.json()) as HealthResponse
    expect(body.status).toBe('ok')
  })

  it('returns a valid ISO 8601 timestamp', async () => {
    const response = await app.request('/health')

    const body = (await response.json()) as HealthResponse
    expect(body.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
  })
})
