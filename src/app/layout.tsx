import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RegenHub Bot',
  description: 'Telegram bot for RegenHub membership application notifications',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
