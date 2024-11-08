import { redirect } from 'next/navigation'

import Header from '../../components/Header'
import { isAuthenticated } from '@/auth/auth'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (isAuthenticated()) {
    redirect('/')
  }
  return (
    <div>
      <Header />
      <div className="flex min-h-screen flex-col items-center px-4 pt-5">
        <div className="w-full max-w-xs">{children}</div>
      </div>
    </div>
  )
}
