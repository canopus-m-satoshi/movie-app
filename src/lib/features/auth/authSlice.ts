import { auth } from '@/lib/firebase'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

interface AuthState {
  user: null | { uid: string; email: string | null }
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined
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

      return { uid: result.user.uid, email: result.user.email }
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
        state.user = null
        state.status = 'idle'
      })
  },
})

export default authSlice.reducer
