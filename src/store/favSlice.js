import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "@/api/axiosInstance.js";

//import axiosInstance from "@/api/axiosInstance.js";

export const loadFavs = createAsyncThunk('favs/loadFavs', async (param, thunkAPI) => {  

    const state = thunkAPI.getState()

    if (state.user.isAuthenticated) {

      try {
        const resp = await axios(`favourites`)        
        return (resp.data)
      } catch(err) {
        if (err.response.data.description === 'No favourite product for the given User ID') {
          return []
        } else {
          return thunkAPI.rejectWithValue(err.response.data)
        }
      }

    } else {
      // Пользователь не авторизован, 
      // 
      // подгружаем Избранное из LS? 
    }  
})

export const updateFavs = createAsyncThunk('favs/updateFavs', async (params, thunkAPI) => {

  const state = thunkAPI.getState()
  
  if (state.user.isAuthenticated) {
    //посылаем запрос на сервер
  
  } else {
    // посылаем в LS (или удаляем)
  }


})

const initialState = {
  favs: null,
  status: 'success',
  updateFavsStatus: 'success',
  categories: null
}

export const favSlice = createSlice({
  name: 'favs',
  initialState,
  reducers: {
    setFavs: (state, action) => {
      state.favs = action.payload
    },
  },

  extraReducers: builder => builder
    .addCase(loadFavs.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(loadFavs.fulfilled, (state, action) => {      
      state.status = 'success'
      state.favs = action.payload.favourites
      
      // в LS категорий не будет
      if (action.payload.productCategories) {
        state.categories = action.payload.productCategories
      }
    })
    .addCase(loadFavs.rejected, (state, action) => {
      state.status = 'error'
      console.log('ошибка', action.error.message)
    })


    .addCase(updateFavs.pending, (state) => {
      state.updateFavsStatus = 'loading'
    })
    .addCase(updateFavs.fulfilled, (state, action) => {
      state.updateFavsStatus = 'success'
      // state.likesObject = action.payload
    })
    .addCase(updateFavs.rejected, (state, action) => {
      state.updateFavsStatus = 'error'
      console.log('ошибка', action.error.message)
    })
  ,
})

export const {setFavs} = favSlice.actions
export const getFavs = (state) => {
  return state.favs.favs
}
export const getFavCategories = (state) => {
  return state.favs.categories
}

export default favSlice.reducer