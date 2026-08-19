// layout.tsx — Root layout for the Next.js App Router.
//
// This file wraps every page in the application. It is rendered once on the
// server and shared across navigations. Place global providers (theme,
// auth context, etc.) here rather than inside individual pages.

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
