'use client'

import { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import UserTab from '@/components/UserTab'
import {
  fetchRegisteredLists,
  fetchRegisteredMovies,
} from '@/lib/features/movies/moviesSlice'
import { AppDispatch, RootState } from '@/lib/store'
import { Lists } from '@/types/Lists'

import Profile from '../../components/Profile'
import { User } from '../../types/User'
import Loading from '../loading'

export default function Home() {
  const dispatch: AppDispatch = useDispatch()
  const user: User | null = useSelector((state: RootState) => state.auth.user)
  const movieListData = useSelector(
    (state: RootState) => state.movies.movieListData,
  )
  const favorites = useSelector((state: RootState) => state.movies.favorites)
  const watchlists = useSelector((state: RootState) => state.movies.watchlists)

  const watchedlists = Object.keys(movieListData).reduce((acc, movieId) => {
    const movie = movieListData[movieId]

    if (movie.watchedAt !== null && movie.watchedAt !== undefined) {
      acc[movieId] = {
        comment: movie.comment,
        watchedAt: movie.watchedAt,
      }
    }
    return acc
  }, {} as Lists['watchedlists'])

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
      <Suspense fallback={<Loading />}>
        <Profile
          user={user}
          favorites={favorites}
          watchlists={watchlists}
          watchedlists={watchedlists}
        />
      </Suspense>

      <UserTab
        movieListData={movieListData}
        favorites={favorites}
        watchlists={watchlists}
        watchedlists={watchedlists}
      />
    </div>
  )
}
