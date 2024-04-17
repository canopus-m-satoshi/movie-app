import { configureStore } from '@reduxjs/toolkit'

import authReducer from './features/auth/authSlice'
import modalReducer from './features/modal/modalSlice'
import moviesReducer from './features/movies/moviesSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      movies: moviesReducer,
      modal: modalReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
