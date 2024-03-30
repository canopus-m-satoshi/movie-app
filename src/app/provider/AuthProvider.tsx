'use client'

import { checkAuthStatus } from '@/lib/features/auth/authSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

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
