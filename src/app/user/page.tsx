'use client'

import { useDispatch, useSelector } from 'react-redux'
import { User } from '../types/User'
import { AppDispatch, RootState } from '@/lib/store'
import { ListType, Lists, MovieItem } from '../types/Lists'
import { useEffect, useState } from 'react'
import {
  fetchUserLists,
  removeMovie,
  updateComment,
} from '@/lib/features/lists/listsSlice'
import Loading from '../loading'
import MovieTitle from '../components/MovieTitle'
import { FaCheck, FaPen } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import { toastConfig } from '@/lib/toastConfig'
import { toast } from 'react-toastify'

export default function Home() {
  const dispatch: AppDispatch = useDispatch()
  const user: User | null = useSelector((state: RootState) => state.auth.user)
  const lists: Lists | undefined = useSelector((state: RootState) =>
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

  const removeItem = (listType: ListType, movieId: string, uid: string) => {
    if (window.confirm('リストから削除しますか?')) {
      dispatch(removeMovie({ listType, movieId, uid }))
      dispatch(fetchUserLists(uid))
      toast.success('削除しました', toastConfig)
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

      {lists?.favorites && (
        <div className="w-full mt-6">
          <h2 className="font-bold text-2xl">お気に入りリスト</h2>
          <ul className="p-2">
            {lists.favorites.map((el) => (
              <li
                key={el.movieId}
                className="relative border-2 border-green-600 rounded mt-2 p-4">
                <button
                  onClick={() => removeItem('favorites', el.movieId, user.uid)}
                  className="absolute top-2 right-4">
                  <FaXmark />
                </button>
                <MovieTitle movieId={el.movieId} />
                <p>追加日: {el.addedAt}</p>
                {edittingMovieId === el.movieId ? (
                  <div className="md:flex justify-between items-end gap-2">
                    <textarea
                      className="textarea textarea-bordered w-full"
                      value={inputedComment}
                      onChange={handleOnChange}
                      wrap="hard"></textarea>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          confirmEdit('favorites', el.movieId, user.uid)
                        }>
                        <FaCheck color={'#04b600'} />
                      </button>
                      <button onClick={cancelEdit}>
                        <FaXmark color={'#ff002d'} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between gap-2">
                    <p className="whitespace-pre-line">
                      コメント:
                      {edittingMovieId === el.movieId
                        ? inputedComment
                        : el.comment || ''}
                    </p>
                    <button
                      onClick={() => toggleEditMode(el.movieId, el.comment)}>
                      <FaPen />
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
