import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Electro Dashboard',
  description: 'لوحة تحكم مميزة',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  )
}
