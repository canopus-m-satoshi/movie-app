import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="text-center flex flex-col gap-4">
        <h2 className="text-3xl sm:text-5xl font-bold mb-4">404 - Not Found</h2>
        <p className="text-lg sm:text-xl text-gray-500">
          お探しのページは見つかりませんでした。
        </p>
        <p className="text-gray-500 mb-6">
          申しわけございませんが、お探しのページは見つかりませんでした。
          <br />
          ページが移動または削除されたか、URLの入力間違いの可能性があります。
        </p>
        <Link href="/">
          <button className="btn btn-primary">Home Pageへ</button>
        </Link>
      </div>
    </div>
  )
}
