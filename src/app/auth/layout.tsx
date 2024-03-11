export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="mt-5">
      <div className="container mx-auto py-8 px-3 md:px-0">{children}</div>
    </main>
  )
}
