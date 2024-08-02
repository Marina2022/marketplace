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
    return(resp.data)
  } else {
    const LSstring = localStorage.getItem('cart')
    if (!LSstring) return []
    return JSON.parse(LSstring)  
  }
  
})

export const addToCart = createAsyncThunk('cart/sendCart', async (params, thunkAPI) => {
  const state = thunkAPI.getState()
  const {id, quantity} = params
  let cart = state.cart.productsInCart.slice()
  if (state.user.isAuthenticated) {
    // посылаем корзину на сервер  
    // const data = await axiosInstance(`https://cart`)
    // return data.data // возвращаем корзину, которая, наверное, придет в ответе от сервере

    // потом, при авторизации, корзину из LS прибавляем к корзине с сервера и по новой отправляем. 

  } else {

    const productIndex = cart.findIndex((item) => {
      return item.id == id
    })

    if (productIndex >= 0) {

      if (cart[productIndex].count + quantity === 0) {
        //remove
        cart = cart.filter(product => product.id !== id)
      } else {
        // add quantity to count
        const newProduct = {...cart[productIndex], count: cart[productIndex].count + quantity}
        cart.splice(productIndex, 1, newProduct)
      }

    } else {      
      // add new item to cart
      cart.push({id: id, count: 1})
    }
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  return cart
})

const initialState = {
  productsInCart: [],
  status: 'loading',
  cartSearchTerm: ''
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
        state.status = 'loading'
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = 'success'
        state.productsInCart = action.payload
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'error'
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
  ,
})

export const {clearProducts, addProduct, plus, minus, removeProduct, setCart, setCartSearchTerm} = cartSlice.actions

export const getCart = (state) => state.cart.productsInCart
export const getCartSearchTerm = (state) => state.cart.cartSearchTerm
export const getCartStatus = (state) => state.cart.status

export default cartSlice.reducer