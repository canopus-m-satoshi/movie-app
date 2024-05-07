import { useState } from 'react'

import { Lists } from '@/types/Lists'

import UserTabList from './UserTabList'
import UserTabPanel from './UserTabPanel'

type Props = Lists

const UserTab = ({ movieListData, favorites, watchlists }: Props) => {
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
