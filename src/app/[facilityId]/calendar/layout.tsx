import { Providers } from '@/app/[facilityId]/calendar/provider'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calendar',
  description: 'Calendar',
}

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <Providers>
      {children}
      {modal}
    </Providers>
  )
}
