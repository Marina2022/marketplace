import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  products: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    setCart: (state, action) => {
      state.products = action.payload
    },

    clearProducts: (state) => {
      state.products = []
    },
    addProduct: (state, action) => {
      const product = state.products.find((item) => item.id === action.payload.id)

      if (product) {
        product.count++
      } else {
        state.products.push({...action.payload, count: 1})
      }
    },
    plus: (state, action) => {
      const product = state.products.find((item) => item.id === action.payload)
      if (product) product.count++
    },

    minus: (state, action) => {
      const product = state.products.find((item) => item.id === action.payload)
      if (product) {
        if (product.count === 1) return
        product.count--
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload)
    }
  }
})

export const {clearProducts, addProduct, plus, minus, removeProduct, setCart} = cartSlice.actions

export default cartSlice.reducer