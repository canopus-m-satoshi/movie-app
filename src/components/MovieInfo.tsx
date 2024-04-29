'use client'

import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { toggleModal } from '@/lib/features/modal/modalSlice'
import {
  fetchRegisteredMovies,
  toggleFavorites,
  toggleWatchlists,
} from '@/lib/features/movies/moviesSlice'
import { checkMovieInUserLists } from '@/lib/movies/checkMovieInUserLists'
import { AppDispatch, RootState } from '@/lib/store'
import { Movie, MovieItem, MovieListStatusData } from '@/types/Movie'
import { User } from '@/types/User'

import Modal from './Modal'
import Tooltips from './Tooltips'

type Genres = Pick<Movie, 'genres'>

type Props = {
  movie: Movie
  movieListStatusData: MovieListStatusData
}

const MovieInfo = ({ movie, movieListStatusData }: Props) => {
  const dispatch: AppDispatch = useDispatch()
  const user: User | null = useSelector((state: RootState) => state.auth.user)
  const { toggle, stack } = useSelector((state: RootState) => state.modal)
  const movies: Record<string, MovieItem> = useSelector(
    (state: RootState) => state.movies.movieListData,
  )

  let uid = ''
  if (user) {
    uid = user.uid
  }

  const watcedAt = movies[movie.id]?.watchedAt || null

  const [userLists, setUserLists] = useState(movieListStatusData)

  const movieId = movie.id.toString()

  const refetch = useCallback(async () => {
    if (!uid) return

    const res = await checkMovieInUserLists(movieId, uid)

    setUserLists(res)
  }, [movieId, uid])

  const onToggleFavorites = async () => {
    if (!uid) return
    await dispatch(toggleFavorites({ movieId, uid: uid }))

    await refetch()

    return !userLists.favorites
  }

  const onToggleWatchlists = async () => {
    if (!uid) return

    await dispatch(toggleWatchlists({ movieId, uid: uid }))

    await refetch()

    return !userLists.watchlists
  }

  const onToggleModal = () => {
    dispatch(toggleModal())
  }

  useEffect(() => {
    refetch()
  }, [refetch, dispatch, movies])

  useEffect(() => {
    if (!uid) return

    dispatch(fetchRegisteredMovies(uid))
  }, [dispatch, uid])

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
        onToggleModal={onToggleModal}
        movieListStatus={userLists}
      />
      <Modal
        movieId={movieId}
        toggle={toggle}
        stack={stack}
        uid={uid}
        watcedAt={watcedAt}
      />
    </>
  )
}
export default MovieInfo
