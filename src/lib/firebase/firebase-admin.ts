import 'server-only'

import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getAuth, SessionCookieOptions } from 'firebase-admin/auth'
import { readFileSync } from 'fs'
import { cookies } from 'next/headers'

const serviceAccountKey = JSON.parse(
  readFileSync(process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEY!, 'utf8'),
)

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
  const _session = session ?? (await getSession())
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
  const session = await getSession()

  if (!session) return null
  if (!(await isUserAuthenticated(session))) return null

  const decodedIdToken = await auth.verifySessionCookie(session)
  const currentUser = await auth.getUser(decodedIdToken.uid)

  return currentUser
}

async function getSession() {
  try {
    return cookies().get('__session')?.value
  } catch (error) {
    return undefined
  }
}

export async function createSessionCookie(
  idToken: string,
  sessionCookieOptions: SessionCookieOptions,
) {
  return auth.createSessionCookie(idToken, sessionCookieOptions)
}

export async function revokeAllSessions(session: string) {
  const decodedIdToken = await auth.verifySessionCookie(session)

  return await auth.revokeRefreshTokens(decodedIdToken.sub)
}
