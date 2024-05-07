import { Lists } from '@/types/Lists'

import MovieTitle from './MovieTitle'
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
        {Object.keys(favorites).length ? (
          <ul className="flex flex-col gap-4">
            {Object.keys(favorites).map((movieId) => {
              const movie = getRegisteredMovieData(movieId)

              return (
                <li key={movieId} className="bg-white border rounded-lg p-2">
                  <MovieTitle movieId={movieId} />
                  {movie ? (
                    <>
                      <p>
                        鑑賞日：
                        {movie.watchedAt
                          ? movie.watchedAt.toString()
                          : '未視聴'}
                      </p>
                      <p>メモ： {movie.comment ? movie.comment : ''}</p>
                    </>
                  ) : (
                    <>
                      <p>鑑賞日：未視聴</p>
                      <p>メモ：</p>
                    </>
                  )}
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="text-center">登録された映画はありません</p>
        )}
      </UserTabPanelItem>
      <UserTabPanelItem tabId="watchlists" selectedTab={selectedTab}>
        {Object.keys(watchlists).length ? (
          <ul className="flex flex-col gap-4">
            {Object.keys(watchlists).map((movieId) => {
              const movie = getRegisteredMovieData(movieId)

              return (
                <li key={movieId} className="bg-white border rounded-lg p-2">
                  <MovieTitle movieId={movieId} />
                  {movie ? (
                    <>
                      <p>
                        鑑賞日：
                        {movie.watchedAt ? movie.watchedAt.toString() : '-'}
                      </p>
                      <p>メモ： {movie.comment ? movie.comment : ''}</p>
                    </>
                  ) : (
                    <>
                      <p>鑑賞日：-</p>
                      <p>メモ：</p>
                    </>
                  )}
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="text-center">登録された映画はありません</p>
        )}
      </UserTabPanelItem>
      <UserTabPanelItem tabId="watched" selectedTab={selectedTab}>
        {Object.keys(movieListData).length ? (
          <ul className="flex flex-col gap-4">
            {Object.keys(movieListData).map((movieId) => (
              <li key={movieId} className="bg-white border rounded-lg p-2">
                <MovieTitle movieId={movieId} />
                <p>鑑賞日：{movieListData[movieId].watchedAt?.toString()}</p>
                <p>メモ：{movieListData[movieId].comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">登録された映画はありません</p>
        )}
      </UserTabPanelItem>
    </div>
  )
}
export default UserTabPanel
