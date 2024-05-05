import UserTabPanelItem from './UserTabPanelItem'

type Props = {
  selectedTab: string
}

const UserTabPanel = ({ selectedTab }: Props) => {
  return (
    <div className="mt-4 sm:mt-0">
      <UserTabPanelItem tabId="favorites" selectedTab={selectedTab}>
        お気に入り映画
      </UserTabPanelItem>
      <UserTabPanelItem tabId="watchlists" selectedTab={selectedTab}>
        ウォッチリスト映画
      </UserTabPanelItem>
      <UserTabPanelItem tabId="watched" selectedTab={selectedTab}>
        今までに観た映画
      </UserTabPanelItem>
    </div>
  )
}
export default UserTabPanel
