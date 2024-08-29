import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "@/api/axiosInstance.js";
import {MAX_QUANTITY_TO_ADD} from "@/consts/maxQuantityToAddToCart.js";
import {v4 as uuidv4} from 'uuid';

export const loadCart = createAsyncThunk('cart/getCart', async (param, thunkAPI) => {
  const state = thunkAPI.getState()

  let urlString = 'carts'

  if (state.cart.cartSearchTerm) {
    urlString += '?searchTerms=' + state.cart.cartSearchTerm
  }

  if (state.user.isAuthenticated) {

    let resp
    try {
      resp = await axios(urlString)
      thunkAPI.dispatch(loadCheckout({cartId: resp.data.cartId}))
      if (state.cart.editingSearchTerm) {
        thunkAPI.dispatch(setEditingSearchTerm(false))
      }
      return (resp.data)
      
    } catch (err) {
      if (err.response.data.description === 'Cart not found for the given user ID' ||  err.response.data.description === 'No cart items in cart' ) {        
        thunkAPI.dispatch(setCheckout(null))
        return {cartId: null, cartItems: []}
      } else {
        thunkAPI.rejectWithValue(err.response.data)
      }
    }
  } else {
    const cartInLS = localStorage.getItem('cart')
    if (cartInLS) {
      thunkAPI.dispatch(loadCheckout())
      return JSON.parse(cartInLS)
    } else {
      return {cartId: null, cartItems: []}
    }
  }
})

export const loadCheckout = createAsyncThunk('cart/getCheckout', async (param, thunkAPI) => {

  const cartId = param?.cartId
  const state = thunkAPI.getState()

  if (state.user.isAuthenticated) {
    try {
      const resp = await axios(`carts/${cartId}/checkout`)
      return (resp.data)
    } catch (err) {
      if (err.response.data.description === 'No cart items in cart') {
        return null
      } else {
        return thunkAPI.rejectWithValue(err.response.data)
      }
    }

  } else {

    // считаем и сетаем чекаут:
    const cart = JSON.parse(localStorage.getItem('cart'))
    
    const productCountInCart = cart.cartItems.reduce((acc, current) => {
      return acc += current.checked ? current.quantity : 0
    }, 0)

    const totalRegularPrice = cart.cartItems.reduce((acc, current) => {
      return acc += current.checked ? current.regularPrice * current.quantity : 0
    }, 0)

    const totalPrice = cart.cartItems.reduce((acc, current) => {
      return acc += current.checked ? current.price * current.quantity : 0
    }, 0)

    const savings = totalRegularPrice - totalPrice
    return {productCountInCart, totalRegularPrice, totalPrice, savings}
  }
})

export const checkCartStatus = createAsyncThunk('cart/checkCartStatus', async (param, thunkAPI) => {
  const cartId = param.cartId
  if (!cartId) return
  const state = thunkAPI.getState()

  if (state.user.isAuthenticated) {
    const resp = await axios(`carts/${cartId}/currentStatus`)
    if (resp.status === 200) {
      thunkAPI.dispatch(loadCart())
    }
    return (resp.data)
  } else {
    // без авторизации ничего не будет происходить
    return {cartItems: []}
  }
})

export const sendCheckbox = createAsyncThunk('cart/sendCheckbox', async ({cartItemId, select}, thunkAPI) => {
  const state = thunkAPI.getState()
  if (state.user.isAuthenticated) {
    const resp = await axios.post(`carts/cartItems/select`, {cartItemId, action: select})
    if (resp.status === 200) {
      thunkAPI.dispatch(loadCart())
    }
    return (resp.data)

  } else {

    // пользователь не авторизован, работаем с LS:
    const cart = JSON.parse(JSON.stringify(state.cart.cart))
    const itemInCart = cart.cartItems.find(cartItem => cartItem.cartItemId === cartItemId)
    if (itemInCart) {
      itemInCart.checked = select === 'select' ? true : false
    } else {
      throw new Error('Из LS пропал данный товар из корзины, поменять чекбокс не могу')
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    thunkAPI.dispatch(loadCart())
    return
  }
})

export const chooseAll = createAsyncThunk('cart/chooseAll', async ({select}, thunkAPI) => {
  const state = thunkAPI.getState()
  if (state.user.isAuthenticated) {
    const resp = await axios.post(`carts/cartItems/selectAll`, {action: select})

    if (resp.status === 200) {
      thunkAPI.dispatch(loadCart())
    }
    return (resp.data)
  } else {
    // пользователь не авторизован, работаем с LS
    const cart = JSON.parse(JSON.stringify(state.cart.cart))
    cart.cartItems.forEach(cartItem => cartItem.checked = select === 'select' ? true : false)
    localStorage.setItem('cart', JSON.stringify(cart))
    thunkAPI.dispatch(loadCart())
    return
  }
})
export const addToCart = createAsyncThunk('cart/addToCart', async (params, thunkAPI) => {
  const state = thunkAPI.getState()
  const {productVriantId, count, cartItemId, item, sku} = params

  let quantityToSend = count

  // число не может быть больше 999, MAX_QUANTITY_TO_ADD = 999, можно поменять в папке consts
  if (quantityToSend > MAX_QUANTITY_TO_ADD) {
    quantityToSend = MAX_QUANTITY_TO_ADD
  }

  if (state.user.isAuthenticated) {

    if (cartItemId) {
      // если из каталога впервые в корзину добавляем, cartItemId будет undefined, проверку не делаем    
      const isAvailable = await axios.post(`carts/productAvailable`, {cartItemId, quantity: quantityToSend})

      if (isAvailable.data.requestedQuantity > isAvailable.data.inventoryLevel) quantityToSend = isAvailable.data.inventoryLevel
    }

    const itemsToAdd = [{productVriantId, count: quantityToSend}]
    const resp = await axios.post(`carts/cartItems`, itemsToAdd)

    if (resp.status === 200) {
      thunkAPI.dispatch(loadCart())
    }
    return (resp.data)

  } else {
    // пользователь не авторизован, работаем с LS
    const inventoryLevel = item.inventoryLevel || item.inventoryQuantity

    if (quantityToSend > inventoryLevel)
      quantityToSend = inventoryLevel

    const cart = JSON.parse(JSON.stringify(state.cart.cart))
    const itemFoundInCart = cart.cartItems.find(cartItem => cartItem.productVariantId === item.productVariantId)

    if (!itemFoundInCart) {
      cart.cartItems.push({
        cartItemId: uuidv4(),
        inventoryLevel: item.inventoryLevel || item.inventoryQuantity,
        productImageUrl: item.productImageUrl || item.images?.[0].imageUrl || item.productImages?.[0].imageUrl,
        seller: item.seller || item.vendorName,
        productVariantId: item.productVariantId,
        regularPrice: item.regularPrice,
        price: item.price,
        isFavourite: item.isFavourite,
        productName: item.productName,
        productHandle: item.productHandle,
        checked: true,
        quantity: quantityToSend,
        discount: item.discount,
        isAvailable: item.isAvailable,
        isDiscounted: item.isDiscounted,
        isSecondHand: item.isSecondHand,
        sku: sku || item.sku
      })
    } else {
      itemFoundInCart.quantity = quantityToSend
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    thunkAPI.dispatch(loadCart())
  }
  return
})

export const deleteCartItem = createAsyncThunk('cart/deleteCartItem', async ({cartItemId}, thunkAPI) => {
  const state = thunkAPI.getState()
  if (state.user.isAuthenticated) {
    const resp = await axios.delete(`carts/cartItem/${cartItemId}`)

    if (resp.status === 200) {
      thunkAPI.dispatch(loadCart())
    }
    return (resp.data)
  } else {
    // пользователь не авторизован, работаем с LS
    const cart = JSON.parse(JSON.stringify(state.cart.cart))

    const newItems = cart.cartItems.filter(cartItem => cartItem.cartItemId !== cartItemId)
    cart.cartItems = newItems

    localStorage.setItem('cart', JSON.stringify(cart))
    thunkAPI.dispatch(loadCart())
    return
  }
})

export const deleteCartItemsRange = createAsyncThunk('cart/deleteCartItemsRange', async ({cartItemsArray}, thunkAPI) => {
  const state = thunkAPI.getState()
  if (state.user.isAuthenticated) {
    const resp = await axios.post(`carts/removeCartItems`, cartItemsArray)
    if (resp.status === 200) {
      thunkAPI.dispatch(loadCart())
    }
    return (resp.data)
  } else {
    // пользователь не авторизован, работаем с LS
    const cart = JSON.parse(JSON.stringify(state.cart.cart))
    const newItems = cart.cartItems.filter(cartItem => !cartItem.checked)
    cart.cartItems = newItems
    localStorage.setItem('cart', JSON.stringify(cart))
    thunkAPI.dispatch(loadCart())
    return
  }
})

export const saveCart = createAsyncThunk('cart/saveCart', async ({cartId}, thunkAPI) => {
  const state = thunkAPI.getState()
  if (state.user.isAuthenticated) {
    const resp = await axios.post(`carts/${cartId}/saveCart`)
    if (resp.status === 200) {
      thunkAPI.dispatch(loadSavedCarts())
      thunkAPI.dispatch(loadCart())
    }
    return
  } else {
    // пользователь не авторизован
    return
  }
})

export const loadSavedCarts = createAsyncThunk('cart/loadSavedCarts', async (_, thunkAPI) => {
  const state = thunkAPI.getState()
  if (state.user.isAuthenticated) {

    try {
      const resp = await axios(`carts/savedCarts`)
      return resp.data
    } catch (err) {
      if (err.response.data.description === 'Cart not found for the given user ID') {
        return []
      } else {
        thunkAPI.rejectWithValue(err.response.data)
      }
    }
  } else {
    // пользователь не авторизован
    return
  }
})
export const loadSavedCartsCheckout = createAsyncThunk('cart/loadSavedCartsCheckout', async ({cartIds}, thunkAPI) => {
  const state = thunkAPI.getState()

  if (state.user.isAuthenticated) {

    try {
      const resp = await axios.post(`carts/savedCheckout`, cartIds)
      return (resp.data)
    } catch (err) {
      if (err.response.data.description === 'No cart items in cart') {
        return []
      } else {
        return thunkAPI.rejectWithValue(err.response.data)
      }
    }
  } else {
    // пользователь не авторизован
    return
  }
})

export const deleteSavedCart = createAsyncThunk('cart/deleteSavedCart', async ({cartIds}, thunkAPI) => {

  const state = thunkAPI.getState()
  if (state.user.isAuthenticated) {
    await axios.post(`carts/removeSavedCarts`, cartIds)
    thunkAPI.dispatch(loadSavedCarts())
    thunkAPI.dispatch(loadSavedCartsCheckout({cartIds: []}))
    return
  } else {
    // пользователь не авторизован
    return
  }
})

export const restoreSaved = createAsyncThunk('cart/restoreSaved', async ({cartIds}, thunkAPI) => {
  const state = thunkAPI.getState()
  if (state.user.isAuthenticated) {
    const resp = await axios.post(`carts/savedRestore`, cartIds)
    thunkAPI.dispatch(loadCart())
    thunkAPI.dispatch(loadSavedCarts())
    thunkAPI.dispatch(loadSavedCartsCheckout([]))
    return (resp.data)
  } else {
    // пользователь не авторизован
    return
  }
})

const initialState = {
  cart: {cartId: null, cartItems: []},
  status: 'loading',
  cartSearchTerm: '',
  editingSearchTerm: false,
  checkout: null,
  checkoutStatus: 'loading',
  gettingCartStatus: 'loading',
  sendSelectStatus: 'success',
  chooseAllStatus: 'success',
  cartUpdateStatus: 'success',
  saveCartStatus: 'success',
  loadSavedCartsStatus: 'loading',
  deleteSavedCartStatus: 'success',
  restoreSavedStatus: 'success',
  loadSavedCartsCheckoutStatus: 'loading',
  cartStatus: null,
  savedCarts: null,
  savedCartsCheckout: null
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    setCart: (state, action) => {
      state.cart = action.payload
    },
    setCartSearchTerm: (state, action) => {
      state.cartSearchTerm = action.payload
    },

    setEditingSearchTerm: (state, action) => {
      state.editingSearchTerm = action.payload
    },
    setCheckout: (state, action) => {      
      state.checkout = action.payload
    },
  },

  extraReducers: builder => builder
    .addCase(addToCart.pending, (state, action) => {
      state.cartUpdateStatus = 'loading'
    })
    .addCase(addToCart.fulfilled, (state, action) => {
      //state.cartUpdateStatus = 'success'
    })
    .addCase(addToCart.rejected, (state, action) => {
      state.cartUpdateStatus = 'error'
      console.log('Не удалось добавить в корзину', action.error.message)
    })

    .addCase(loadCart.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(loadCart.fulfilled, (state, action) => {
      state.status = 'success'
      state.cart = action.payload
      
      // перенесла из addToCart сюда, чтобы success происходил после обновления корзины (иначе успевает мелькнуть кнопка)
      state.cartUpdateStatus = 'success'
    })
    .addCase(loadCart.rejected, (state, action) => {
      state.status = 'error'
      console.log('ошибка', action.error.message)
    })

    .addCase(loadCheckout.pending, (state, action) => {
      state.checkoutStatus = 'loading'
    })
    .addCase(loadCheckout.fulfilled, (state, action) => {
      state.checkoutStatus = 'success'
      state.checkout = action.payload
    })
    .addCase(loadCheckout.rejected, (state, action) => {
      state.checkoutStatus = 'error'
      console.log('ошибка', action.error.message)
    })

    .addCase(checkCartStatus.pending, (state, action) => {
      state.gettingCartStatus = 'loading'
    })
    .addCase(checkCartStatus.fulfilled, (state, action) => {
      state.gettingCartStatus = 'success'
      state.cartStatus = action.payload
    })
    .addCase(checkCartStatus.rejected, (state, action) => {
      state.gettingCartStatus = 'error'
      console.log('ошибка', action.error.message)
    })

    .addCase(sendCheckbox.pending, (state, action) => {
      state.sendSelectStatus = 'loading'
    })
    .addCase(sendCheckbox.fulfilled, (state, action) => {
      state.sendSelectStatus = 'success'
    })
    .addCase(sendCheckbox.rejected, (state, action) => {
      state.sendSelectStatus = 'error'
      console.log('ошибка', action.error.message)
    })


    .addCase(chooseAll.pending, (state, action) => {
      state.chooseAllStatus = 'loading'
    })
    .addCase(chooseAll.fulfilled, (state, action) => {
      state.chooseAllStatus = 'success'
    })
    .addCase(chooseAll.rejected, (state, action) => {
      state.chooseAllStatus = 'error'
      console.log('ошибка', action.error.message)
    })

    .addCase(saveCart.pending, (state, action) => {
      state.saveCartStatus = 'loading'
    })
    .addCase(saveCart.fulfilled, (state, action) => {
      state.saveCartStatus = 'success'
    })
    .addCase(saveCart.rejected, (state, action) => {
      state.saveCartStatus = 'error'
      console.log('ошибка', action.error.message)
    })


    .addCase(loadSavedCarts.pending, (state, action) => {
      state.loadSavedCartsStatus = 'loading'
    })
    .addCase(loadSavedCarts.fulfilled, (state, action) => {
      state.loadSavedCartsStatus = 'success'
      state.savedCarts = action.payload
    })
    .addCase(loadSavedCarts.rejected, (state, action) => {
      state.loadSavedCartsStatus = 'error'
      console.log('ошибка', action.error.message)
    })


    .addCase(loadSavedCartsCheckout.pending, (state, action) => {
      state.loadSavedCartsCheckout = 'loading'
    })
    .addCase(loadSavedCartsCheckout.fulfilled, (state, action) => {
      state.loadSavedCartsCheckoutStatus = 'success'
      state.savedCartsCheckout = action.payload
    })
    .addCase(loadSavedCartsCheckout.rejected, (state, action) => {
      state.loadSavedCartsCheckoutStatus = 'error'
      console.log('ошибка', action.error.message)
    })

    .addCase(deleteSavedCart.pending, (state, action) => {
      state.deleteSavedCart = 'loading'
    })
    .addCase(deleteSavedCart.fulfilled, (state, action) => {
      console.log('deleteSavedCart', action.payload)
      state.deleteSavedCartStatus = 'success'
    })
    .addCase(deleteSavedCart.rejected, (state, action) => {
      state.deleteSavedCartStatus = 'error'
      console.log('ошибка', action.error.message)
    })

    .addCase(restoreSaved.pending, (state, action) => {
      state.restoreSaved = 'loading'
    })
    .addCase(restoreSaved.fulfilled, (state, action) => {
      console.log('restoreSaved', action.payload)
      state.restoreSavedStatus = 'success'
    })
    .addCase(restoreSaved.rejected, (state, action) => {
      state.restoreSavedStatus = 'error'
      console.log('ошибка', action.error.message)
    })
  ,
})

export const {  
  setCart,
  setCartSearchTerm,
  setEditingSearchTerm,
  setCheckout
} = cartSlice.actions

export const getCart = (state) => state.cart.cart
export const getCartSearchTerm = (state) => state.cart.cartSearchTerm
export const getCartStatus = (state) => state.cart.status
export const getCartUpdatingStatus = (state) => state.cart.cartUpdateStatus
export const getCheckoutStatus = (state) => state.cart.checkoutStatus
export const getCheckout = (state) => state.cart.checkout
export const getEditingSearchTerm = (state) => state.cart.editingSearchTerm
export const getSavedCarts = (state) => state.cart.savedCarts
export const getSavedCartsStatus = (state) => state.cart.loadSavedCartsStatus
export const getSavedCartsCheckout = (state) => state.cart.savedCartsCheckout
export const getSavedCartsCheckoutStatus = (state) => state.cart.loadSavedCartsCheckoutStatus

export default cartSlice.reducer