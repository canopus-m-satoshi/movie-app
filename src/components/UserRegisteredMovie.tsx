import { FaTrashAlt } from 'react-icons/fa'

import { MovieItem } from '@/types/Movie'
import { User } from '@/types/User'

import MovieMemo from './MovieMemo'
import MovieThumbnail from './MovieThumbnail'
import MovieTitle from './MovieTitle'

type Props = {
  movieId: string
  movieInfo: Record<string, MovieItem>
  user: User
  edittingMovieId: string | null
  inputedComment: string
  onToggleEditMode: (movieId: string, comment: string | undefined) => void
  onConfirmEdit: (movieId: string, uid: string) => void
  onCancelEdit: () => void
  onCommentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const UserRegisteredMovie = ({
  movieId,
  movieInfo,
  user,
  edittingMovieId,
  inputedComment,
  onToggleEditMode,
  onConfirmEdit,
  onCancelEdit,
  onCommentChange,
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
        <MovieMemo
          movieId={movieId}
          user={user}
          edittingMovieId={edittingMovieId}
          convertComment={convertComment}
          inputedComment={inputedComment}
          onToggleEditMode={onToggleEditMode}
          onConfirmEdit={onConfirmEdit}
          onCancelEdit={onCancelEdit}
          onCommentChange={onCommentChange}
        />
      </div>
    </div>
  )
}

export default UserRegisteredMovie
