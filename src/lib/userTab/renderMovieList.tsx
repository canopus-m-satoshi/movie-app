import MovieTitle from '@/components/MovieTitle'

interface RenderMovieList {
  (movieIds: string[], getRegisteredMovieData: (id: string) => any): JSX.Element
}

export const renderMovieList: RenderMovieList = (
  movieIds,
  getRegisteredMovieData,
) => {
  if (!movieIds.length) {
    return <p className="text-center">登録された映画はありません</p>
  }

  return (
    <ul className="flex flex-col gap-4">
      {movieIds.map((movieId) => {
        const movie = getRegisteredMovieData(movieId)

        return (
          <li key={movieId} className="bg-white border rounded-lg p-2">
            <MovieTitle movieId={movieId} />
            <p>鑑賞日：{movie?.watchedAt?.toString() || '-'}</p>
            <p>メモ：{movie?.comment || ''}</p>
          </li>
        )
      })}
    </ul>
  )
}
