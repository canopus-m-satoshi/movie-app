'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchUserLists } from '@/lib/features/movies/moviesSlice'
import { AppDispatch, RootState } from '@/lib/store'

import Profile from '../../components/Profile'
import UserLists from '../../components/UserLists'
import { User } from '../../types/User'
import Loading from '../loading'

export default function Home() {
  const dispatch: AppDispatch = useDispatch()
  const user: User | null = useSelector((state: RootState) => state.auth.user)

  useEffect(() => {
    if (user) {
      dispatch(fetchUserLists(user.uid))
    }
  }, [user, dispatch])

  if (!user) {
    return <Loading />
  }

  return (
    <div className="w-full mx-auto mt-6 px-2">
      <h1 className="font-bold text-4xl text-center">
        {user.displayName}さんのページ
      </h1>

      <Profile />
      <UserLists />
    </div>
  )
}
