import type { FastifyRequest, FastifyReply } from 'fastify'
import type { HealthResponse } from '@/domain/health'

// healthHandler is a Fastify route handler. It receives an HTTP request and
// sends a response. The leading underscore in _request signals intentionally
// unused parameters — a convention TypeScript and linters recognise.
export async function healthHandler(
  _request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const body: HealthResponse = {
    status: 'ok',
    timestamp: new Date().toISOString(),
  }
  await reply.code(200).send(body)
}
