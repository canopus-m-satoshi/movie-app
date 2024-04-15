import axios from 'axios'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import { APIResponse } from '@/types/ApiResponse'

import { auth } from './firebase'

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider()

  try {
    const userCreds = await signInWithPopup(auth, provider)
    const idToken = await userCreds.user.getIdToken()

    const response = await axios.post<APIResponse<string>>(
      '/api/auth/sign-in',
      { idToken },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (response.data.success) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error('Error signing in with Google', error)
    return false
  }
}
