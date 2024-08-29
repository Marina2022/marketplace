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

export const getUser = createAsyncThunk('cart/getUser', async (_, thunkAPI) => {
    
  try {
    const resp = await axios('user', )

    if (resp.status === 200) {
      thunkAPI.dispatch(setIsAuthenticated(true))
      thunkAPI.dispatch(getUserProfiles())
      thunkAPI.dispatch(loadCart())
      thunkAPI.dispatch(loadFavs())
      return resp.data
    }  
  } catch(err) {
    console.log('err из кэча юзера', err)
    if (err.message === 'Request failed with status code 401') {
      console.log('зашли в catch 401')
      thunkAPI.dispatch(logout())
      throw new Error("Unauthorized")
    } else {
      thunkAPI.rejectWithValue(err.response.data)
    }
  }
  
  
  return
  
})

export const getUserProfiles = createAsyncThunk('cart/getUserProfiles', async (_, thunkAPI) => {

  let resp = await axios('acc/profiles', )
  
  if (resp.status === 200) {
    return resp.data
  }
  
  return
  
})


export const logout = createAsyncThunk('user/logout', async (_, thunkAPI) => {

  thunkAPI.dispatch(setUser(null))
  thunkAPI.dispatch(setUserProfiles(null))  
  thunkAPI.dispatch(setIsAuthenticated(false))
  
  thunkAPI.dispatch(loadCart())
  thunkAPI.dispatch(loadFavs())
  thunkAPI.dispatch(setToken(null))
  localStorage.removeItem('userProfile') 

  return true
})

const initialState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  token: null,
  userProfiles: null,
  loginStatus: 'loading',
  logoutStatus: 'loading',
  getUserStatus: 'loading'
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
    setUserProfiles: (state, action) => {
      state.userProfiles = action.payload
    },
  },
  extraReducers: builder => builder

    // login - todo - нужна ли
    
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
    })
    .addCase(logout.rejected, (state, action) => {
      state.logoutStatus = 'error'
      console.log('Не удалось разлогиниться', action.error.message)
    })


    .addCase(getUser.pending, (state) => {
      state.getUserStatus = 'loading'
    })
    .addCase(getUser.fulfilled, (state, action) => {
      state.getUserStatus = 'success'
      // state.isAuthenticated = true
      if (action.payload) {
        state.user = action.payload
      }
    })
    .addCase(getUser.rejected, (state, action) => {
      state.getUserStatus = 'error'
      console.log('Не удалось получить данные пользователя', action.error.message)
    })


    .addCase(getUserProfiles.pending, (state) => {
      state.getUserProfilesStatus = 'loading'
    })
    .addCase(getUserProfiles.fulfilled, (state, action) => {
      state.getUserProfilesStatus = 'success'
      state.isAuthenticated = true
      if (action.payload) {
        state.userProfiles = action.payload
      }
    })
    .addCase(getUserProfiles.rejected, (state, action) => {
      state.getUserProfilesStatus = 'error'
      console.log('Не удалось получить данные пользователя', action.error.message)
    })
  
})
export const {setUser, setToken, setIsAuthenticated, setUserProfiles} = userSlice.actions
export const getIsAuthenticated = state => state.user.isAuthenticated
export const getUserData = state => state.user.user
export default userSlice.reducer