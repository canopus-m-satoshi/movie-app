'use client'

import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  toggleFavorites,
  toggleWatchlists,
} from '@/lib/features/movies/moviesSlice'
import { checkMovieInUserLists } from '@/lib/movies/checkMovieInUserLists'
import { AppDispatch, RootState } from '@/lib/store'
import { Movie, MovieListStatusData } from '@/types/Movie'
import { User } from '@/types/User'

import Tooltips from './Tooltips'

type Genres = Pick<Movie, 'genres'>

type Props = {
  movie: Movie
  movieListStatusData: MovieListStatusData
}

const MovieInfo = ({ movie, movieListStatusData }: Props) => {
  const dispatch: AppDispatch = useDispatch()
  const user: User | null = useSelector((state: RootState) => state.auth.user)

  const movieId = movie.id.toString()

  const [userLists, setUserLists] = useState(movieListStatusData)

  const refetch = useCallback(async () => {
    if (!user) return

    const res = await checkMovieInUserLists(movieId, user.uid)

    setUserLists(res)
  }, [user, movieId])

  const onToggleFavorites = async () => {
    if (!user) return
    await dispatch(toggleFavorites({ movieId, uid: user.uid }))

    await refetch()

    return !userLists.favorites
  }

  const onToggleWatchlists = async () => {
    if (!user) return
    await dispatch(toggleWatchlists({ movieId, uid: user.uid }))

    await refetch()

    return !userLists.watchlists
  }

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <>
      <h1 className="text-lg md:text-3xl font-bold">{movie.title}</h1>
      <p className="mt-3">公開日：{movie.release_date}</p>
      <p className="mt-3">上映時間：{movie.runtime}分</p>
      <ul className="flex flex-wrap gap-2 mt-3">
        {movie.genres.map((genre: Genres['genres'][number]) => (
          <li key={genre.id} className="border border-slate-400	 rounded-md p-1">
            {genre.name}
          </li>
        ))}
      </ul>
      <Tooltips
        onToggleFavorites={onToggleFavorites}
        onToggleWatchlists={onToggleWatchlists}
        movieListStatus={userLists}
      />
    </>
  )
}
export default MovieInfo
