import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  subscriptions: null
}

export const subscriptionSlice = createSlice({
  name: 'setSubscription',
  initialState,
  reducers: {
    setSubscriptions: (state, action) => {
      state.subscriptions = action.payload
    }
  }
})

export const {setSubscriptions} = subscriptionSlice.actions

export const getSubscriptions = (state) => {
  return state.subscription.subscriptions
}

export default subscriptionSlice.reducer