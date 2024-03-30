import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import listsReducer from './features/lists/listsSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      lists: listsReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
// export type RootState = ReturnType<AppStore['getState']>
export type RootState = ReturnType<typeof makeStore.getState>
export type AppDispatch = AppStore['dispatch']
