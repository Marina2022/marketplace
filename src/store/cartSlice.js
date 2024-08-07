import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "@/api/axiosInstance.js";

export const loadCart = createAsyncThunk('cart/getCart', async (_, thunkAPI) => {
  // Запрос на получение корзины с сервера.. 

  // в парамсах еще можно слово для поиска принять, но это потом

  const state = thunkAPI.getState()

  // задержка загрузки
  // await new Promise((resolve)=>{
  //   setTimeout(resolve, 1000)
  // })

  if (state.user.isAuthenticated) {
    const resp = await axios('carts')
    return (resp.data)
  } else {
    const LSstring = localStorage.getItem('cart')
    if (!LSstring) return []
    return JSON.parse(LSstring)
  }
})

export const loadCheckout = createAsyncThunk('cart/getCheckout', async ({cartId}, thunkAPI) => {

  const state = thunkAPI.getState()

  // задержка загрузки
  // await new Promise((resolve)=>{
  //   setTimeout(resolve, 1000)
  // })

  if (state.user.isAuthenticated) {
    const resp = await axios(`carts/${cartId}/checkout`)
    return (resp.data)
  } else {
    const LSstring = localStorage.getItem('cart')
    if (!LSstring) return []
    return JSON.parse(LSstring)
  }
})


export const checkCartStatus = createAsyncThunk('cart/checkCartStatus', async (param, thunkAPI) => {
  const cartId = param.cartId
  if (!cartId) return
  const state = thunkAPI.getState()

  if (state.user.isAuthenticated) {
    const resp = await axios(`carts/${cartId}/currentStatus`)
    console.log(resp)
    if (resp.status === 200) {
      thunkAPI.dispatch(loadCart())
      thunkAPI.dispatch(loadCheckout({cartId}))
    }
    return (resp.data)
  } else {
    // без авторизации ничего не будет происходить
    return
  }
})

export const sendCheckbox = createAsyncThunk('cart/sendCheckbox', async ({cartItemId, select, cartId}, thunkAPI) => {

  const state = thunkAPI.getState()

  if (state.user.isAuthenticated) {
    const resp = await axios.post(`carts/cartItems/select`, {cartItemId, action: select})

    if (resp.status === 200) {
      thunkAPI.dispatch(loadCart())
      thunkAPI.dispatch(loadCheckout({cartId}))
    }
    return (resp.data)
  } else {
    // todo - посылаем чекбокс в LS
    return
  }
})

export const chooseAll = createAsyncThunk('cart/chooseAll', async ({select, cartId}, thunkAPI) => {

  const state = thunkAPI.getState()

  if (state.user.isAuthenticated) {
    const resp = await axios.post(`carts/cartItems/selectAll`, {action: select})

    if (resp.status === 200) {
      thunkAPI.dispatch(loadCart())
      thunkAPI.dispatch(loadCheckout({cartId}))
    }
    return (resp.data)
  } else {
    // todo - посылаем chooseAll в LS
    return
  }
})

export const addToCart = createAsyncThunk('cart/addToCart', async (params, thunkAPI) => {
  const state = thunkAPI.getState()
  const {productVriantId, count, cartId, inventoryLevel, cartItemId} = params
  
  let quantityToSend = count


  if (state.user.isAuthenticated) {

    console.log('я пришел в санку', {count})

   
    const isAvailable = await axios.post(`carts/productAvailable`, {cartItemId, quantity: count})
    
    if (isAvailable.data.requestedQuantity > isAvailable.data.inventoryLevel) quantityToSend = isAvailable.data.inventoryLevel

    const itemsToAdd = [{productVriantId, count: quantityToSend}]
    
    const resp = await axios.post(`carts/cartItems`, itemsToAdd)

    if (resp.status === 200) {
      thunkAPI.dispatch(loadCart())
      thunkAPI.dispatch(loadCheckout({cartId}))
    }
    return (resp.data)

  } else {
    //  let cart = state.cart.productsInCart.slice()  // тут, видимо, будем полностью корзину апдейтить и заменять
    // пока ничего не делаем

    // const productIndex = cart.findIndex((item) => {
    //   return item.id == id
    // })
    //
    // if (productIndex >= 0) {
    //
    //   if (cart[productIndex].count + quantity === 0) {
    //     //remove
    //     cart = cart.filter(product => product.id !== id)
    //   } else {
    //     // add quantity to count
    //     const newProduct = {...cart[productIndex], count: cart[productIndex].count + quantity}
    //     cart.splice(productIndex, 1, newProduct)
    //   }
    //
    // } else {
    //   // add new item to cart
    //   cart.push({id: id, count: 1})
    // }
  }

  // localStorage.setItem('cart', JSON.stringify(cart));

  // return cart
  return 1
})

const initialState = {
  productsInCart: [],
  status: 'loading',
  cartSearchTerm: '',
  checkout: null,
  checkoutStatus: 'loading',
  gettingCartStatus: 'loading',
  sendSelectStatus: 'success',
  chooseAllStatus: 'success',
  cartUpdateStatus: 'success',
  cartStatus: null
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    setCart: (state, action) => {
      state.productsInCart = action.payload
    },
    setCartSearchTerm: (state, action) => {
      state.cartSearchTerm = action.payload
    },
  },

  extraReducers: builder => builder
    .addCase(addToCart.pending, (state, action) => {
      state.cartUpdateStatus = 'loading'
    })
    .addCase(addToCart.fulfilled, (state, action) => {
      state.cartUpdateStatus = 'success'
      // state.productsInCart = action.payload
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
      state.productsInCart = action.payload
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
  ,

})

export const {clearProducts, addProduct, plus, minus, removeProduct, setCart, setCartSearchTerm} = cartSlice.actions

export const getCart = (state) => state.cart.productsInCart
export const getCartSearchTerm = (state) => state.cart.cartSearchTerm
export const getCartStatus = (state) => state.cart.status
export const getCheckoutStatus = (state) => state.cart.checkoutStatus
export const getCheckout = (state) => state.cart.checkout

export default cartSlice.reducer