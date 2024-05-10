import { FaCheck, FaPen } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'

import { User } from '@/types/User'

type Props = {
  movieId: string
  user: User
  edittingMovieId: string | null
  convertComment: string
  inputedComment: string
  onToggleEditMode: (movieId: string, comment: string | undefined) => void
  onConfirmEdit: (movieId: string, uid: string) => void
  onCancelEdit: () => void
  onCommentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const MovieMemo = ({
  movieId,
  user,
  convertComment,
  edittingMovieId,
  inputedComment,
  onConfirmEdit,
  onCancelEdit,
  onCommentChange,
  onToggleEditMode,
}: Props) => {
  return (
    <div>
      {edittingMovieId === movieId ? (
        <div className="md:flex justify-between items-end gap-2">
          <textarea
            className="textarea textarea-bordered w-full min-h-36"
            value={inputedComment}
            onChange={onCommentChange}
            wrap="hard"></textarea>
          <div className="flex gap-2">
            <button onClick={() => onConfirmEdit(movieId, user.uid)}>
              <FaCheck color={'#04b600'} />
            </button>
            <button onClick={onCancelEdit}>
              <FaXmark color={'#ff002d'} />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-baseline gap-2">
          <p className="whitespace-pre-line">
            コメント：
            {edittingMovieId === movieId ? inputedComment : convertComment}
          </p>
          <button onClick={() => onToggleEditMode(movieId, convertComment)}>
            <FaPen />
          </button>
        </div>
      )}
    </div>
  )
}
export default MovieMemo
