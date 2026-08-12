import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "@/api/axiosInstance.js";
import axiosInstance from "@/api/axiosInstance.js";


export const loadRequests = createAsyncThunk('requests/loadRequests', async (args, thunkAPI) => {
  const state = thunkAPI.getState()
  if (state.user.isAuthenticated) {
    const {activeProfileId, type} = args
    try {
      const url = `current-orders?profileId=${activeProfileId}&profileType=${type}`
      const resp = await axios(url)

      if (resp.data.description === "No product in order") {
        return []
      } else {
        return resp.data
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
})


export const loadRequestsTree = createAsyncThunk('requests/loadRequestsTree', async () => {
  // const resp = await axiosInstance.get("/request-categories/tree")
  const resp = await axiosInstance.get("/request-categories/tree/tags")
  return resp.data
})

const initialState = {
  requests: null,
  requestsLoadingStatus: 'loading',
  requestsTab: 1,
  requestTree: null,
  requestsTreeLoading: true,
  openedBranchesInCats: [],
  openedBranchesInKewSearch: [],
  tagsSelected: [],
  recentCategories: JSON.parse(localStorage.getItem("recent_categories") || "[]"),
}

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    setRequestsTab: (state, action) => {
      state.requestsTab = action.payload
    },
    setRequestTree: (state, action) => {
      state.requestTree = action.payload
    },
    setOpenedBranchesInCats: (state, action) => {
      state.openedBranchesInCats = action.payload
    },
    setOpenedBranchesInKewSearch: (state, action) => {
      state.openedBranchesInKewSearch = action.payload
    },
    setTagsSelected: (state, action) => {
      state.tagsSelected = action.payload
    },
    setRecentCategories: (state, action) => {
      state.recentCategories = action.payload
    }

  },

  extraReducers:
    builder => builder
      .addCase(loadRequests.pending, (state) => {
        state.requestsLoadingStatus = 'loading'
      })
      .addCase(loadRequests.fulfilled, (state, action) => {
        state.requestsLoadingStatus = 'success'
        state.requests = action.payload
      })
      .addCase(loadRequests.rejected, (state, action) => {
        state.requestsLoadingStatus = 'error'
        console.log('ошибка', action.error.message)
      })

      .addCase(loadRequestsTree.pending, (state) => {
        state.requestsTreeLoading = true
      })
      .addCase(loadRequestsTree.fulfilled, (state, action) => {
        state.requestTree = action.payload
        state.requestsTreeLoading = false
      })
      .addCase(loadRequestsTree.rejected, (state, action) => {
        state.requestsTreeLoading = false
        console.log('ошибка', action.error.message)
      })
})
export const {
  setRequestsTab, setRequestTree, setOpenedBranchesInCats, setOpenedBranchesInKewSearch, setTagsSelected, setRecentCategories
} = requestsSlice.actions
export const getRequests = state => state.requests.requests
export const getRequestsTab = state => state.requests.requestsTab
export const getRequestsLoadingStatus = state => state.requests.requestsLoadingStatus
export const getRequestsTree = state => state.requests.requestTree
export const getRequestsTreeLoading = state => state.requests.requestsTreeLoading
export const getOpenedBranchesInCats = state => state.requests.openedBranchesInCats
export const getOpenedBranchesInKeySearch = state => state.requests.openedBranchesInKewSearch
export const getTagsSelected = state => state.requests.tagsSelected
export const getRecentCategories = state => state.requests.recentCategories


export default requestsSlice.reducer