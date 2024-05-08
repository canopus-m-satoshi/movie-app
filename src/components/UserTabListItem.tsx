type Props = {
  tabId: string
  selectedTab: string
  children: React.ReactNode
  onClick: (tabId: string) => void
}

const UserTabListItem = ({ tabId, selectedTab, children, onClick }: Props) => {
  const colorVariants: Record<string, string> = {
    favorites: 'bg-red-100 ',
    watchlists: 'bg-yellow-100 ',
    watched: 'bg-blue-100 ',
  }
  const tabColorClass = colorVariants[tabId] || ''

  return (
    <button
      role="tab"
      id={tabId}
      tabIndex={selectedTab === tabId ? 0 : -1}
      aria-selected={selectedTab === tabId}
      aria-controls={`${tabId}-panel`}
      onClick={() => onClick(tabId)}
      className={`${
        selectedTab === tabId ? tabColorClass : 'bg-gray-200'
      } p-2 flex-grow block w-full sm:w-fit`}>
      {children}
    </button>
  )
}
export default UserTabListItem
