import { renderMovieList } from '@/lib/userTab/renderMovieList'
import { Lists } from '@/types/Lists'

import UserTabPanelItem from './UserTabPanelItem'

type Props = {
  selectedTab: string
} & Lists

const UserTabPanel = ({
  selectedTab,
  movieListData,
  favorites,
  watchlists,
}: Props) => {
  const getRegisteredMovieData = (id: string) => movieListData[id]

  return (
    <div className="mt-4 sm:mt-0">
      <UserTabPanelItem tabId="favorites" selectedTab={selectedTab}>
        {renderMovieList(Object.keys(favorites), getRegisteredMovieData)}
      </UserTabPanelItem>
      <UserTabPanelItem tabId="watchlists" selectedTab={selectedTab}>
        {renderMovieList(Object.keys(watchlists), getRegisteredMovieData)}
      </UserTabPanelItem>
      <UserTabPanelItem tabId="watched" selectedTab={selectedTab}>
        {renderMovieList(Object.keys(movieListData), (id) => movieListData[id])}
      </UserTabPanelItem>
    </div>
  )
}

export default UserTabPanel
