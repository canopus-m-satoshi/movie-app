import { Lists } from '@/types/Lists'
import { MovieItem } from '@/types/Movie'

import UserRegisteredMovie from './UserRegisteredMovie'

type Props = {
  tabId: string
  selectedTab: string
  movieList: Record<string, MovieItem>
  movieListData: Lists['movieListData']
}

const UserTabPanelItem = ({
  tabId,
  selectedTab,
  movieList,
  movieListData,
}: Props) => {
  const colorVariants: Record<string, string> = {
    favorites: 'bg-red-100 ',
    watchlists: 'bg-yellow-100 ',
    watched: 'bg-blue-100 ',
  }
  const tabColorClass = colorVariants[tabId] || ''
  const getRegisteredMovieData = (id: string) => movieListData[id]

  return (
    <div
      id={`${tabId}-panel`}
      role="tabpanel"
      tabIndex={0}
      aria-labelledby={tabId}
      hidden={selectedTab !== tabId}
      className={`p-4 ${tabColorClass}`}>
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {Object.keys(movieList).map((movieId) => {
          const movieInfo = getRegisteredMovieData(movieId)

          return (
            <li key={movieId}>
              {<UserRegisteredMovie movieId={movieId} movieInfo={movieInfo} />}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default UserTabPanelItem
