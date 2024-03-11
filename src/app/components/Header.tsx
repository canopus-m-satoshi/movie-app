'use client'

import Link from 'next/link'
import { CgProfile } from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux'
import { signOutUser } from '@/lib/features/auth/authSlice'
import { Bounce, toast } from 'react-toastify'
import { AppDispatch } from '@/lib/store'

const Header = () => {
  const dispatch: AppDispatch = useDispatch()
  const user = useSelector((state: any) => state.auth.user)

  const handleSignOut = () => {
    dispatch(signOutUser())

    toast.success('ログアウトしました', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    })
  }

  return (
    <header className="bg-gray-200 py-5 px-4">
      <div className="flex justify-between align-center">
        <h1 className="font-bold text-4xl">
          <Link href={'/movie'}>MOVIE APP</Link>
        </h1>

        <div className="dropdown dropdown-left">
          <div tabIndex={0} role="button">
            <CgProfile size={30} />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            {user ? (
              <>
                <li>
                  <Link href={'/user'}>マイページへ</Link>
                </li>
                <li>
                  <Link href={'/watchlist'}>ウォッチリストへ</Link>
                </li>
                <li>
                  <Link href={'/settings'}>設定</Link>
                </li>
                <li>
                  <button onClick={handleSignOut}>ログアウトする</button>
                </li>
              </>
            ) : (
              <li>
                <Link href={'/auth/signIn'}>ログインする</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  )
}
export default Header
