import Link from 'next/link'

export default function Home() {
  return (
    <main className="mt-5">
      <div className="container mx-auto py-8">
        <h2 className="text-center font-bold text-xl md:text-4xl">
          映画を検索するアプリです
        </h2>

        <div className="flex justify-center items-center mt-20">
          <Link href={'/movie/'} className="btn btn-active btn-primary">
            映画タイトルで検索する
          </Link>
        </div>
      </div>
    </main>
  )
}
