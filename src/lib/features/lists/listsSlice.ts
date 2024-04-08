import { db } from '@/lib/firebase'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  arrayRemove,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore'

import { format } from 'date-fns'
import { MovieItem } from '@/app/types/Lists'

type ListType = 'favorites' | 'watchlist' | 'custom'

interface ListsState {
  movieListData: Record<string, MovieItem> // 各ユーザーのリストをuidをキーとして保持する
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined
}

interface ToggleMoviePayload {
  addedAt?: string
  listType: ListType
  movieId: string
  uid: string
}

interface updateCommentPayload {
  comment: string
  movieId: string
  uid: string
}

interface RegisterWatchedDate {
  formattedDate: string
  movieId: string
  uid: string
  isWatched: boolean
}

const initialState: ListsState = {
  movieListData: {},
  status: 'idle',
  error: undefined,
}

// 新規データベース構造 start
export const fetchUserLists = createAsyncThunk<
  { uid: string; movieListData: Record<string, MovieItem> },
  string,
  { rejectValue: string }
>('lists/fetchUserLists', async (uid, { rejectWithValue }) => {
  try {
    const userListRef = doc(db, 'users', uid)
    const querySnapshot = await getDocs(collection(userListRef, 'lists'))

    const movieListData: Record<string, MovieItem> = {}

    querySnapshot.forEach((doc) => {
      movieListData[doc.id] = doc.data() as MovieItem
    })

    return { uid, movieListData }
  } catch (error: any) {
    return rejectWithValue('Failed to fetch user lists')
  }
})
// 新規データベース構造 end

export const toggleMovieInList = createAsyncThunk<
  ToggleMoviePayload,
  ToggleMoviePayload,
  { rejectValue: string }
>(
  'lists/toggleMovieInList',
  async ({ listType, movieId, uid }, { rejectWithValue }) => {
    try {
      const movieRef = doc(db, 'users', uid, 'lists', movieId)
      const movieDoc = await getDoc(movieRef)
      const addedAt = format(new Date(), 'yyyy-MM-dd')

      let updatedData: Partial<MovieItem> = {}

      switch (listType) {
        case 'favorites':
          updatedData = {
            isFavorite: !movieDoc.exists() || !movieDoc.data()?.isFavorite,
            favoriteAddedAt: movieDoc.data()?.favoriteAddedAt ? '' : addedAt,
          }
          break
        case 'watchlist':
          updatedData = {
            isWatchlist: !movieDoc.exists() || !movieDoc.data()?.isWatchlist,
            watchlistAddedAt: movieDoc.data()?.watchlistAddedAt ? '' : addedAt,
          }
          break
      }

      if (movieDoc.exists()) {
        await updateDoc(movieRef, updatedData)
      } else {
        await setDoc(movieRef, { ...updatedData })
      }

      return { addedAt, listType, movieId, uid }
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue('An unknown error occurred')
    }
  },
)

export const updateComment = createAsyncThunk<
  updateCommentPayload,
  updateCommentPayload,
  { rejectValue: string }
>(
  'lists/updateComment',
  async ({ comment, movieId, uid }, { rejectWithValue }) => {
    console.log('🚀 ~ comment:', comment)
    try {
      const listDocRef = doc(db, 'users', uid, 'lists', movieId)
      const docSnap = await getDoc(listDocRef)

      const data = docSnap.data()

      const updatedMovies: Partial<MovieItem> = { ...data, comment: comment }
      if (docSnap.exists()) {
        await updateDoc(listDocRef, updatedMovies)
      } else {
        await setDoc(listDocRef, updatedMovies)
      }
    } catch (error: any) {
      console.log('🚀 ~ error:', error)

      return rejectWithValue('Failed to update comment')
    }

    return { comment, movieId, uid }
  },
)

export const registerWatchedDate = createAsyncThunk<
  RegisterWatchedDate,
  RegisterWatchedDate,
  { rejectValue: string }
>(
  'lists/registerWatchedDate',
  async ({ movieId, uid, formattedDate, isWatched }, { rejectWithValue }) => {
    try {
      const listDocRef = doc(db, 'users', uid, 'lists', movieId)
      const docSnap = await getDoc(listDocRef)

      const data = docSnap.data()

      const updatedMovies: Partial<MovieItem> = {
        ...data,
        watchedDate: formattedDate,
        isWatched: isWatched,
      }

      if (docSnap.exists()) {
        await updateDoc(listDocRef, updatedMovies)
      } else {
        await setDoc(listDocRef, updatedMovies)
      }
    } catch (error: any) {
      console.log('🚀 ~ async ~ error:', error)
      console.log('🚀 ~ rejectWithValue:', rejectWithValue)
    }

    return { movieId, uid, formattedDate, isWatched }
  },
)

// export const removeMovie = createAsyncThunk<
//   ToggleMoviePayload,
//   ToggleMoviePayload,
//   { rejectValue: string }
// >(
//   'lists/removeMovie',
//   async ({ listType, movieId, uid }, { rejectWithValue }) => {
//     try {
//       const listDocRef = doc(db, 'users', uid, 'lists', listType)
//       const docSnap = await getDoc(listDocRef)

//       if (docSnap.exists()) {
//         const data = docSnap.data()
//         const hasMovieInList = data.movies.find(
//           (el: MovieItem) => el.movieId === movieId,
//         )

//         if (hasMovieInList) {
//           // 映画がリストに既に存在する場合、削除
//           await updateDoc(listDocRef, {
//             movies: arrayRemove(hasMovieInList),
//           })
//         }
//       }

//       return { listType, movieId, uid }
//     } catch (error) {
//       if (error instanceof Error) {
//         return rejectWithValue(error.message)
//       }
//       return rejectWithValue('An unknown error occurred')
//     }
//   },
// )

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLists.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUserLists.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const { uid, movieListData } = action.payload
        state.movieListData[uid] = movieListData
      })
      .addCase(fetchUserLists.rejected, (state, action) => {
        state.status = 'failed'
        if (typeof action.payload === 'string') {
          state.error = action.payload
        } else {
          state.error = 'An unknown error occurred'
        }
      })
      .addCase(toggleMovieInList.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(toggleMovieInList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const { addedAt, listType, movieId, uid } = action.payload

        if (state.movieListData[uid] && state.movieListData[uid][movieId]) {
          const movieItem: MovieItem = state.movieListData[uid][movieId]
          switch (listType) {
            case 'favorites':
              movieItem.isFavorite = !movieItem.isFavorite
              movieItem.favoriteAddedAt = addedAt as string
              break
            case 'watchlist':
              movieItem.isWatchlist = !movieItem.isWatchlist
              movieItem.watchlistAddedAt = addedAt
              break
          }
        } else {
          if (!state.movieListData[uid]) {
            state.movieListData[uid] = { [movieId]: {} }
          }

          state.movieListData[uid][movieId] = {
            movieId,
            addedAt,
            isFavorite: listType === 'favorites',
            favoriteAddedAt: listType === 'favorites' ? addedAt : '',
            isWatchlist: listType === 'watchlist',
            watchlistAddedAt: listType === 'watchlist' ? addedAt : '',
          } as MovieItem
        }
      })
      .addCase(toggleMovieInList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(updateComment.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.status = 'succeeded'

        const { comment, movieId, uid } = action.payload

        console.log(
          '🚀 ~ .addCase ~ state.movieListData[uid] :',
          state.movieListData[uid],
        )
        if (state.movieListData[uid][movieId]) {
          state.movieListData[uid][movieId].comment = comment
        }
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(registerWatchedDate.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(registerWatchedDate.fulfilled, (state, action) => {
        state.status = 'succeeded'

        const { movieId, uid, formattedDate, isWatched } = action.payload

        if (state.movieListData[uid] && state.movieListData[uid][movieId]) {
          state.movieListData[uid][movieId].watchedDate = formattedDate
          state.movieListData[uid][movieId].isWatched = isWatched
        } else {
          if (!state.movieListData[uid]) {
            state.movieListData[uid] = { [movieId]: {} }
          }

          state.movieListData[uid][movieId] = {
            ...state.movieListData[uid][movieId],
            watchedDate: formattedDate,
            isWatched: isWatched,
          }
        }
      })
      .addCase(registerWatchedDate.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
    // .addCase(removeMovie.pending, (state) => {
    //   state.status = 'loading'
    // })
    // .addCase(removeMovie.fulfilled, (state, action) => {
    //   state.status = 'succeeded'
    //   const { listType, movieId, uid } = action.payload

    //   if (state.movieListData[uid][listType].includes(movieId)) {
    //     // 映画IDがリスト内に存在する場合、そのIDを除外した新しい配列を作成
    //     state.movieListData[uid][listType] = state.movieListData[uid][
    //       listType
    //     ].filter((id) => id !== movieId)
    //   }
    // })
    // .addCase(removeMovie.rejected, (state, action) => {
    //   state.status = 'failed'
    //   state.error = action.payload
    // })
  },
})

export default listsSlice.reducer
