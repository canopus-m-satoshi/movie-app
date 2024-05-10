import { FaTrashAlt } from 'react-icons/fa'

import { MovieItem } from '@/types/Movie'

import MovieThumbnail from './MovieThumbnail'
import MovieTitle from './MovieTitle'

type Props = {
  movieId: string
  movieInfo: Record<string, MovieItem>
}

const UserRegisteredMovie = ({ movieId, movieInfo }: Props) => {
  const { comment, watchedAt } = movieInfo || {
    comment: '',
    watchedAt: null,
  }

  return (
    <div className="relative bg-white border rounded-lg p-4 sm:grid sm:grid-cols-[auto_1fr] gap-4">
      <div className="absolute top-2 right-2">
        <button>
          <FaTrashAlt color={'#bb2323'} />
        </button>
      </div>
      <div className="w-fit mx-auto mb-4 sm:mb-0 ">
        <MovieThumbnail movieId={movieId} />
      </div>
      <div>
        <MovieTitle movieId={movieId} />
        <p>鑑賞日：{watchedAt?.toString()}</p>
        <p>メモ：{String(comment)}</p>
      </div>
    </div>
  )
}
export default UserRegisteredMovie
