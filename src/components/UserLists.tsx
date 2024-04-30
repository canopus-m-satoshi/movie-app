import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { updateComment } from '@/lib/features/movies/moviesSlice'
import { AppDispatch, RootState } from '@/lib/store'
import { toastConfig } from '@/lib/toastConfig'

import { MovieItem } from '../types/Movie'
import { User } from '../types/User'
import UserListsItem from './UserListsItem'

type Props = {
  movies: Record<string, MovieItem>
}

const UserLists = ({ movies }: Props) => {
  const dispatch: AppDispatch = useDispatch()
  const user: User | null = useSelector((state: RootState) => state.auth.user)

  const [edittingMovieId, setEdittingMovieId] = useState<string | null>(null)
  const [inputedComment, setInputedComment] = useState<string>('')

  const toggleEditMode = (movieId: string, comment: string | undefined) => {
    setEdittingMovieId((prevId) => (prevId === movieId ? null : movieId))
    setInputedComment(comment || '')
  }

  const confirmEdit = async (movieId: string, uid: string) => {
    const res = await dispatch(
      updateComment({ movieId, uid, comment: inputedComment }),
    )

    if (updateComment.fulfilled.match(res)) {
      toast.success('コメントを編集しました', toastConfig)
    } else {
      toast.error('コメントの編集に失敗しました', toastConfig)
    }

    setEdittingMovieId(null)
  }

  const cancelEdit = () => {
    if (window.confirm('編集をキャンセルしますか？')) {
      setEdittingMovieId(null)
      setInputedComment('')
      toast.error('編集をキャンセルしました', toastConfig)
    } else {
      return
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputedComment(e.target.value)
  }

  if (!user) return

  return (
    <>
      <h2 className="text-2xl md:text-3xl font-bold my-4">最近登録した映画</h2>
      {movies ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-4">
          {Object.entries(movies).map(
            ([movieId, movieDetail]: [string, MovieItem]) => (
              <UserListsItem
                key={movieId}
                movieId={movieId}
                comment={movieDetail.comment || ''}
                watchedAt={movieDetail.watchedAt || null}
                user={user}
                edittingMovieId={edittingMovieId}
                inputedComment={inputedComment}
                toggleEditMode={toggleEditMode}
                confirmEdit={confirmEdit}
                cancelEdit={cancelEdit}
                handleOnChange={handleOnChange}
              />
            ),
          )}
        </div>
      ) : (
        <div>表示できるリストはありませんでした</div>
      )}
    </>
  )
}
export default UserLists
