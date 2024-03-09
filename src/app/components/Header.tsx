import Link from 'next/link'
import { CgProfile } from 'react-icons/cg'

const Header = () => {
  return (
    <header className="bg-gray-200 py-5 px-4">
      <div className="flex justify-between align-center">
        <h1 className="font-bold text-4xl">
          <Link href={'/movie'}>MOVIE APP</Link>
        </h1>
        <CgProfile />
      </div>
    </header>
  )
}
export default Header
