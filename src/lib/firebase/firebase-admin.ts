import 'server-only'

import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getAuth, SessionCookieOptions } from 'firebase-admin/auth'
import { cookies } from 'next/headers'

export const firebaseApp =
  getApps().find((it) => it.name === 'firebase-admin-app') ||
  initializeApp(
    {
      credential: cert(process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEY),
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
    const isRevoked = !(await auth.verifySessionCookie(_session, true))
    return !isRevoked
  } catch (error) {
    console.log(error)
    return false
  }
}

export async function getCurrentUser() {
  const session = await getSession()

  if (!(await isUserAuthenticated(session))) {
    return null
  }

  const decodedIdToken = await auth.verifySessionCookie(session!)
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
