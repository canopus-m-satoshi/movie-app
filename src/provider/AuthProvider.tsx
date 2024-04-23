'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { checkAuthStatus } from '@/lib/features/auth/authSlice'
import { AppDispatch } from '@/lib/store'

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuthStatus())
  }, [dispatch])

  return <div>{children}</div>
}
