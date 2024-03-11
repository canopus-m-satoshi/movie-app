import { configureStore } from '@reduxjs/toolkit'
import authReeducer from './features/auth/authSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReeducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
