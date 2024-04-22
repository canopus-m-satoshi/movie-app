import Image from 'next/image'
import Link from 'next/link'
import { IoCaretBackOutline } from 'react-icons/io5'

import Tooltips from '@/components/Tooltips'
import { posterURL } from '@/constants/posterURL'
import { checkMovieInUserLists } from '@/lib/movies/checkMovieInUserLists'
import { getMovieDetails } from '@/lib/movies/getMovieDetails'
import { Movie } from '@/types/Movie'

type Genres = Pick<Movie, 'genres'>

type MovieListStatusData = {
  favorite: boolean
  watchlist: boolean
}

export default async function MovieDetails({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { query: string; page: number }
}) {
  const movieListStatusData = (await checkMovieInUserLists(
    params.id,
  )) as MovieListStatusData
  const movieListStatus = movieListStatusData ?? {
    favorite: false,
    watchlist: false,
  }

  const res = await getMovieDetails(params.id)
  const movie = res.data
  const { query, page } = searchParams

  return (
    <>
      <div className="container mx-auto my-6 px-3">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-[auto,1fr,1fr] md:grid-rows-3 lg:grid-rows-[auto,auto,1fr] gap-4 lg:gap-6">
          <div className="md:col-span-1 md:row-span-2 lg:row-span-3 xl: w-fit mx-auto">
            <Image
              src={
                movie.poster_path
                  ? `${posterURL}${movie.poster_path}`
                  : '/dummy-image.png'
              }
              alt={movie.poster_path ? movie.title : 'ダミー画像'}
              width={300}
              height={450}
              sizes="(max-width: 768px) 237px, (max-width: 1024px) 300px, 450px"
            />
          </div>
          <div className="md:col-span-2 md:row-span-1">
            <h1 className="text-lg md:text-3xl font-bold">{movie.title}</h1>
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

          <Tooltips movieId={params.id} movieListStatus={movieListStatus} />

          <div className="md:col-span-3 xl:col-span-2">
            <p>{movie.overview}</p>
          </div>
        </div>

        <div className="w-fit mx-auto mt-6">
          <Link
            href={`/movie?query=${query}&page=${page}`}
            className="btn btn-accent rounded-full">
            <IoCaretBackOutline />
            <span className="pr-2">戻る</span>
          </Link>
        </div>
      </div>
    </>
  )
}
