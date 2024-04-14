import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import { APIResponse } from '@/types/ApiResponse'

import { auth } from './firebase'

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider()

  try {
    const userCreds = await signInWithPopup(auth, provider)
    const idToken = await userCreds.user.getIdToken()

    const response = await fetch('/api/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    })
    const resBody = (await response.json()) as unknown as APIResponse<string>
    if (response.ok && resBody.success) {
      return true
    } else return false
  } catch (error) {
    console.error('Error signing in with Google', error)
    return false
  }
}
