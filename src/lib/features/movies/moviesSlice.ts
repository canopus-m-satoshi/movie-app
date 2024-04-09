import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { format } from 'date-fns'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore'
import { watch } from 'fs'

import { db } from '@/lib/firebase'
import { MovieItem } from '@/types/Lists'

interface moviesState {
  movieListData: Record<string, MovieItem> // 各ユーザーのリストをuidをキーとして保持する
  favorites: Record<string, string>
  watchlists: Record<string, string>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined
}

const initialState: moviesState = {
  movieListData: {},
  favorites: {},
  watchlists: {},
  status: 'idle',
  error: undefined,
}

// 新規データベース構造 start
export const fetchUserLists = createAsyncThunk<
  Record<string, MovieItem>,
  string,
  { rejectValue: { message: string; error?: any } }
>('movies/fetchUserLists', async (uid, { rejectWithValue }) => {
  try {
    const userListRef = doc(db, 'users', uid)
    const querySnapshot = await getDocs(collection(userListRef, 'movies'))

    const movieListData: Record<string, MovieItem> = {}

    querySnapshot.forEach((doc) => {
      const data = doc.data() as MovieItem

      if (data.watchedAt) {
        const watchedAt = data.watchedAt.toDate()

        const formattedWatchedAt = watchedAt
          ? format(watchedAt, 'yyyy-MM-dd')
          : null

        movieListData[doc.id] = {
          ...data,
          watchedAt: formattedWatchedAt,
        }
      } else {
        movieListData[doc.id] = data
      }
    })

    return movieListData
  } catch (error: any) {
    return rejectWithValue({ message: 'Failed to fetch user lists', error })
  }
})

export const fetchLists = createAsyncThunk<
  Record<string, MovieItem>,
  { uid: string; listType: string },
  { rejectValue: { message: string; error?: any } }
>('movies/fetchLists', async ({ uid, listType }, { rejectWithValue }) => {
  try {
    const userListRef = doc(db, 'users', uid)
    const querySnapshot = await getDocs(collection(userListRef, listType))

    const listData: Record<string, MovieItem> = {}

    querySnapshot.forEach((doc) => {
      const data = doc.data() as MovieItem

      if (data.createdAt) {
        const createdAt = data.createdAt.toDate()

        const formattedWatchedAt = createdAt
          ? format(createdAt, 'yyyy-MM-dd')
          : null

        listData[doc.id] = {
          ...data,
          createdAt: formattedWatchedAt,
        }
      } else {
        listData[doc.id] = data
      }
    })

    return { listData, listType }
  } catch (error: any) {
    return rejectWithValue({ message: 'Failed to fetch favorites list', error })
  }
})
// 新規データベース構造 end

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLists.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUserLists.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.movieListData = action.payload
      })
      .addCase(fetchUserLists.rejected, (state, action) => {
        state.status = 'failed'
        if (action.payload) {
          state.error = action.payload.message
        } else {
          state.error = action.error.message
        }
      })
      .addCase(fetchLists.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.status = 'succeeded'

        const { listData, listType } = action.payload

        switch (listType) {
          case 'favorites':
            state.favorites = listData
            break

          case 'watchlists':
            state.watchlists = listData
            break
        }
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.status = 'failed'
        if (action.payload) {
          state.error = action.payload.message
        } else {
          state.error = action.error.message
        }
      })
  },
})

export default moviesSlice.reducer
