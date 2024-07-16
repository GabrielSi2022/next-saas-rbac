import Header from '../../components/Header'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <Header />
      <div className="flex min-h-screen flex-col items-center px-4 pt-5">
        <div className="w-full max-w-xs">{children}</div>
      </div>
    </div>
  )
}
