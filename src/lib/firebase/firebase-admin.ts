import 'server-only'

import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getAuth, SessionCookieOptions } from 'firebase-admin/auth'
import { cookies } from 'next/headers'

const serviceAccountKey = {
  // cert()の中に直接JSON形式で代入
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  privateKey:
    process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') ?? '',
  clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
}

export const firebaseApp =
  getApps().find((it) => it.name === 'firebase-admin-app') ||
  initializeApp(
    {
      credential: cert(serviceAccountKey),
    },
    'firebase-admin-app',
  )
export const auth = getAuth(firebaseApp)

export async function isUserAuthenticated(
  session: string | undefined = undefined,
) {
  const _session = session ?? getSession()
  if (!_session) return false

  try {
    // Admin SDK の verifySessionCookie API でセッション Cookie の確認
    const isValid = await auth.verifySessionCookie(_session, true)
    return isValid
  } catch (error) {
    console.error('Error verifying session cookie:', error)
    return false
  }
}

export async function getCurrentUser() {
  const session = getSession()

  if (!session) return null
  if (!(await isUserAuthenticated(session))) return null

  const decodedIdToken = await auth.verifySessionCookie(session)
  const currentUser = await auth.getUser(decodedIdToken.uid)

  return currentUser
}

function getSession() {
  return cookies().get('__session')?.value ?? undefined
}

export async function createSessionCookie(
  idToken: string,
  sessionCookieOptions: SessionCookieOptions,
) {
  return auth.createSessionCookie(idToken, sessionCookieOptions)
}
