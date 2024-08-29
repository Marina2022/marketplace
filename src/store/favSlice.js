import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "@/api/axiosInstance.js";

export const loadFavs = createAsyncThunk('favs/loadFavs', async (productCategoryId, thunkAPI) => {
    const state = thunkAPI.getState()
    if (state.user.isAuthenticated) {
      try {     
        const url = productCategoryId ? `favourites?productCategoryId=${productCategoryId}` : `favourites`       
        const resp = await axios(url)        
        return (resp.data)
      } catch(err) {
        if (err.response.data.description === 'No favourite product for the given User ID') {
          console.log('я тут')
          return {favourites: []}
        } else {
          return thunkAPI.rejectWithValue(err.response.data)
        }
      }

    } else {
      // Пользователь не авторизован,      
      // подгружаем Избранное из LS      
      const favs = JSON.parse(localStorage.getItem('favs'))
      if (favs) {
        return {favourites: favs}
      } else {
        return {favourites: []}
      }            
    }  
})

export const updateFavs = createAsyncThunk('favs/updateFavs', async (params, thunkAPI) => {
  const {updateType, productVariantId, product, sku} = params  
  const state = thunkAPI.getState()  
  if (state.user.isAuthenticated) {        
    if (updateType === 'add') {
      await axios.post(`favourites/favourite/${productVariantId}`)      
    } else {
      await axios.delete(`favourites/favourite/${productVariantId}`)
    }      

    thunkAPI.dispatch(loadFavs())
    return    
  
  } else {
    // update в LS 
        
    let favs
    favs = JSON.parse(localStorage.getItem('favs'))
    if (!favs) favs = [] 
            
    if (updateType === 'add') {
      const newFav = {
        discount: product.discount,
        images: product.images || product.productImages || [{imageUrl: product.productImageUrl}] ,
        inventoryLevel: product.inventoryLevel || product.inventoryQuantity,
        isAvailable: product.isAvailable,
        isDiscounted: product.isDiscounted,
        isFavourite: product.isFavourite,
        isSecondHand: product.isSecondHand,
        price: product.price,
        productHandle: product.productHandle,
        productName: product.productName,
        productVariantId: product.productVariantId,
        regularPrice: product.regularPrice,
        sku: sku || product.sku
      }

      console.log('newFav - ', newFav)
      
      favs.push(newFav)
      localStorage.setItem('favs', JSON.stringify(favs))
    } else {
      // удаление
      
      const newFavs =  favs.filter(item => item.productVariantId !== product.productVariantId)
      localStorage.setItem('favs', JSON.stringify(newFavs))
    }
    thunkAPI.dispatch(loadFavs())    
  }
})

const initialState = {
  favs: null,
  status: 'loading',
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
      } else {
        state.categories = null
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
export const getFavsLoadingStatus = (state) => {
  return state.favs.status  
}
export const getFavCategories = (state) => {
  return state.favs.categories
}
export default favSlice.reducer