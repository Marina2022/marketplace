import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "@/api/axiosInstance.js";
import {loadCart} from "@/store/cartSlice.js";
import {loadFavs} from "@/store/favSlice.js";

export const login = createAsyncThunk('cart/login', async (_, thunkAPI) => {
  // const resp = Запрос авторизации
  let resp = {}
  resp.status = 200
  
  if (resp.status === 200) {
    thunkAPI.dispatch(setIsAuthenticated(true))
    thunkAPI.dispatch(loadCart())
    thunkAPI.dispatch(loadFavs())    
  }
  return true
})

export const logout = createAsyncThunk('user/logout', async (_, thunkAPI) => {  
  //const resp = Запрос авторизации
  let resp = {}
  resp.status = 200

  if (resp.status === 200) {
    thunkAPI.dispatch(setIsAuthenticated(false))
    thunkAPI.dispatch(loadCart())
    thunkAPI.dispatch(loadFavs())    
  }
  return true
})

const initialState = {
  user: {name: 'Marina'},
  isLoading: false,
  isAuthenticated: false, 
  token: null,
  loginStatus: 'loading',
  logoutStatus: 'loading',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload
    },
  },
  extraReducers: builder => builder

    .addCase(login.pending, (state) => {
      state.loginStatus = 'loading'
    })
    .addCase(login.fulfilled, (state, action) => {
      state.loginStatus = 'success'
      // state.isAuthenticated = true
    })
    .addCase(login.rejected, (state, action) => {
      state.loginStatus = 'error'
      console.log('Не удалось залогиниться', action.error.message)
    })

    .addCase(logout.pending, (state) => {
      state.logoutStatus = 'loading'
    })
    .addCase(logout.fulfilled, (state, action) => {
      state.logoutStatus = 'success'
      // state.isAuthenticated = false
    })
    .addCase(logout.rejected, (state, action) => {
      state.logoutStatus = 'error'
      console.log('Не удалось разлогиниться', action.error.message)
    })
})
export const {setUser, setToken, setIsAuthenticated} = userSlice.actions
export const getIsAuthenticated = state => state.user.isAuthenticated
export default userSlice.reducer