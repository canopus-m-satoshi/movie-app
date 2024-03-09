import Image from 'next/image'
import { Movie } from '@/app/types/Movie'
import { getMovieDetails } from '@/api/movie/gethMovieDetails/route'
import { posterURL } from '@/constants/posterURL'
import Link from 'next/link'
import { IoCaretBackOutline } from 'react-icons/io5'
import { FaBookmark, FaHeart, FaList } from 'react-icons/fa'
import TooltipButton from '@/app/components/TooltipButton'

type Genres = Pick<Movie, 'genres'>

export default async function MovieDetails({
  params,
}: {
  params: { id: number }
}) {
  const res = await getMovieDetails(params.id)
  const movie = res.data

  return (
    <>
      <div className="container mx-auto mt-6">
        <div className="grid grid-cols-3 grid-rows-3 gap-4">
          <div className="col-span-1 row-span-3">
            <Image
              src={
                movie.poster_path
                  ? `${posterURL}${movie.poster_path}`
                  : '/dummy-image.png'
              }
              alt={movie.poster_path ? movie.title : 'ダミー画像'}
              width={300}
              height={440}
            />
          </div>
          <div className="col-span-2 row-span-1">
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <p className="mt-3">公開日：{movie.release_date}</p>
            <ul className="flex flex-wrap gap-2 mt-3">
              {movie.genres.map((genre: Genres['genres'][number]) => (
                <li
                  key={genre.id}
                  className="border border-slate-400	 rounded-md p-1">
                  {genre.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 row-span-1">
            <p>{movie.overview}</p>
          </div>
          <div className="col-start-3 col-span-1 row-start-3 flex gap-4">
            <TooltipButton icon={<FaHeart />} tip="お気に入りに追加する" />
            <TooltipButton
              icon={<FaBookmark />}
              tip="ウォッチリストに追加する"
            />
            <TooltipButton icon={<FaList />} tip="リストに追加する" />
          </div>
        </div>

        {/* TODO：戻った際に検索結果を保持させる機能の実装 */}
        <div className="w-fit mx-auto mt-6">
          <Link href={'/movie'} className="btn btn-accent rounded-full">
            <IoCaretBackOutline />
            <span className="pr-2">戻る</span>
          </Link>
        </div>
      </div>
    </>
  )
}
