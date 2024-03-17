import { db } from '@/lib/firebase'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore'

type ListType = 'favorites' | 'watchlist' | 'custom'

interface UserLists {
  [listType: string]: string[] // Or use a specific ListType enum/union if defined
}

interface ListsState {
  usersLists: Record<string, UserLists> // 各ユーザーのリストをuidをキーとして保持する
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined
}

interface AddMoviePayload {
  listType: ListType
  movieId: string
  uid: string
}

const initialState: ListsState = {
  usersLists: {},
  status: 'idle',
  error: undefined,
}

export const addMovieToList = createAsyncThunk<
  AddMoviePayload,
  AddMoviePayload,
  { rejectValue: string }
>('lists/addMovie', async ({ listType, movieId, uid }, { rejectWithValue }) => {
  try {
    const listDocRef = doc(db, 'users', uid, 'lists', listType)

    await setDoc(listDocRef, { movieIds: arrayUnion(movieId) }, { merge: true })

    return { listType, movieId, uid }
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message)
    }
    return rejectWithValue('An unknown error occurred')
  }
})

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addMovieToList.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(addMovieToList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const { listType, movieId, uid } = action.payload

        if (!state.usersLists[uid]) {
          state.usersLists[uid] = { favorites: [], watchlist: [], custom: [] }
        }
        if (!state.usersLists[uid][listType]) {
          state.usersLists[uid][listType] = []
        }

        state.usersLists[uid][listType].push(movieId)
      })
      .addCase(addMovieToList.rejected, (state, action) => {
        state.status = 'failed'
        if (typeof action.payload === 'string') {
          state.error = action.payload
        } else {
          state.error = 'An unknown error occurred'
        }
      })
  },
})

export default listsSlice.reducer
