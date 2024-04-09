import { FaCheck, FaPen } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import { useSelector } from 'react-redux'

import { RootState } from '@/lib/store'

import { ListType, MovieItem } from '../types/Lists'
import { User } from '../types/User'
import MovieTitle from './MovieTitle'

type Props = {
  edittingMovieId: string | null
  inputedComment: string
  handleOnChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  confirmEdit: (movieId: string, uid: string) => void
  cancelEdit: () => void
  toggleEditMode: (movieId: string, comment: string | undefined) => void
}

const UserLists = ({
  edittingMovieId,
  inputedComment,
  handleOnChange,
  confirmEdit,
  cancelEdit,
  toggleEditMode,
}: Props) => {
  const user: User | null = useSelector((state: RootState) => state.auth.user)

  const movies: Record<string, MovieItem> = useSelector((state: RootState) =>
    user ? state.movies.movieListData[user.uid] : {},
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-4">
      {Object.entries(movies).map(
        ([movieId, movieDetail]: [string, MovieItem]) => (
          <div
            key={movieId}
            className="relative border-2 border-green-600 rounded mt-2 p-4">
            <MovieTitle movieId={movieId} />
            <p>
              鑑賞日:
              {/* {movieDetail.watchedAt} */}
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
                  onClick={() => toggleEditMode(movieId, movieDetail.comment)}>
                  <FaPen />
                </button>
              </div>
            )}
          </div>
        ),
      )}
    </div>
  )
}
export default UserLists
