import { useState } from 'react'

import { Lists } from '@/types/Lists'

import UserTabList from './UserTabList'
import UserTabPanel from './UserTabPanel'

type Props = Lists

const UserTab = ({
  movieListData,
  favorites,
  watchlists,
  watchedlists,
}: Props) => {
  const [selectedTab, setSelectedTab] = useState('favorites')

  const handleTabClick = (tabName: string) => {
    setSelectedTab(tabName)
  }

  return (
    <div>
      {/* Tablist */}
      <UserTabList selectedTab={selectedTab} handleTabClick={handleTabClick} />

      {/* TabPanel */}
      <UserTabPanel
        selectedTab={selectedTab}
        movieListData={movieListData}
        favorites={favorites}
        watchlists={watchlists}
        watchedlists={watchedlists}
      />
    </div>
  )
}
export default UserTab
