import { CgProfile } from 'react-icons/cg'

import { MovieItem } from '@/types/Lists'

import { User } from '../types/User'
import StatsItem from './StatsItem'

type Props = {
  user: User
  movies: Record<string, MovieItem>
  favorites: Record<string, string>
  watchlists: Record<string, string>
}

const Profile = ({ user, movies, favorites, watchlists }: Props) => {
  const checkIsWatched = () => {
    const watchedMovies = Object.entries(movies).filter(([_, movieDetail]) => {
      return movieDetail.watchedAt !== undefined
    })

    return watchedMovies.length
  }
  const watchedAtLength = checkIsWatched()

  return (
    <div className="block w-full mx-auto my-6">
      <div className="flex flex-wrap md:flex-nowrap  justify-between gap-4 border rounded shadow-black p-4">
        <div className="flex items-center gap-4">
          <div className="avatar block">
            {user?.avatarUrl ? (
              <div className="w-24 lg:w-fit rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            ) : (
              <div className="w-20">
                <CgProfile size={'100%'} />
              </div>
            )}
          </div>
          <p>お名前: {user?.displayName}</p>
        </div>
        <div className="flex flex-col min-[450px]:flex-row justify-between lg:justify-end md:flex-grow gap-2 lg:gap-4 w-full md:w-auto">
          <StatsItem title="今までに観た映画" number={watchedAtLength} />
          <StatsItem
            title="お気に入りリスト"
            number={Object.keys(favorites).length}
          />
          <StatsItem
            title="ウォッチリスト"
            number={Object.keys(watchlists).length}
          />
        </div>
      </div>
    </div>
  )
}
export default Profile
