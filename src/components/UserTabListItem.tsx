type Props = {
  tabId: string
  selectedTab: string
  children: React.ReactNode
  onClick: (tabId: string) => void
}

const UserTabListItem = ({ tabId, selectedTab, children, onClick }: Props) => {
  return (
    <button
      role="tab"
      id={tabId}
      tabIndex={selectedTab === tabId ? 0 : -1}
      aria-selected={selectedTab === tabId}
      aria-controls={`${tabId}-panel`}
      onClick={() => onClick(tabId)}
      className={`${
        selectedTab === tabId ? 'bg-red-300' : 'bg-gray-200'
      } p-2 flex-grow block w-full sm:w-fit`}>
      {children}
    </button>
  )
}
export default UserTabListItem
