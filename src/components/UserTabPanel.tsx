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
  return (
    <div className="mt-4 sm:mt-0">
      <UserTabPanelItem
        tabId="favorites"
        selectedTab={selectedTab}
        movieList={favorites}
        movieListData={movieListData}
      />
      <UserTabPanelItem
        tabId="watchlists"
        selectedTab={selectedTab}
        movieList={watchlists}
        movieListData={movieListData}
      />
      <UserTabPanelItem
        tabId="watched"
        selectedTab={selectedTab}
        movieList={movieListData}
        movieListData={movieListData}
      />
    </div>
  )
}

export default UserTabPanel
