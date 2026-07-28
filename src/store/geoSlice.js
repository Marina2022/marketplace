import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "@/api/axiosInstance.js";


export const loadGeoContext = createAsyncThunk(
  'geo/loadContext',
  async (_, {rejectWithValue}) => {
    try {
      const resp = await axios("geo/context");
      return resp.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
)

export const loadRegions = createAsyncThunk(
  'geo/loadRegions',
  async (_, {rejectWithValue}) => {
    try {
      const resp = await axios("geo/regions");
      return resp.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
)

const initialState = {
  context: null,
  regions: null,
  contextStatus: 'idle', // idle | loading | succeeded | failed,
  regionsStatus: 'idle',
  error: null,
  isFirstGeoPopupOpen: false,
  isPopupWithCitiesOpen: false,
}

export const geoSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setContext: (state, action) => {
      state.context = action.payload
    },
    setRegions: (state, action) => {
      state.regions = action.payload
    },
    setIsFirstGeoPopupOpen: (state, action) => {
      state.isFirstGeoPopupOpen = action.payload
    },
    setIsPopupWithCitiesOpen: (state, action) => {
      state.isPopupWithCitiesOpen = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadGeoContext.pending, (state) => {
        state.contextStatus = 'loading';
        state.error = null;
      })
      .addCase(loadGeoContext.fulfilled, (state, action) => {
        state.contextStatus = 'succeeded';
        state.context = action.payload;

        if (action.payload.needsConfirmation) {
          state.isFirstGeoPopupOpen = true;
        }
      })
      .addCase(loadGeoContext.rejected, (state, action) => {
        state.contextStatus = 'failed';
        state.error = action.payload || action.error.message;
        console.log(action.payload || action.error.messag);
      })

      .addCase(loadRegions.pending, (state) => {
        state.regionsStatus = 'loading';
        state.error = null;
      })
      .addCase(loadRegions.fulfilled, (state, action) => {
        state.regionsStatus = 'succeeded';
        state.regions = action.payload;
      })
      .addCase(loadRegions.rejected, (state, action) => {
        state.regionsStatus = 'failed';
        state.error = action.payload || action.error.message;
        console.log(action.payload || action.error.messag);
      });
  },

})

export const {setContext, setRegions, setIsFirstGeoPopupOpen, setIsPopupWithCitiesOpen} = geoSlice.actions

export const getContext = (state) => {
  return state.geo.context
}

export const getRegions = (state) => {
  return state.geo.regions
}

export const getContextStatus = (state) => {
  return state.geo.contextStatus
}


export const getIsFirstGeoPopupOpen = (state) => {
  return state.geo.isFirstGeoPopupOpen
}
export const getIsPopupWithCitiesOpen = (state) => {
  return state.geo.isPopupWithCitiesOpen
}


export default geoSlice.reducer