import { useState } from 'react'

import { MovieItem } from '@/types/Movie'

import UserTabList from './UserTabList'
import UserTabPanel from './UserTabPanel'

type Props = {
  movies: Record<string, MovieItem>
  favorites: Record<string, MovieItem>
  watchlists: Record<string, MovieItem>
}

const UserTab = ({ movies, favorites, watchlists }: Props) => {
  const [selectedTab, setSelectedTab] = useState('favorites')

  const handleTabClick = (tabId: string) => {
    setSelectedTab(tabId)
  }

  return (
    <div>
      {/* Tablist */}
      <UserTabList selectedTab={selectedTab} handleTabClick={handleTabClick} />

      <UserTabPanel selectedTab={selectedTab} />
    </div>
  )
}
export default UserTab
