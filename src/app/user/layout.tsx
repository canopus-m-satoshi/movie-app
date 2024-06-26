export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="container mx-auto mb-6">{children}</div>
}
