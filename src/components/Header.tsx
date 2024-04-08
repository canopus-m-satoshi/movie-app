'use client'

import Link from 'next/link'
import { CgProfile } from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { signOutUser } from '@/lib/features/auth/authSlice'
import { AppDispatch } from '@/lib/store'
import { toastConfig } from '@/lib/toastConfig'

const Header = () => {
  const dispatch: AppDispatch = useDispatch()
  const user = useSelector((state: any) => state.auth.user)

  const handleSignOut = () => {
    dispatch(signOutUser())

    toast.success('ログアウトしました', toastConfig)
  }

  return (
    <header className="bg-gray-200 py-5 px-4">
      <div className="flex justify-between align-center">
        <h1 className="font-bold text-4xl">
          <Link href={'/movie'}>MOVIE APP</Link>
        </h1>

        <div className="dropdown dropdown-bottom dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="flex items-center gap-1 group">
            <p className="inline-block border-b border-black group-hover:border-transparent">
              {user ? user.displayName : 'ゲスト'}
            </p>
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
