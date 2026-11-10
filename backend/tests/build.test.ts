import { execFileSync, spawn, type ChildProcess } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { createServer } from 'node:net'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import type { HealthResponse } from '../src/domain/health'

type PackageJson = { scripts: { start: string } }

const root = path.resolve(__dirname, '..')
const pkg = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8')) as PackageJson

let outDir = ''
let server: ChildProcess | undefined
let stderr = ''

// Maps the "node dist/..." start script to the file in the temporary build output.
function startTarget(): string {
  const match = /^node (dist\/\S+)$/.exec(pkg.scripts.start)
  expect(match, `unexpected start script: ${pkg.scripts.start}`).not.toBeNull()
  const target = match?.[1] ?? ''
  return path.join(outDir, target.slice('dist/'.length))
}

function freePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const probe = createServer()
    probe.once('error', reject)
    probe.listen(0, '127.0.0.1', () => {
      const address = probe.address()
      probe.close(() => {
        if (address !== null && typeof address === 'object') resolve(address.port)
        else reject(new Error('could not allocate a port'))
      })
    })
  })
}

async function waitForHealth(
  child: ChildProcess,
  url: string,
  timeoutMs: number,
): Promise<Response> {
  const deadline = Date.now() + timeoutMs
  let lastError: unknown
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`server exited with code ${child.exitCode}: ${stderr}`)
    }
    try {
      return await fetch(url)
    } catch (error) {
      lastError = error
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
  }
  throw new Error(`server did not answer ${url}: ${String(lastError)}`)
}

describe('build (tsup.config.ts)', () => {
  beforeAll(() => {
    outDir = mkdtempSync(path.join(tmpdir(), 'backend-build-'))
    execFileSync('pnpm', ['exec', 'tsup', '--out-dir', outDir, '--silent'], {
      cwd: root,
      stdio: 'pipe',
    })
  }, 120_000)

  afterAll(() => {
    server?.kill('SIGTERM')
    if (outDir) rmSync(outDir, { recursive: true, force: true })
  })

  it('emits the file that the start script runs', () => {
    const target = startTarget()
    expect(existsSync(target), `${pkg.scripts.start}: ${target} is missing from the build`).toBe(
      true,
    )
  })

  it('serves GET /health from the built start target', async () => {
    const port = await freePort()
    server = spawn(process.execPath, [startTarget()], {
      cwd: root,
      // The build lives outside the package, so point require() at its dependencies.
      env: { ...process.env, PORT: String(port), NODE_PATH: path.join(root, 'node_modules') },
      stdio: 'pipe',
    })
    server.stderr?.on('data', (chunk: Buffer) => {
      stderr += chunk.toString()
    })

    const response = await waitForHealth(server, `http://127.0.0.1:${port}/health`, 10_000)

    expect(response.status).toBe(200)
    const body = (await response.json()) as HealthResponse
    expect(body.status).toBe('ok')
  }, 15_000)
})
