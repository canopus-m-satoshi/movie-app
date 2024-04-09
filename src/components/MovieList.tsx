import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'

import { posterURL } from '@/constants/posterURL'
import { RootState } from '@/lib/store'

import { MovieItem } from '../types/Lists'
import { Movie } from '../types/Movie'
import { User } from '../types/User'
import Tooltips from './Tooltips'

type Props = {
  movies: Movie[]
  query: string | null
  page: number | null
}

const MovieList = ({ movies, query, page }: Props) => {
  const user: User | null = useSelector((state: RootState) => state.auth.user)

  const lists: Record<string, MovieItem> = useSelector((state: RootState) =>
    user ? state.lists.movieListData[user.uid] : {},
  )

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-4">
      {movies.map((movie) => (
        <Link
          key={movie.id}
          href={`/movie/${movie.id}?query=${query}&page=${page}`}>
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
          <div className="my-3">
            <Tooltips movieId={movie.id.toString()} />
          </div>
          <h3 className="font-bold text-lg lg:text-2xl mt-3">{movie.title}</h3>
          <p>
            公開日:
            {movie.release_date ? movie.release_date : ' 不明'}
          </p>
          {lists && lists[movie.id] && lists[movie.id].watchedDate && (
            <p>鑑賞日: {lists[movie.id].watchedDate}</p>
          )}
        </Link>
      ))}
    </div>
  )
}
export default MovieList
