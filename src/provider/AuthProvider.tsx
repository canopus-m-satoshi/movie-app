'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { checkAuthStatus } from '@/lib/features/auth/authSlice'

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuthStatus())
  }, [dispatch])

  return <div>{children}</div>
}
