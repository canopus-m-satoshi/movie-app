import { useEffect, useState } from 'react'
import { FaCheck, FaPen } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { RootState } from '@/lib/store'
import { toastConfig } from '@/lib/toastConfig'

import { MovieItem } from '../types/Lists'
import { User } from '../types/User'
import MovieTitle from './MovieTitle'

type Props = {
  movies: Record<string, MovieItem>
}

const UserLists = ({ movies }: Props) => {
  const user: User | null = useSelector((state: RootState) => state.auth.user)

  const [edittingMovieId, setEdittingMovieId] = useState<string | null>(null)
  const [inputedComment, setInputedComment] = useState<string>('')

  const toggleEditMode = (movieId: string, comment: string | undefined) => {
    setEdittingMovieId((prevId) => (prevId === movieId ? null : movieId))
    setInputedComment(comment || '')
  }

  const confirmEdit = (movieId: string, uid: string) => {
    setEdittingMovieId(null)

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

  if (!user) return

  return (
    <>
      {movies ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-4">
          {Object.entries(movies).map(
            ([movieId, movieDetail]: [string, MovieItem]) => (
              <div
                key={movieId}
                className="relative border-2 border-green-600 rounded mt-2 p-4">
                <MovieTitle movieId={movieId} />
                <p>
                  鑑賞日:
                  {movieDetail.watchedAt ? movieDetail.watchedAt : ' 未登録'}
                </p>
                {edittingMovieId === movieId ? (
                  <div className="md:flex justify-between items-end gap-2">
                    <textarea
                      className="textarea textarea-bordered w-full"
                      value={inputedComment}
                      onChange={handleOnChange}
                      wrap="hard"></textarea>
                    <div className="flex gap-2">
                      <button onClick={() => confirmEdit(movieId, user.uid)}>
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
                      {edittingMovieId === movieId
                        ? inputedComment
                        : movieDetail.comment || ''}
                    </p>
                    <button
                      onClick={() =>
                        toggleEditMode(movieId, movieDetail.comment)
                      }>
                      <FaPen />
                    </button>
                  </div>
                )}
              </div>
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
