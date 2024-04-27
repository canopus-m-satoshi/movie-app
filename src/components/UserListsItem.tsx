import { FaCheck, FaPen } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'

import { MovieItem } from '@/types/Movie'
import { User } from '@/types/User'

import MovieTitle from './MovieTitle'

type Props = {
  movieId: string
  watchedAt: MovieItem['watchedAt']
  comment: MovieItem['comment']
  user: User
  edittingMovieId: string | null
  inputedComment: string
  toggleEditMode: (movieId: string, comment: string | undefined) => void
  confirmEdit: (movieId: string, uid: string) => void
  cancelEdit: () => void
  handleOnChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const UserListsItem = ({
  movieId,
  watchedAt,
  comment,
  user,
  edittingMovieId,
  inputedComment,
  toggleEditMode,
  confirmEdit,
  cancelEdit,
  handleOnChange,
}: Props) => {
  return (
    <div
      key={movieId}
      className="relative border-2 border-green-600 rounded mt-2 p-4">
      <MovieTitle movieId={movieId} />
      <p>
        鑑賞日:
        {watchedAt ? watchedAt.toString() : ' -'}
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
            {edittingMovieId === movieId ? inputedComment : comment || ''}
          </p>
          <button onClick={() => toggleEditMode(movieId, comment)}>
            <FaPen />
          </button>
        </div>
      )}
    </div>
  )
}
export default UserListsItem
