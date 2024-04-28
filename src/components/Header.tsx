import { Suspense } from 'react'

import Loading from './Loading'
import Logo from './Logo'
import UserMenu from './UserMenu'

const Header = () => {
  return (
    <header className="bg-gray-200 py-5 px-4">
      <div className="flex justify-between items-center">
        <Suspense fallback={<Loading />}>
          <Logo />
        </Suspense>
        <UserMenu />
      </div>
    </header>
  )
}
export default Header
