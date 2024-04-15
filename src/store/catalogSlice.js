import {createSlice} from "@reduxjs/toolkit";

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
  },
})
export const {setCardView, setScroll, addDropdownedFilters, removeFromDropdownedFilters} = catalogSlice.actions
export const getCartView = (state) => state.catalog.cardView
export const getScroll = (state) => state.catalog.scroll
export const getDropdownedFilters = (state) => state.catalog.dropdownedFilters

export default catalogSlice.reducer
