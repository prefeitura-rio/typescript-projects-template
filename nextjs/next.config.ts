import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enables additional React checks in development (double-invokes render,
  // effects, etc.) to surface potential bugs early. Has no effect in production.
  reactStrictMode: true,

  // 'standalone' creates a minimal self-contained bundle under .next/standalone/
  // that can be copied into a Docker image without node_modules.
  // Uncomment when adding a Dockerfile to this project.
  // output: 'standalone',
}

export default nextConfig
