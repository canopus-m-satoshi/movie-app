import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { posterURL } from '@/constants/posterURL'
import {
  fetchRegisteredLists,
  fetchRegisteredMovies,
} from '@/lib/features/movies/moviesSlice'
import { AppDispatch, RootState } from '@/lib/store'

import { Movie } from '../types/Movie'
import Tooltips from './Tooltips'

type Props = {
  movies: Movie[]
  query: string | null
  page: number | null
}

const MovieList = ({ movies, query, page }: Props) => {
  const dispatch: AppDispatch = useDispatch()

  const movieListData = useSelector(
    (state: RootState) => state.movies.movieListData,
  )

  const uid = useSelector((state: RootState) => state.auth.user?.uid)
  const favorites = useSelector((state: RootState) => state.movies.favorites)
  const watchlists = useSelector((state: RootState) => state.movies.watchlists)

  useEffect(() => {
    if (uid) {
      dispatch(fetchRegisteredMovies(uid))
      dispatch(fetchRegisteredLists({ uid: uid, listType: 'favorites' }))
      dispatch(fetchRegisteredLists({ uid: uid, listType: 'watchlists' }))
    }
  }, [uid, dispatch])

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-4">
      {movies.map((movie) => {
        return (
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
            {/* <div className="my-3">
              <Tooltips movieId={movie.id.toString()} movieListStatus={} />
            </div> */}
            <h3 className="font-bold text-lg lg:text-2xl mt-3">
              {movie.title}
            </h3>
            <p>
              公開日:
              {movie.release_date ? movie.release_date : ' 不明'}
            </p>
            {movieListData &&
              movieListData[movie.id] &&
              movieListData[movie.id].watchedAt && (
                <p>鑑賞日: {movieListData[movie.id].watchedAt}</p>
              )}
          </Link>
        )
      })}
    </div>
  )
}
export default MovieList
