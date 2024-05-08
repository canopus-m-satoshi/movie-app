import UserTabListItem from './UserTabListItem'

type Props = {
  selectedTab: string
  handleTabClick: (tabId: string) => void
}

const UserTabList = ({ selectedTab, handleTabClick }: Props) => {
  return (
    <div
      role="tablist"
      aria-label="Registered Movie Tabs"
      className="sm:flex flex-wrap">
      <UserTabListItem
        tabId="favorites"
        selectedTab={selectedTab}
        onClick={handleTabClick}>
        お気に入り登録した映画
      </UserTabListItem>
      <UserTabListItem
        tabId="watchlists"
        selectedTab={selectedTab}
        onClick={handleTabClick}>
        ウォッチリスト登録した映画
      </UserTabListItem>
      <UserTabListItem
        tabId="watched"
        selectedTab={selectedTab}
        onClick={handleTabClick}>
        今までに観た映画
      </UserTabListItem>
    </div>
  )
}
export default UserTabList
