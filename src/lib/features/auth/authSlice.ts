import { auth, db } from '@/lib/firebase'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

interface AuthState {
  user: null | { uid: string; email: string | null }
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined
}

interface User {
  uid: string
  email: string | null
}

const initialState: AuthState = { user: null, status: 'idle', error: undefined }

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      )
      return { uid: userCredential.user.uid, email: userCredential.user.email }
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      const usersRef = doc(db, 'users', user.uid)
      await setDoc(
        usersRef,
        {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        },
        { merge: true },
      )

      return { uid: user.uid, email: user.email }
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )
      return { uid: userCredential.user.uid, email: userCredential.user.email }
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const signOutUser = createAsyncThunk(
  'auth/signOut',
  async (out, { rejectWithValue }) => {
    try {
      const auth = getAuth()
      await signOut(auth)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const checkAuthStatus = createAsyncThunk<User>(
  'auth/checkAuthStatus',
  async (_, { rejectWithValue }) => {
    const auth = getAuth()
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          resolve({ uid: user.uid, email: user.email })
        } else {
          reject(rejectWithValue('No user logged in'))
        }
      })
    })
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
      })
      .addCase(signInWithGoogle.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
      })
      .addCase(signUp.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.status = 'idle'
        state.user = null
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.status = 'failed'
        // action.payloadがstring型であることを確認
        if (typeof action.payload === 'string') {
          state.error = action.payload
        } else {
          // action.payloadがstring型でない場合のデフォルトエラーメッセージ
          state.error = 'An unknown error occurred'
        }
      })
  },
})

export default authSlice.reducer
