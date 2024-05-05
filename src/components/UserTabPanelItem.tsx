type Props = {
  tabId: string
  selectedTab: string
  children: React.ReactNode
}

const UserTabPanelItem = ({ tabId, selectedTab, children }: Props) => {
  return (
    <div
      id={`${tabId}-panel`}
      role="tabpanel"
      tabIndex={0}
      aria-labelledby={tabId}
      hidden={selectedTab !== tabId}
      className="bg-red-300 p-4">
      {children}
    </div>
  )
}
export default UserTabPanelItem
