'use client'

import { useDispatch } from 'react-redux'
import { checkAuthStatus } from '@/lib/features/auth/authSlice'
import { useEffect } from 'react'

import Link from 'next/link'
import { AppDispatch } from '@/lib/store'

export default function Home() {
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuthStatus())
  }, [dispatch])

  return (
    <main className="mt-5">
      <div className="container mx-auto py-8">
        <h2 className="text-center font-bold text-xl md:text-4xl">
          映画を検索するアプリです
        </h2>

        <div className="flex justify-center items-center mt-20">
          <Link href={'/movie/'} className="btn btn-active btn-primary">
            映画タイトルで検索する
          </Link>
        </div>
      </div>
    </main>
  )
}
