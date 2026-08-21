import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TypeScript Project Template',
  description: 'A Next.js project template with clean architecture',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
