import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "@/api/axiosInstance.js";

// todo все переписать под requests
export const loadRequests = createAsyncThunk('orders/loadActiveOrders', async (args, thunkAPI) => {
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
  requests: null,
  requestsLoadingStatus: 'loading',
  requestsTab: 1
}

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    setRequestsTab: (state, action) => {
      state.requestsTab = action.payload
    },
  },

   extraReducers: builder => builder
  .addCase(loadRequests.pending, (state) => {
    state.requestsLoadingStatus = 'loading'
  })
  .addCase(loadRequests.fulfilled, (state, action) => {
    state.requestsLoadingStatus = 'success'
    state.requests = action.payload
  })
  .addCase(loadRequests.rejected, (state, action) => {
    state.requestsLoadingStatus = 'error'
    console.log('ошибка', action.error.message)
  })
})
export const {
  setRequestsTab
} = requestsSlice.actions
export const getRequests = state => state.requests.requests
export const getRequestsTab = state => state.requests.requestsTab
export const getRequestsLoadingStatus = state => state.requests.requestsLoadingStatus

export default requestsSlice.reducer