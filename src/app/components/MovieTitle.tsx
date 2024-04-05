import { getMovieDetails } from '@/api/movie/gethMovieDetails/route'

type Props = {
  movieId: string
}

export default async function MovieDetails({ movieId }: Props) {
  const res = await getMovieDetails(movieId)
  const movieTitle = res.data.original_title

  return <p>{movieTitle}</p>
}
