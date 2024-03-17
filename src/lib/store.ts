import { configureStore } from '@reduxjs/toolkit'
import authReeducer from './features/auth/authSlice'
import listsReeducer from './features/lists/listsSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReeducer,
      lists: listsReeducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
// export type RootState = ReturnType<AppStore['getState']>
export type RootState = ReturnType<typeof makeStore.getState>
export type AppDispatch = AppStore['dispatch']
