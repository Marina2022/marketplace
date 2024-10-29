import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  activeTabInMain: 0,  
}

const lkSlice = createSlice({
  name: 'lk',
  initialState,
  reducers: {
    setActiveTabInMain: (state, action) => {      
      state.activeTabInMain = action.payload
    },
  },  
})
export const {
   setActiveTabInMain,

} = lkSlice.actions
export const getActiveTabInMain = state => state.lk.activeTabInMain

export default lkSlice.reducer