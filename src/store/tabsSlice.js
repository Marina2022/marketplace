import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  tabs: JSON.parse(localStorage.getItem("tabs") || "[]")
}

export const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setTabs: (state, action) => {
      state.tabs = action.payload
      localStorage.setItem("tabs", JSON.stringify(state.tabs))
    }
  }
})

export const {setTabs, setActiveTab} = tabsSlice.actions

export const getTabs = (state) => {
  return state.tabs.tabs
}

export const getActiveTab = (state) => {
  return state.tabs.activeTab
}


export default tabsSlice.reducer