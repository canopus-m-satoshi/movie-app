import { CgProfile } from 'react-icons/cg'
import { useSelector } from 'react-redux'

import { RootState } from '@/lib/store'

import { User } from '../types/User'
import StatsItem from './StatsItem'

const Profile = () => {
  const user: User | null = useSelector((state: RootState) => state.auth.user)

  return (
    <div className="block w-full mx-auto my-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 grid-rows-5 sm:grid-rows-2 lg:grid-rows-1 gap-4 border rounded shadow-black p-4 place-items-center">
        <div className="avatar block">
          {user?.avatarUrl ? (
            <div className="w-24 lg:w-fit rounded-full">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          ) : (
            <div>
              <CgProfile size={80} />
            </div>
          )}
        </div>
        <div className="sm:col-span-2  lg:col-span-auto">
          <p>お名前: {user?.displayName}</p>
          <p>メールアドレス: {user?.email}</p>
        </div>
        <StatsItem title="今までに観た映画" number={400} />
        <StatsItem title="お気に入りリスト" number={15} />
        <StatsItem title="ウォッチリスト" number={4} />
      </div>
    </div>
  )
}
export default Profile
