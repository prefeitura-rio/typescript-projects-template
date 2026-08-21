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
