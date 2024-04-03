import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: false,
  isAuthenticated: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
  }
})

export const {setUser} = userSlice.actions

export const getIsAuthenticated = state => state.user.isAuthenticated

export default userSlice.reducer