import Link from 'next/link'

import { getCurrentUser } from '@/lib/firebase/firebase-admin'

export default async function Home() {
  const isLoggedIn = await getCurrentUser()

  return (
    <main className="mt-5">
      <div className="container mx-auto py-8">
        <h2 className="text-center font-bold text-xl md:text-4xl">
          映画検索やお気に入りの映画を登録
        </h2>

        <div className="flex justify-center items-center gap-4 mt-20">
          <Link href={'/movie/'} className="btn btn-active btn-primary">
            映画タイトルで検索する
          </Link>
          {!isLoggedIn && (
            <Link
              href={'/auth/signIn'}
              className="btn btn-active btn-secondary">
              ログインする
            </Link>
          )}
        </div>
      </div>
    </main>
  )
}
