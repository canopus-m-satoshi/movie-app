import { db } from '@/lib/firebase'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore'

type ListType = 'favorites' | 'watchlist' | 'custom'

interface UserLists {
  [listType: string]: string[]
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

interface ToggleMoviePayload {
  listType: ListType
  movieId: string
  uid: string
}

interface FetchUserLists {
  uid: string
  movieListData: Record<string, string[]>
}

const initialState: ListsState = {
  usersLists: {},
  status: 'idle',
  error: undefined,
}

// FetchUserLists = Return type of the payload creator
// string = First argument to the payload creator

export const fetchUserLists = createAsyncThunk<FetchUserLists, string>(
  'lists/fetchUserLists',

  async (uid, { rejectWithValue }) => {
    try {
      const listsRef = collection(db, 'users', uid, 'lists')
      const snapShot = await getDocs(listsRef)
      const movieListData = {}

      snapShot.forEach((doc) => {
        const data = doc.data() as { movieIds: string[] }
        movieListData[doc.id] = data.movieIds
      })

      return { uid, movieListData }
    } catch (error: any) {
      return rejectWithValue('Failed to fetch user lists')
    }
  },
)

export const toggleMovieInList = createAsyncThunk<
  ToggleMoviePayload,
  ToggleMoviePayload,
  { rejectValue: string }
>(
  'lists/toggleMovie',
  async ({ listType, movieId, uid }, { rejectWithValue }) => {
    try {
      const listDocRef = doc(db, 'users', uid, 'lists', listType)
      const docSnap = await getDoc(listDocRef)

      if (docSnap.exists()) {
        const data = docSnap.data()
        if (data.movieIds && data.movieIds.includes(movieId)) {
          // 映画がリストに既に存在する場合、削除
          await updateDoc(listDocRef, {
            movieIds: arrayRemove(movieId),
          })
        } else {
          // 映画がリストに存在しない場合、追加
          await updateDoc(
            listDocRef,
            { movieIds: arrayUnion(movieId) },
            { merge: true },
          )
        }
      } else {
        // ドキュメントが存在しない場合、新規作成して映画を追加
        await setDoc(listDocRef, { movieIds: [movieId] }, { merge: true })
      }

      return { listType, movieId, uid }
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue('An unknown error occurred')
    }
  },
)

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
        state.usersLists[uid] = movieListData
      })
      .addCase(toggleMovieInList.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(toggleMovieInList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const { listType, movieId, uid } = action.payload

        if (state.usersLists[uid][listType].includes(movieId)) {
          // 映画IDがリスト内に存在する場合、そのIDを除外した新しい配列を作成
          state.usersLists[uid][listType] = state.usersLists[uid][
            listType
          ].filter((id) => id !== movieId)
        } else {
          // 映画IDがリスト内に存在しない場合、リストに追加
          state.usersLists[uid][listType].push(movieId)
        }
      })
      .addCase(toggleMovieInList.rejected, (state, action) => {
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
