type Props = {
  tabId: string
  selectedTab: string
  children: React.ReactNode
}

const UserTabPanelItem = ({ tabId, selectedTab, children }: Props) => {
  const colorVariants: Record<string, string> = {
    favorites: 'bg-red-100 ',
    watchlists: 'bg-yellow-100 ',
    watched: 'bg-blue-100 ',
  }
  const tabColorClass = colorVariants[tabId] || ''

  return (
    <div
      id={`${tabId}-panel`}
      role="tabpanel"
      tabIndex={0}
      aria-labelledby={tabId}
      hidden={selectedTab !== tabId}
      className={`p-4 ${tabColorClass}`}>
      {children}
    </div>
  )
}
export default UserTabPanelItem
