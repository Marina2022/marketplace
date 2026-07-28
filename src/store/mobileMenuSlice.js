import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  showCloseBtn: false
}

//showCloseBtn, setShowCloseBtn

export const mobileMenuSlice = createSlice({
  name: 'mobileMenu',
  initialState,
  reducers: {
    setShowCloseBtn: (state, action) => {
      state.showCloseBtn = action.payload
    }
  }
})

export const {setShowCloseBtn} = mobileMenuSlice.actions

export const getShowCloseBtn = (state) => {
  return state.mobileMenu.showCloseBtn
}


export default mobileMenuSlice.reducer