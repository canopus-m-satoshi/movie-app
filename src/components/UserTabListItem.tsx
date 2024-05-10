type Props = {
  tabName: string
  selectedTab: string
  children: React.ReactNode
  onClick: (tabName: string) => void
}

const UserTabListItem = ({
  tabName,
  selectedTab,
  children,
  onClick,
}: Props) => {
  const colorVariants: Record<string, string> = {
    favorites: 'bg-red-100 ',
    watchlists: 'bg-yellow-100 ',
    watched: 'bg-blue-100 ',
  }
  const tabColorClass = colorVariants[tabName] || ''

  return (
    <button
      role="tab"
      id={tabName}
      tabIndex={selectedTab === tabName ? 0 : -1}
      aria-selected={selectedTab === tabName}
      aria-controls={`${tabName}-panel`}
      onClick={() => onClick(tabName)}
      className={`${
        selectedTab === tabName ? tabColorClass : 'bg-gray-200'
      } p-2 flex-grow block w-full sm:w-fit`}>
      {children}
    </button>
  )
}
export default UserTabListItem
