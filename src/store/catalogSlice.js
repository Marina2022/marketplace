import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axiosInstance from "@/api/axiosInstance.js";

const initialState = {
  cardView: 'horizontal',
  scroll: null,
  dropdownedFilters: []
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
  },

})
export const {setCardView, setScroll, addDropdownedFilters, removeFromDropdownedFilters} = catalogSlice.actions
export const getCartView = (state) => state.catalog.cardView
export const getScroll = (state) => state.catalog.scroll
export const getDropdownedFilters = (state) => state.catalog.dropdownedFilters
export default catalogSlice.reducer