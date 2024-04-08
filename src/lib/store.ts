import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import listsReducer from './features/lists/listsSlice'
import modalReducer from './features/modal/modalSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      lists: listsReducer,
      modal: modalReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
// export type RootState = ReturnType<typeof makeStore.getState>
// export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = AppStore['dispatch']
