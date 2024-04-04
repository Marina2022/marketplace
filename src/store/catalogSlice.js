import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axiosInstance from "@/api/axiosInstance.js";

const initialState = {
  cardView: 'horizontal'
}

export const catalogSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCardView: (state, action) => {
      state.cardView = action.payload
    },
  },

})
export const {setCardView} = catalogSlice.actions
export const getCartView = (state) => state.catalog.cardView
export default catalogSlice.reducer