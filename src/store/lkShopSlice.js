import {createSlice} from "@reduxjs/toolkit";


const initialState = {
  topShopTab: 1,  
  secondFromTopTab: 1
}

const lkShopSlice = createSlice({
  name: 'lkShop',
  initialState,
  reducers: {
    setTopShopTab: (state, action) => {
      state.topShopTab = action.payload
    },
    setSecondFromTopTab: (state, action) => {
      state.secondFromTopTab = action.payload
    },
  },

  
})
export const {
  setTopShopTab, setSecondFromTopTab

} = lkShopSlice.actions
export const getTopShopTab = state => state.shop.topShopTab
export const getSecondFromTopTab = state => state.shop.secondFromTopTab

export default lkShopSlice.reducer