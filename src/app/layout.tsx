import './globals.css'

import type { Metadata } from 'next'
import { ToastContainer } from 'react-toastify'

import Footer from '../components/Footer'
import Header from '../components/Header'
import StoreProvider from '../provider/StoreProvider'

export const metadata: Metadata = {
  title: 'Movie App',
  description: 'Search your Movie',
}

import 'react-toastify/dist/ReactToastify.min.css'
import 'react-datepicker/dist/react-datepicker.css'

// RTKで管理している認証情報を取得するためのコンポーネント
import WithAuth from '../components/WithAuth'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="jp">
      <body>
        <StoreProvider>
          <WithAuth>
            <div className="flex flex-col min-h-screen">
              <Header />
              <div className="flex-grow bg-slate-100">{children}</div>
              <Footer />
              <ToastContainer />
            </div>
          </WithAuth>
        </StoreProvider>
      </body>
    </html>
  )
}
