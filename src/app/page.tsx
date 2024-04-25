import Link from 'next/link'

import { getCurrentUser } from '@/lib/firebase/firebase-admin'

export default async function Home() {
  const isLoggedIn = await getCurrentUser()

  return (
    <main className="mt-5">
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h2 className="font-bold text-2xl md:text-5xl bg-gradient-to-r from-blue-600 to-red-400 bg-clip-text text-transparent">
            MOVIE APP
          </h2>

          <p className="mt-8">
            映画好きのためのアプリです。
            <br />
            映画のタイトルで検索することで、映画の詳細情報を確認できます。
            <br />
            お気に入りの映画を登録し、ウォッチリストに追加することで、映画鑑賞の計画が立てられます。
            <br />
            マイページでは、登録した映画を一覧で確認でき、感想やメモをコメントとして残すことができます。
          </p>
        </div>

        <div className="flex justify-center items-center gap-4 mt-20">
          <Link href={'/movie/'} className="btn btn-active btn-primary">
            映画タイトルで検索する
          </Link>
          {!isLoggedIn && (
            <Link
              href={'/auth/sign-in'}
              className="btn btn-active btn-secondary">
              ログインする
            </Link>
          )}
        </div>
      </div>
    </main>
  )
}
