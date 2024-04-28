'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CgProfile } from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { signOutUser } from '@/lib/features/auth/authSlice'
import { AppDispatch } from '@/lib/store'
import { toastConfig } from '@/lib/toastConfig'

const UserMenu = () => {
  const dispatch: AppDispatch = useDispatch()
  const user = useSelector((state: any) => state.auth.user)

  const handleSignOut = () => {
    dispatch(signOutUser())

    toast.success('ログアウトしました', toastConfig)
  }

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <div tabIndex={0} role="button" className="flex items-center gap-1 group">
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
              <button onClick={handleSignOut}>ログアウトする</button>
            </li>
          </>
        ) : (
          <li>
            <Link href={'/auth/signin'}>ログインする</Link>
          </li>
        )}
      </ul>
    </div>
  )
}
export default UserMenu
