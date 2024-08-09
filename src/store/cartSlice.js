import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "@/api/axiosInstance.js";
import {MAX_QUANTITY_TO_ADD} from "@/consts/maxQuantityToAddToCart.js";
import {v4 as uuidv4} from 'uuid';

export const loadCart = createAsyncThunk('cart/getCart', async (param, thunkAPI) => {

  const state = thunkAPI.getState()

  // задержка загрузки
  // await new Promise((resolve)=>{
  //   setTimeout(resolve, 1000)
  // })

  let urlString = 'carts'

  if (state.cart.cartSearchTerm) {
    urlString += '?searchTerms=' + state.cart.cartSearchTerm
  }

  if (state.user.isAuthenticated) {
    const resp = await axios(urlString)
    thunkAPI.dispatch(loadCheckout({cartId: resp.data.cartId}))

    if (state.cart.editingSearchTerm) {
      thunkAPI.dispatch(setEditingSearchTerm(false))
    }


    return (resp.data)
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
    const resp = await axios(`carts/${cartId}/checkout`)
    return (resp.data)
  } else {

    // считаем и сетаем чекаут сами
    const cart = JSON.parse(localStorage.getItem('cart'))

    const productCountInCart = cart.cartItems.reduce((acc, current) => {
      return acc += current.checked ? current.quantity : 0
    }, 0)

    const totalRegularPrice = cart.cartItems.reduce((acc, current) => {
      return acc += current.checked ?  current.regularPrice * current.quantity : 0
    }, 0)

    const totalPrice = cart.cartItems.reduce((acc, current) => {
      return acc += current.checked ?  current.price * current.quantity : 0
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
    // todo - посылаем чекбокс в LS
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
    // todo - посылаем chooseAll в LS
    return
  }
})
export const addToCart = createAsyncThunk('cart/addToCart', async (params, thunkAPI) => {
  const state = thunkAPI.getState()
  const {productVriantId, count, cartItemId, item} = params

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
    const cart = JSON.parse(JSON.stringify(state.cart.cart))
    console.log('cart =', cart)

    console.log('посылать в LS будем айтем', item, ' -', quantityToSend, 'шт')
    const itemFoundInCart = cart.cartItems.find(cartItem => cartItem.productVariantId === item.productVariantId)

    console.log('itemFoundInCart = ', itemFoundInCart)

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
        quantity: quantityToSend
      })
    } else {
      itemFoundInCart.quantity = quantityToSend
    }

    console.log('cart =', cart)
    localStorage.setItem('cart', JSON.stringify(cart))
    thunkAPI.dispatch(loadCart())

    //  let cart = state.cart.cart.slice()  // тут, видимо, будем полностью корзину апдейтить и заменять
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

export const deleteCartItem = createAsyncThunk('cart/deleteCartItem', async ({cartItemId}, thunkAPI) => {

  const state = thunkAPI.getState()

  if (state.user.isAuthenticated) {
    const resp = await axios.delete(`carts/cartItem/${cartItemId}`)

    if (resp.status === 200) {
      thunkAPI.dispatch(loadCart())
    }
    return (resp.data)
  } else {
    // todo - delete в LS
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
    // todo - delete range в LS
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
  cartStatus: null
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
  },

  extraReducers: builder => builder
    .addCase(addToCart.pending, (state, action) => {
      state.cartUpdateStatus = 'loading'
    })
    .addCase(addToCart.fulfilled, (state, action) => {
      state.cartUpdateStatus = 'success'
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

export const {
  clearProducts,
  addProduct,
  plus,
  minus,
  removeProduct,
  setCart,
  setCartSearchTerm,
  setEditingSearchTerm
} = cartSlice.actions

export const getCart = (state) => state.cart.cart
export const getCartSearchTerm = (state) => state.cart.cartSearchTerm
export const getCartStatus = (state) => state.cart.status
export const getCheckoutStatus = (state) => state.cart.checkoutStatus
export const getCheckout = (state) => state.cart.checkout
export const getEditingSearchTerm = (state) => state.cart.editingSearchTerm

export default cartSlice.reducer