import { Suspense } from 'react'

import Loading from './Loading'
import Logo from './Logo'
import NavMenu from './NavMenu'

const Header = () => {
  return (
    <header className="bg-gray-200 py-5 px-4">
      <div className="flex justify-between items-center">
        <Suspense fallback={<Loading />}>
          <Logo />
        </Suspense>
        <NavMenu />
      </div>
    </header>
  )
}
export default Header
