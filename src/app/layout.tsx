import type { Metadata } from 'next'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import StoreProvider from './provider/StoreProvider'
import AuthProvider from './provider/AuthProvider'
import { ToastContainer } from 'react-toastify'

export const metadata: Metadata = {
  title: 'Movie App',
  description: 'Search your Movie',
}

import 'react-toastify/dist/ReactToastify.min.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="jp">
      <body>
        <StoreProvider>
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <div className="flex-grow">{children}</div>
              <Footer />
              <ToastContainer />
            </div>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
