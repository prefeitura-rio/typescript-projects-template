// Config holds all values that vary between environments (development,
// staging, production). They are read from environment variables so that
// the application binary stays environment-agnostic — a 12-factor principle.

export interface Config {
  port: number
  logLevel: string
}

export function loadConfig(): Config {
  return {
    // Default to 8080; override with the PORT environment variable.
    port: Number(process.env['PORT'] ?? 8080),
    logLevel: process.env['LOG_LEVEL'] ?? 'info',
  }
}
