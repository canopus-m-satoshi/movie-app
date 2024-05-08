import axios from 'axios'
import {
  Auth,
  GoogleAuthProvider,
  signInAnonymously,
  signInWithPopup,
} from 'firebase/auth'

import { auth } from './firebase'

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider()

  try {
    const userCreds = await signInWithPopup(auth, provider)
    const idToken = await userCreds.user.getIdToken()

    await axios.post('/api/auth/session', { idToken })

    return true
  } catch (error) {
    console.error('Error signing in with Google', error)
    return false
  }
}

export async function signInAsAnonymous(auth: Auth) {
  await signInAnonymously(auth)
}
