import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "@/api/axiosInstance.js";
import {loadFavs} from "@/store/favSlice.js";


export const loadActiveOrders = createAsyncThunk('orders/loadActiveOrders', async (args, thunkAPI) => {

  const state = thunkAPI.getState()

  if (state.user.isAuthenticated) {

    const {activeProfileId, type} = args

    try {
      const url = `current-orders?profileId=${activeProfileId}&profileType=${type}`
      const resp = await axios(url)

      if (resp.data.description === "No product in order") {
        return []
      } else {
        return resp.data
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }

})

const initialState = {
  activeOrders: null,
  orderLoadingStatus: 'loading'
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // setActiveOrders: (state, action) => {
    //   state.activeOrders = action.payload
    // },
  },

   extraReducers: builder => builder
  .addCase(loadActiveOrders.pending, (state) => {
    state.orderLoadingStatus = 'loading'
  })
  .addCase(loadActiveOrders.fulfilled, (state, action) => {
    state.orderLoadingStatus = 'success'
    state.activeOrders = action.payload    
  })
  .addCase(loadActiveOrders.rejected, (state, action) => {
    state.orderLoadingStatus = 'error'
    console.log('ошибка', action.error.message)
  })


})
export const {
  setActiveOrders,

} = ordersSlice.actions
export const getActiveOrders = state => state.orders.activeOrders

export default ordersSlice.reducer