import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "@/api/axiosInstance.js";
import {loadCart} from "@/store/cartSlice.js";
import {loadFavs} from "@/store/favSlice.js";


export const getUserCompanies = createAsyncThunk('cart/getUserCompanies', async (_, thunkAPI) => {

  try {
    const resp = await axios('user',)

    if (resp.status === 200) {

      // try {
      //
      //   // объединение корзин, если в LS есть непустая корзина:
      //   const lsCart = JSON.parse(localStorage.getItem('cart'))
      //
      //   if (lsCart && lsCart.cartItems.length > 0) {
      //
      //     const itemsToSend = lsCart.cartItems.map(item => {
      //       return ({productVriantId: item.productVariantId, count: item.quantity})
      //     })
      //
      //     await axios.post(`carts/cartItems`, itemsToSend)
      //     localStorage.removeItem('cart')
      //   }
      //
      // } catch (err) {
      //   console.log('Ошибка при обединении корзин')
      // }
      //
      // try {
      //   // объединение Избранного, если в LS есть непустой массив favs:
      //
      //   const lsFavs = JSON.parse(localStorage.getItem('favs'))
      //
      //   if (lsFavs && lsFavs.length > 0) {
      //     const favsToSend = lsFavs.map(fav => {
      //       return ({productVariantId: fav.productVariantId})
      //     })
      //     await axios.post(`favourites/addRange`, favsToSend)
      //     localStorage.removeItem('favs')
      //   }
      // } catch (err) {
      //   console.log('Ошибка при обединении Избранного')
      // }


      // thunkAPI.dispatch(setIsAuthenticated(true))
      thunkAPI.dispatch(getUserProfiles())
      // thunkAPI.dispatch(loadCart())
      // thunkAPI.dispatch(loadFavs())

      return resp.data
    }
  } catch (err) {
    thunkAPI.rejectWithValue(err.response.data)
  }
  return
})


export const getUser = createAsyncThunk('cart/getUser', async (_, thunkAPI) => {

  try {
    const resp = await axios('user',)

    if (resp.status === 200) {

      try {

        // объединение корзин, если в LS есть непустая корзина:
        const lsCart = JSON.parse(localStorage.getItem('cart'))

        if (lsCart && lsCart.cartItems.length > 0) {

          const itemsToSend = lsCart.cartItems.map(item => {
            return ({productVriantId: item.productVariantId, count: item.quantity})
          })

          await axios.post(`carts/cartItems`, itemsToSend)
          localStorage.removeItem('cart')
        }

      } catch (err) {
        console.log('Ошибка при обединении корзин')
      }

      try {
        // объединение Избранного, если в LS есть непустой массив favs:

        const lsFavs = JSON.parse(localStorage.getItem('favs'))

        if (lsFavs && lsFavs.length > 0) {
          const favsToSend = lsFavs.map(fav => {
            return ({productVariantId: fav.productVariantId})
          })
          await axios.post(`favourites/addRange`, favsToSend)
          localStorage.removeItem('favs')
        }
      } catch (err) {
        console.log('Ошибка при обединении Избранного')
      }


      thunkAPI.dispatch(setIsAuthenticated(true))
      thunkAPI.dispatch(getUserProfiles())
      thunkAPI.dispatch(loadCart())
      thunkAPI.dispatch(loadFavs())

      return resp.data
    }
  } catch (err) {
    thunkAPI.rejectWithValue(err.response.data)
  }
  return
})

export const getUserProfiles = createAsyncThunk('cart/getUserProfiles', async (_, thunkAPI) => {

  let resp = await axios('acc/profiles',)

  if (resp.status === 200) {
    let lsProfile = localStorage.getItem("activeProfile")
    const lsProfileFoundInProfiles = resp.data.find(item => item.profileId === lsProfile)
    if (lsProfileFoundInProfiles) {
      thunkAPI.dispatch(setActiveProfileId(lsProfile))
    } else {
      thunkAPI.dispatch(setActiveProfileId(resp.data[0].profileId))
    }
    return resp.data
  }
  return
})

export const logout = createAsyncThunk('user/logout', async (_, thunkAPI) => {
  localStorage.removeItem('token')
  thunkAPI.dispatch(setToken(null))
  thunkAPI.dispatch(setUser(null))
  thunkAPI.dispatch(setUserProfiles(null))
  thunkAPI.dispatch(setIsAuthenticated(false))

  thunkAPI.dispatch(loadCart())
  thunkAPI.dispatch(loadFavs())
  localStorage.removeItem('userProfile')
  return true
})

// export const uniteOnAuth = createAsyncThunk('user/uniteOnAuth', async (_, thunkAPI) => {
//
//   let favsUpdated = false
//   let cartUpdated = false
//
//   try {
//
//     // объединение корзин
//     const lsCart = JSON.parse(localStorage.getItem('cart'))
//     if (lsCart && lsCart.cartItems.length > 0) {
//
//       const itemsToSend = lsCart.cartItems.map(item => {
//         return ({productVriantId: item.productVariantId, count: item.quantity})
//       })
//       await axios.post(`carts/cartItems`, itemsToSend)
//
//       // если ошибка, то объединения не произойдет, все останется как было (до след.   авторизации)
//       localStorage.removeItem('cart')
//       // если ошибки не было, удаляем cart из LS
//       favsUpdated = true
//     }
//
//     const lsFavs = JSON.parse(localStorage.getItem('favs'))
//
//     if (lsFavs && lsFavs.length > 0) {
//
//       const favsToSend = lsFavs.map(fav => {
//         return ({productVariantId: fav.productVariantId})
//       })
//
//       console.log("favsToSend - ", favsToSend)
//
//       await axios.post(`favourites/addRange`, favsToSend)
//
//       // если ошибка, то объединения не произойдет, все останется как было (до след.    авторизации)
//       localStorage.removeItem('favs')
//       // если ошибки не было, удаляем cart из LS 
//
//       cartUpdated = true
//     }
//
//
//     if (!cartUpdated && !favsUpdated) return
//
//     if (cartUpdated && !favsUpdated) {
//       thunkAPI.dispatch(loadCart())
//       return
//     } else {
//       thunkAPI.dispatch(loadFavs())
//       thunkAPI.dispatch(loadCart())
//     }
//
//   } catch (err) {
//     console.log
//   }
// })


const initialState = {
  user: null,
  // isLoading: true,
  isAuthenticated: false,
  token: null,
  userProfiles: null,
  logoutStatus: 'loading',
  getUserStatus: 'loading',
  activeProfileId: null,
  profilesInDropdownAreShown: true
  // loginStatus: 'loading',
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
    setActiveProfileId: (state, action) => {
      state.activeProfileId = action.payload
    },
    setProfilesInDropdownAreShown: (state, action) => {
      state.profilesInDropdownAreShown = action.payload
    },
  },
  extraReducers: builder => builder

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

    .addCase(getUserCompanies.pending, (state) => {
      state.getUserCompaniesStatus = 'loading'
    })
    .addCase(getUserCompanies.fulfilled, (state, action) => {
      state.getUserCompaniesStatus = 'success'
      // state.isAuthenticated = true
      if (action.payload) {
        state.user = action.payload
      }
    })
    .addCase(getUserCompanies.rejected, (state, action) => {
      state.getUserCompaniesStatus = 'error'
      console.log('Не удалось получить данные пользователя', action.error.message)
    })


    .addCase(getUserProfiles.pending, (state) => {
      state.userProfilesLoadingStatus = 'loading'
    })
    .addCase(getUserProfiles.fulfilled, (state, action) => {
      state.userProfilesLoadingStatus = 'success'
      state.isAuthenticated = true
      if (action.payload) {
        state.userProfiles = action.payload
      }
    })
    .addCase(getUserProfiles.rejected, (state, action) => {
      state.userProfilesLoadingStatus = 'error'
      console.log('Не удалось получить данные пользователя', action.error.message)
    })

})
export const {
  setUser,
  setToken,
  setIsAuthenticated,
  setUserProfiles,
  setActiveProfileId,
  setProfilesInDropdownAreShown
} = userSlice.actions
export const getIsAuthenticated = state => state.user.isAuthenticated
export const getUserData = state => state.user.user
export const getUserStatus = state => state.user.getUserStatus
export const getUserProfilesLoadingStatus = state => state.user.userProfilesLoadingStatus
export const getUserProfilesData = state => state.user.userProfiles
export const getActiveProfileId = state => state.user.activeProfileId
export const getProfilesInDropdownAreShown = state => state.user.profilesInDropdownAreShown
export default userSlice.reducer