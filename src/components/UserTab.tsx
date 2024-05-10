import { useState } from 'react'

import { Lists } from '@/types/Lists'

import UserTabList from './UserTabList'
import UserTabPanel from './UserTabPanel'

type Props = Lists

const UserTab = ({ movieListData, favorites, watchlists }: Props) => {
  const [selectedTab, setSelectedTab] = useState('favorites')

  const handleTabClick = (tabName: string) => {
    setSelectedTab(tabName)
  }

  return (
    <div>
      {/* Tablist */}
      <UserTabList selectedTab={selectedTab} handleTabClick={handleTabClick} />

      <UserTabPanel
        selectedTab={selectedTab}
        movieListData={movieListData}
        favorites={favorites}
        watchlists={watchlists}
      />
    </div>
  )
}
export default UserTab
