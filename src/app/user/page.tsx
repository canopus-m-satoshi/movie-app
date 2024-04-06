'use client'

import { useDispatch, useSelector } from 'react-redux'
import { User } from '../types/User'
import { ListType } from '../types/Lists'
import { AppDispatch, RootState } from '@/lib/store'
import { useEffect, useState } from 'react'
import { fetchUserLists, updateComment } from '@/lib/features/lists/listsSlice'
import Loading from '../loading'

import { toastConfig } from '@/lib/toastConfig'
import { toast } from 'react-toastify'
import Profile from '../components/Profile'
import UserLists from '../components/UserLists'

export default function Home() {
  const dispatch: AppDispatch = useDispatch()
  const user: User | null = useSelector((state: RootState) => state.auth.user)

  const lists = useSelector((state: RootState) =>
    user ? state.lists.usersLists[user.uid] : undefined,
  )

  const [edittingMovieId, setEdittingMovieId] = useState<string | null>(null)
  const [inputedComment, setInputedComment] = useState<string>('')

  useEffect(() => {
    if (user) {
      dispatch(fetchUserLists(user.uid))
    }
  }, [user, dispatch])

  const toggleEditMode = (movieId: string, comment: string | undefined) => {
    setEdittingMovieId((prevId) => (prevId === movieId ? null : movieId))
    setInputedComment(comment || '')
  }

  const confirmEdit = (listType: ListType, movieId: string, uid: string) => {
    setEdittingMovieId(null)

    dispatch(updateComment({ listType, movieId, uid, comment: inputedComment }))
    toast.success('コメントを編集しました', toastConfig)
  }

  const cancelEdit = () => {
    setEdittingMovieId(null)
    if (window.confirm('編集をキャンセルしますか？')) {
      setInputedComment('')
      toast.error('編集をキャンセルしました', toastConfig)
    } else {
      return
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputedComment(e.target.value)
  }

  if (!user) {
    return <Loading />
  }

  return (
    <div className="w-full mx-auto mt-6 px-2">
      <h1 className="font-bold text-4xl text-center">
        {user.displayName}さんのページ
      </h1>

      <Profile />

      {lists && (
        <UserLists
          edittingMovieId={edittingMovieId}
          inputedComment={inputedComment}
          handleOnChange={handleOnChange}
          confirmEdit={confirmEdit}
          cancelEdit={cancelEdit}
          toggleEditMode={toggleEditMode}
        />
      )}
    </div>
  )
}
