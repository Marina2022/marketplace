import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "@/api/axiosInstance.js";

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
  orderLoadingStatus: 'loading',
  ordersTab: 1
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrdersTab: (state, action) => {      
      state.ordersTab = action.payload
    },
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
  setActiveOrders, setOrdersTab

} = ordersSlice.actions
export const getActiveOrders = state => state.orders.activeOrders
export const getOrdersTab = state => state.orders.ordersTab
export const getActiveOrdersLoadingStatus = state => state.orders.orderLoadingStatus

export default ordersSlice.reducer