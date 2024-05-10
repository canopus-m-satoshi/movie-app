import { FaCheck, FaPen, FaTrashAlt } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'

import { MovieItem } from '@/types/Movie'
import { User } from '@/types/User'

import MovieThumbnail from './MovieThumbnail'
import MovieTitle from './MovieTitle'

type Props = {
  movieId: string
  movieInfo: Record<string, MovieItem>
  user: User
  edittingMovieId: string | null
  inputedComment: string
  toggleEditMode: (movieId: string, comment: string | undefined) => void
  confirmEdit: (movieId: string, uid: string) => void
  cancelEdit: () => void
  handleOnChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const UserRegisteredMovie = ({
  movieId,
  movieInfo,
  user,
  edittingMovieId,
  inputedComment,
  toggleEditMode,
  confirmEdit,
  cancelEdit,
  handleOnChange,
}: Props) => {
  const { comment, watchedAt } = movieInfo || {
    comment: '',
    watchedAt: null,
  }

  const convertComment = String(comment)

  return (
    <div className="relative bg-white border rounded-lg p-4 pr-2 sm:grid sm:grid-cols-[auto_1fr] gap-4">
      <div className="absolute top-2 right-2">
        <button>
          <FaTrashAlt color={'#bb2323'} />
        </button>
      </div>
      <div className="w-fit mx-auto mb-4 sm:mb-0">
        <MovieThumbnail movieId={movieId} />
      </div>
      <div>
        <MovieTitle movieId={movieId} />
        <p>鑑賞日：{watchedAt?.toString()}</p>

        {edittingMovieId === movieId ? (
          <div className="md:flex justify-between items-end gap-2">
            <textarea
              className="textarea textarea-bordered w-full min-h-36"
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
          <div className="flex justify-between items-baseline gap-2">
            <p className="whitespace-pre-line">
              コメント:
              {edittingMovieId === movieId
                ? inputedComment
                : convertComment || ''}
            </p>
            <button onClick={() => toggleEditMode(movieId, convertComment)}>
              <FaPen />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
export default UserRegisteredMovie
