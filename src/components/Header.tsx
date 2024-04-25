'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CgProfile } from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { signOutUser } from '@/lib/features/auth/authSlice'
import { AppDispatch } from '@/lib/store'
import { toastConfig } from '@/lib/toastConfig'

const Header = () => {
  const dispatch: AppDispatch = useDispatch()
  const user = useSelector((state: any) => state.auth.user)

  const searchParams = useSearchParams()
  const query: string | null = searchParams.get('query')
  const page: number | null = parseInt(searchParams.get('page') || '1')

  const handleSignOut = () => {
    dispatch(signOutUser())

    toast.success('ログアウトしました', toastConfig)
  }

  let headerLink = 'movie/'
  if (query) {
    headerLink = `/movie?query=${query}&page=${page}`
  }

  return (
    <header className="bg-gray-200 py-5 px-4">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-3xl min-[450px]:text-4xl">
          <Link href={headerLink}>MOVIE APP</Link>
        </h1>

        <div className="dropdown dropdown-bottom dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="flex items-center gap-1 group">
            <p className="max-[450px]:hidden inline-block border-b border-black group-hover:border-transparent">
              {user ? user.displayName : 'ゲスト'}
            </p>
            {user?.avatarUrl ? (
              <div className="w-fit rounded-full">
                <Image
                  src={user.avatarUrl}
                  alt="User Avatar"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              </div>
            ) : (
              <div className="w-7">
                <CgProfile size={'100%'} />
              </div>
            )}
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
                <Link href={'/auth/sign-in'}>ログインする</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  )
}
export default Header
