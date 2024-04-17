import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { createSessionCookie } from '@/lib/firebase/firebase-admin'

const EXPIRES_IN = 60 * 60 * 24 * 5 * 1000 // Cookieの有効期限を【５日間】に設定

export async function POST(request: NextRequest) {
  const { idToken } = (await request.json()) as { idToken: string }
  const expiresIn = EXPIRES_IN

  if (!idToken) return new Response('Missing idToken', { status: 400 })

  const sessionCookie = await createSessionCookie(idToken, { expiresIn })

  if (sessionCookie) {
    try {
      cookies().set('__session', sessionCookie, {
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
      })
    } catch (error) {
      console.error('Error setting session cookie:', error)
      return new Response('Failed to set session cookie.', { status: 500 })
    }
  } else {
    return new Response('Failed to create session cookie.', { status: 500 })
  }

  return new Response('Signed in successfully.', { status: 201 })
}
