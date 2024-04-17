import axios from 'axios'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import { auth } from './firebase'

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider()

  try {
    const userCreds = await signInWithPopup(auth, provider)
    const idToken = await userCreds.user.getIdToken()

    const response = await axios.post(
      '/api/auth/session',
      { idToken },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    return true
  } catch (error) {
    console.error('Error signing in with Google', error)
    return false
  }
}
