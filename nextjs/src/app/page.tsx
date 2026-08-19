// page.tsx — Root route (/).
//
// Pages are the entry points for routes in the App Router. Keep them thin:
// they should compose feature components and pass data to them, not contain
// business logic themselves.

import { HealthStatus } from '@/components/features/health-status/HealthStatus'

export default function Home() {
  return (
    <main>
      <h1>TypeScript Project Template</h1>
      <p>Replace this page with your own content.</p>
      <HealthStatus status="ok" />
    </main>
  )
}
