'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  fetchRegisteredLists,
  fetchRegisteredMovies,
} from '@/lib/features/movies/moviesSlice'
import { AppDispatch, RootState } from '@/lib/store'
import { MovieItem } from '@/types/Movie'

import Profile from '../../components/Profile'
import UserLists from '../../components/UserLists'
import { User } from '../../types/User'
import Loading from '../loading'

export default function Home() {
  const dispatch: AppDispatch = useDispatch()
  const user: User | null = useSelector((state: RootState) => state.auth.user)
  const movies: Record<string, MovieItem> = useSelector(
    (state: RootState) => state.movies.movieListData,
  )
  const favorites = useSelector((state: RootState) => state.movies.favorites)
  const watchlists = useSelector((state: RootState) => state.movies.watchlists)

  useEffect(() => {
    if (user) {
      dispatch(fetchRegisteredMovies(user.uid))
      dispatch(fetchRegisteredLists({ uid: user.uid }))
    }
  }, [user, dispatch])

  if (!user) {
    return <Loading />
  }

  return (
    <div className="w-full mx-auto mt-6 px-2">
      <Profile
        user={user}
        movies={movies}
        favorites={favorites}
        watchlists={watchlists}
      />
      <UserLists movies={movies} />
    </div>
  )
}
