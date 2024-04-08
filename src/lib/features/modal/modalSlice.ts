import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  toggle: false,
  stack: [],
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggle: (state) => {
      state.toggle = !state.toggle

      // modal閉じる時にスタックを空にする
      if (!state.toggle) {
        state.stack.pop()
      }
    },
  },
})

export const { toggle } = modalSlice.actions

export default modalSlice.reducer
