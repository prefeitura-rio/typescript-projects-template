import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

type ExportTarget = { types: string; default: string }

type PackageJson = {
  main: string
  module: string
  types: string
  exports: { '.': { import: ExportTarget; require: ExportTarget } }
}

const root = path.resolve(__dirname, '..')
const pkg = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8')) as PackageJson
const entry = pkg.exports['.']

let outDir = ''

// Maps a "./dist/..." path from package.json to the temporary build output.
function built(target: string): string {
  expect(target.startsWith('./dist/')).toBe(true)
  return path.join(outDir, target.slice('./dist/'.length))
}

describe('build (tsup.config.ts)', () => {
  beforeAll(() => {
    outDir = mkdtempSync(path.join(tmpdir(), 'library-build-'))
    execFileSync('pnpm', ['exec', 'tsup', '--out-dir', outDir, '--silent'], {
      cwd: root,
      stdio: 'pipe',
    })
  }, 120_000)

  afterAll(() => {
    if (outDir) rmSync(outDir, { recursive: true, force: true })
  })

  it('emits every file that package.json points to', () => {
    const targets = [
      pkg.main,
      pkg.module,
      pkg.types,
      entry.import.types,
      entry.import.default,
      entry.require.types,
      entry.require.default,
    ]
    for (const target of targets) {
      expect(existsSync(built(target)), `${target} is missing from the build`).toBe(true)
    }
  })

  it('emits ESM for "import" and CommonJS for "require"', () => {
    const esm = readFileSync(built(entry.import.default), 'utf8')
    const cjs = readFileSync(built(entry.require.default), 'utf8')
    expect(esm).toMatch(/^export\s*\{/m)
    expect(esm).not.toContain('module.exports')
    expect(cjs).toContain('module.exports')
    expect(cjs).not.toMatch(/^export\s/m)
  })
})
