import MovieThumbnail from '@/components/MovieThumbnail'
import MovieTitle from '@/components/MovieTitle'

interface UserRegisteredMovie {
  (movieIds: string[], getRegisteredMovieData: (id: string) => any): JSX.Element
}

const UserRegisteredMovie: UserRegisteredMovie = (
  movieIds,
  getRegisteredMovieData,
) => {
  return (
    <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {movieIds.map((movieId) => {
        const movie = getRegisteredMovieData(movieId)

        return (
          <li
            key={movieId}
            className="bg-white border rounded-lg p-4 sm:grid sm:grid-cols-[auto_1fr] gap-4">
            <div className="w-fit mx-auto mb-4 sm:mb-0 ">
              <MovieThumbnail movieId={movieId} />
            </div>
            <div>
              <MovieTitle movieId={movieId} />
              <p>鑑賞日：{movie?.watchedAt?.toString() || '-'}</p>
              <p>メモ：{movie?.comment || ''}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
export default UserRegisteredMovie
