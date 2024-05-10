import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { format } from 'date-fns'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore'

import { db } from '@/lib/firebase/firebase'
import { Lists } from '@/types/Lists'
import { MovieItem } from '@/types/Movie'

type MoviesState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined
} & Lists

interface TogglePayload {
  movieId: string
  uid: string
  formattedCreatedAt?: string
}
interface ToggleLists {
  [key: string]: string
}

interface WatchedPayload {
  movieId: string
  watchedAt: Timestamp | string | null
}
interface WatchedMovie {
  movieId: string
  watchedAt: Date | null | undefined
  uid: string
}

const initialState: MoviesState = {
  movieListData: {},
  favorites: {},
  watchlists: {},
  status: 'idle',
  error: undefined,
}

export const fetchRegisteredMovies = createAsyncThunk<
  Record<string, MovieItem>,
  string,
  { rejectValue: { message: string; error?: any } }
>('movies/fetchRegisteredMovies', async (uid, { rejectWithValue }) => {
  try {
    const userListRef = doc(db, 'users', uid)
    const querySnapshot = await getDocs(collection(userListRef, 'movies'))

    const movieListData: Record<string, MovieItem> = {}

    querySnapshot.forEach((doc) => {
      const data = doc.data() as MovieItem

      if (data.watchedAt) {
        let watchedAt: Date

        if (typeof data.watchedAt === 'string') {
          watchedAt = new Date(data.watchedAt)
        } else if (data.watchedAt instanceof Timestamp) {
          watchedAt = data.watchedAt.toDate()
        } else {
          return // data.watchedAt が null の場合は処理をスキップ
        }

        const formattedWatchedAt = format(watchedAt, 'yyyy-MM-dd')

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
    console.error('Error is ', error)
    return rejectWithValue(error)
  }
})

export const fetchRegisteredLists = createAsyncThunk<
  Record<string, Record<string, MovieItem>>,
  { uid: string },
  { rejectValue: { message: string; error?: any } }
>('movies/fetchRegisteredLists', async ({ uid }, { rejectWithValue }) => {
  try {
    const userListRef = doc(db, 'users', uid)
    const listTypes = ['favorites', 'watchlists']

    const listDataObject: Record<string, Record<string, MovieItem>> = {}

    for (const type of listTypes) {
      const querySnapshot = await getDocs(collection(userListRef, type))
      const listData: Record<string, MovieItem> = {}

      querySnapshot.forEach((doc) => {
        const data = doc.data() as MovieItem

        if (data.createdAt) {
          const createdAt = data.createdAt.toDate()
          const formattedCreatedAt = createdAt
            ? format(createdAt, 'yyyy-MM-dd')
            : null

          listData[doc.id] = {
            ...data,
            createdAt: formattedCreatedAt,
          }
        } else {
          listData[doc.id] = data
        }
      })

      listDataObject[type] = listData
    }

    return listDataObject
  } catch (error: any) {
    console.error('Error is ', error)
    return rejectWithValue(error)
  }
})

export const removeRegisteredMovie = createAsyncThunk<
  {
    movieId: string
    uid: string
    lystType: string
  },
  {
    movieId: string
    uid: string
    lystType: string
  },
  { rejectValue: string }
>(
  'removeRegisteredMovie',
  async ({ movieId, uid, lystType }, { rejectWithValue }) => {
    try {
      const userListRef = doc(db, 'users', uid)
      const listsRef = doc(userListRef, lystType, movieId)

      await deleteDoc(listsRef)

      return { movieId, uid, lystType }
    } catch (error: any) {
      console.error('Error is ', error)
      return rejectWithValue(error)
    }
  },
)

export const toggleFavorites = createAsyncThunk<
  TogglePayload,
  ToggleLists,
  { rejectValue: string }
>('toggleFavorites', async ({ movieId, uid }, { rejectWithValue }) => {
  try {
    const userListRef = doc(db, 'users', uid)
    const favoritesRef = doc(userListRef, 'favorites', movieId)
    const favoritesDoc = await getDoc(favoritesRef)

    const moviesRef = doc(userListRef, 'movies', movieId)
    const moviesDoc = await getDoc(moviesRef)

    if (favoritesDoc.exists()) {
      await deleteDoc(favoritesRef)
      return { movieId, uid, createdAt: null }
    } else {
      const createdAt = Timestamp.now()
      await setDoc(favoritesRef, { createdAt })

      if (!moviesDoc.exists()) {
        const movieData = {}
        await setDoc(moviesRef, movieData)
      }

      const formattedCreatedAt = format(createdAt.toDate(), 'yyyy-MM-dd')

      return { movieId, uid, formattedCreatedAt }
    }
  } catch (error: any) {
    console.error('Error is ', error)
    return rejectWithValue(error)
  }
})

export const toggleWatchlists = createAsyncThunk<
  TogglePayload,
  ToggleLists,
  { rejectValue: string }
>('toggleWatchlists', async ({ movieId, uid }, { rejectWithValue }) => {
  try {
    const userListRef = doc(db, 'users', uid)
    const watchlistsRef = doc(userListRef, 'watchlists', movieId)
    const watchlistsDoc = await getDoc(watchlistsRef)

    const moviesRef = doc(userListRef, 'movies', movieId)
    const moviesDoc = await getDoc(moviesRef)

    if (watchlistsDoc.exists()) {
      await deleteDoc(watchlistsRef)
      return { movieId, uid, createdAt: null }
    } else {
      const createdAt = Timestamp.now()
      await setDoc(watchlistsRef, { createdAt })

      if (!moviesDoc.exists()) {
        const movieData = {}
        await setDoc(moviesRef, movieData)
      }

      const formattedCreatedAt = format(createdAt.toDate(), 'yyyy-MM-dd')

      return { movieId, uid, formattedCreatedAt }
    }
  } catch (error: any) {
    console.error('Error is ', error)
    return rejectWithValue(error)
  }
})

export const updateComment = createAsyncThunk<
  { movieId: string; comment: string },
  { movieId: string; comment: string; uid: string },
  { rejectValue: string }
>('updateComment', async ({ movieId, comment, uid }, { rejectWithValue }) => {
  try {
    const userListRef = doc(db, 'users', uid)
    const movieRef = doc(userListRef, 'movies', movieId)

    await updateDoc(movieRef, { comment })
    return { movieId, comment }
  } catch (error: any) {
    console.error('Error is ', error)
    return rejectWithValue(error)
  }
})

export const regisrerWatched = createAsyncThunk<
  WatchedPayload,
  WatchedMovie,
  { rejectValue: string }
>(
  'registerWatched',
  async ({ movieId, watchedAt, uid }, { rejectWithValue }) => {
    try {
      const userListRef = doc(db, 'users', uid)
      const movieRef = doc(userListRef, 'movies', movieId)
      const movieDoc = await getDoc(movieRef)

      if (watchedAt) {
        const convertWatchedAtToTimestamp = Timestamp.fromDate(watchedAt)
        const formattedWatchedAtToString = format(watchedAt, 'yyyy-MM-dd')

        if (movieDoc.exists()) {
          await updateDoc(movieRef, {
            watchedAt: convertWatchedAtToTimestamp,
          })
        } else {
          await setDoc(movieRef, {
            watchedAt: convertWatchedAtToTimestamp,
          })
        }

        return { movieId, watchedAt: formattedWatchedAtToString }
      } else {
        if (movieDoc.exists()) {
          await updateDoc(movieRef, { watchedAt: null })
        } else {
          await setDoc(movieRef, { watchedAt: null })
        }

        return { movieId, watchedAt: null }
      }
    } catch (error: any) {
      console.error('Error is ', error)
      return rejectWithValue(error)
    }
  },
)

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisteredMovies.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchRegisteredMovies.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.movieListData = action.payload
      })
      .addCase(fetchRegisteredMovies.rejected, (state, action) => {
        state.status = 'failed'
        if (action.payload) {
          state.error = action.payload.message
        } else {
          state.error = action.error.message
        }
      })
      .addCase(fetchRegisteredLists.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchRegisteredLists.fulfilled, (state, action) => {
        state.status = 'succeeded'

        const listData = action.payload

        state.favorites = listData.favorites || {}
        state.watchlists = listData.watchlists || {}
      })
      .addCase(fetchRegisteredLists.rejected, (state, action) => {
        state.status = 'failed'
        if (action.payload) {
          state.error = action.payload.message
        } else {
          state.error = action.error.message
        }
      })
      .addCase(removeRegisteredMovie.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(removeRegisteredMovie.fulfilled, (state, action) => {
        state.status = 'succeeded'

        const { movieId, lystType } = action.payload

        if (lystType === 'favorites') {
          delete state.favorites[movieId]
        } else if (lystType === 'watchlists') {
          delete state.watchlists[movieId]
        }
      })
      .addCase(removeRegisteredMovie.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(toggleFavorites.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(toggleFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded'

        const { movieId, formattedCreatedAt } = action.payload

        if (formattedCreatedAt) {
          // お気に入りに追加された場合
          state.favorites[movieId] = {
            movieId,
            addedAt: formattedCreatedAt,
            createdAt: formattedCreatedAt,
          }
        } else {
          // お気に入りから削除された場合
          delete state.favorites[movieId]
        }
      })
      .addCase(toggleFavorites.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(toggleWatchlists.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(toggleWatchlists.fulfilled, (state, action) => {
        state.status = 'succeeded'

        const { movieId, formattedCreatedAt } = action.payload

        if (formattedCreatedAt) {
          // お気に入りに追加された場合
          state.watchlists[movieId] = {
            movieId,
            addedAt: formattedCreatedAt,
            createdAt: formattedCreatedAt,
          }
        } else {
          // お気に入りから削除された場合
          delete state.watchlists[movieId]
        }
      })
      .addCase(toggleWatchlists.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(updateComment.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.status = 'succeeded'

        const { movieId, comment } = action.payload

        state.movieListData[movieId].comment = comment
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(regisrerWatched.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(regisrerWatched.fulfilled, (state, action) => {
        state.status = 'succeeded'

        const { movieId, watchedAt } = action.payload

        state.movieListData[movieId] = {
          ...state.movieListData[movieId],
          watchedAt: watchedAt as string | Date | null,
        }
      })
      .addCase(regisrerWatched.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default moviesSlice.reducer
