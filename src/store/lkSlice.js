import {createSlice} from "@reduxjs/toolkit";
//import axios from "@/api/axiosInstance.js";



const initialState = {
  activeTabInMain: 1,  
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