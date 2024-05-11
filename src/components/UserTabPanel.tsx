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
  watchedlists,
}: Props) => {
  return (
    <div className="mt-4 sm:mt-0">
      <UserTabPanelItem
        tabName="favorites"
        selectedTab={selectedTab}
        movieList={favorites}
        movieListData={movieListData}
      />
      <UserTabPanelItem
        tabName="watchlists"
        selectedTab={selectedTab}
        movieList={watchlists}
        movieListData={movieListData}
      />
      <UserTabPanelItem
        tabName="watchedlists"
        selectedTab={selectedTab}
        movieList={watchedlists}
        movieListData={movieListData}
      />
    </div>
  )
}

export default UserTabPanel
