import Image from 'next/image'
import { CgProfile } from 'react-icons/cg'

import { Lists } from '@/types/Lists'

import { User } from '../types/User'
import StatsItem from './StatsItem'

type Props = {
  user: User
} & Lists

const Profile = ({ user, movieListData, favorites, watchlists }: Props) => {
  const checkIsWatched = () => {
    const watchedMovies = Object.entries(movieListData).filter(
      ([_, movieDetail]) => {
        return movieDetail.watchedAt !== undefined
      },
    )

    return watchedMovies.length
  }
  const watchedAtLength = checkIsWatched()

  return (
    <div className="block w-full mx-auto my-6">
      <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between gap-4 border rounded shadow-black p-4">
        <div className="flex flex-col min-[350px]:flex-row items-center gap-4">
          <div className="avatar block">
            {user?.avatarUrl ? (
              <div className="w-24 lg:w-fit rounded-full">
                <Image
                  src={user.avatarUrl}
                  alt="User Avatar"
                  width={96}
                  height={96}
                  className="rounded-full"
                />
              </div>
            ) : (
              <div className="w-20">
                <CgProfile size={'100%'} />
              </div>
            )}
          </div>
          {user?.displayName && <p>お名前: {user?.displayName}</p>}
        </div>
        <div className="flex flex-col min-[450px]:flex-row justify-between lg:justify-end md:flex-grow gap-2 lg:gap-4 w-full md:w-auto">
          <StatsItem title="今までに観た映画" number={watchedAtLength} />
          <StatsItem
            title="お気に入り映画"
            number={Object.keys(favorites).length}
          />
          <StatsItem
            title="ウォッチリスト映画"
            number={Object.keys(watchlists).length}
          />
        </div>
      </div>
    </div>
  )
}
export default Profile
