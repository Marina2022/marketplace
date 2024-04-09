import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axiosInstance from "@/api/axiosInstance.js";

const initialState = {
  cardView: 'horizontal',
  scroll: null,
  dropdownedFilters: [],
  isScrolledProgrammatically: false
}

export const catalogSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCardView: (state, action) => {
      state.cardView = action.payload      
    },
    setScroll: (state, action) => {
      state.scroll = action.payload
      state.isScrolledProgrammatically = true;
    },
    addDropdownedFilters: (state, action) => {
      // приходит filterHandle
      const filterToAdd = action.payload
      state.dropdownedFilters.push(filterToAdd)   
      
    },
    removeFromDropdownedFilters: (state, action) => {
      // приходит filterHandle
      const filterToRemove = action.payload
      state.dropdownedFilters = state.dropdownedFilters.filter(item => item !==filterToRemove)
    },
    
    clearIsScrolledProgrammatically: (state, action) => {
      state.isScrolledProgrammatically = false
    },
  },
})
export const {setCardView, setScroll, addDropdownedFilters, removeFromDropdownedFilters, clearIsScrolledProgrammatically} = catalogSlice.actions
export const getCartView = (state) => state.catalog.cardView
export const getScroll = (state) => state.catalog.scroll
export const getDropdownedFilters = (state) => state.catalog.dropdownedFilters
// export const getIsScrolledProgrammatically = (state) => state.catalog.isScrolledProgrammatically
export default catalogSlice.reducer
