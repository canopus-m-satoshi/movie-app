'use client'

import { List } from 'postcss/lib/list'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import {
  removeRegisteredMovie,
  updateComment,
} from '@/lib/features/movies/moviesSlice'
import { AppDispatch, RootState } from '@/lib/store'
import { toastConfig } from '@/lib/toastConfig'
import { Lists } from '@/types/Lists'
import { MovieItem } from '@/types/Movie'
import { User } from '@/types/User'

import UserRegisteredMovie from './UserRegisteredMovie'

type Props = {
  tabName: string
  selectedTab: string
  movieList: Omit<Lists, 'movieListData'>
  movieListData: Lists['movieListData']
}

const UserTabPanelItem = ({
  tabName,
  selectedTab,
  movieList,
  movieListData,
}: Props) => {
  const dispatch: AppDispatch = useDispatch()
  const user: User | null = useSelector((state: RootState) => state.auth.user)

  const [edittingMovieId, setEdittingMovieId] = useState<string | null>(null)
  const [inputedComment, setInputedComment] = useState<string>('')

  if (!user) return

  const colorVariants: Record<string, string> = {
    favorites: 'bg-red-100 ',
    watchlists: 'bg-yellow-100 ',
    watchedlists: 'bg-blue-100 ',
  }
  const tabColorClass = colorVariants[tabName] || ''

  const confirmRemoveMovie = async (movieId: string) => {
    if (window.confirm('リストから削除しますか？')) {
      await dispatch(
        removeRegisteredMovie({
          movieId,
          uid: user?.uid,
          listType: tabName,
        }),
      )
      toast.success('削除しました。', toastConfig)
    } else {
      toast.info('キャンセルしました。', toastConfig)
    }
  }

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

  return (
    <div
      id={`${tabName}-panel`}
      role="tabpanel"
      tabIndex={0}
      aria-labelledby={tabName}
      hidden={selectedTab !== tabName}
      className={`p-4 ${tabColorClass}`}>
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {Object.keys(movieList).map((movieId) => {
          const movieData = movieListData[movieId]

          return (
            <li key={movieId}>
              {
                <UserRegisteredMovie
                  movieId={movieId}
                  movieData={movieData}
                  listType={tabName}
                  user={user}
                  edittingMovieId={edittingMovieId}
                  inputedComment={inputedComment}
                  onConfirmRemove={confirmRemoveMovie}
                  onToggleEditMode={toggleEditMode}
                  onConfirmEdit={confirmEdit}
                  onCancelEdit={cancelEdit}
                  onCommentChange={handleOnChange}
                />
              }
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default UserTabPanelItem
