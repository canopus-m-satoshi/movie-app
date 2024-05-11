import { FaTrashAlt } from 'react-icons/fa'

import { MovieItem } from '@/types/Movie'
import { User } from '@/types/User'

import MovieMemo from './MovieMemo'
import MovieThumbnail from './MovieThumbnail'
import MovieTitle from './MovieTitle'
import MovieWatchedAt from './MovieWatchedAt'

type Props = {
  movieId: string
  movieData: Record<string, MovieItem>
  listType: string
  user: User
  edittingMovieId: string | null
  inputedComment: string
  onToggleEditMode: (movieId: string, comment: string | undefined) => void
  onConfirmRemove: (movieId: string, uid: string, listType: string) => void
  onConfirmEdit: (movieId: string, uid: string) => void
  onCancelEdit: () => void
  onCommentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const UserRegisteredMovie = ({
  movieId,
  movieData,
  listType,
  user,
  edittingMovieId,
  inputedComment,
  onToggleEditMode,
  onConfirmRemove,
  onConfirmEdit,
  onCancelEdit,
  onCommentChange,
}: Props) => {
  const { comment, watchedAt } = movieData || {
    comment: '',
    watchedAt: null,
  }

  const convertComment = comment ? String(comment) : ''
  const convertWatchedAt = watchedAt ? watchedAt.toString() : '-'

  return (
    <div className="relative bg-white border rounded-lg p-4 pr-2 sm:grid sm:grid-cols-[auto_1fr] gap-4">
      <div className="absolute top-2 right-2">
        <button onClick={() => onConfirmRemove(movieId, user.uid, listType)}>
          <FaTrashAlt color={'#bb2323'} />
        </button>
      </div>
      <div className="w-fit mx-auto mb-4 sm:mb-0">
        <MovieThumbnail movieId={movieId} />
      </div>
      <div>
        <MovieTitle movieId={movieId} />
        <MovieWatchedAt watchedAt={convertWatchedAt} />
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
